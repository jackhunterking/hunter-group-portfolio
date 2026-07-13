import { CapitalTopbar } from "@/components/capital/CapitalTopbar";

export default function HunterGroupCapitalLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <CapitalTopbar>{children}</CapitalTopbar>;
}
