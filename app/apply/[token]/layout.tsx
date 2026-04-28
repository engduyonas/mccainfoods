export default function ApplyTokenLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-dvh bg-gradient-to-br from-slate-50 via-white to-stone-50 text-gray-900">
      {children}
    </div>
  );
}
