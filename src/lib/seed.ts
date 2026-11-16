import type { AppState } from "./types";

export const seedState: AppState = {
  fabrics: [
    {
      id: "F-101",
      type: "Cotton poplin",
      color: "Navy",
      widthCm: 150,
      lengthCm: 420,
      unitCostPerM: 890,
    },
    {
      id: "F-102",
      type: "Linen blend",
      color: "Sand",
      widthCm: 140,
      lengthCm: 180,
      unitCostPerM: 1200,
    },
    {
      id: "F-103",
      type: "Silk dupioni",
      color: "Ivory",
      widthCm: 110,
      lengthCm: 95,
      unitCostPerM: 2400,
    },
  ],
  orders: [
    {
      id: "O-2401",
      customer: "Amara S.",
      garment: "Men's kurta",
      status: "cutting",
      fabricUsedCm: 0,
      wastePercent: 0,
      wasteCostLkr: 0,
    },
    {
      id: "O-2402",
      customer: "Ravi K.",
      garment: "Alteration — trousers",
      status: "pending",
      fabricUsedCm: 0,
      wastePercent: 0,
      wasteCostLkr: 0,
    },
  ],
  scraps: [
    {
      id: "S-88",
      fabricId: "F-101",
      fabricType: "Cotton poplin",
      color: "Navy",
      widthCm: 40,
      lengthCm: 60,
      reuseIdea: "Pocket bag",
      matchedOrderId: "O-2402",
    },
    {
      id: "S-89",
      fabricId: "F-102",
      fabricType: "Linen blend",
      color: "Sand",
      widthCm: 35,
      lengthCm: 28,
      reuseIdea: "Patch or button placket",
    },
  ],
  cutHistory: [],
};