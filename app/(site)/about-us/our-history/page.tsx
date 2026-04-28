import Image from "next/image";
import Link from "next/link";
import HeroBanner from "@/app/components/HeroBanner";
import SidePanel from "@/app/components/SidePanel";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our History | McCain Foods",
};

export default function HistoryPage() {
  return (
    <>
      <HeroBanner
        title="Our History"
        backgroundImage="https://www.mccain.com/media/4381/history-header-d.jpg"
      />

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            {/* Story began */}
            <section>
              <h2 className="text-3xl font-bold text-mccain-dark mb-4">
                Our story began in 1957<span className="text-mccain-yellow">.</span>
              </h2>
              <p className="text-mccain-gray-dark leading-relaxed mb-4">
                Our history is the foundation on which we build our future. With over 68 years of experience in
                delivering great tasting food, we continue to drive growth for future generations.
              </p>
              <p className="text-mccain-gray-dark leading-relaxed mb-4">
                The McCain brothers (Wallace, Harrison, Robert and Andrew) were entrepreneurs of their time. As sons
                of a third-generation farmer, they used their family knowledge of agriculture and combined it with
                innovation.
              </p>
              <p className="text-mccain-gray-dark leading-relaxed mb-6">
                By using frozen food technology, the brothers opened the first McCain Foods production facility in
                their hometown of Florenceville, New Brunswick, Canada &ndash; producing frozen French fries, which
                have become a signature product.
              </p>
              <div className="relative h-[300px] rounded-lg overflow-hidden">
                <Image
                  src="https://www.mccain.com/media/3880/mccain-brothers-mother.jpeg"
                  alt="McCain family picture from the 1950s"
                  fill
                  className="object-cover"
                />
              </div>
            </section>

            {/* Global journey */}
            <section>
              <h2 className="text-3xl font-bold text-mccain-dark mb-4">
                It was the start of a global journey<span className="text-mccain-yellow">.</span>
              </h2>
              <p className="text-mccain-gray-dark leading-relaxed">
                Under the family&apos;s leadership, McCain Foods quickly became established within the Canadian
                marketplace. This was the start of an amazing journey to become the world&apos;s largest manufacturer
                of frozen French fries &ndash; with one in every four fries in the world being a McCain Foods fry!
              </p>
            </section>

            {/* Global leader */}
            <section>
              <h2 className="text-3xl font-bold text-mccain-dark mb-4">
                We are now a global leader<span className="text-mccain-yellow">.</span>
              </h2>
              <p className="text-mccain-gray-dark leading-relaxed mb-6">
                By embracing our entrepreneurial innovative beginnings, McCain Foods has grown significantly over the
                years. Our products are now available in more than 160 countries. We are proud that we continue to be
                a global leader in prepared potato products &ndash; including our popular French fries &ndash; and appetizers.
              </p>
              <div className="relative h-[300px] rounded-lg overflow-hidden">
                <Image
                  src="https://www.mccain.com/media/2691/mccain-factory-opening-canada-uk.jpg"
                  alt="McCain factory opening"
                  fill
                  className="object-cover"
                />
              </div>
            </section>

            {/* Ebook CTA */}
            <section className="bg-mccain-green rounded-lg p-8 text-white">
              <h3 className="text-2xl font-bold mb-3">
                Our Story<span className="text-mccain-yellow">.</span>
              </h3>
              <p className="text-white/80 mb-4">
                Read all about the first fifty years of the McCain story by downloading this free exciting ebook!
              </p>
              <Link
                href="https://www.mccain.com/media/1251/mccain-foods-limitedfrom-the-ground-up.pdf"
                target="_blank"
                className="inline-block bg-white text-mccain-green font-semibold px-6 py-2 rounded text-sm hover:bg-mccain-yellow hover:text-mccain-dark transition-colors"
              >
                Download ebook
              </Link>
            </section>
          </div>

          <SidePanel
            relatedLinks={[
              { label: "Our Passion for Food", href: "/about-us/our-passion-for-food" },
              { label: "Leadership", href: "/about-us/our-leadership" },
              { label: "Purpose & Values", href: "/about-us" },
            ]}
          />
        </div>
      </div>
    </>
  );
}
