import { LeadForm } from "@/components/forms/lead-form";
import { HomeApplicationsGallery } from "@/components/marketing/home-applications-gallery";
import {
  HomeEstimateCtaSection,
  HomeHeroSection,
  HomeIndustriesSection,
  HomeProcessSection,
  HomeTrustSection,
  HomeWhySection,
} from "@/components/marketing/home-sections";
import { listServiceAreas } from "@/lib/data/service-areas";

export default async function HomePage() {
  const areas = await listServiceAreas();

  return (
    <>
      <HomeHeroSection />
      <HomeApplicationsGallery />
      <HomeTrustSection />
      <HomeIndustriesSection />
      <HomeWhySection />
      <HomeProcessSection />
      <HomeEstimateCtaSection />
      <section
        id="estimate"
        className="scroll-mt-28 border-t border-black/[0.06] bg-[var(--home-warm-paper)]"
      >
        <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
          <div className="mx-auto max-w-xl text-center">
            <p className="text-[11px] font-medium uppercase tracking-[0.35em] text-[var(--color-ink-faint)]">
              Estimate
            </p>
            <h2 className="mt-4 text-3xl font-light tracking-[-0.02em] text-[var(--color-ink)] sm:text-4xl">
              Tell us about your site
            </h2>
            <p className="mt-4 text-sm font-light leading-relaxed text-[var(--color-ink-muted)]">
              Same form whether you started with the calculator or not — we
              reply with install-focused next steps.
            </p>
          </div>
          <div className="mx-auto mt-14 max-w-lg">
            <LeadForm areas={areas} id="estimate" />
          </div>
        </div>
      </section>
    </>
  );
}
