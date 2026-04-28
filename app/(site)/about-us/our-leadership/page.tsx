import HeroBanner from "@/app/components/HeroBanner";
import LeaderCard from "@/app/components/LeaderCard";
import SidePanel from "@/app/components/SidePanel";
import { seniorLeadership, boardMembers } from "@/app/data/leaders";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Leadership | McCain Foods",
};

export default function LeadershipPage() {
  return (
    <>
      <HeroBanner
        title="Our Leadership"
        backgroundImage="https://www.mccain.com/media/4379/our-leadership-header-d.jpg"
      />

      <div className="max-w-7xl mx-auto px-4 py-16">
        <p className="text-lg text-mccain-gray-dark leading-relaxed max-w-4xl mb-12">
          As the Senior Leadership Team, we focus on building and inspiring a culture of collaboration, innovation
          and growth.
        </p>

        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-16">
            {/* Business Structure */}
            <section>
              <h2 className="text-3xl font-bold text-mccain-dark mb-4">
                Our Business Structure<span className="text-mccain-yellow">.</span>
              </h2>
              <p className="text-mccain-gray-dark leading-relaxed mb-4">
                Founded by the McCain family, McCain Foods Limited remains a privately held company. We are led by our
                Global Management Team to deliver our purpose and mission in a way which fits the McCain values.
              </p>
              <p className="text-mccain-gray-dark leading-relaxed mb-4">
                While McCain Foods is a privately held company, our boards have adopted best practices for corporate
                governance. These types of practices ensure that McCain Foods has rigorous oversight of its management
                and operations, as well as benefitting from the strategic guidance of its directors.
              </p>
            </section>

            {/* Board */}
            <section>
              <h2 className="text-2xl font-bold text-mccain-dark mb-4">
                The McCain Operating Company Board
              </h2>
              <ul className="space-y-2">
                {boardMembers.map((member) => (
                  <li key={member} className="flex items-start gap-2 text-mccain-gray-dark">
                    <span className="text-mccain-green mt-1">&bull;</span>
                    {member}
                  </li>
                ))}
              </ul>
            </section>

            {/* Senior Leadership Team */}
            <section>
              <h2 className="text-3xl font-bold text-mccain-dark mb-4">
                The Role of the Senior Leadership Team<span className="text-mccain-yellow">.</span>
              </h2>
              <p className="text-mccain-gray-dark leading-relaxed mb-8">
                Our McCain Foods Senior Leadership Team plays a vital role in shaping our strategy, as well as
                inspiring and driving business day-to-day. They deliver results, champion change, embed our values
                and culture, develop our people and cultivate our future leaders.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
                {seniorLeadership.map((leader) => (
                  <LeaderCard key={leader.name} {...leader} />
                ))}
              </div>
            </section>
          </div>

          <SidePanel
            relatedLinks={[
              { label: "Our Business & Brands", href: "/about-us/our-business-brands" },
              { label: "Purpose & Values", href: "/about-us" },
              { label: "Careers", href: "https://careers.mccain.com/" },
            ]}
          />
        </div>
      </div>
    </>
  );
}
