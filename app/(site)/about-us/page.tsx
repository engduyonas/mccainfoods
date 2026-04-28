import HeroBanner from "@/app/components/HeroBanner";
import ValueCard from "@/app/components/ValueCard";
import SidePanel from "@/app/components/SidePanel";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Purpose & Values | McCain Foods",
};

export default function AboutUsPage() {
  return (
    <>
      <HeroBanner
        title="Our Purpose & Values"
        backgroundImage="https://www.mccain.com/media/4379/our-leadership-header-d.jpg"
      />

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Our Purpose */}
            <section>
              <h2 className="text-3xl font-bold text-mccain-dark mb-4">
                Our Purpose<span className="text-mccain-yellow">.</span>
              </h2>
              <p className="text-lg font-medium text-mccain-green italic mb-4">
                Celebrating real connections, through delicious, planet-friendly food.
              </p>
              <p className="text-mccain-gray-dark leading-relaxed">
                We know the importance that food plays in people&apos;s lives &ndash; the power it has to bring people,
                families and communities together. That&apos;s why our purpose brings together all the things which we
                value as a company &ndash; &lsquo;Celebrating real connections through delicious, planet-friendly
                food&rsquo;. Making a difference to today, tomorrow and for generations to come.
              </p>
              <p className="text-mccain-gray-dark leading-relaxed mt-4">
                We do this by succeeding together with our teams, business and community partners around the world &ndash;
                because we know when we work and grow together, we succeed together.
              </p>
            </section>

            {/* Our Values */}
            <section>
              <h2 className="text-3xl font-bold text-mccain-dark mb-4">
                Our Values<span className="text-mccain-yellow">.</span>
              </h2>
              <p className="text-mccain-gray-dark leading-relaxed mb-8">
                McCain Foods is proud to be a family and values-driven company. Our values are integral to our culture,
                helping to shape how we operate, how we work together and the choices we make. They are a big part of
                what makes us unique.
              </p>
              <p className="text-mccain-gray-dark leading-relaxed mb-8">
                Learn about our four values: <strong>Family, Authentic, Trusted, Quality.</strong>
              </p>

              <div className="grid sm:grid-cols-2 gap-6">
                <ValueCard
                  title="Family"
                  subtitle="Be part of our family."
                  description="We know that nothing matters more in life than family. We are proud to be a family company, and we take care of business (and each other) like a family. Above all, the health and safety of our people, always comes first."
                />
                <ValueCard
                  title="Authentic"
                  subtitle="Be your authentic self."
                  description="We're a diverse team across six continents, who collaborate and drive for results together as ONE team. We're shaping an inclusive culture - a place where everyone can be themselves, have the courage to speak up, have their ideas heard, and feel that their contributions count."
                />
                <ValueCard
                  title="Trusted"
                  subtitle="Be a trusted partner."
                  description="McCain is built on relationships and real connections. With each other, farmers, customers, communities and beyond. We take accountability for driving results and show resilience in any situation."
                />
                <ValueCard
                  title="Quality"
                  subtitle="Be committed to quality."
                  description="From the food we make to the work we do, we take pride in delivering consistent quality everyday. Because that's what leaders do."
                />
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <SidePanel
            relatedLinks={[
              { label: "Passion for Food", href: "/about-us/our-passion-for-food" },
              { label: "Careers", href: "https://careers.mccain.com/" },
            ]}
          />
        </div>
      </div>
    </>
  );
}
