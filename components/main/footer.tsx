"use client";
import Link from "next/link";
import { useProfileData } from "@/lib/use-profile-data";

export const Footer = () => {
  const { profile } = useProfileData();

  return (
    <div className="w-full h-full bg-transparent text-gray-200 shadow-lg p-[15px]">
      <div className="w-full flex flex-col items-center justify-center m-auto">
        <div className="w-full h-full flex flex-row items-center justify-center flex-wrap gap-5 mb-4">
          <Link href={`mailto:${profile.email}`} className="hover:text-cyan-300">
            {profile.email}
          </Link>
          <span className="text-gray-500">|</span>
          <span>{profile.phoneNumbers.join(" | ")}</span>
          <span className="text-gray-500">|</span>
          <Link href="/admin" className="hover:text-cyan-300">
            Admin Panel
          </Link>
        </div>

        <div className="mb-[20px] text-[15px] text-center">
          &copy; {profile.name} {new Date().getFullYear()}. All rights reserved.
        </div>
      </div>
    </div>
  );
};
