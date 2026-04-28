import Image from "next/image";
import Link from "next/link";
import HeroBanner from "@/app/components/HeroBanner";
import SidePanel from "@/app/components/SidePanel";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Business & Brands | McCain Foods",
};

const stats = [
  { value: "$16B", label: "global revenues in Canadian dollars", image: "https://www.mccain.com/media/4402/image-sf-potato-02.png" },
  { value: "20,000+", label: "team members worldwide", image: "https://www.mccain.com/media/4401/image-sf-potato-01.png" },
  { value: "160", label: "countries where our products are sold", image: "https://www.mccain.com/media/1030/image-sf-potato-03.png" },
  { value: "1 in 4", label: "fries in the world is a McCain Foods fry", image: "https://www.mccain.com/media/1031/image-sf-potato-04.png" },
];

const companies = [
  {
    name: "McCain Foods",
    desc: "Specializes in a wide variety of prepared potato products and appetizers, operating within both the foodservice and retail channels.",
    logo: "https://www.mccain.com/media/2754/mccain-foods-corporate-logo.png",
  },
  {
    name: "Van Geloven",
    desc: "Supplies a wide range of frozen convenience snacks and foods across a variety of customer channels.",
    logo: "https://www.mccain.com/media/2963/van-geloven-logo.jpg",
  },
  {
    name: "Lutosa",
    desc: "A worldwide provider of fine potato products that specializes in pre-fried French fries, frozen potato specialties and dehydrated potato flakes.",
    logo: "https://www.mccain.com/media/3531/lutosa-logo.jpg",
  },
  {
    name: "Day & Ross",
    desc: "Provides integrated transportation and logistics services.",
    logo: "https://www.mccain.com/media/3183/day-and-ross-corporate-logo.jpg",
  },
];

const foodserviceBrands = [
  "https://www.mccain.com/media/3040/mccain-foodservice-logo.jpg",
  "https://www.mccain.com/media/2718/mccain-retail-logo.jpg",
  "https://www.mccain.com/media/2724/brew-city-logo.jpg",
  "https://www.mccain.com/media/3850/pickers-logo.jpg",
  "https://www.mccain.com/media/2726/harvest-splendor-logo.jpg",
  "https://www.mccain.com/media/2723/anchor-logo.jpg",
  "https://www.mccain.com/media/2722/ad-van-geloven-snacks-logo.jpg",
  "https://www.mccain.com/media/2725/de-bourgondier-logo.jpg",
  "https://www.mccain.com/media/3923/lutosa-logo.jpg",
  "https://www.mccain.com/media/2733/moores-logo.jpg",
  "https://www.mccain.com/media/2719/mora-logo.jpg",
  "https://www.mccain.com/media/2729/ore-ida-logo.jpg",
];

const retailBrands = [
  "https://www.mccain.com/media/2718/mccain-retail-logo.jpg",
  "https://www.mccain.com/media/2724/brew-city-logo.jpg",
  "https://www.mccain.com/media/3850/pickers-logo.jpg",
  "https://www.mccain.com/media/2717/hebro-logo.jpg",
  "https://www.mccain.com/media/2719/mora-logo.jpg",
];

