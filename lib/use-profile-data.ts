"use client";

import { useEffect, useState } from "react";

import {
  defaultProfileData,
  PROFILE_STORAGE_KEY,
  type ProfileData,
} from "@/lib/profile";

export function useProfileData() {
  const [profile, setProfile] = useState<ProfileData>(defaultProfileData);

  useEffect(() => {
    const raw = window.localStorage.getItem(PROFILE_STORAGE_KEY);
    if (!raw) return;

    try {
      const parsed = JSON.parse(raw) as ProfileData & { phone?: string };
      const normalized: ProfileData = {
        ...defaultProfileData,
        ...parsed,
        phoneNumbers:
          Array.isArray(parsed.phoneNumbers) && parsed.phoneNumbers.length > 0
            ? parsed.phoneNumbers
            : parsed.phone
              ? [parsed.phone]
              : defaultProfileData.phoneNumbers,
      };
      setProfile(normalized);
    } catch {
      window.localStorage.removeItem(PROFILE_STORAGE_KEY);
    }
  }, []);

  const saveProfile = (next: ProfileData) => {
    setProfile(next);
    window.localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(next));
  };

  const resetProfile = () => {
    setProfile(defaultProfileData);
    window.localStorage.removeItem(PROFILE_STORAGE_KEY);
  };

  return { profile, saveProfile, resetProfile };
}
