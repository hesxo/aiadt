import type { Fabric, LayoutPlan, PieceInput, PlacedPiece, Scrap } from "./types";
import { scrapMatchesFabric } from "./scrap-ideas";

type Instance = {
  pieceId: string;
  name: string;
  w: number;
  h: number;
};

function expandPieces(pieces: PieceInput[]): Instance[] {
  const out: Instance[] = [];
  for (const p of pieces) {
    for (let i = 0; i < p.quantity; i++) {
      out.push({
        pieceId: p.id,
        name: p.quantity > 1 ? `${p.name} #${i + 1}` : p.name,
        w: p.widthCm,
        h: p.heightCm,
      });
    }
  }
  return out;
}

function orientations(w: number, h: number, allowRotation: boolean): [number, number][] {
  const list: [number, number][] = [[w, h]];
  if (allowRotation && w !== h) list.push([h, w]);
  return list;
}

function tryShelfPack(
  binW: number,
  binH: number,
  instances: Instance[],
  allowRotation: boolean,
  offsetX: number,
  offsetY: number,
  source: PlacedPiece["source"],
  scrapId?: string,
): { placed: PlacedPiece[]; remaining: Instance[] } {
  const remaining = [...instances].sort((a, b) => Math.max(b.w, b.h) - Math.max(a.w, a.h));
  const placed: PlacedPiece[] = [];
  const shelves: { y: number; height: number; cursorX: number }[] = [];

  const still: Instance[] = [];

  for (const inst of remaining) {
    let packed = false;
    const opts = orientations(inst.w, inst.h, allowRotation);

    for (const [pw, ph] of opts) {
      for (const shelf of shelves) {
        if (shelf.cursorX + pw <= binW && ph <= shelf.height) {
          placed.push({
            pieceId: inst.pieceId,
            name: inst.name,
            x: offsetX + shelf.cursorX,
            y: offsetY + shelf.y,
            width: pw,
            height: ph,
            rotated: pw !== inst.w,
            source,
            scrapId,
          });
          shelf.cursorX += pw;
          packed = true;
          break;
        }
      }
      if (packed) break;

      for (const [pw2, ph2] of opts) {
        const shelfY = shelves.length === 0 ? 0 : shelves[shelves.length - 1].y + shelves[shelves.length - 1].height;
        if (pw2 <= binW && shelfY + ph2 <= binH) {
          placed.push({
            pieceId: inst.pieceId,
            name: inst.name,
            x: offsetX,
            y: offsetY + shelfY,
            width: pw2,
            height: ph2,
            rotated: pw2 !== inst.w,
            source,
            scrapId,
          });
          shelves.push({ y: shelfY, height: ph2, cursorX: pw2 });
          packed = true;
          break;
        }
      }
      if (packed) break;
    }
    if (!packed) still.push(inst);
  }

  return { placed, remaining: still };
}

function naiveStackLength(instances: Instance[], rollWidth: number, allowRotation: boolean): number {
  let y = 0;
  for (const inst of instances) {
    const opts = orientations(inst.w, inst.h, allowRotation);
    let bestH = Infinity;
    for (const [pw, ph] of opts) {
      if (pw <= rollWidth) bestH = Math.min(bestH, ph);
    }
    if (bestH === Infinity) bestH = Math.max(inst.w, inst.h);
    y += bestH + 2;
  }
  return y;
}

function wastePercent(totalArea: number, pieceArea: number): number {
  if (totalArea <= 0) return 0;
  return Math.round(((totalArea - pieceArea) / totalArea) * 1000) / 10;
}

export function planLayout(options: {
  fabric: Fabric;
  orderId: string;
  pieces: PieceInput[];
  allowRotation: boolean;
  scraps: Scrap[];
}): LayoutPlan {
  const { fabric, orderId, pieces, allowRotation, scraps } = options;
  const rollWidth = fabric.widthCm;
  let instances = expandPieces(pieces);
  const placed: PlacedPiece[] = [];
  const scrapIdsUsed: string[] = [];

  const matchingScraps = scraps.filter((s) => scrapMatchesFabric(s, fabric));

  for (const scrap of matchingScraps) {
    if (instances.length === 0) break;
    const result = tryShelfPack(
      scrap.widthCm,
      scrap.lengthCm,
      instances,
      allowRotation,
      0,
      0,
      "scrap",
      scrap.id,
    );
    if (result.placed.length > 0) {
      placed.push(...result.placed);
      instances = result.remaining;
      scrapIdsUsed.push(scrap.id);
    }
  }

  let fabricLengthCm = 0;
  if (instances.length > 0) {
    const rollResult = tryShelfPack(rollWidth, 10000, instances, allowRotation, 0, 0, "roll");
    placed.push(...rollResult.placed);
    instances = rollResult.remaining;

    let maxY = 0;
    for (const p of rollResult.placed) {
      maxY = Math.max(maxY, p.y + p.height);
    }
    fabricLengthCm = Math.ceil(maxY + 4);
  }

  const allInstances = expandPieces(pieces);
  const pieceAreaCm2 = allInstances.reduce((s, i) => s + i.w * i.h, 0);

  let scrapAreaUsed = 0;
  for (const sid of scrapIdsUsed) {
    const sc = matchingScraps.find((s) => s.id === sid);
    if (sc) scrapAreaUsed += sc.widthCm * sc.lengthCm;
  }
  const rollArea = rollWidth * fabricLengthCm;
  const totalAreaCm2 = rollArea + scrapAreaUsed;

  const naiveLengthCm = naiveStackLength(allInstances, rollWidth, allowRotation);
  const naiveArea = rollWidth * naiveLengthCm;
  const naiveWastePercent = wastePercent(naiveArea, pieceAreaCm2);
  const optimizedWaste = wastePercent(totalAreaCm2, pieceAreaCm2);

  const savedLengthCm = Math.max(0, naiveLengthCm - fabricLengthCm);
  const savedLkr = Math.round((savedLengthCm / 100) * fabric.unitCostPerM);

  return {
    fabricId: fabric.id,
    orderId,
    allowRotation,
    pieces,
    rollWidth,
    fabricLengthCm,
    placed,
    scrapIdsUsed,
    pieceAreaCm2,
    totalAreaCm2,
    wastePercent: optimizedWaste,
    naiveLengthCm,
    naiveWastePercent,
    savedLkr,
    plannedAt: Date.now(),
  };
}

export function computeWasteCostLkr(fabric: Fabric, fabricLengthCm: number, wastePercent: number): number {
  const wastedLengthCm = (fabricLengthCm * wastePercent) / 100;
  return Math.round((wastedLengthCm / 100) * fabric.unitCostPerM);
}