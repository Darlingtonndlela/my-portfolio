"use client";

import { useEffect, useState } from "react";

import {
  defaultProfileData,
  type ProfileData,
} from "@/lib/profile";

export function useProfileData() {
  const [profile, setProfile] = useState<ProfileData>(defaultProfileData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/profile')
      .then(res => res.json())
      .then((data: ProfileData) => {
        setProfile(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const saveProfile = async (next: ProfileData) => {
    setProfile(next);
    try {
      await fetch('/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(next),
      });
    } catch (error) {
      console.error('Failed to save profile:', error);
    }
  };

  const resetProfile = () => {
    setProfile(defaultProfileData);
    // Optionally reset on server
  };

  return { profile, saveProfile, resetProfile, loading };
}
