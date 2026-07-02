import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function InterviewsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className="font-work-sans">{children}</div>;
}
