"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async () => {
    setLoading(true);
    setError("");

    try {
      if (password.trim().length < 4) {
        setError("Incorrect password.");
        return;
      }

      window.localStorage.setItem("dn_admin_unlocked_v1", "true");
      router.replace("/admin");
      router.refresh();
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen px-6 md:px-16 py-20">
      <div className="max-w-xl mx-auto rounded-2xl border border-[#2A0E61] bg-[#1a1c24e6] p-8">
        <h1 className="text-3xl text-white font-bold">Admin Login</h1>
        <p className="text-gray-300 mt-3">Enter any password (4+ chars) to unlock local admin.</p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-5 w-full rounded-lg border border-[#2A0E61] bg-[#030014CC] text-gray-200 p-3"
          placeholder="Admin password"
        />
        <div className="mt-4 flex gap-3">
          <button
            onClick={login}
            disabled={loading}
            className="py-2 px-4 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold disabled:opacity-60"
          >
            {loading ? "Unlocking..." : "Unlock Admin"}
          </button>
          <Link href="/" className="py-2 px-4 rounded-lg border border-[#2A0E61] text-white">
            Back
          </Link>
        </div>
        {error && <p className="mt-4 text-red-300">{error}</p>}
      </div>
    </main>
  );
}
