import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { NotFoundView } from "@/components/NotFoundView";
import Navigation from "@/components/navigation";
import { Reveal } from "@/components/utils";

export const metadata = {
  title: "Page not found | Joan Gerard",
  description: "This page could not be found.",
};

export default function GlobalNotFound() {
  return (
    <main className="font-work-sans">
      <Navigation />
      <Reveal>
        <div className="pt-28 sm:pt-32">
          <NotFoundView />
        </div>
      </Reveal>
      <Contact />
      <Footer />
    </main>
  );
}
