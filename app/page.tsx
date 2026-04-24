"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import { useProfileData } from "@/lib/use-profile-data";

const TAB_KEYS = ["about", "resume", "portfolio", "contact"] as const;
type TabKey = (typeof TAB_KEYS)[number];

export default function Home() {
  const { profile } = useProfileData();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabKey>("about");
  const [secretTapCount, setSecretTapCount] = useState(0);

  const allAchievements = useMemo(
    () => [...profile.awards, ...profile.publications],
    [profile.awards, profile.publications]
  );

  const onSecretTap = () => {
    const nextCount = secretTapCount + 1;
    setSecretTapCount(nextCount);

    if (nextCount >= 5) {
      setSecretTapCount(0);
      router.push("/admin");
      return;
    }

    window.setTimeout(() => {
      setSecretTapCount(0);
    }, 1300);
  };

  const renderEntries = (entries: typeof profile.education) =>
    entries.map((entry) => (
      <article
        key={`${entry.title}-${entry.period ?? ""}`}
        className="rounded-xl border border-[#2A0E61] bg-[#0f111a] p-5"
      >
        <h3 className="text-lg font-semibold text-white">{entry.title}</h3>
        {entry.subtitle && <p className="text-gray-300 mt-1">{entry.subtitle}</p>}
        {entry.period && <p className="text-sm text-gray-400 mt-1">{entry.period}</p>}
        {entry.bullets && entry.bullets.length > 0 && (
          <ul className="mt-3 list-disc list-inside text-gray-300 space-y-1">
            {entry.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        )}
      </article>
    ));

  const renderTabContent = () => {
    if (activeTab === "about") {
      return (
        <div className="space-y-6">
          <section>
            <h2 className="text-3xl font-semibold text-white">{profile.uiText.aboutTitle}</h2>
            <div className="w-12 h-1 bg-yellow-500 rounded mt-3 mb-4" />
            <p className="text-gray-300 leading-7">{profile.summary}</p>
          </section>

          <section>
            <h3 className="text-2xl font-semibold text-white mb-4">{profile.uiText.doingTitle}</h3>
            {/* FIXED LINE BELOW: Removed md:grid-cols-2 to make the box full-width */}
            <div className="grid grid-cols-1 gap-4">
              {profile.aboutHighlights.map((highlight) => (
                <div
                  key={`${highlight.title}-${highlight.description}`}
                  className="rounded-xl border border-[#2A0E61] bg-[#0f111a] p-5"
                >
                  <h4 className="text-white font-semibold">{highlight.title}</h4>
                  <p className="text-gray-300 mt-2">{highlight.description}</p>
                </div>
              ))}
            </div>
          </section>

        </div>
      );
    }

    if (activeTab === "resume") {
      return (
        <div className="space-y-8">
          <section>
            <h3 className="text-2xl font-semibold text-white mb-4">{profile.uiText.educationTitle}</h3>
            <div className="grid gap-4">{renderEntries(profile.education)}</div>
          </section>
          <section>
            <h3 className="text-2xl font-semibold text-white mb-4">{profile.uiText.experienceTitle}</h3>
            <div className="grid gap-4">{renderEntries(profile.experience)}</div>
          </section>
          <section>
            <h3 className="text-2xl font-semibold text-white mb-4">{profile.uiText.certificatesTitle}</h3>
            <div className="rounded-xl border border-[#2A0E61] bg-[#0f111a] p-5">
              {profile.certifications.length > 0 ? (
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  {profile.certifications.map((certification) => (
                    <li key={certification}>{certification}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-400">{profile.uiText.noCertificatesText}</p>
              )}
            </div>
          </section>
        </div>
      );
    }

    if (activeTab === "portfolio") {
      return (
        <div className="space-y-8">
          <section>
            <h3 className="text-2xl font-semibold text-white mb-4">{profile.uiText.achievementsTitle}</h3>
            <div className="grid gap-4">{renderEntries(allAchievements)}</div>
          </section>
          <section>
            <h3 className="text-2xl font-semibold text-white mb-4">{profile.uiText.technicalSkillsTitle}</h3>
            <div className="rounded-xl border border-[#2A0E61] bg-[#0f111a] p-5 text-gray-300 space-y-3">
              <p><span className="text-white font-semibold">Nuclear Security:</span> {profile.technicalSkills.nuclearSecurity.join(", ")}</p>
              <p><span className="text-white font-semibold">Programming:</span> {profile.technicalSkills.programming.join(", ")}</p>
              <p><span className="text-white font-semibold">Tools:</span> {profile.technicalSkills.tools.join(", ")}</p>
            </div>
          </section>
        </div>
      );
    }

    return (
      <section className="rounded-xl border border-[#2A0E61] bg-[#0f111a] p-5 text-gray-300 space-y-2">
        <h3 className="text-2xl font-semibold text-white mb-3">{profile.uiText.contactTitle}</h3>
        <p><span className="text-white font-semibold">{profile.uiText.locationLabel}:</span> {profile.location}</p>
        <p>
          <span className="text-white font-semibold">{profile.uiText.phoneLabel}:</span>{" "}
          {profile.phoneNumbers.join(" | ")}
        </p>
        <p>
          <span className="text-white font-semibold">{profile.uiText.emailLabel}:</span>{" "}
          <a href={`mailto:${profile.email}`} className="hover:text-cyan-300">
            {profile.email}
          </a>
        </p>
        {profile.mephiPortfolioUrl && (
          <p>
            <span className="text-white font-semibold">MEPhI Portfolio:</span>{" "}
            <a
              href={profile.mephiPortfolioUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="hover:text-cyan-300 break-all"
              >
                {profile.mephiPortfolioUrl}
            </a>
          </p>
        )}
      </section>
    );
  };

  return (
    <main className="min-h-screen w-full px-4 md:px-8 py-6 md:py-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">
        <aside className="rounded-2xl border border-[#2A0E61] bg-[#1a1c24e6] p-6 h-fit lg:sticky lg:top-6">
          <button
            onClick={onSecretTap}
            className="rounded-2xl bg-[#232632] p-4 flex justify-center w-full"
            aria-label="Profile image"
            type="button"
          >
            {profile.profileImage ? (
              <Image
                src={profile.profileImage}
                alt={profile.name}
                width={180}
                height={180}
                className="rounded-xl object-cover w-[180px] h-[180px]"
              />
            ) : (
              <div className="w-[180px] h-[180px] rounded-xl bg-[#10131a] border border-[#2A0E61] flex items-center justify-center text-gray-400 text-sm text-center px-4">
                {profile.uiText.missingProfileImageText}
              </div>
            )}
          </button>

          <h1 className="text-white text-3xl font-semibold mt-5">{profile.name}</h1>
          <p className="text-gray-300 mt-2">{profile.focusTitle}</p>

          <div className="mt-6 space-y-3 text-gray-300">
            <p>{profile.email}</p>
            <div>
              {profile.phoneNumbers.map((phone) => (
                <p key={phone}>{phone}</p>
              ))}
            </div>
            <p>{profile.location}</p>
            {profile.mephiPortfolioUrl && (
              <a
                href={profile.mephiPortfolioUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="text-cyan-300 hover:text-cyan-200 break-all"
              >
                {profile.uiText.mephiPortfolioLabel}
              </a>
            )}
          </div>

        </aside>

        <section className="rounded-2xl border border-[#2A0E61] bg-[#1a1c24e6] p-4 md:p-6">
          <div className="flex flex-wrap gap-2 md:gap-3 border-b border-[#2A0E61] pb-4">
            {TAB_KEYS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-md transition ${
                  activeTab === tab
                    ? "bg-[#2b2d37] text-yellow-400"
                    : "bg-transparent text-gray-300 hover:text-white"
                }`}
              >
                {profile.uiText.tabs[tab]}
              </button>
            ))}
          </div>

          <div className="mt-6">{renderTabContent()}</div>
        </section>
      </div>
    </main>
  );
}
