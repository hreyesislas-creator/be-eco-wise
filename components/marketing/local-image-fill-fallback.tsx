"use client";

import {
  PremiumPhotoLayers,
  premiumPhotoFilter,
} from "@/components/marketing/premium-photo-layers";
import Image from "next/image";
import { useState } from "react";

const placeholderClass =
  "absolute inset-0 bg-gradient-to-br from-[#141f1c] via-[#0c1412] to-[#050807]";

type Props = {
  src: string;
  alt: string;
  className?: string;
  sizes: string;
  priority?: boolean;
  /** Subtle zoom on hover (Standards cards only). Parent should use `group/card`. */
  cardHover?: boolean;
};

/**
 * `fill` image with premium overlays + calm dark fallback if the file fails.
 * Parent must be `position: relative` with bounded size.
 */
export function LocalImageFillWithFallback({
  src,
  alt,
  className = "object-cover",
  sizes,
  priority,
  cardHover = false,
}: Props) {
  const [failed, setFailed] = useState(false);

  const scaleClass = cardHover
    ? "transition-transform duration-300 ease-out group-hover/card:scale-[1.03]"
    : "";

  const filterStyle = {
    filter: premiumPhotoFilter,
    WebkitFilter: premiumPhotoFilter,
  } as const;

  return (
    <div className="absolute inset-0 overflow-hidden">
      {failed ? (
        <>
          <div
            className={placeholderClass}
            aria-hidden={alt === ""}
            {...(alt ? { role: "img" as const, "aria-label": alt } : {})}
          />
          <PremiumPhotoLayers />
        </>
      ) : (
        <>
          <div className={`absolute inset-0 ${scaleClass}`}>
            <Image
              src={src}
              alt={alt}
              fill
              className={className}
              sizes={sizes}
              priority={priority}
              style={filterStyle}
              onError={() => setFailed(true)}
            />
          </div>
          <PremiumPhotoLayers />
        </>
      )}
    </div>
  );
}
