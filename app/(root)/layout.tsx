import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Navigation from "@/components/navigation";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="font-work-sans">
      <Navigation />
      {children}
      <Contact />
      <Footer />
    </main>
  );
}
