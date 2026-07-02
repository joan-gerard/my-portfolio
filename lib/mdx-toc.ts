export type TocItem = {
  id: string;
  label: string;
  level: 2 | 3;
};

function slugifyHeadingLabel(label: string): string {
  return label
    .toLowerCase()
    .trim()
    .replace(/[`*_~[\]()]/g, "")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function extractTocItems(mdxSource: string): TocItem[] {
  const headingRegex =
    /<(h[23])(?:\s+[^>]*)?>([\s\S]*?)<\/\1>|^(#{2,3})\s+(.+)$/gm;
  const items: TocItem[] = [];
  let match: RegExpExecArray | null = headingRegex.exec(mdxSource);
  const usedIds = new Map<string, number>();

  while (match) {
    const htmlTag = match[1];
    const htmlContent = match[2];
    const markdownHashes = match[3];
    const markdownContent = match[4];
    const level = htmlTag
      ? (Number(htmlTag[1]) as 2 | 3)
      : (markdownHashes.length as 2 | 3);
    const label = (htmlContent ?? markdownContent ?? "")
      .replace(/<[^>]+>/g, "")
      .trim();

    if (!label) {
      match = headingRegex.exec(mdxSource);
      continue;
    }

    const explicitId = match[0].match(/\sid="([^"]+)"/)?.[1];
    const baseId = explicitId ?? slugifyHeadingLabel(label);
    if (!baseId) {
      match = headingRegex.exec(mdxSource);
      continue;
    }

    const duplicateCount = usedIds.get(baseId) ?? 0;
    usedIds.set(baseId, duplicateCount + 1);
    const id = duplicateCount === 0 ? baseId : `${baseId}-${duplicateCount}`;

    items.push({ id, label, level });
    match = headingRegex.exec(mdxSource);
  }

  return items;
}
