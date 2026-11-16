import { Suspense } from "react";
import { GlobalNav } from "@/components/GlobalNav";
import { Hero } from "@/components/Hero";
import { HeroFallback } from "@/components/HeroFallback";
import { Introduction } from "@/components/Introduction";
import { Problem } from "@/components/Problem";
import { Features } from "@/components/Features";
import { Architecture } from "@/components/Architecture";
import { Stack } from "@/components/Stack";
import { Conclusion } from "@/components/Conclusion";
import { SiteFooter } from "@/components/SiteFooter";

export default function PresentationPage() {
  return (
    <>
      <Suspense fallback={null}>
        <GlobalNav />
      </Suspense>
      <main id="top" className="flex-1">
        <Suspense fallback={<HeroFallback />}>
          <Hero />
        </Suspense>
        <Introduction />
        <Problem />
        <Suspense fallback={null}>
          <Features />
        </Suspense>
        <Suspense fallback={null}>
          <Architecture />
        </Suspense>
        <Stack />
        <Conclusion />
      </main>
      <SiteFooter />
    </>
  );
}