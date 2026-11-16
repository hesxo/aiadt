"use client";

import { useTailorCut } from "@/lib/store";
import { LoginScreen } from "./LoginScreen";

export function LoginGate({ children }: { children: React.ReactNode }) {
  const { session, ready } = useTailorCut();

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-[var(--text-secondary)]">
        Loading workspace…
      </div>
    );
  }

  if (!session) return <LoginScreen />;
  return <>{children}</>;
}