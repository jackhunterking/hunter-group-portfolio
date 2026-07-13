import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function HunterGroupCapitalLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Nav />
      <main className="min-h-screen bg-background pt-16">
        <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10">{children}</div>
      </main>
      <Footer />
    </>
  );
}