export default function BusinessBrandsPage() {
  return (
    <>
      <HeroBanner
        title="Our Business & Brands"
        backgroundImage="https://www.mccain.com/media/4378/business-and-brands-header-d.jpg"
      />

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Intro */}
        <p className="text-lg text-mccain-gray-dark leading-relaxed max-w-4xl mb-12">
          As a privately owned family company with sales in over 160 countries, our values are at the heart of
          everything we do. Our product quality, people and customer dedication have helped us achieve global
          annual revenues of $16 billion Canadian dollars.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat) => (
            <div key={stat.value} className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-mccain-green">{stat.value}</p>
              <div className="relative w-14 h-14 mx-auto my-3">
                <Image src={stat.image} alt={stat.label} fill className="object-contain" />
              </div>
              <p className="text-sm text-mccain-gray-dark">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-16">
            {/* Global Presence */}
            <section>
              <h2 className="text-3xl font-bold text-mccain-dark mb-4">
                Our Global Presence<span className="text-mccain-yellow">.</span>
              </h2>
              <p className="text-mccain-gray-dark leading-relaxed">
                McCain Foods is a global business with presence across Canada, US, Brazil, Argentina, Colombia, UK,
                Ireland, France, Belgium, Netherlands, Poland, Australia, New Zealand, South Africa, India, Japan,
                Malaysia, China&hellip;and more. We have a significant food production network with a total of 49
                production facilities globally, 95% located in rural communities.
              </p>
            </section>

            {/* Our Company */}
            <section>
              <h2 className="text-3xl font-bold text-mccain-dark mb-6">
                Our Company<span className="text-mccain-yellow">.</span>
              </h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {companies.map((company) => (
                  <div key={company.name} className="bg-white border rounded-lg p-6 shadow-sm">
                    <div className="relative w-full h-16 mb-4">
                      <Image src={company.logo} alt={company.name} fill className="object-contain object-left" />
                    </div>
                    <h3 className="font-bold text-mccain-dark mb-2">{company.name}</h3>
                    <p className="text-sm text-mccain-gray-dark leading-relaxed">{company.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Foodservice */}
            <section>
              <h2 className="text-3xl font-bold text-mccain-dark mb-4">
                Our Foodservice Solutions Business<span className="text-mccain-yellow">.</span>
              </h2>
              <p className="text-mccain-gray-dark leading-relaxed mb-4">
                &ldquo;McCain Foodservice Solutions&rdquo; is an important part of our business &ndash; allowing us to share
                our delicious food anywhere people would like to enjoy them. Whether it&apos;s via a pub, a restaurant,
                fast food or quick-service restaurant (QSR), a deli, a convenience store, or caterer.
              </p>
              <div className="relative h-[300px] rounded-lg overflow-hidden my-6">
                <Image
                  src="https://www.mccain.com/media/3878/mccain-foods-foodservice-serving-food.png"
                  alt="McCain Foodservice"
                  fill
                  className="object-cover"
                />
              </div>
            </section>

            {/* Retail */}
            <section>
              <h2 className="text-3xl font-bold text-mccain-dark mb-4">
                Our Retail Consumer Brand Business<span className="text-mccain-yellow">.</span>
              </h2>
              <p className="text-mccain-gray-dark leading-relaxed mb-4">
                By working with our retail partners, including supermarkets and convenience stores, we are able to
                bring our delicious fries and food offerings to mealtimes around the world. Through our frozen and
                chilled offerings, we help minimize food waste for our customers.
              </p>
              <div className="relative h-[300px] rounded-lg overflow-hidden my-6">
                <Image
                  src="https://www.mccain.com/media/3879/mccain-foods-fries-on-plate.gif"
                  alt="McCain Retail"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            </section>

            {/* Brands */}
            <section>
              <h2 className="text-3xl font-bold text-mccain-dark mb-6">
                Our Brands<span className="text-mccain-yellow">.</span>
              </h2>

              <h3 className="text-xl font-bold text-mccain-dark mb-4">Our Foodservice Brands</h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 mb-10">
                {foodserviceBrands.map((logo, i) => (
                  <div key={i} className="relative h-20 bg-white border rounded p-2">
                    <Image src={logo} alt="Brand logo" fill className="object-contain p-1" />
                  </div>
                ))}
              </div>

              <h3 className="text-xl font-bold text-mccain-dark mb-4">Our Retail Consumer Brands</h3>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
                {retailBrands.map((logo, i) => (
                  <div key={i} className="relative h-20 bg-white border rounded p-2">
                    <Image src={logo} alt="Brand logo" fill className="object-contain p-1" />
                  </div>
                ))}
              </div>
            </section>

            {/* LinkedIn CTA */}
            <section className="relative h-[300px] rounded-lg overflow-hidden">
              <Image
                src="https://www.mccain.com/media/4153/mccain-foods-logo-leaves.jpg"
                alt="Follow us on LinkedIn"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center">
                <div className="px-8">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Hear our latest<br />news on LinkedIn<span className="text-mccain-yellow">.</span>
                  </h3>
                  <Link
                    href="https://www.linkedin.com/company/mccainfoods/"
                    target="_blank"
                    className="inline-block bg-mccain-green hover:bg-mccain-green-dark text-white font-semibold px-6 py-2 rounded text-sm transition-colors mt-3"
                  >
                    Follow Us on LinkedIn @McCain Foods
                  </Link>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <SidePanel
            relatedLinks={[
              { label: "Leadership", href: "/about-us/our-leadership" },
              { label: "Purpose & Values", href: "/about-us" },
            ]}
          />
        </div>
      </div>
    </>
  );
}
