import { AppProviders } from "@/components/app/AppProviders";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <AppProviders>{children}</AppProviders>;
}