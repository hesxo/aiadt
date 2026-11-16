export function reuseIdea(widthCm: number, lengthCm: number): string {
  const area = widthCm * lengthCm;
  const min = Math.min(widthCm, lengthCm);
  if (area < 400) return "Patch or button placket";
  if (min < 25 && Math.max(widthCm, lengthCm) > 80) return "Binding / lining strip";
  if (area < 2500) return "Pocket bag";
  return "Lining panel or contrast yoke";
}

export function scrapMatchesFabric(
  scrap: { fabricId: string; fabricType: string; color: string },
  fabric: { id: string; type: string; color: string },
): boolean {
  return scrap.fabricId === fabric.id || (scrap.fabricType === fabric.type && scrap.color === fabric.color);
}