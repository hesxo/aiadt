import { GlobalNav } from "@/components/GlobalNav";
import { Hero } from "@/components/Hero";
import { Introduction } from "@/components/Introduction";
import { Problem } from "@/components/Problem";
import { Features } from "@/components/Features";
import { Architecture } from "@/components/Architecture";
import { Stack } from "@/components/Stack";
import { Conclusion } from "@/components/Conclusion";
import { SiteFooter } from "@/components/SiteFooter";

export default function Home() {
  return (
    <>
      <GlobalNav />
      <main id="top" className="flex-1">
        <Hero />
        <Introduction />
        <Problem />
        <Features />
        <Architecture />
        <Stack />
        <Conclusion />
      </main>
      <SiteFooter />
    </>
  );
}