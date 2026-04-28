import Image from "next/image";
import Link from "next/link";
import FeatureCard from "@/app/components/FeatureCard";
import NewsCard from "@/app/components/NewsCard";
import EmployeeSection from "@/app/components/EmployeeSection";
import { newsArticles } from "@/app/data/news";

export default function HomePage() {
  return (
    <>
      {/* ─── Hero ─── */}
      <section className="relative w-full min-h-[85svh] sm:min-h-[600px] md:min-h-[700px] overflow-hidden bg-mccain-dark flex flex-col justify-end">
        {/* Background image with slow zoom */}
        <Image
          src="https://www.mccain.com/media/4484/home-page-image.jpg"
          alt="We are McCain"
          fill
          className="object-cover scale-105 animate-[heroZoom_25s_ease-in-out_infinite_alternate]"
          priority
        />

        {/* Multi-layer gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/30 to-black/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-mccain-green/25 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-tl from-mccain-yellow/10 via-transparent to-transparent" />

        {/* Top accent line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-mccain-green via-mccain-yellow to-mccain-green z-20" />

        {/* Geometric decorative elements */}
        <div className="absolute top-20 right-10 sm:top-32 sm:right-20 w-40 h-40 sm:w-72 sm:h-72 rounded-full border border-white/[0.06] animate-[heroFadeIn_2s_ease-out_0.5s_both]" />
        <div className="absolute top-28 right-16 sm:top-44 sm:right-32 w-24 h-24 sm:w-48 sm:h-48 rounded-full border border-white/[0.04] animate-[heroFadeIn_2s_ease-out_0.8s_both]" />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 sm:w-96 sm:h-96 rounded-full bg-mccain-green/[0.08] blur-3xl" />

        {/* Main content */}
        <div className="relative flex-1 flex items-end z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full pb-8 sm:pb-10 pt-28 sm:pt-32">
            <div className="max-w-2xl">
              {/* Animated badge */}
              <div className="animate-[heroSlideUp_0.8s_ease-out_0.2s_both] inline-flex items-center gap-2.5 bg-white/[0.08] backdrop-blur-md border border-white/15 rounded-full px-4 py-2 sm:px-5 sm:py-2.5 mb-5 sm:mb-8 animate-[badgeGlow_3s_ease-in-out_infinite]">
                <div className="relative">
                  <span className="w-2 h-2 bg-mccain-yellow rounded-full block" />
                  <span className="absolute inset-0 w-2 h-2 bg-mccain-yellow rounded-full animate-ping opacity-75" />
                </div>
                <span className="text-[10px] sm:text-xs font-semibold text-white/90 uppercase tracking-[0.2em]">
                  Global Leader in Frozen Foods
                </span>
              </div>

              {/* Heading */}
              <div className="animate-[heroSlideUp_0.8s_ease-out_0.4s_both]">
                <p className="text-sm sm:text-base md:text-lg text-white/50 font-medium tracking-wide mb-2 sm:mb-3">
                  Welcome to
                </p>
                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[6.5rem] font-black text-white leading-[0.9] tracking-tight">
                  McCain
                  <span className="text-mccain-yellow">.</span>
                </h1>
                {/* Decorative yellow underline */}
                <div className="mt-3 sm:mt-4 flex items-center gap-3">
                  <div className="h-1 w-16 sm:w-24 bg-gradient-to-r from-mccain-yellow to-mccain-yellow/0 rounded-full" />
                  <div className="h-1 w-3 bg-mccain-yellow/40 rounded-full" />
                </div>
              </div>

              {/* Subtitle */}
              <p className="animate-[heroSlideUp_0.8s_ease-out_0.6s_both] mt-5 sm:mt-7 text-base sm:text-lg md:text-xl text-white/70 max-w-lg leading-relaxed">
                Celebrating real connections through delicious, planet-friendly food — in over{" "}
                <span className="text-mccain-yellow font-semibold">160 countries</span> worldwide.
              </p>

              {/* CTAs */}
              <div className="animate-[heroSlideUp_0.8s_ease-out_0.8s_both] mt-7 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link
                  href="https://careers.mccain.com/"
                  target="_blank"
                  className="group relative inline-flex items-center justify-center gap-2.5 bg-mccain-yellow hover:bg-yellow-400 text-mccain-dark font-bold px-7 sm:px-9 py-4 sm:py-4.5 rounded-2xl transition-all text-sm uppercase tracking-wider shadow-xl shadow-mccain-yellow/25 active:scale-[0.97] overflow-hidden"
                >
                  <span className="relative z-10">Join Our Team</span>
                  <svg className="relative z-10 w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
                </Link>
                <Link
                  href="/about-us"
                  className="group inline-flex items-center justify-center gap-2.5 bg-white/[0.08] hover:bg-white/15 backdrop-blur-md border border-white/20 hover:border-white/40 text-white font-semibold px-7 sm:px-9 py-4 sm:py-4.5 rounded-2xl transition-all text-sm uppercase tracking-wider active:scale-[0.97]"
                >
                  Our Purpose
                  <svg className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-all group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Stat bar */}
        <div className="relative z-10 pb-4 sm:pb-6 animate-[statSlideUp_0.8s_ease-out_1s_both]">
          <div className="max-w-7xl mx-auto px-3 sm:px-6">
            <div className="bg-white/[0.06] backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-3xl p-3 sm:p-4">
              <div className="grid grid-cols-4 gap-1.5 sm:gap-3">
                {[
                  { value: "$16B", label: "Annual Revenue", icon: "M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
                  { value: "20K+", label: "Team Members", icon: "M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128H5.228A2 2 0 013 17.208V17.128a5.971 5.971 0 00-.786-3.07M10.5 7.5a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" },
                  { value: "160+", label: "Countries", icon: "M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" },
                  { value: "1 in 4", label: "Fries Worldwide", icon: "M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" },
                ].map((stat, idx) => (
                  <div
                    key={stat.label}
                    className="group relative text-center py-3 sm:py-4 px-2 sm:px-4 rounded-xl sm:rounded-2xl hover:bg-white/[0.06] transition-all duration-300 cursor-default"
                    style={{ animationDelay: `${1 + idx * 0.1}s` }}
                  >
                    <div className="hidden sm:flex w-9 h-9 rounded-xl bg-mccain-yellow/10 mx-auto mb-2.5 items-center justify-center group-hover:bg-mccain-yellow/20 transition-colors">
                      <svg className="w-4.5 h-4.5 text-mccain-yellow" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d={stat.icon} />
                      </svg>
                    </div>
                    <p className="text-lg sm:text-2xl md:text-3xl font-black text-white leading-tight tracking-tight">
                      {stat.value}
                    </p>
                    <p className="text-[8px] sm:text-[10px] md:text-xs text-white/40 uppercase tracking-widest mt-0.5 sm:mt-1 font-semibold">
                      {stat.label}
                    </p>
                    {/* Divider (hidden on last) */}
                    {idx < 3 && (
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-8 sm:h-12 bg-white/10 hidden sm:block" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 animate-[heroFadeIn_1s_ease-out_1.5s_both] hidden sm:block">
          <div className="flex flex-col items-center gap-1.5 animate-[scrollBounce_2s_ease-in-out_infinite]">
            <div className="w-5 h-8 rounded-full border-2 border-white/20 flex items-start justify-center p-1">
              <div className="w-1 h-2 bg-white/50 rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* ─── Feature Cards ─── */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 py-12 sm:py-20">
        <div className="flex items-end justify-between mb-6 sm:mb-10">
          <div>
            <div className="inline-flex items-center gap-2 bg-mccain-green/10 rounded-full px-4 py-1.5 mb-3 sm:mb-4">
              <svg className="w-4 h-4 text-mccain-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>
              <span className="text-xs font-bold text-mccain-green uppercase tracking-widest">Explore</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
              Discover McCain<span className="text-mccain-yellow">.</span>
            </h2>
            <p className="text-sm text-gray-500 mt-1 hidden sm:block">Our business, careers, and what makes us different</p>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
          <FeatureCard
            title="Our Business"
            subtitle="Famous for French fries and more!"
            description="Learn about our business, brands, and the food we make for millions every day"
            image="https://www.mccain.com/media/4221/skins-on-french-fries.jpg"
            href="/about-us/our-business-brands"
          />
          <FeatureCard
            title="Careers"
            subtitle="Unlocking your potential"
            description="Discover exciting career opportunities and join a team that celebrates real connections"
            image="https://www.mccain.com/media/3964/mccain-foods-team-member-at-a-conference.jpg"
            href="https://careers.mccain.com/"
          />
        </div>
      </section>

      {/* ─── Podcast CTA ─── */}
      <section className="relative overflow-hidden">
        {/* Layered background */}
        <div className="absolute inset-0 bg-gradient-to-br from-mccain-green via-mccain-green to-mccain-green-dark" />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "24px 24px" }} />
        <div className="absolute -top-32 -right-32 w-80 h-80 sm:w-[500px] sm:h-[500px] rounded-full bg-mccain-yellow/[0.07]" />
        <div className="absolute -bottom-20 -left-20 w-48 h-48 sm:w-72 sm:h-72 rounded-full bg-white/[0.04]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-white/[0.02] hidden md:block" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-14 sm:py-24">
          <div className="flex flex-col md:flex-row items-center gap-10 sm:gap-16">
            {/* Text content */}
            <div className="flex-1 text-white">
              <div className="inline-flex items-center gap-2.5 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 mb-5 sm:mb-6 border border-white/15">
                <div className="w-6 h-6 rounded-full bg-mccain-yellow/20 flex items-center justify-center">
                  <svg className="w-3 h-3 text-mccain-yellow" fill="currentColor" viewBox="0 0 24 24"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3zM8 11a4 4 0 0 0 8 0h2a6 6 0 0 1-5 5.91V20h3v2H8v-2h3v-3.09A6 6 0 0 1 6 11h2z"/></svg>
                </div>
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-white/90">Podcast Series</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-[0.95] tracking-tight">
                Hot Potato<span className="text-mccain-yellow">.</span>
              </h2>

              <div className="mt-3 sm:mt-4 flex items-center gap-2">
                <div className="h-0.5 w-12 bg-mccain-yellow rounded-full" />
                <div className="h-0.5 w-3 bg-mccain-yellow/40 rounded-full" />
              </div>

              <p className="mt-5 sm:mt-6 text-sm sm:text-base text-white/60 max-w-md leading-relaxed">
                Our sustainability podcast exploring the future of food, farming, and our planet. New episodes weekly.
              </p>

              {/* Play button + text CTA */}
              <div className="mt-7 sm:mt-9 flex items-center gap-4">
                <Link
                  href="/sustainability"
                  className="group relative inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white shadow-xl shadow-black/15 hover:bg-mccain-yellow transition-all active:scale-95"
                >
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 text-mccain-green ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                </Link>
                <div>
                  <Link href="/sustainability" className="text-sm sm:text-base font-bold text-white hover:text-mccain-yellow transition-colors">
                    Listen Now
                  </Link>
                  <p className="text-[11px] sm:text-xs text-white/40 mt-0.5">Season 2 available</p>
                </div>
              </div>
            </div>

            {/* Image */}
            <div className="flex-1 w-full relative">
              <div className="relative h-[240px] sm:h-[320px] md:h-[400px] w-full rounded-3xl overflow-hidden shadow-2xl shadow-black/40 ring-1 ring-white/10 group">
                <Image
                  src="https://www.mccain.com/media/4546/mccain_hot_potato_d.jpg"
                  alt="Hot Potato Podcast"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                {/* Floating play icon overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-7 h-7 sm:w-8 sm:h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Social & Sustainability ─── */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 py-12 sm:py-20">
        <div className="flex items-end justify-between mb-6 sm:mb-10">
          <div>
            <div className="inline-flex items-center gap-2 bg-mccain-green/10 rounded-full px-4 py-1.5 mb-3 sm:mb-4">
              <svg className="w-4 h-4 text-mccain-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 00-8.862 12.872M12.75 3.031a9 9 0 016.69 14.036m0 0l-.177-.529A2.25 2.25 0 0017.128 15H16.5l-.324-.324a1.453 1.453 0 00-2.328.377l-.036.073a1.586 1.586 0 01-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438a2.25 2.25 0 01-1.228 2.338 9 9 0 01-5.395-1.437" /></svg>
              <span className="text-xs font-bold text-mccain-green uppercase tracking-widest">Connect</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
              Stay Connected<span className="text-mccain-yellow">.</span>
            </h2>
            <p className="text-sm text-gray-500 mt-1 hidden sm:block">Follow our journey and sustainability commitments</p>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
          <FeatureCard
            title="Social Media"
            subtitle="Keep up-to-date"
            description="Follow @McCain Foods on LinkedIn for the latest news, stories, and career updates"
            image="https://www.mccain.com/media/4222/holding-smartphone.jpg"
            href="https://www.linkedin.com/company/mccainfoods/"
          />
          <FeatureCard
            title="Sustainability"
            subtitle="For generations to come"
            description="Discover our progress and commitments to creating a more sustainable food system"
            image="https://www.mccain.com/media/4224/wind-turbine-in-field.jpg"
            href="/sustainability"
          />
        </div>
      </section>

      {/* ─── Purpose Banner ─── */}
      <section className="relative w-full overflow-hidden group">
        <div className="relative h-[380px] sm:h-[450px] md:h-[540px]">
          <Image
            src="https://www.mccain.com/media/3834/farmer-holding-potatoes-header.png"
            alt="Celebrating real connections"
            fill
            className="object-cover transition-transform duration-[4000ms] group-hover:scale-105"
          />
          {/* Multi-layer gradients */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-br from-mccain-green/20 via-transparent to-transparent" />

          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-1.5 mb-5 sm:mb-6 border border-white/15">
                <svg className="w-3.5 h-3.5 text-mccain-yellow" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg>
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-white/90">Our Purpose</span>
              </div>

              {/* Accent line */}
              <div className="flex items-center gap-2 mb-4 sm:mb-5">
                <div className="h-1 w-10 sm:w-14 bg-mccain-yellow rounded-full" />
                <div className="h-1 w-2 bg-mccain-yellow/40 rounded-full" />
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white leading-[1.1] max-w-lg tracking-tight">
                Celebrating real<br />
                connections through<br />
                delicious food<span className="text-mccain-yellow">.</span>
              </h2>

              <p className="mt-3 sm:mt-4 text-sm text-white/50 max-w-sm leading-relaxed hidden sm:block">
                Building a more sustainable future, from farm to fork.
              </p>

              <Link
                href="/about-us"
                className="group/btn mt-6 sm:mt-8 inline-flex items-center gap-2.5 bg-mccain-green hover:bg-mccain-green-dark text-white font-bold px-7 sm:px-9 py-3.5 sm:py-4 rounded-2xl transition-all text-sm uppercase tracking-wider shadow-xl shadow-mccain-green/30 active:scale-[0.97]"
              >
                Learn More
                <svg className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Customers & Food ─── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-gray-50/50 to-white">
        <div className="absolute -top-40 -left-40 w-80 h-80 rounded-full bg-mccain-yellow/[0.04] blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-3 sm:px-6 py-12 sm:py-20">
          <div className="flex items-end justify-between mb-6 sm:mb-10">
            <div>
              <div className="inline-flex items-center gap-2 bg-mccain-green/10 rounded-full px-4 py-1.5 mb-3 sm:mb-4">
                <svg className="w-4 h-4 text-mccain-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" /></svg>
                <span className="text-xs font-bold text-mccain-green uppercase tracking-widest">Our World</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
                What We Do<span className="text-mccain-yellow">.</span>
              </h2>
              <p className="text-sm text-gray-500 mt-1 hidden sm:block">Great food and lasting partnerships, built for growth</p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
            <FeatureCard
              title="Customers"
              subtitle="Partnership for growth"
              description="Learn how we work with foodservice and retail partners to bring great food to tables everywhere"
              image="https://www.mccain.com/media/3661/chef-cooking.jpg"
              href="/about-us/our-business-brands"
            />
            <FeatureCard
              title="Our Food"
              subtitle="A passion for quality"
              description="Discover our delicious range of food — from iconic fries to appetizers loved around the world"
              image="https://www.mccain.com/media/4225/cooked-potatoes.jpg"
              href="/about-us/our-passion-for-food"
            />
          </div>
        </div>
      </section>

      {/* ─── Career Stories Banner ─── */}
      <section className="relative w-full overflow-hidden group">
        <div className="relative h-[320px] sm:h-[420px] md:h-[500px]">
          <Image
            src="https://www.mccain.com/media/3840/career-stories-mccain-foods.png"
            alt="Career stories"
            fill
            className="object-cover transition-transform duration-[4000ms] group-hover:scale-105"
          />
          {/* Multi-layer gradients */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-br from-mccain-green/15 via-transparent to-transparent" />

          {/* Content -- pushed toward bottom */}
          <div className="absolute inset-0 flex items-end pb-8 sm:pb-14 md:pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-3.5 py-1.5 mb-4 sm:mb-5 border border-white/15">
                <svg className="w-3.5 h-3.5 text-mccain-yellow" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128H5.228A2 2 0 013 17.208V17.128m12 0a5.971 5.971 0 00-.786-3.07M3 17.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952M3 17.128V17.05c0-.487.083-.953.216-1.392" /></svg>
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.15em] text-white/90">Careers</span>
              </div>

              <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white leading-[1.15] max-w-lg tracking-tight">
                Career stories from our teams around the world<span className="text-mccain-yellow">.</span>
              </h2>

              <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-white/50 max-w-sm leading-relaxed hidden sm:block">
                Hear from real people building meaningful careers at McCain.
              </p>

              <Link
                href="https://careers.mccain.com/"
                target="_blank"
                className="group/btn mt-5 sm:mt-7 inline-flex items-center gap-2.5 bg-mccain-green hover:bg-mccain-green-dark text-white font-bold px-6 sm:px-8 py-3 sm:py-3.5 rounded-2xl transition-all text-xs sm:text-sm uppercase tracking-wider shadow-xl shadow-mccain-green/30 active:scale-[0.97]"
              >
                Read Stories
                <svg className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Latest News ─── */}
      <section className="relative overflow-hidden">
        {/* Dark-to-light transition */}
        <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-mccain-dark/5 to-transparent" />
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-mccain-green/[0.03] blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-mccain-yellow/[0.03] blur-3xl translate-y-1/2 -translate-x-1/3" />

        <div className="relative max-w-7xl mx-auto px-3 sm:px-6 pt-10 sm:pt-16 pb-12 sm:pb-20">
          <div className="flex items-end justify-between mb-6 sm:mb-10">
            <div>
              <div className="inline-flex items-center gap-2 bg-mccain-green/10 rounded-full px-4 py-1.5 mb-3 sm:mb-4">
                <svg className="w-4 h-4 text-mccain-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" /></svg>
                <span className="text-xs font-bold text-mccain-green uppercase tracking-widest">News</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
                Latest News<span className="text-mccain-yellow">.</span>
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-1 sm:mt-1.5">Stay updated with the latest from McCain Foods</p>
            </div>
            <Link
              href="/information-centre/news"
              className="hidden sm:inline-flex items-center gap-2 bg-white border border-gray-200 hover:border-mccain-green/30 text-sm font-semibold text-mccain-green hover:text-mccain-green-dark px-5 py-2.5 rounded-xl transition-all shadow-sm hover:shadow-md"
            >
              View all
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
            </Link>
          </div>
          <div className="flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-6">
            {newsArticles.slice(0, 3).map((article, idx) => (
              <NewsCard key={article.slug} {...article} index={idx} />
            ))}
          </div>
          <div className="mt-6 text-center sm:hidden">
            <Link
              href="/information-centre/news"
              className="inline-flex items-center gap-2 bg-mccain-green text-white font-semibold px-6 py-3 rounded-2xl text-sm active:scale-95 transition-all shadow-lg shadow-mccain-green/20"
            >
              View All News
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Instagram CTA ─── */}
      <section className="relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-pink-50" />
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-purple-500/[0.04] blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-pink-500/[0.04] blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-3 sm:px-6 py-10 sm:py-20">
          {/* Mobile: image-first stacked layout / Desktop: side-by-side */}
          <div className="flex flex-col-reverse md:flex-row items-center gap-6 sm:gap-12">
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full px-3.5 py-1.5 mb-4 border border-purple-200/50">
                <svg className="w-3.5 h-3.5 text-purple-600" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-purple-700">Instagram</span>
              </div>
              <h2 className="text-xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-snug tracking-tight">
                Discover more on Instagram<span className="text-mccain-yellow">.</span>
              </h2>
              <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-gray-500 max-w-sm leading-relaxed mx-auto md:mx-0">Follow our journey of celebrating real connections through food.</p>
              <a
                href="https://www.instagram.com/mccainglobal/"
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-5 sm:mt-8 inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-bold px-6 sm:px-8 py-3 sm:py-3.5 rounded-2xl transition-all text-sm shadow-lg shadow-purple-500/20 active:scale-95"
              >
                Follow @McCainGlobal
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
              </a>
            </div>
            <div className="flex-1 w-full relative">
              <div className="relative h-[200px] sm:h-[300px] w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl shadow-purple-200/40 ring-1 ring-purple-100/50 group">
                <Image
                  src="https://www.mccain.com/media/3936/follow-mccain-foods-on-linkedin.jpeg"
                  alt="Follow McCain on Instagram"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-gray-50/50 to-white">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-mccain-green/[0.03] blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-3 sm:px-6 py-10 sm:py-20">
          <div className="text-center mb-6 sm:mb-12">
            <div className="inline-flex items-center gap-2 bg-mccain-green/10 rounded-full px-4 py-1.5 mb-3 sm:mb-4">
              <svg className="w-4 h-4 text-mccain-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" /></svg>
              <span className="text-xs font-bold text-mccain-green uppercase tracking-widest">FAQ</span>
            </div>
            <h2 className="text-xl sm:text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
              How can we help<span className="text-mccain-yellow">?</span>
            </h2>
            <p className="text-xs sm:text-base text-gray-500 mt-1.5 sm:mt-2 max-w-md mx-auto">Find quick answers to your most common questions</p>
          </div>

          {/* FAQ items -- borderless list on mobile, cards on desktop */}
          <div className="sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-4 mb-8 sm:mb-16">
            <div className="divide-y divide-gray-100 sm:contents">
            {[
              { q: "What is it like to work at McCain?", href: "/about-us", icon: "M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z", color: "from-blue-500 to-indigo-500" },
              { q: "How do I make a job application?", href: "https://careers.mccain.com/", icon: "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z", color: "from-emerald-500 to-teal-500" },
              { q: "How do I contact McCain Foods?", href: "/contact", icon: "M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75", color: "from-amber-500 to-orange-500" },
              { q: "Who is your CEO & Board?", href: "/about-us/our-leadership", icon: "M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z", color: "from-purple-500 to-violet-500" },
              { q: "How do I find McCain social media?", href: "/information-centre/news", icon: "M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z", color: "from-pink-500 to-rose-500" },
              { q: "How do I become a Grower?", href: "/about-us", icon: "M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z", color: "from-mccain-green to-emerald-600" },
            ].map((item) => (
              <Link
                key={item.q}
                href={item.href}
                className="group relative flex items-center gap-3 sm:gap-4 py-3 sm:p-5 sm:bg-white sm:border sm:border-gray-100 sm:rounded-2xl sm:hover:border-transparent sm:hover:shadow-xl sm:hover:shadow-gray-200/60 transition-all duration-300 active:scale-[0.98] sm:overflow-hidden"
              >
                {/* Hover gradient bg -- desktop only */}
                <div className="absolute inset-0 bg-gradient-to-br from-mccain-green/[0.03] to-mccain-yellow/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:block" />

                <div className={`relative w-9 h-9 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center flex-shrink-0 shadow-sm`}>
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                  </svg>
                </div>
                <span className="relative flex-1 text-[13px] sm:text-sm font-semibold text-gray-800 group-hover:text-gray-900 leading-snug">{item.q}</span>
                <svg className="w-4 h-4 text-gray-300 group-hover:text-mccain-green flex-shrink-0 transition-colors sm:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
                <span className="text-[11px] text-gray-400 group-hover:text-mccain-green font-medium items-center gap-1 transition-colors hidden sm:flex">
                  <svg className="w-3 h-3 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
                </span>
              </Link>
            ))}
            </div>
          </div>

          {/* Audience Links -- horizontal scroll on mobile, grid on desktop */}
          <div className="flex gap-3 overflow-x-auto no-scrollbar -mx-3 px-3 pb-1 sm:mx-0 sm:px-0 sm:pb-0 sm:grid sm:grid-cols-3 lg:grid-cols-5 sm:gap-4">
            {[
              { label: "For customers", href: "/about-us/our-business-brands", icon: "M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.15c0 .415.336.75.75.75z", desc: "Foodservice & retail" },
              { label: "For candidates", href: "https://careers.mccain.com/", icon: "M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z", desc: "Join our team" },
              { label: "For journalists", href: "/information-centre/news", icon: "M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z", desc: "Media & press" },
              { label: "For farmers", href: "/about-us", icon: "M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z", desc: "Growers & farming" },
              { label: "For community", href: "/sustainability", icon: "M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 00-8.862 12.872M12.75 3.031a9 9 0 016.69 14.036m0 0l-.177-.529A2.25 2.25 0 0017.128 15H16.5l-.324-.324a1.453 1.453 0 00-2.328.377l-.036.073a1.586 1.586 0 01-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438a2.25 2.25 0 01-1.228 2.338 9 9 0 01-5.395-1.437", desc: "Sustainability" },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="group relative flex-shrink-0 w-[130px] sm:w-auto flex flex-col items-center text-center p-4 sm:p-6 bg-gradient-to-br from-mccain-green to-mccain-green-dark rounded-2xl text-white overflow-hidden transition-all duration-300 active:scale-[0.97] shadow-lg shadow-mccain-green/20 hover:shadow-xl hover:shadow-mccain-green/30 hover:-translate-y-1"
              >
                {/* Decorative glow */}
                <div className="absolute inset-0 bg-gradient-to-t from-white/0 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center mb-2.5 sm:mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:bg-white/20">
                  <svg className="w-5 h-5 sm:w-7 sm:h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                  </svg>
                </div>
                <span className="relative text-[11px] sm:text-sm font-bold leading-tight">{item.label}</span>
                <span className="relative text-[9px] sm:text-[11px] text-white/60 mt-0.5 font-medium">{item.desc}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Application Status ─── */}
      <EmployeeSection />
    </>
  );
}
