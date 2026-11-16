"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { planLayout, computeWasteCostLkr } from "./layout-engine";
import { reuseIdea } from "./scrap-ideas";
import { seedState } from "./seed";
import type {
  AppState,
  CutRecord,
  Fabric,
  LayoutPlan,
  Order,
  OrderStatus,
  PieceInput,
  Scrap,
  Session,
  UserRole,
} from "./types";
import { LOW_STOCK_THRESHOLD_CM, SESSION_KEY, STORAGE_KEY } from "./types";

type StoreContextValue = {
  state: AppState;
  session: Session | null;
  ready: boolean;
  login: (role: UserRole) => void;
  logout: () => void;
  addFabric: (input: Omit<Fabric, "id">) => void;
  addOrder: (input: Omit<Order, "id" | "fabricUsedCm" | "wastePercent" | "wasteCostLkr">) => void;
  updateOrderStatus: (id: string, status: OrderStatus) => void;
  addScrap: (input: Omit<Scrap, "id" | "reuseIdea"> & { reuseIdea?: string }) => void;
  deleteScrap: (id: string) => void;
  createLayoutPlan: (
    fabricId: string,
    orderId: string,
    pieces: PieceInput[],
    allowRotation: boolean,
  ) => LayoutPlan;
  confirmCut: (plan: LayoutPlan) => { ok: boolean; error?: string };
  metrics: {
    cutsRecorded: number;
    fabricUsedCm: number;
    avgWaste: number;
    totalSavedLkr: number;
  };
  exportCutHistoryCsv: () => string;
};

const StoreContext = createContext<StoreContextValue | null>(null);

function loadState(): AppState {
  if (typeof window === "undefined") return seedState;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return seedState;
    return JSON.parse(raw) as AppState;
  } catch {
    return seedState;
  }
}

function saveState(state: AppState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function loadSession(): Session | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as Session;
  } catch {
    return null;
  }
}

function saveSession(session: Session | null) {
  if (!session) localStorage.removeItem(SESSION_KEY);
  else localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

function uid(prefix: string) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
}

