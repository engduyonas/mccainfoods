import Link from "next/link";

export default function RegistrationInfoPage() {
  return (
    <div className="relative overflow-hidden">
      <div className="max-w-3xl xl:max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <p className="text-xs font-bold uppercase tracking-widest text-mccain-green mb-3">
          Registration
        </p>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
          Apply with a personal link
        </h1>
        <p className="mt-4 text-gray-600 text-[17px] sm:text-lg leading-relaxed">
          Participation in our application process is by invitation only. Registration is not available on a public URL.
          You will receive a unique, confidential link from our team — please open that message and use only the link we send you.
          Each link works once per completed submission.
        </p>

        <div className="mt-10 rounded-3xl border border-gray-100 bg-white/80 backdrop-blur-sm shadow-xl shadow-gray-200/40 p-6 sm:p-8 space-y-4">
          <h2 className="text-sm font-bold text-gray-900">What happens next?</h2>
          <ul className="space-y-3 text-sm sm:text-[15px] text-gray-600">
            <li className="flex gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-mccain-green/10 text-xs font-bold text-mccain-green">
                1
              </span>
              When you receive your personal link, open it on any modern browser. The page will prompt you for your details
              and identification photo — there is nothing to guess or sign up for on this website without that link.
            </li>
            <li className="flex gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-mccain-green/10 text-xs font-bold text-mccain-green">
                2
              </span>
              After you submit, your invitation is redeemed and the same link cannot be reused. If something went wrong,
              please ask your contact at McCain for a new invitation.
            </li>
          </ul>
        </div>

        <div className="mt-12 flex flex-wrap gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-2xl bg-mccain-green hover:bg-mccain-green-dark text-white px-6 py-3.5 text-sm font-semibold shadow-lg shadow-mccain-green/20 transition-colors"
          >
            Back to homepage
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-2xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-800 px-6 py-3.5 text-sm font-semibold transition-colors"
          >
            Contact us
          </Link>
        </div>
      </div>
    </div>
  );
}
