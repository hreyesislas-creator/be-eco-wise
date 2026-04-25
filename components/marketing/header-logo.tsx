"use client";

import { localMarketingImages } from "@/constants/local-marketing-images";
import { tempBecowiseImages } from "@/constants/temp-becowise-images";
import Image from "next/image";
import { useState } from "react";

/** Transparent PNG in navbar; no badge wrapper — matches row vertical alignment. */
export function HeaderLogo() {
  const [src, setSrc] = useState<string>(localMarketingImages.logo);

  return (
    <span className="relative block h-8 w-[9.25rem] shrink-0 sm:h-9 sm:w-[10.5rem]">
      <Image
        key={src}
        src={src}
        alt="Be Eco Wise"
        fill
        className="object-contain object-left"
        sizes="(max-width: 640px) 148px, 168px"
        priority
        onError={() => {
          if (src !== tempBecowiseImages.logo) {
            setSrc(tempBecowiseImages.logo);
          }
        }}
      />
    </span>
  );
}
