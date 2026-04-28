import Link from "next/link";

export default function InviteNotFound() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-4 py-16 text-center">
      <div className="max-w-md">
        <h1 className="text-2xl font-bold text-gray-900">Link not available</h1>
        <p className="mt-3 text-gray-600 leading-relaxed">
          This invitation link is invalid or has already been used. If you believe this is a mistake, please reach out
          using the contact options on our main site.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center justify-center rounded-2xl bg-mccain-green px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-mccain-green/20 hover:bg-mccain-green-dark transition-colors"
        >
          Back to homepage
        </Link>
      </div>
    </div>
  );
}
