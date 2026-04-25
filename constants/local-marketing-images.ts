/**
 * Local marketing assets under /public/images (add files to match these paths).
 */
export const localMarketingImages = {
  heroBackground: "/images/hero-background.webp",
  logo: "/images/be-eco-wise-logo.png",
} as const;

/** Homepage “Standards” cards — local application photography only. */
export const homeStandardsImages = {
  responsibleSourcing: "/images/application-material-closeup.webp",
  specificationGrade: "/images/application-school-park.webp",
  fieldExecution: "/images/application-playground.webp",
} as const;

/** Homepage “Why Be Eco Wise” feature image. */
export const homeWhyImage = "/images/application-residential.webp";

/** Homepage estimate CTA background (full-bleed texture). */
export const homeCtaBackgroundImage = "/images/application-hoa.webp";

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
