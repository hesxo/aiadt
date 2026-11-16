import type { Metadata } from "next";
import { PresentationScript } from "@/components/PresentationScript";
import { ScriptNav } from "@/components/ScriptNav";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Presentation script · TailorCut",
  description:
    "Three-speaker narration script for the TailorCut (AIADT) demo — problem, design, and live walkthrough.",
};

export default function ScriptPage() {
  return (
    <>
      <ScriptNav />
      <main id="top" className="flex-1">
        <PresentationScript />
      </main>
      <SiteFooter />
    </>
  );
}