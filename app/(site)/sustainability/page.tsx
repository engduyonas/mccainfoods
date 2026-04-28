import Image from "next/image";
import Link from "next/link";
import HeroBanner from "@/app/components/HeroBanner";
import SustainabilityPillar from "@/app/components/SustainabilityPillar";
import SidePanel from "@/app/components/SidePanel";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sustainability | McCain Foods",
};

const pillars = [
  {
    icon: "https://www.mccain.com/media/4090/mccain-foods-sasf.png",
    title: "Smart & Sustainable\nFarming",
    href: "/sustainability/smart-sustainable-farming",
  },
  {
    icon: "https://www.mccain.com/media/4089/mccain-foods-reo.png",
    title: "Resource-Efficient\nOperations",
    href: "/sustainability/resource-efficient-operations",
  },
  {
    icon: "https://www.mccain.com/media/4088/mccain-foods-good-food.png",
    title: "Good\nFood",
    href: "/sustainability/good-food",
  },
  {
    icon: "https://www.mccain.com/media/4091/mccain-thriving-communities.png",
    title: "Thriving\nCommunities",
    href: "/sustainability/thriving-communities",
  },
];

export default function SustainabilityPage() {
  return (
    <>
      <HeroBanner
        title="Sustainability at McCain"
        subtitle="Learn about our progress and commitments."
        backgroundImage="https://www.mccain.com/media/4186/tractor-in-field-m.jpg"
      />

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Report CTA */}
        <div className="text-center mb-12">
          <Link
            href="https://www.mccain.com/sustainability-report-2024"
            target="_blank"
            className="inline-block bg-mccain-green hover:bg-mccain-green-dark text-white font-semibold px-8 py-3 rounded transition-colors text-sm"
          >
            Read our 2024 Sustainability Report
          </Link>
        </div>

        {/* Our Purpose */}
        <section className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold text-mccain-dark mb-4">
            Our Purpose<span className="text-mccain-yellow">.</span>
          </h2>
          <p className="text-xl font-medium text-mccain-green italic mb-6">
            &ldquo;Celebrating real connections through delicious, planet-friendly food.&rdquo;
          </p>
          <p className="text-mccain-gray-dark leading-relaxed">
            At McCain, sustainability goes to the heart of our purpose as a business. For us, this purpose means
            working to put agronomy at the forefront of all we do to support the development of healthier soils
            which, over time, leads to more sustainably sourced food. It means reducing our climate impact and
            improving the nutritional profile of our portfolio while also supporting the vitality of the communities
            in which we operate.
          </p>
        </section>

        {/* Pillars */}
        <section className="mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {pillars.map((pillar) => (
              <SustainabilityPillar
                key={pillar.title}
                icon={pillar.icon}
                title={pillar.title.replace("\n", " ")}
                href={pillar.href}
              />
            ))}
          </div>
        </section>

        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-16">
            {/* CEO Spotlight */}
            <section>
              <h2 className="text-3xl font-bold text-mccain-dark mb-2">
                Spotlight on Sustainability<span className="text-mccain-yellow">.</span>
              </h2>
              <h3 className="text-xl font-bold text-mccain-dark mb-4">
                Hear from our President &amp; CEO.
              </h3>
              <p className="text-mccain-gray-dark leading-relaxed mb-6">
                Our President &amp; CEO of McCain Foods, Max Koeune, shares his thoughts and reflections on why
                a focus on sustainability and Regenerative Agriculture are essential to leave a legacy for future
                generations.
              </p>
              <div className="relative aspect-video rounded-lg overflow-hidden bg-black">
                <a
                  href="https://www.youtube.com/watch?v=ZtaAb5z8o_o"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block relative w-full h-full group"
                >
                  <Image
                    src="https://img.youtube.com/vi/ZtaAb5z8o_o/0.jpg"
                    alt="CEO sustainability video"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
                    <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
                      <svg className="w-7 h-7 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </a>
              </div>
            </section>

            {/* LinkedIn CTA */}
            <section className="relative h-[300px] rounded-lg overflow-hidden">
              <Image
                src="https://www.mccain.com/media/4063/sustainability-social-media-banner.jpg"
                alt="Follow us on LinkedIn"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center">
                <div className="px-8">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Hear our latest<br />Sustainability<br />news and stories<span className="text-mccain-yellow">.</span>
                  </h3>
                  <a
                    href="https://www.linkedin.com/company/mccainfoods/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-mccain-green hover:bg-mccain-green-dark text-white font-semibold px-6 py-2 rounded text-sm transition-colors mt-3"
                  >
                    Follow us on LinkedIn
                  </a>
                </div>
              </div>
            </section>
          </div>

          <SidePanel
            relatedLinks={[
              { label: "Sustainability Reports & Downloads", href: "/sustainability/reports-downloads" },
              { label: "Sustainability Report 2024", href: "https://www.mccain.com/sustainability-report-2024" },
            ]}
          />
        </div>
      </div>
    </>
  );
}
