import Footer from "@/components/Footer";
import LiquidSideNav from "@/components/navigationNew";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="font-work-sans">
      <LiquidSideNav />
      {children}
      <Footer />
    </main>
  );
}
