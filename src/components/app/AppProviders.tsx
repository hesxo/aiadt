"use client";

import { TailorCutProvider } from "@/lib/store";
import { LoginGate } from "./LoginGate";
import { AppShell } from "./AppShell";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <TailorCutProvider>
      <LoginGate>
        <AppShell>{children}</AppShell>
      </LoginGate>
    </TailorCutProvider>
  );
}