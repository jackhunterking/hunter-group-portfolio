import { CapitalAppShell } from "@/components/capital/CapitalAppShell";

export default function HunterGroupCapitalLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <CapitalAppShell>{children}</CapitalAppShell>;
}
