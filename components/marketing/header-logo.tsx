"use client";

import { localMarketingImages } from "@/constants/local-marketing-images";
import Image from "next/image";
import { useState } from "react";

/** Transparent PNG in navbar; no badge wrapper — matches row vertical alignment. */
export function HeaderLogo() {
  const [failed, setFailed] = useState(false);

  return (
    <span className="relative block h-8 w-[9.25rem] shrink-0 sm:h-9 sm:w-[10.5rem]">
      {failed ? (
        <span
          className="absolute inset-0 rounded-md bg-gradient-to-br from-[#0c1412] to-[#050807] ring-1 ring-black/[0.08]"
          aria-hidden
        />
      ) : (
        <Image
          src={localMarketingImages.logo}
          alt="Be Eco Wise"
          fill
          className="object-contain object-left"
          sizes="(max-width: 640px) 148px, 168px"
          priority
          onError={() => setFailed(true)}
        />
      )}
    </span>
  );
}
