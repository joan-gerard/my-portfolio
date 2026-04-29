export type BlogSeriesPart = {
  slug: string;
  label: string;
  part: number;
};

export type BlogSeriesDefinition = {
  key: string;
  title: string;
  hubSlug: string;
  parts: BlogSeriesPart[];
};

export const fundamentalsOfDevopsSeries: BlogSeriesDefinition = {
  key: "fundamentals-of-devops",
  title: "Fundamentals of DevOps",
  hubSlug: "fundamental-of-devops",
  parts: [
    {
      slug: "fundamental-of-devops-part-1",
      label: "Introduction and What is DevOps",
      part: 1,
    },
    { slug: "fundamental-of-devops-part-2", label: "People", part: 2 },
    { slug: "fundamental-of-devops-part-3", label: "Process", part: 3 },
    {
      slug: "fundamental-of-devops-part-4",
      label: "Product and Technology",
      part: 4,
    },
    {
      slug: "fundamental-of-devops-part-5",
      label: "Summary and Closing",
      part: 5,
    },
  ],
};

export const blogSeries: BlogSeriesDefinition[] = [fundamentalsOfDevopsSeries];

export function getBlogSeriesByKey(
  key: string | undefined,
): BlogSeriesDefinition | null {
  if (!key) return null;
  return blogSeries.find((series) => series.key === key) ?? null;
}
