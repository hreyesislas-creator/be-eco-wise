/**
 * Shared treatment for homepage photography: dark-green integration, not “raw” photos.
 * Sits above the image, below caption/UI text (caller controls z-index via order in DOM).
 */
export function PremiumPhotoLayers() {
  return (
    <>
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-[rgba(16,60,48,0.15)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-b from-[rgba(0,0,0,0.15)] to-[rgba(0,0,0,0.35)]"
        aria-hidden
      />
    </>
  );
}

export const premiumPhotoFilter =
  "saturate(0.9) contrast(1.05)" as const;
