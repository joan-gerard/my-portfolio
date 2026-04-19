/** Matches fixed nav height used when scrolling to in-page section ids. */
export const NAV_SCROLL_OFFSET_PX = 120;

export function scrollToElementById(elementId: string): void {
  const element = document.getElementById(elementId);
  if (!element) return;

  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.scrollY - NAV_SCROLL_OFFSET_PX;

  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth",
  });
}
