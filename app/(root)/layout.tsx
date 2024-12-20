import Footer from "@/components/Footer";
// import { Navigation } from "@/components/navigation";
import LiquidSideNav from "@/components/navigationNew";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="font-work-sans">
      {/* <Navigation /> */}
      <LiquidSideNav />
      {children}
      <Footer />
    </main>
  );
}
