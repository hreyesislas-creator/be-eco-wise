/**
 * Local marketing assets under /public/images (add files to match these paths).
 */
export const localMarketingImages = {
  heroBackground: "/images/hero-background.webp",
  logo: "/images/be-eco-wise-logo.png",
} as const;

export const localApplicationSlides = [
  {
    id: "playground",
    src: "/images/application-playground.webp",
    caption: "Playgrounds",
    alt: "Playground rubber mulch installation",
  },
  {
    id: "hoa",
    src: "/images/application-hoa.webp",
    caption: "HOA common areas",
    alt: "HOA common area with rubber mulch",
  },
  {
    id: "residential",
    src: "/images/application-residential.webp",
    caption: "Residential landscapes",
    alt: "Residential landscape rubber mulch",
  },
  {
    id: "school-park",
    src: "/images/application-school-park.webp",
    caption: "Schools & parks",
    alt: "School or park surfacing",
  },
  {
    id: "material",
    src: "/images/application-material-closeup.webp",
    caption: "Material close-up",
    alt: "Rubber mulch material detail",
  },
] as const;
