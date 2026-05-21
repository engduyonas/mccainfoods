"use client";

import { useState } from "react";
import Image from "next/image";
import { employeePhotoUrl } from "@/lib/employeePhoto";

function initialsFromName(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

interface EmployeePhotoProps {
  id: string;
  fullName: string;
  className?: string;
  sizes?: string;
}

export default function EmployeePhoto({ id, fullName, className = "object-cover", sizes }: EmployeePhotoProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-mccain-green/20 to-mccain-green/40">
        <span className="text-2xl sm:text-3xl font-bold text-mccain-green/80 select-none" aria-hidden>
          {initialsFromName(fullName)}
        </span>
      </div>
    );
  }

  return (
    <Image
      src={employeePhotoUrl(id)}
      alt=""
      fill
      unoptimized
      sizes={sizes}
      className={className}
      onError={() => setFailed(true)}
    />
  );
}
