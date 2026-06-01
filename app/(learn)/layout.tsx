import Navigation from "@/components/navigation-v2";

/**
 * Minimal layout for the /learn section.
 * Unlike (root) layout, this does NOT include the Contact form or Footer —
 * those are disruptive in a study/reference context.
 */
export default function LearnLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="font-work-sans">
      <Navigation />
      {children}
    </div>
  );
}
