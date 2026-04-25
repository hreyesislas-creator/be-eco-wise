/**
 * TEMPORARY — layout / design approval only.
 * Source: becowise.com (Shopify CDN paths). Replace keys with `/images/...`
 * from /public when assets are finalized. Do not treat as a long-term CDN dependency.
 */
const base = "https://becowise.com/cdn/shop/files";

export const tempBecowiseImages = {
  logo: `${base}/Logo.png?v=1757988642&width=320`,
  heroBackdrop: `${base}/BACK.webp?v=1757645735&width=2400`,
  heroFeature: `${base}/3C66621E-B4B2-4726-A097-C87BBFC2ACE9.jpg?v=1757985721&width=1400`,
  heroSecondary: `${base}/4008BEB6-D5F2-4B00-80FB-C3DF27B00D23_jpg.jpg?v=1757985840&width=1400`,
  trustRecycling: `${base}/recycling-tires.jpg?v=1757734345&width=800`,
  trustWireFree: `${base}/wire-free.jpg?v=1757734720&width=800`,
  trustPlayground: `${base}/playground2.jpg?v=1757735241&width=800`,
  industryPlayground: `${base}/playground_d2a693d4-128e-428d-8011-52d0c89de28b.jpg?v=1757731388&width=1200`,
  industryLandscape: `${base}/landscaping_c9dcd915-a6cb-4d26-811e-83c398e09c2c.jpg?v=1757731370&width=1200`,
  industrySports: `${base}/Untitled_design_2.jpg?v=1757731349&width=1200`,
  processLandscape: `${base}/landscaping2.jpg?v=1757735083&width=1200`,
  ctaTexture: `${base}/Group_63_1.webp?v=1757646385&width=2000`,
} as const;

export type TempBecowiseImageKey = keyof typeof tempBecowiseImages;
