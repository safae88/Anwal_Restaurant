export interface SectionRef {
  id: string;
  label: string;
}

/**
 * The scroll-tracked sections of the page, shared by the left brushstroke
 * (ScrollThread) and the right dot-rail (SectionNav) so their lists can
 * never drift apart.
 */
export const SECTIONS: SectionRef[] = [
  { id: "about", label: "About" },
  { id: "menu", label: "Menu" },
  { id: "gallery", label: "Gallery" },
  { id: "reserve", label: "Reserve" },
];