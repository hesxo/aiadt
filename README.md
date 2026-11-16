# TailorCut (AIADT)

Functional demo app for **waste-smart tailoring**: layout planner, inventory, scraps, orders, and admin reports. Data persists in **localStorage** (single-user demo).

## Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

- Sign in as **Tailor** or **Admin** (no password).
- **Patterns** → Plan layout → **Confirm cut** updates stock, scraps, orders, and cut history.
- **Admin only:** `/reports` and **Copy CSV**.

Course deck: [http://localhost:3000/presentation](http://localhost:3000/presentation)

Presentation script: [http://localhost:3000/script](http://localhost:3000/script)

## Build

```bash
npm run build
npm start
```