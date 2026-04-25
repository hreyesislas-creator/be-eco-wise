"use client";

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
};

/**
 * `fill` image with a calm dark gradient if the file is missing or fails to load.
 * Parent must be `position: relative` with bounded size.
 */
export function LocalImageFillWithFallback({
  src,
  alt,
  className = "object-cover",
  sizes,
  priority,
}: Props) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={placeholderClass}
        aria-hidden={alt === ""}
        {...(alt ? { role: "img" as const, "aria-label": alt } : {})}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className={className}
      sizes={sizes}
      priority={priority}
      onError={() => setFailed(true)}
    />
  );
}
