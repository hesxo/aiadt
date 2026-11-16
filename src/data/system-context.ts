export type FlowDirection = "in" | "out";

export type SystemActor = {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  inbound: string[];
  outbound: string[];
  position: "top-left" | "top-right" | "bottom" | "center";
};

export const coreSystemLabel = "AIADT Waste Optimization System";

export const systemActors: SystemActor[] = [
  {
    id: "tailor",
    title: "Tailor",
    subtitle: "Operations & pattern cutting",
    icon: "✂️",
    position: "top-left",
    inbound: [
      "Optimize pattern placement suggestions",
      "Reusable scrap matching alerts",
      "Fabric stock alerts",
      "Order details & fabric usage",
    ],
    outbound: [
      "Secure login & profile management",
      "Fabric stock details (type, colour, size, cost)",
      "Customer orders",
      "Pattern layout requests",
      "Scrap tracking & categorization",
      "Order status updates",
    ],
  },
  {
    id: "admin",
    title: "Administrator",
    subtitle: "Reports & business analytics",
    icon: "📊",
    position: "top-right",
    inbound: [
      "Waste & cost-saving reports (PDF/CSV)",
      "Fabric inventory reports",
      "Profit & loss dashboard",
      "Low-stock alerts",
    ],
    outbound: [
      "User roles & access control",
      "Low-stock thresholds",
      "Waste limits & reporting parameters",
      "System audit logs",
    ],
  },
  {
    id: "cloud",
    title: "Cloud & offline sync",
    subtitle: "Backup, encryption, recovery",
    icon: "☁️",
    position: "bottom",
    inbound: [
      "Local database storage (offline entry)",
      "Encrypted payloads at rest",
      "Daily cloud sync",
      "Disaster recovery restore",
    ],
    outbound: [
      "System state backups",
      "Persist generated layouts & reports",
      "Audit & traceability logs",
    ],
  },
];