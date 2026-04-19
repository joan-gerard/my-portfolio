import { NotFoundView } from "@/components/NotFoundView";
import { Reveal } from "@/components/utils";

export const metadata = {
  title: "Page not found | Joan Gerard",
  description: "This page could not be found.",
};

export default function NotFound() {
  return (
    <Reveal>
      <div className="pt-28 sm:pt-32">
        <NotFoundView />
      </div>
    </Reveal>
  );
}
