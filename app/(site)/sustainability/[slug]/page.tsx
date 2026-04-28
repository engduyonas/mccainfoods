import Link from "next/link";
import HeroBanner from "@/app/components/HeroBanner";
import SidePanel from "@/app/components/SidePanel";
import type { Metadata } from "next";

interface PillarData {
  title: string;
  description: string;
  heroImage: string;
}

const pillarData: Record<string, PillarData> = {
  "smart-sustainable-farming": {
    title: "Smart & Sustainable Farming",
    description:
      "We are committed to implementing regenerative agriculture practices across our global potato supply chain. By working closely with our farming partners, we aim to improve soil health, reduce carbon emissions, and create a more sustainable food system for future generations. Our Farms of the Future program leads the way in demonstrating that sustainable farming at commercial scale is both possible and profitable.",
    heroImage: "https://www.mccain.com/media/4186/tractor-in-field-m.jpg",
  },
  "resource-efficient-operations": {
    title: "Resource-Efficient Operations",
    description:
      "We are focused on reducing our environmental footprint across all of our production facilities. This includes cutting greenhouse gas emissions, reducing water usage, minimizing waste, and transitioning to renewable energy sources. Our goal is to achieve net-zero emissions across our operations and work with our suppliers to reduce emissions throughout our value chain.",
    heroImage: "https://www.mccain.com/media/4224/wind-turbine-in-field.jpg",
  },
  "good-food": {
    title: "Good Food",
    description:
      "We believe that great-tasting food should also be good for people and the planet. We are continuously working to improve the nutritional profile of our products while reducing food waste across our operations. Our commitment to 'Good Food' means ensuring our products are made with responsibly sourced ingredients and meet the highest standards of quality and safety.",
    heroImage: "https://www.mccain.com/media/4225/cooked-potatoes.jpg",
  },
  "thriving-communities": {
    title: "Thriving Communities",
    description:
      "With production facilities in communities around the world, we are committed to being a responsible neighbour and employer. We invest in the communities where we live and work, support local initiatives, and create economic opportunities. Our Community Action Program supports partnerships that address food insecurity, promote education, and build stronger communities.",
    heroImage: "https://www.mccain.com/media/3964/mccain-foods-team-member-at-a-conference.jpg",
  },
  "reports-downloads": {
    title: "Reports & Downloads",
    description:
      "Access our latest sustainability reports, data, and resources. We are committed to transparency in reporting our progress toward our sustainability goals. Our annual Sustainability Report provides detailed information on our performance across all pillars of our sustainability strategy.",
    heroImage: "https://www.mccain.com/media/4379/our-leadership-header-d.jpg",
  },
};

export async function generateStaticParams() {
  return Object.keys(pillarData).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = pillarData[slug];
  return {
    title: data ? `${data.title} | Sustainability | McCain Foods` : "Sustainability | McCain Foods",
  };
}

export default async function SustainabilitySubPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = pillarData[slug];

  if (!data) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold text-mccain-dark">Page not found</h1>
        <Link href="/sustainability" className="text-mccain-green mt-4 inline-block">
          Back to Sustainability
        </Link>
      </div>
    );
  }

  return (
    <>
      <HeroBanner title={data.title} backgroundImage={data.heroImage} />

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <p className="text-lg text-mccain-gray-dark leading-relaxed">{data.description}</p>

            {slug === "reports-downloads" && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-mccain-dark">Available Reports</h3>
                <div className="space-y-3">
                  {[
                    { label: "2024 Sustainability Report", href: "https://www.mccain.com/sustainability-report-2024" },
                    { label: "2023 Sustainability Summary Report", href: "https://www.mccain.com/media/4584/2023-sustainability-summary-report.pdf" },
                  ].map((report) => (
                    <a
                      key={report.label}
                      href={report.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-4 bg-mccain-gray rounded-lg hover:bg-mccain-green hover:text-white transition-colors group"
                    >
                      <svg className="w-5 h-5 text-mccain-green group-hover:text-white flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span className="font-semibold text-sm">{report.label}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-4">
              <Link
                href="/sustainability"
                className="inline-flex items-center gap-2 text-mccain-green hover:text-mccain-green-dark font-semibold text-sm transition-colors"
              >
                &larr; Back to Sustainability
              </Link>
            </div>
          </div>

          <SidePanel
            relatedLinks={[
              { label: "Sustainability at McCain", href: "/sustainability" },
              { label: "Smart & Sustainable Farming", href: "/sustainability/smart-sustainable-farming" },
              { label: "Resource-Efficient Operations", href: "/sustainability/resource-efficient-operations" },
              { label: "Good Food", href: "/sustainability/good-food" },
              { label: "Thriving Communities", href: "/sustainability/thriving-communities" },
            ]}
          />
        </div>
      </div>
    </>
  );
}
