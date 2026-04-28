import Image from "next/image";
import Link from "next/link";
import HeroBanner from "@/app/components/HeroBanner";
import SidePanel from "@/app/components/SidePanel";
import { corporateHQ, regionalOffices } from "@/app/data/offices";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | McCain Foods",
};

export default function ContactPage() {
  return (
    <>
      <HeroBanner
        title="How to contact us"
        backgroundImage="https://www.mccain.com/media/4286/on-smart-phone-header-2.png"
      />

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            {/* Inquiry sections */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-white border rounded-lg p-6 shadow-sm">
                <h2 className="text-xl font-bold text-mccain-dark mb-3">
                  General Inquiries<span className="text-mccain-yellow">.</span>
                </h2>
                <p className="text-sm text-mccain-gray-dark mb-4">
                  If you have any questions about McCain Foods, please get in touch.
                </p>
                <Link
                  href="/contact"
                  className="inline-block bg-mccain-green hover:bg-mccain-green-dark text-white font-semibold px-5 py-2 rounded text-sm transition-colors"
                >
                  Contact Us
                </Link>
              </div>

              <div className="bg-white border rounded-lg p-6 shadow-sm">
                <h2 className="text-xl font-bold text-mccain-dark mb-3">
                  Media Inquiries<span className="text-mccain-yellow">.</span>
                </h2>
                <p className="text-sm text-mccain-gray-dark mb-2">
                  <strong>For Canadian Media Inquiries:</strong>
                </p>
                <p className="text-sm text-mccain-gray-dark mb-4">
                  Please contact us at media@mccain.ca
                </p>
                <Link
                  href="/contact"
                  className="inline-block bg-mccain-green hover:bg-mccain-green-dark text-white font-semibold px-5 py-2 rounded text-sm transition-colors"
                >
                  Contact Us
                </Link>
              </div>

              <div className="bg-white border rounded-lg p-6 shadow-sm">
                <h2 className="text-xl font-bold text-mccain-dark mb-3">
                  Career Inquiries<span className="text-mccain-yellow">.</span>
                </h2>
                <p className="text-sm text-mccain-gray-dark mb-4">
                  Please check out our Careers pages for more information on jobs at McCain Foods.
                </p>
                <Link
                  href="https://careers.mccain.com/"
                  target="_blank"
                  className="inline-block bg-mccain-green hover:bg-mccain-green-dark text-white font-semibold px-5 py-2 rounded text-sm transition-colors"
                >
                  Careers FAQs
                </Link>
              </div>

              <div className="bg-white border rounded-lg p-6 shadow-sm">
                <h2 className="text-xl font-bold text-mccain-dark mb-3">
                  Search for a Role<span className="text-mccain-yellow">.</span>
                </h2>
                <p className="text-sm text-mccain-gray-dark mb-4">
                  Interested in applying for a role in McCain Foods? Start your search now!
                </p>
                <Link
                  href="https://careers.mccain.com/"
                  target="_blank"
                  className="inline-block bg-mccain-green hover:bg-mccain-green-dark text-white font-semibold px-5 py-2 rounded text-sm transition-colors"
                >
                  Search &amp; Apply
                </Link>
              </div>
            </div>

            {/* Corporate HQ */}
            <section>
              <h2 className="text-2xl font-bold text-mccain-dark mb-6">
                Corporate Head Offices<span className="text-mccain-yellow">.</span>
              </h2>
              <div className="bg-mccain-gray rounded-lg p-6">
                <h3 className="font-bold text-mccain-dark">{corporateHQ.company}</h3>
                {corporateHQ.address.map((line, i) => (
                  <p key={i} className="text-sm text-mccain-gray-dark">{line}</p>
                ))}
                {corporateHQ.tel && (
                  <p className="text-sm text-mccain-gray-dark mt-1">Tel: {corporateHQ.tel}</p>
                )}
                {corporateHQ.website && (
                  <a
                    href={corporateHQ.website}
                    className="text-sm text-mccain-green hover:text-mccain-green-dark font-semibold mt-1 block"
                  >
                    {corporateHQ.website}
                  </a>
                )}
              </div>
            </section>

            {/* Regional Offices */}
            <section>
              <h2 className="text-2xl font-bold text-mccain-dark mb-6">
                Regional Head Offices<span className="text-mccain-yellow">.</span>
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {regionalOffices.map((office) => (
                  <div key={office.region} className="bg-white border rounded-lg p-5">
                    <h3 className="text-sm font-bold text-mccain-green uppercase tracking-wide mb-2">
                      {office.region}
                    </h3>
                    <p className="font-semibold text-sm text-mccain-dark">{office.company}</p>
                    {office.address.map((line, i) => (
                      <p key={i} className="text-xs text-mccain-gray-dark">{line}</p>
                    ))}
                    {office.tel && (
                      <p className="text-xs text-mccain-gray-dark mt-1">Tel: {office.tel}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </div>

          <SidePanel
            relatedLinks={[
              { label: "FAQs", href: "/information-centre/news" },
              { label: "About Us", href: "/about-us" },
              { label: "Latest News", href: "/information-centre/news" },
            ]}
          />
        </div>
      </div>
    </>
  );
}
