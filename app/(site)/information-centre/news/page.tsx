import Link from "next/link";
import HeroBanner from "@/app/components/HeroBanner";
import SidePanel from "@/app/components/SidePanel";
import { newsArticles } from "@/app/data/news";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Latest News | McCain Foods",
};

export default function NewsPage() {
  return (
    <>
      <HeroBanner
        title="Latest News"
        backgroundImage="https://www.mccain.com/media/3082/black-header.jpg"
      />

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="space-y-8">
              {newsArticles.map((article) => (
                <article
                  key={article.slug}
                  id={article.slug}
                  className="border-b border-gray-200 pb-8 last:border-0"
                >
                  <p className="text-sm text-mccain-gray-dark mb-2">{article.date}</p>
                  <h2 className="text-xl font-bold text-mccain-dark hover:text-mccain-green transition-colors leading-snug mb-3">
                    <Link href={`/information-centre/news#${article.slug}`}>
                      {article.title}
                    </Link>
                  </h2>
                  <p className="text-sm text-mccain-gray-dark leading-relaxed">{article.excerpt}</p>
                  <Link
                    href={`/information-centre/news#${article.slug}`}
                    className="inline-block mt-3 text-sm font-semibold text-mccain-green hover:text-mccain-green-dark transition-colors"
                  >
                    Read more &rarr;
                  </Link>
                </article>
              ))}
            </div>

            {/* Pagination placeholder */}
            <div className="flex items-center gap-2 mt-10">
              <span className="w-8 h-8 flex items-center justify-center bg-mccain-green text-white rounded text-sm font-bold">
                1
              </span>
              {[2, 3, 4, 5].map((page) => (
                <span
                  key={page}
                  className="w-8 h-8 flex items-center justify-center bg-mccain-gray text-mccain-dark rounded text-sm hover:bg-mccain-green hover:text-white transition-colors cursor-pointer"
                >
                  {page}
                </span>
              ))}
            </div>
          </div>

          <SidePanel
            relatedLinks={[
              { label: "McCain on LinkedIn", href: "https://www.linkedin.com/company/mccain-foods" },
              { label: "Contact Us", href: "/contact" },
            ]}
          />
        </div>
      </div>
    </>
  );
}
