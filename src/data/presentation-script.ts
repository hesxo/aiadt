export type ScriptSection = {
  id: string;
  speaker: string;
  title: string;
  duration: string;
  paragraphs: string[];
  bullets?: string[];
};

export const scriptMeta = {
  project: "TailorCut",
  subtitle: "AIADT Waste Optimization System",
  totalDuration: "~9 minutes",
  teamPlaceholder: "[Team name]",
};

export const scriptSections: ScriptSection[] = [
  {
    id: "speaker-1",
    speaker: "Speaker 1",
    title: "Problem, objectives and scope",
    duration: "~2.5 min",
    paragraphs: [
      `“Good morning. We are ${scriptMeta.teamPlaceholder}, and our project is TailorCut—the AIADT Waste Optimization System—a waste-smart material planning tool for small-scale tailors.`,
      "Let me start with the problem. Small tailoring shops still cut fabric by hand, using experience and guesswork. Pattern pieces are laid on the roll without a clear plan, so a large share of the material becomes waste. Industry and workshop studies suggest around 15–20% of fabric is lost this way. For a small business, fabric is often the largest input cost, so that waste cuts profit directly. Leftover scraps are thrown away or piled in a corner, and nobody tracks them. The same shop then buys new fabric for a small piece that an existing scrap could have covered.",
      "Our objectives were to:",
    ],
    bullets: [
      "Reduce fabric waste by planning better cutting layouts before the shears touch the cloth.",
      "Track fabric stock and leftover scraps so they can be reused on later orders.",
      "Link fabric use to customer orders so each job has a clear material trail.",
      "Give the owner simple reports on waste, usage, and cost savings in rupees.",
    ],
  },
  {
    id: "speaker-1-scope",
    speaker: "Speaker 1",
    title: "Scope (continued)",
    duration: "",
    paragraphs: [
      "On scope: the system targets independent tailors and small workshops; it is rule-based—heuristics, not trained machine learning—and it works with rectangular pattern pieces (width, height, quantity). The full design also includes inventory, orders, scrap ideas, and role-based access for Admin and Tailor.",
      "Our course deck is at /presentation on the site; the working prototype you will see next uses a web app with browser storage for a quick demo. I’ll now hand over to Speaker 2, who will explain how it works.”",
    ],
  },
  {
    id: "speaker-2",
    speaker: "Speaker 2",
    title: "Design and how it works",
    duration: "~3 min",
    paragraphs: [
      "“Thank you. I’ll explain the design.",
      "Our requirements cover six main functions: user login with Admin and Tailor roles; fabric inventory with type, colour, width, length, and cost per metre; pattern layout optimization; scrap tracking and reuse; order management; and reports. Non-functional goals include a simple, mobile-friendly interface and a layout result in under three seconds on typical orders.",
      "The key part is the layout engine. Here is how it works:",
      "The tailor selects a fabric and an order, then enters each piece with width, height, and quantity—for example front panel, sleeves, and collar for a kurta.",
    ],
    bullets: [
      "Step one — scrap bank first: Before using new roll fabric, the system checks the scrap bank. Pieces are packed onto matching leftovers of the same fabric where they fit. Scraps can show reuse ideas, such as ‘pocket bag’ or ‘patch or button placket’.",
      "Step two — orient and sort: Remaining pieces can be rotated when allowed. They are sorted from largest to smallest for packing.",
      "Step three — shelf packing: Pieces are placed in rows, or shelves, across the fabric width. Each piece goes into the first row where it fits; a new row opens only when needed. This is a well-known shelf-packing heuristic. It runs instantly and gives good layouts, though not always the mathematically perfect one.",
    ],
  },
  {
    id: "speaker-2-cont",
    speaker: "Speaker 2",
    title: "Architecture (continued)",
    duration: "",
    paragraphs: [
      "To measure benefit, the engine also builds a naive layout—pieces stacked in entry order without smart sorting—and compares the two. The difference shows metres saved and rupees saved using the fabric’s cost per metre.",
      "After the tailor clicks Confirm cut, roll length is deducted from stock. Unused gaps at the end of rows become new scraps in the scrap bank. Low stock is flagged when a roll drops below 2 metres (200 cm). Orders record fabric used, waste percentage, and waste cost.",
      "Architecture: the prototype is React and Next.js in the browser, with data in localStorage—no password, pick Tailor or Admin to sign in. Tailors do not see Reports; Admin can open reports and copy CSV. The deck describes a production stack—for example Flask or Django REST with PostgreSQL or MySQL, TLS, and backups—for a full deployment.",
      "Now Speaker 3 will show it working.”",
    ],
  },
  {
    id: "speaker-3",
    speaker: "Speaker 3",
    title: "Live demo, results and conclusion",
    duration: "~3.5 min",
    paragraphs: [
      "“Thank you. I’ll demonstrate TailorCut.",
      "1. Sign in. I sign in as Admin. If I choose Tailor, the Reports tab is hidden—only the owner sees analytics.",
      "2. Inventory and scraps. In Inventory, we have fabrics such as cotton poplin in navy, 150 cm wide, with metres on the roll and cost per metre in rupees. Linen blend and silk dupioni are also listed. Anything under 2 metres shows a low stock warning. In Scraps, the scrap bank lists leftover pieces with suggested reuse—for example a navy scrap marked for a pocket bag linked to an alteration order.",
      "3. Layout planner. I open Patterns. I select navy cotton poplin and the order for Amara S.—men’s kurta. The demo pieces include a front panel, two sleeves, and a collar; I can add or edit sizes. I click Plan layout.",
      "You see the layout drawn on the fabric: fabric length needed, waste percentage, and rupees saved versus the naive layout. Yellow areas are offcuts that will go to the scrap bank after confirm. The planner shows how many matching scraps are available; small pieces may be taken from scraps instead of the roll.",
      "4. Confirm the cut. I click Confirm cut. Stock length decreases, new scraps appear, and the message confirms that stock, scraps, and order were updated.",
      "5. Orders and reports. In Orders, Amara’s job shows status, fabric used, waste percent, and waste cost in LKR. In Reports (Admin), the owner sees cut history, totals for fabric used, average waste, and money saved, with Copy CSV for records.",
    ],
  },
  {
    id: "speaker-3-close",
    speaker: "Speaker 3",
    title: "Results, limitations and close",
    duration: "",
    paragraphs: [
      "Results: TailorCut reduces waste through better layouts and scrap reuse, and gives visibility the shop never had on a paper ledger. Our target was roughly 10–20% waste reduction compared with manual cutting—a 10% improvement alone can materially help profit on tight margins.",
      "Limitations—we want to be honest: rectangular pieces only; the heuristic is fast but not always optimal; the prototype uses browser storage and demo login without real passwords; PDF export and full offline sync are planned in the requirements deck, not fully implemented in the demo.",
      "Future work: irregular pattern shapes, a real database backend with secure authentication, Sinhala and Tamil UI, PDF reports, and optional cloud backup as in our architecture diagram.",
      "In conclusion, TailorCut gives small tailors a practical, low-cost way to cut waste, reuse scraps, and save money—with a path from this prototype to a full production system. Thank you.”",
    ],
  },
];

export const demoCheatSheet = [
  { step: "Login", detail: "Admin (for Reports) or Tailor" },
  { step: "Stock", detail: "F-101 Navy cotton poplin, 150 cm wide; low stock if < 200 cm" },
  { step: "Order", detail: "O-2401 Amara S., men’s kurta" },
  { step: "Plan", detail: "Patterns → Plan layout → show SVG + savings" },
  { step: "Scraps", detail: "S-88 pocket bag; confirm cut adds new scraps" },
  { step: "Deck", detail: "localhost:3000/presentation" },
];