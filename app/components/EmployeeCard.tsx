import EmployeePhoto from "@/app/components/EmployeePhoto";

interface EmployeeCardProps {
  id: string;
  fullName: string;
  phoneNumber: string;
  passportNumber: string;
  gender: string;
  age: number;
  status: string;
}

const STATUS_CONFIG: Record<string, { label: string; bg: string; text: string; dot: string; border: string; bar: string }> = {
  pending: {
    label: "Pending",
    bg: "bg-amber-50",
    text: "text-amber-700",
    dot: "bg-amber-400 animate-pulse",
    border: "border-amber-200",
    bar: "bg-gradient-to-r from-amber-400 to-amber-300",
  },
  approved: {
    label: "Approved",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    dot: "bg-emerald-500",
    border: "border-emerald-200",
    bar: "bg-gradient-to-r from-emerald-500 to-emerald-400",
  },
  rejected: {
    label: "Rejected",
    bg: "bg-red-50",
    text: "text-red-700",
    dot: "bg-red-500",
    border: "border-red-200",
    bar: "bg-gradient-to-r from-red-500 to-red-400",
  },
};

export default function EmployeeCard({
  id,
  fullName,
  phoneNumber,
  passportNumber,
  gender,
  age,
  status,
}: EmployeeCardProps) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.pending;

  return (
    <div className={`group relative bg-white rounded-xl sm:rounded-2xl overflow-hidden border ${cfg.border} hover:shadow-xl transition-all duration-300 hover:-translate-y-1 active:scale-[0.98]`}>
      {/* Status badge */}
      <div className={`absolute top-2 right-2 sm:top-3 sm:right-3 z-10 flex items-center gap-1 sm:gap-1.5 ${cfg.bg} ${cfg.text} rounded-full px-2 py-0.5 sm:px-2.5 sm:py-0.5 text-[8px] sm:text-[10px] font-bold uppercase tracking-wider border ${cfg.border}`}>
        <span className={`w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full ${cfg.dot}`} />
        {cfg.label}
      </div>

      {/* Photo */}
      <div className="relative h-32 sm:h-48 bg-gradient-to-br from-mccain-gray to-gray-200 overflow-hidden">
        <EmployeePhoto
          id={id}
          fullName={fullName}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-2.5 sm:p-4">
          <h3 className="text-sm sm:text-lg font-bold text-white leading-tight drop-shadow-md truncate">
            {fullName}
          </h3>
        </div>
      </div>

      {/* Info */}
      <div className="p-2.5 sm:p-4 space-y-1.5 sm:space-y-3">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-md sm:rounded-lg bg-mccain-gray flex items-center justify-center flex-shrink-0">
            <svg className="w-3 h-3 sm:w-4 sm:h-4 text-mccain-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[8px] sm:text-[10px] text-gray-400 uppercase tracking-wider font-medium">Gender / Age</p>
            <p className="text-[11px] sm:text-sm font-semibold text-mccain-dark">{gender} <span className="text-gray-400 font-normal">·</span> {age} yrs</p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-md sm:rounded-lg bg-mccain-gray flex items-center justify-center flex-shrink-0">
            <svg className="w-3 h-3 sm:w-4 sm:h-4 text-mccain-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
          </div>
          <div className="min-w-0">
            <p className="text-[8px] sm:text-[10px] text-gray-400 uppercase tracking-wider font-medium">Phone</p>
            <p className="text-[11px] sm:text-sm font-semibold text-mccain-dark truncate">{phoneNumber}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-md sm:rounded-lg bg-mccain-gray flex items-center justify-center flex-shrink-0">
            <svg className="w-3 h-3 sm:w-4 sm:h-4 text-mccain-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
            </svg>
          </div>
          <div className="min-w-0">
            <p className="text-[8px] sm:text-[10px] text-gray-400 uppercase tracking-wider font-medium">Passport</p>
            <p className="text-[11px] sm:text-sm font-semibold text-mccain-dark font-mono tracking-wide truncate">{passportNumber}</p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className={`h-0.5 sm:h-1 w-full ${cfg.bar}`} />
    </div>
  );
}