export function TailorCutProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(seedState);
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setState(loadState());
    setSession(loadSession());
    setReady(true);
  }, []);

  const persist = useCallback((updater: AppState | ((prev: AppState) => AppState)) => {
    setState((prev) => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      saveState(next);
      return next;
    });
  }, []);

  const login = useCallback((role: UserRole) => {
    const s: Session = { role, displayName: role === "admin" ? "Shop Admin" : "Tailor" };
    setSession(s);
    saveSession(s);
  }, []);

  const logout = useCallback(() => {
    setSession(null);
    saveSession(null);
  }, []);

  const addFabric = useCallback(
    (input: Omit<Fabric, "id">) => {
      persist((prev) => ({
        ...prev,
        fabrics: [...prev.fabrics, { ...input, id: uid("F") }],
      }));
    },
    [persist],
  );

  const addOrder = useCallback(
    (input: Omit<Order, "id" | "fabricUsedCm" | "wastePercent" | "wasteCostLkr">) => {
      persist((prev) => ({
        ...prev,
        orders: [
          ...prev.orders,
          {
            ...input,
            id: uid("O"),
            fabricUsedCm: 0,
            wastePercent: 0,
            wasteCostLkr: 0,
          },
        ],
      }));
    },
    [persist],
  );

  const updateOrderStatus = useCallback(
    (id: string, status: OrderStatus) => {
      persist((prev) => ({
        ...prev,
        orders: prev.orders.map((o) => (o.id === id ? { ...o, status } : o)),
      }));
    },
    [persist],
  );

  const addScrap = useCallback(
    (input: Omit<Scrap, "id" | "reuseIdea"> & { reuseIdea?: string }) => {
      const idea = input.reuseIdea ?? reuseIdea(input.widthCm, input.lengthCm);
      persist((prev) => ({
        ...prev,
        scraps: [
          ...prev.scraps,
          {
            ...input,
            id: uid("S"),
            reuseIdea: idea,
          },
        ],
      }));
    },
    [persist],
  );

  const deleteScrap = useCallback(
    (id: string) => {
      persist((prev) => ({
        ...prev,
        scraps: prev.scraps.filter((s) => s.id !== id),
      }));
    },
    [persist],
  );

  const createLayoutPlan = useCallback(
    (fabricId: string, orderId: string, pieces: PieceInput[], allowRotation: boolean) => {
      const fabric = state.fabrics.find((f) => f.id === fabricId);
      if (!fabric) throw new Error("Fabric not found");
      return planLayout({
        fabric,
        orderId,
        pieces,
        allowRotation,
        scraps: state.scraps,
      });
    },
    [state.fabrics, state.scraps],
  );

  const confirmCut = useCallback(
    (plan: LayoutPlan): { ok: boolean; error?: string } => {
      let error: string | undefined;
      let ok = false;

      persist((prev) => {
        const fabric = prev.fabrics.find((f) => f.id === plan.fabricId);
        const order = prev.orders.find((o) => o.id === plan.orderId);
        if (!fabric || !order) {
          error = "Fabric or order not found";
          return prev;
        }

        const expected = expandForCount(plan.pieces);
        if (plan.placed.length < expected) {
          error = "Not all pieces fit — adjust sizes or enable rotation.";
          return prev;
        }

        if (plan.fabricLengthCm > fabric.lengthCm) {
          error = "Not enough fabric on roll for this layout.";
          return prev;
        }

        let scraps = [...prev.scraps];
        for (const sid of plan.scrapIdsUsed) {
          scraps = scraps.filter((s) => s.id !== sid);
        }

        const wasteLength = Math.max(0, Math.ceil((plan.fabricLengthCm * plan.wastePercent) / 100));
        if (plan.fabricLengthCm > 0 && wasteLength >= 15) {
          scraps.push({
            id: uid("S"),
            fabricId: fabric.id,
            fabricType: fabric.type,
            color: fabric.color,
            widthCm: plan.rollWidth,
            lengthCm: wasteLength,
            reuseIdea: reuseIdea(plan.rollWidth, wasteLength),
          });
        }

        const fabrics = prev.fabrics.map((f) =>
          f.id === fabric.id ? { ...f, lengthCm: Math.max(0, f.lengthCm - plan.fabricLengthCm) } : f,
        );

        const wasteCost = computeWasteCostLkr(fabric, plan.fabricLengthCm, plan.wastePercent);
        const rollUsedCm = plan.placed.some((p) => p.source === "roll") ? plan.fabricLengthCm : 0;
        const totalUsed = order.fabricUsedCm + rollUsedCm;
        const avgWaste =
          totalUsed > 0
            ? (order.wastePercent * order.fabricUsedCm + plan.wastePercent * rollUsedCm) / totalUsed
            : plan.wastePercent;

        const orders = prev.orders.map((o) =>
          o.id === order.id
            ? {
                ...o,
                status: o.status === "pending" ? ("cutting" as const) : o.status,
                fabricUsedCm: totalUsed,
                wastePercent: Math.round(avgWaste * 10) / 10,
                wasteCostLkr: o.wasteCostLkr + wasteCost,
              }
            : o,
        );

        const record: CutRecord = {
          id: uid("C"),
          at: Date.now(),
          orderId: plan.orderId,
          fabricId: plan.fabricId,
          fabricType: fabric.type,
          fabricLengthCm: plan.fabricLengthCm,
          wastePercent: plan.wastePercent,
          savedLkr: plan.savedLkr,
          wasteCostLkr: wasteCost,
          pieceCount: plan.placed.length,
        };

        ok = true;
        return {
          fabrics,
          orders,
          scraps,
          cutHistory: [record, ...prev.cutHistory],
        };
      });

      return { ok, error };
    },
    [persist],
  );

  const metrics = useMemo(() => {
    const cuts = state.cutHistory;
    const fabricUsedCm = cuts.reduce((s, c) => s + c.fabricLengthCm, 0);
    const avgWaste =
      cuts.length === 0 ? 0 : cuts.reduce((s, c) => s + c.wastePercent, 0) / cuts.length;
    const totalSavedLkr = cuts.reduce((s, c) => s + c.savedLkr, 0);
    return {
      cutsRecorded: cuts.length,
      fabricUsedCm,
      avgWaste: Math.round(avgWaste * 10) / 10,
      totalSavedLkr,
    };
  }, [state.cutHistory]);

  const exportCutHistoryCsv = useCallback(() => {
    const header =
      "id,date,orderId,fabricId,fabricType,fabricLengthCm,wastePercent,savedLkr,wasteCostLkr,pieceCount";
    const rows = state.cutHistory.map((c) =>
      [
        c.id,
        new Date(c.at).toISOString(),
        c.orderId,
        c.fabricId,
        c.fabricType,
        c.fabricLengthCm,
        c.wastePercent,
        c.savedLkr,
        c.wasteCostLkr,
        c.pieceCount,
      ].join(","),
    );
    return [header, ...rows].join("\n");
  }, [state.cutHistory]);

  const value: StoreContextValue = {
    state,
    session,
    ready,
    login,
    logout,
    addFabric,
    addOrder,
    updateOrderStatus,
    addScrap,
    deleteScrap,
    createLayoutPlan,
    confirmCut,
    metrics,
    exportCutHistoryCsv,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

function expandForCount(pieces: PieceInput[]) {
  return pieces.reduce((n, p) => n + p.quantity, 0);
}

export function useTailorCut() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useTailorCut must be used within TailorCutProvider");
  return ctx;
}

export function isLowStock(f: Fabric) {
  return f.lengthCm < LOW_STOCK_THRESHOLD_CM;
}