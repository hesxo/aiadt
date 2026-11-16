export type UserRole = "admin" | "tailor";

export type Session = {
  role: UserRole;
  displayName: string;
};

export type Fabric = {
  id: string;
  type: string;
  color: string;
  widthCm: number;
  lengthCm: number;
  unitCostPerM: number;
};

export type OrderStatus = "pending" | "cutting" | "complete";

export type Order = {
  id: string;
  customer: string;
  garment: string;
  status: OrderStatus;
  fabricUsedCm: number;
  wastePercent: number;
  wasteCostLkr: number;
};

export type Scrap = {
  id: string;
  fabricId: string;
  fabricType: string;
  color: string;
  widthCm: number;
  lengthCm: number;
  reuseIdea: string;
  matchedOrderId?: string;
};

export type PieceInput = {
  id: string;
  name: string;
  widthCm: number;
  heightCm: number;
  quantity: number;
};

export type PlacedPiece = {
  pieceId: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotated: boolean;
  source: "roll" | "scrap";
  scrapId?: string;
};

export type LayoutPlan = {
  fabricId: string;
  orderId: string;
  allowRotation: boolean;
  pieces: PieceInput[];
  rollWidth: number;
  fabricLengthCm: number;
  placed: PlacedPiece[];
  scrapIdsUsed: string[];
  pieceAreaCm2: number;
  totalAreaCm2: number;
  wastePercent: number;
  naiveLengthCm: number;
  naiveWastePercent: number;
  savedLkr: number;
  plannedAt: number;
};

export type CutRecord = {
  id: string;
  at: number;
  orderId: string;
  fabricId: string;
  fabricType: string;
  fabricLengthCm: number;
  wastePercent: number;
  savedLkr: number;
  wasteCostLkr: number;
  pieceCount: number;
};

export type AppState = {
  fabrics: Fabric[];
  orders: Order[];
  scraps: Scrap[];
  cutHistory: CutRecord[];
};

export const LOW_STOCK_THRESHOLD_CM = 200;
export const STORAGE_KEY = "tailorcut-store-v1";
export const SESSION_KEY = "tailorcut-session";