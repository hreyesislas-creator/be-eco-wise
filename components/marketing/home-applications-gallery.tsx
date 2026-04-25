"use client";

import { localApplicationSlides } from "@/constants/local-marketing-images";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

const INTERVAL_MS = 4000;
const SLIDE_COUNT = localApplicationSlides.length;

export function HomeApplicationsGallery() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [failed, setFailed] = useState<Record<string, boolean>>({});

  const markFailed = useCallback((id: string) => {
    setFailed((prev) => ({ ...prev, [id]: true }));
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % SLIDE_COUNT);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [paused]);

  return (
    <section
      className="border-t border-white/15 bg-[var(--home-charcoal)] pt-8 pb-12 sm:pt-10 sm:pb-16"
      aria-labelledby="applications-gallery-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <header className="max-w-3xl">
          <p className="text-[11px] font-medium uppercase tracking-[0.35em] text-[var(--home-accent-light)]/85">
            Applications
          </p>
          <h2
            id="applications-gallery-heading"
            className="mt-3 text-3xl font-light tracking-[-0.02em] text-white sm:text-4xl"
          >
            Installed surfaces, real applications
          </h2>
          <p className="mt-4 max-w-2xl text-base font-light leading-relaxed text-white/55">
            From playgrounds and schools to HOAs, parks, and residential
            landscapes — the product makes sense once you see it installed.
          </p>
        </header>

        <div
          className="mt-8 sm:mt-10"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div
            className="relative mx-auto aspect-[16/10] max-h-[min(70vh,36rem)] w-full max-w-5xl overflow-hidden rounded-2xl border border-white/12 bg-[#0a1210] shadow-[0_32px_80px_-28px_rgba(0,0,0,0.75)]"
            role="region"
            aria-roledescription="carousel"
            aria-label="Application photography"
          >
            {localApplicationSlides.map((slide, i) => (
              <div
                key={slide.id}
                className="absolute inset-0 transition-opacity duration-700 ease-in-out"
                style={{
                  opacity: i === index ? 1 : 0,
                  zIndex: i === index ? 1 : 0,
                  pointerEvents: i === index ? "auto" : "none",
                }}
                aria-hidden={i !== index}
              >
                <div className="absolute inset-0">
                  {!failed[slide.id] ? (
                    <Image
                      src={slide.src}
                      alt={slide.alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 64rem"
                      className="object-cover"
                      priority={i === 0}
                      onError={() => markFailed(slide.id)}
                    />
                  ) : (
                    <div
                      className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#141f1c] via-[#0c1412] to-[#050807]"
                      aria-hidden
                    >
                      <span className="text-center text-[10px] font-medium uppercase tracking-[0.2em] text-white/22">
                        Image unavailable
                      </span>
                    </div>
                  )}
                </div>
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050807]/92 via-transparent to-[#050807]/25"
                  aria-hidden
                />
                <p className="absolute inset-x-0 bottom-0 z-10 px-6 pb-6 pt-20 text-lg font-medium tracking-tight text-white sm:text-xl">
                  {slide.caption}
                </p>
              </div>
            ))}
          </div>

          <div
            className="mt-6 flex items-center justify-center gap-2"
            role="tablist"
            aria-label="Choose slide"
          >
            {localApplicationSlides.map((slide, i) => (
              <button
                key={slide.id}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`${slide.caption}, slide ${i + 1} of ${SLIDE_COUNT}`}
                onClick={() => setIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === index
                    ? "w-8 bg-[var(--home-accent-light)]/55"
                    : "w-1.5 bg-white/20 hover:bg-white/35"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
