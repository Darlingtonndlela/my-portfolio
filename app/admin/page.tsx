"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { defaultProfileData, type ProfileData, type TextEntry } from "@/lib/profile";
import { useProfileData } from "@/lib/use-profile-data";

export default function AdminPage() {
  const { profile, saveProfile, resetProfile } = useProfileData();
  const [unlocked, setUnlocked] = useState(false);
  const [jsonText, setJsonText] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [newAward, setNewAward] = useState<TextEntry>({
    title: "",
    subtitle: "",
    period: "",
  });
  const [newCertificate, setNewCertificate] = useState("");
  const [basicForm, setBasicForm] = useState({
    name: "",
    focusTitle: "",
    location: "",
    phones: "",
    email: "",
    mephiPortfolioUrl: "",
    summary: "",
  });
  const [sectionsForm, setSectionsForm] = useState({
    aboutHighlights: "",
    education: "",
    experience: "",
    publications: "",
    awards: "",
    training: "",
    certifications: "",
    nuclearSecurity: "",
    programming: "",
    tools: "",
  });
  const [uiForm, setUiForm] = useState({
    tabAbout: "",
    tabResume: "",
    tabPortfolio: "",
    tabContact: "",
    aboutTitle: "",
    doingTitle: "",
    certificatesTitle: "",
    educationTitle: "",
    experienceTitle: "",
    achievementsTitle: "",
    technicalSkillsTitle: "",
    contactTitle: "",
    mephiPortfolioLabel: "",
    missingProfileImageText: "",
    noCertificatesText: "",
    locationLabel: "",
    phoneLabel: "",
    emailLabel: "",
  });

  const stringifyEntries = (entries: TextEntry[]) =>
    entries
      .map((entry) =>
        [
          `Title: ${entry.title}`,
          `Subtitle: ${entry.subtitle ?? ""}`,
          `Period: ${entry.period ?? ""}`,
          `Bullets: ${(entry.bullets ?? []).join(" | ")}`,
        ].join("\n")
      )
      .join("\n\n---\n\n");

  const stringifyAboutHighlights = (highlights: ProfileData["aboutHighlights"]) =>
    highlights.map((item) => `${item.title}::${item.description}`).join("\n");

  const parseEntries = (raw: string) =>
    raw
      .split("\n---\n")
      .map((chunk) => chunk.trim())
      .filter(Boolean)
      .map((chunk) => {
        const lines = chunk.split("\n");
        const get = (prefix: string) =>
          lines.find((line) => line.startsWith(prefix))?.replace(prefix, "").trim() ?? "";
        const bullets = get("Bullets:")
          .split("|")
          .map((item) => item.trim())
          .filter(Boolean);

        return {
          title: get("Title:"),
          subtitle: get("Subtitle:") || undefined,
          period: get("Period:") || undefined,
          bullets: bullets.length ? bullets : undefined,
        } satisfies TextEntry;
      })
      .filter((entry) => entry.title);

  const parseAboutHighlights = (raw: string) =>
    raw
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const [title, ...descParts] = line.split("::");
        const description = descParts.join("::").trim();
        return {
          title: title?.trim() ?? "",
          description,
        };
      })
      .filter((item) => item.title && item.description);

  useEffect(() => {
    const isUnlocked = window.localStorage.getItem("dn_admin_unlocked_v1") === "true";
    setUnlocked(isUnlocked);
  }, []);

  useEffect(() => {
    if (!unlocked) return;
    setJsonText(JSON.stringify(profile, null, 2));
    setBasicForm({
      name: profile.name,
      focusTitle: profile.focusTitle,
      location: profile.location,
      phones: profile.phoneNumbers.join("\n"),
      email: profile.email,
      mephiPortfolioUrl: profile.mephiPortfolioUrl ?? "",
      summary: profile.summary,
    });
    setSectionsForm({
      aboutHighlights: stringifyAboutHighlights(profile.aboutHighlights),
      education: stringifyEntries(profile.education),
      experience: stringifyEntries(profile.experience),
      publications: stringifyEntries(profile.publications),
      awards: stringifyEntries(profile.awards),
      training: profile.training.join("\n"),
      certifications: profile.certifications.join("\n"),
      nuclearSecurity: profile.technicalSkills.nuclearSecurity.join("\n"),
      programming: profile.technicalSkills.programming.join("\n"),
      tools: profile.technicalSkills.tools.join("\n"),
    });
    setUiForm({
      tabAbout: profile.uiText.tabs.about,
      tabResume: profile.uiText.tabs.resume,
      tabPortfolio: profile.uiText.tabs.portfolio,
      tabContact: profile.uiText.tabs.contact,
      aboutTitle: profile.uiText.aboutTitle,
      doingTitle: profile.uiText.doingTitle,
      certificatesTitle: profile.uiText.certificatesTitle,
      educationTitle: profile.uiText.educationTitle,
      experienceTitle: profile.uiText.experienceTitle,
      achievementsTitle: profile.uiText.achievementsTitle,
      technicalSkillsTitle: profile.uiText.technicalSkillsTitle,
      contactTitle: profile.uiText.contactTitle,
      mephiPortfolioLabel: profile.uiText.mephiPortfolioLabel,
      missingProfileImageText: profile.uiText.missingProfileImageText,
      noCertificatesText: profile.uiText.noCertificatesText,
      locationLabel: profile.uiText.locationLabel,
      phoneLabel: profile.uiText.phoneLabel,
      emailLabel: profile.uiText.emailLabel,
    });
  }, [profile, unlocked]);

  const logout = () => {
    window.localStorage.removeItem("dn_admin_unlocked_v1");
    window.location.href = "/admin/login";
  };

  const handleSave = () => {
    try {
      const parsed = JSON.parse(jsonText) as ProfileData;
      saveProfile(parsed);
      setIsError(false);
      setMessage("Saved successfully. Refresh the homepage to see updates.");
    } catch {
      setIsError(true);
      setMessage("Invalid JSON format. Please fix it before saving.");
    }
  };

  const saveBasicInfo = () => {
    const next: ProfileData = {
      ...profile,
      name: basicForm.name,
      focusTitle: basicForm.focusTitle,
      location: basicForm.location,
      phoneNumbers: basicForm.phones.split("\n").map((item) => item.trim()).filter(Boolean),
      email: basicForm.email,
      mephiPortfolioUrl: basicForm.mephiPortfolioUrl,
      summary: basicForm.summary,
    };
    saveProfile(next);
    setJsonText(JSON.stringify(next, null, 2));
    setIsError(false);
    setMessage("Basic information saved.");
  };

  const saveAllSections = () => {
    const next: ProfileData = {
      ...profile,
      aboutHighlights: parseAboutHighlights(sectionsForm.aboutHighlights),
      education: parseEntries(sectionsForm.education),
      experience: parseEntries(sectionsForm.experience),
      publications: parseEntries(sectionsForm.publications),
      awards: parseEntries(sectionsForm.awards),
      training: sectionsForm.training.split("\n").map((item) => item.trim()).filter(Boolean),
      certifications: sectionsForm.certifications
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean),
      technicalSkills: {
        nuclearSecurity: sectionsForm.nuclearSecurity
          .split("\n")
          .map((item) => item.trim())
          .filter(Boolean),
        programming: sectionsForm.programming
          .split("\n")
          .map((item) => item.trim())
          .filter(Boolean),
        tools: sectionsForm.tools.split("\n").map((item) => item.trim()).filter(Boolean),
      },
    };

    saveProfile(next);
    setJsonText(JSON.stringify(next, null, 2));
    setIsError(false);
    setMessage("All sections updated.");
  };

  const addCertificate = () => {
    const certificate = newCertificate.trim();
    if (!certificate) {
      setIsError(true);
      setMessage("Certificate text is required.");
      return;
    }

    const next = { ...profile, certifications: [certificate, ...profile.certifications] };
    saveProfile(next);
    setJsonText(JSON.stringify(next, null, 2));
    setNewCertificate("");
    setIsError(false);
    setMessage("Certificate added.");
  };

  const saveUiText = () => {
    const next: ProfileData = {
      ...profile,
      uiText: {
        tabs: {
          about: uiForm.tabAbout,
          resume: uiForm.tabResume,
          portfolio: uiForm.tabPortfolio,
          contact: uiForm.tabContact,
        },
        aboutTitle: uiForm.aboutTitle,
        doingTitle: uiForm.doingTitle,
        certificatesTitle: uiForm.certificatesTitle,
        educationTitle: uiForm.educationTitle,
        experienceTitle: uiForm.experienceTitle,
        achievementsTitle: uiForm.achievementsTitle,
        technicalSkillsTitle: uiForm.technicalSkillsTitle,
        contactTitle: uiForm.contactTitle,
        mephiPortfolioLabel: uiForm.mephiPortfolioLabel,
        missingProfileImageText: uiForm.missingProfileImageText,
        noCertificatesText: uiForm.noCertificatesText,
        locationLabel: uiForm.locationLabel,
        phoneLabel: uiForm.phoneLabel,
        emailLabel: uiForm.emailLabel,
      },
    };
    saveProfile(next);
    setJsonText(JSON.stringify(next, null, 2));
    setIsError(false);
    setMessage("Page labels saved.");
  };

  const addAchievement = () => {
    if (!newAward.title.trim()) {
      setIsError(true);
      setMessage("Achievement title is required.");
      return;
    }

    const item: TextEntry = {
      title: newAward.title.trim(),
      subtitle: newAward.subtitle?.trim() || undefined,
      period: newAward.period?.trim() || undefined,
    };

    const next = { ...profile, awards: [item, ...profile.awards] };
    saveProfile(next);
    setJsonText(JSON.stringify(next, null, 2));
    setNewAward({ title: "", subtitle: "", period: "" });
    setIsError(false);
    setMessage("Achievement added.");
  };

  const onImageUpload = (file: File | undefined) => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === "string" ? reader.result : "";
      const next = { ...profile, profileImage: result };
      saveProfile(next);
      setJsonText(JSON.stringify(next, null, 2));
      setIsError(false);
      setMessage("Profile picture updated.");
    };
    reader.readAsDataURL(file);
  };

  const handleReset = () => {
    resetProfile();
    setJsonText(JSON.stringify(defaultProfileData, null, 2));
    setIsError(false);
    setMessage("Reset to default profile data.");
  };

  if (!unlocked) {
    return (
      <main className="min-h-screen px-6 md:px-16 py-20">
        <div className="max-w-xl mx-auto rounded-2xl border border-[#2A0E61] bg-[#1a1c24e6] p-8">
          <h1 className="text-3xl text-white font-bold">Admin Locked</h1>
          <p className="text-gray-300 mt-3">Unlock admin locally to edit your portfolio data.</p>
          <div className="mt-5">
            <Link href="/admin/login" className="py-2 px-4 rounded-lg border border-[#2A0E61] text-white">
              Go to Login
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-6 md:px-16 py-16">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl text-white font-bold">Admin Panel</h1>
        <p className="text-gray-300 mt-3">
          Update everything here. Data is saved in your browser local storage.
        </p>

        <div className="mt-6 flex flex-wrap gap-3 items-center">
          <button
            onClick={handleSave}
            className="py-2 px-4 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold"
          >
            Save Changes
          </button>
          <button
            onClick={handleReset}
            className="py-2 px-4 rounded-lg border border-[#2A0E61] text-white"
          >
            Reset Default
          </button>
          <Link href="/" className="py-2 px-4 rounded-lg border border-[#2A0E61] text-white">
            Back to Portfolio
          </Link>
          <button onClick={logout} className="py-2 px-4 rounded-lg border border-[#2A0E61] text-white">
            Logout
          </button>
        </div>

        {message && (
          <p className={`mt-4 ${isError ? "text-red-300" : "text-green-300"}`}>{message}</p>
        )}

        <section className="mt-6 rounded-xl border border-[#2A0E61] bg-[#1a1c24e6] p-5">
          <h2 className="text-2xl text-white font-semibold">Quick Edit Form</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
            <input className="rounded-lg border border-[#2A0E61] bg-[#030014CC] text-gray-200 p-3" value={basicForm.name} onChange={(e) => setBasicForm((prev) => ({ ...prev, name: e.target.value }))} placeholder="Name" />
            <input className="rounded-lg border border-[#2A0E61] bg-[#030014CC] text-gray-200 p-3" value={basicForm.focusTitle} onChange={(e) => setBasicForm((prev) => ({ ...prev, focusTitle: e.target.value }))} placeholder="Focus title" />
            <input className="rounded-lg border border-[#2A0E61] bg-[#030014CC] text-gray-200 p-3" value={basicForm.location} onChange={(e) => setBasicForm((prev) => ({ ...prev, location: e.target.value }))} placeholder="Location" />
            <textarea className="rounded-lg border border-[#2A0E61] bg-[#030014CC] text-gray-200 p-3 min-h-[92px]" value={basicForm.phones} onChange={(e) => setBasicForm((prev) => ({ ...prev, phones: e.target.value }))} placeholder={"Phone numbers (one per line)"} />
            <input className="rounded-lg border border-[#2A0E61] bg-[#030014CC] text-gray-200 p-3 md:col-span-2" value={basicForm.email} onChange={(e) => setBasicForm((prev) => ({ ...prev, email: e.target.value }))} placeholder="Email" />
            <input className="rounded-lg border border-[#2A0E61] bg-[#030014CC] text-gray-200 p-3 md:col-span-2" value={basicForm.mephiPortfolioUrl} onChange={(e) => setBasicForm((prev) => ({ ...prev, mephiPortfolioUrl: e.target.value }))} placeholder="MEPhI portfolio URL" />
            <textarea className="rounded-lg border border-[#2A0E61] bg-[#030014CC] text-gray-200 p-3 md:col-span-2 min-h-[110px]" value={basicForm.summary} onChange={(e) => setBasicForm((prev) => ({ ...prev, summary: e.target.value }))} placeholder="Summary" />
          </div>
          <div className="mt-3 flex gap-3 flex-wrap">
            <label className="py-2 px-4 rounded-lg border border-[#2A0E61] text-white cursor-pointer">
              Upload Picture
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => onImageUpload(e.target.files?.[0])}
              />
            </label>
            <button onClick={saveBasicInfo} className="py-2 px-4 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold">
              Save Basic Info
            </button>
          </div>
        </section>

        <section className="mt-6 rounded-xl border border-[#2A0E61] bg-[#1a1c24e6] p-5">
          <h2 className="text-2xl text-white font-semibold">Page Text Labels</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
            <input className="rounded-lg border border-[#2A0E61] bg-[#030014CC] text-gray-200 p-3" value={uiForm.tabAbout} onChange={(e) => setUiForm((prev) => ({ ...prev, tabAbout: e.target.value }))} placeholder="Tab label: About" />
            <input className="rounded-lg border border-[#2A0E61] bg-[#030014CC] text-gray-200 p-3" value={uiForm.tabResume} onChange={(e) => setUiForm((prev) => ({ ...prev, tabResume: e.target.value }))} placeholder="Tab label: Resume" />
            <input className="rounded-lg border border-[#2A0E61] bg-[#030014CC] text-gray-200 p-3" value={uiForm.tabPortfolio} onChange={(e) => setUiForm((prev) => ({ ...prev, tabPortfolio: e.target.value }))} placeholder="Tab label: Portfolio" />
            <input className="rounded-lg border border-[#2A0E61] bg-[#030014CC] text-gray-200 p-3" value={uiForm.tabContact} onChange={(e) => setUiForm((prev) => ({ ...prev, tabContact: e.target.value }))} placeholder="Tab label: Contact" />
            <input className="rounded-lg border border-[#2A0E61] bg-[#030014CC] text-gray-200 p-3" value={uiForm.aboutTitle} onChange={(e) => setUiForm((prev) => ({ ...prev, aboutTitle: e.target.value }))} placeholder="About title" />
            <input className="rounded-lg border border-[#2A0E61] bg-[#030014CC] text-gray-200 p-3" value={uiForm.doingTitle} onChange={(e) => setUiForm((prev) => ({ ...prev, doingTitle: e.target.value }))} placeholder="What I'm Doing title" />
            <input className="rounded-lg border border-[#2A0E61] bg-[#030014CC] text-gray-200 p-3" value={uiForm.certificatesTitle} onChange={(e) => setUiForm((prev) => ({ ...prev, certificatesTitle: e.target.value }))} placeholder="Certificates title" />
            <input className="rounded-lg border border-[#2A0E61] bg-[#030014CC] text-gray-200 p-3" value={uiForm.educationTitle} onChange={(e) => setUiForm((prev) => ({ ...prev, educationTitle: e.target.value }))} placeholder="Education title" />
            <input className="rounded-lg border border-[#2A0E61] bg-[#030014CC] text-gray-200 p-3" value={uiForm.experienceTitle} onChange={(e) => setUiForm((prev) => ({ ...prev, experienceTitle: e.target.value }))} placeholder="Experience title" />
            <input className="rounded-lg border border-[#2A0E61] bg-[#030014CC] text-gray-200 p-3" value={uiForm.achievementsTitle} onChange={(e) => setUiForm((prev) => ({ ...prev, achievementsTitle: e.target.value }))} placeholder="Achievements title" />
            <input className="rounded-lg border border-[#2A0E61] bg-[#030014CC] text-gray-200 p-3" value={uiForm.technicalSkillsTitle} onChange={(e) => setUiForm((prev) => ({ ...prev, technicalSkillsTitle: e.target.value }))} placeholder="Technical skills title" />
            <input className="rounded-lg border border-[#2A0E61] bg-[#030014CC] text-gray-200 p-3" value={uiForm.contactTitle} onChange={(e) => setUiForm((prev) => ({ ...prev, contactTitle: e.target.value }))} placeholder="Contact title" />
            <input className="rounded-lg border border-[#2A0E61] bg-[#030014CC] text-gray-200 p-3 md:col-span-2" value={uiForm.mephiPortfolioLabel} onChange={(e) => setUiForm((prev) => ({ ...prev, mephiPortfolioLabel: e.target.value }))} placeholder="MEPhI link label" />
            <input className="rounded-lg border border-[#2A0E61] bg-[#030014CC] text-gray-200 p-3 md:col-span-2" value={uiForm.missingProfileImageText} onChange={(e) => setUiForm((prev) => ({ ...prev, missingProfileImageText: e.target.value }))} placeholder="Missing profile image text" />
            <input className="rounded-lg border border-[#2A0E61] bg-[#030014CC] text-gray-200 p-3 md:col-span-2" value={uiForm.noCertificatesText} onChange={(e) => setUiForm((prev) => ({ ...prev, noCertificatesText: e.target.value }))} placeholder="No certificates fallback text" />
            <input className="rounded-lg border border-[#2A0E61] bg-[#030014CC] text-gray-200 p-3" value={uiForm.locationLabel} onChange={(e) => setUiForm((prev) => ({ ...prev, locationLabel: e.target.value }))} placeholder="Location label" />
            <input className="rounded-lg border border-[#2A0E61] bg-[#030014CC] text-gray-200 p-3" value={uiForm.phoneLabel} onChange={(e) => setUiForm((prev) => ({ ...prev, phoneLabel: e.target.value }))} placeholder="Phone label" />
            <input className="rounded-lg border border-[#2A0E61] bg-[#030014CC] text-gray-200 p-3 md:col-span-2" value={uiForm.emailLabel} onChange={(e) => setUiForm((prev) => ({ ...prev, emailLabel: e.target.value }))} placeholder="Email label" />
          </div>
          <button onClick={saveUiText} className="mt-3 py-2 px-4 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold">
            Save Page Labels
          </button>
        </section>

        <section className="mt-6 rounded-xl border border-[#2A0E61] bg-[#1a1c24e6] p-5">
          <h2 className="text-2xl text-white font-semibold">Edit All Sections (easy form)</h2>
          <p className="text-gray-300 mt-2 text-sm">For Education/Experience/Publications/Awards use blocks separated by <code>---</code>.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
            <textarea className="rounded-lg border border-[#2A0E61] bg-[#030014CC] text-gray-200 p-3 min-h-[120px] md:col-span-2" value={sectionsForm.aboutHighlights} onChange={(e) => setSectionsForm((prev) => ({ ...prev, aboutHighlights: e.target.value }))} placeholder={"What I'm Doing cards (one per line as Title::Description)"} />
            <textarea className="rounded-lg border border-[#2A0E61] bg-[#030014CC] text-gray-200 p-3 min-h-[180px]" value={sectionsForm.education} onChange={(e) => setSectionsForm((prev) => ({ ...prev, education: e.target.value }))} placeholder="Education blocks" />
            <textarea className="rounded-lg border border-[#2A0E61] bg-[#030014CC] text-gray-200 p-3 min-h-[180px]" value={sectionsForm.experience} onChange={(e) => setSectionsForm((prev) => ({ ...prev, experience: e.target.value }))} placeholder="Experience blocks" />
            <textarea className="rounded-lg border border-[#2A0E61] bg-[#030014CC] text-gray-200 p-3 min-h-[180px]" value={sectionsForm.publications} onChange={(e) => setSectionsForm((prev) => ({ ...prev, publications: e.target.value }))} placeholder="Publications blocks" />
            <textarea className="rounded-lg border border-[#2A0E61] bg-[#030014CC] text-gray-200 p-3 min-h-[180px]" value={sectionsForm.awards} onChange={(e) => setSectionsForm((prev) => ({ ...prev, awards: e.target.value }))} placeholder="Awards blocks" />
            <textarea className="rounded-lg border border-[#2A0E61] bg-[#030014CC] text-gray-200 p-3 min-h-[120px]" value={sectionsForm.training} onChange={(e) => setSectionsForm((prev) => ({ ...prev, training: e.target.value }))} placeholder="Training (one per line)" />
            <textarea className="rounded-lg border border-[#2A0E61] bg-[#030014CC] text-gray-200 p-3 min-h-[120px]" value={sectionsForm.certifications} onChange={(e) => setSectionsForm((prev) => ({ ...prev, certifications: e.target.value }))} placeholder="Certifications (one per line)" />
            <textarea className="rounded-lg border border-[#2A0E61] bg-[#030014CC] text-gray-200 p-3 min-h-[120px]" value={sectionsForm.nuclearSecurity} onChange={(e) => setSectionsForm((prev) => ({ ...prev, nuclearSecurity: e.target.value }))} placeholder="Nuclear security skills (one per line)" />
            <textarea className="rounded-lg border border-[#2A0E61] bg-[#030014CC] text-gray-200 p-3 min-h-[120px]" value={sectionsForm.programming} onChange={(e) => setSectionsForm((prev) => ({ ...prev, programming: e.target.value }))} placeholder="Programming skills (one per line)" />
            <textarea className="rounded-lg border border-[#2A0E61] bg-[#030014CC] text-gray-200 p-3 min-h-[120px] md:col-span-2" value={sectionsForm.tools} onChange={(e) => setSectionsForm((prev) => ({ ...prev, tools: e.target.value }))} placeholder="Tools (one per line)" />
          </div>
          <button onClick={saveAllSections} className="mt-3 py-2 px-4 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold">
            Save All Sections
          </button>
        </section>

        <section className="mt-6 rounded-xl border border-[#2A0E61] bg-[#1a1c24e6] p-5">
          <h2 className="text-2xl text-white font-semibold">Add Achievement</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
            <input className="rounded-lg border border-[#2A0E61] bg-[#030014CC] text-gray-200 p-3" value={newAward.title} onChange={(e) => setNewAward((prev) => ({ ...prev, title: e.target.value }))} placeholder="Title" />
            <input className="rounded-lg border border-[#2A0E61] bg-[#030014CC] text-gray-200 p-3" value={newAward.subtitle} onChange={(e) => setNewAward((prev) => ({ ...prev, subtitle: e.target.value }))} placeholder="Subtitle / Conference" />
            <input className="rounded-lg border border-[#2A0E61] bg-[#030014CC] text-gray-200 p-3" value={newAward.period} onChange={(e) => setNewAward((prev) => ({ ...prev, period: e.target.value }))} placeholder="Period" />
          </div>
          <button onClick={addAchievement} className="mt-3 py-2 px-4 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold">
            Add Achievement
          </button>
        </section>

        <section className="mt-6 rounded-xl border border-[#2A0E61] bg-[#1a1c24e6] p-5">
          <h2 className="text-2xl text-white font-semibold">Add Certificate</h2>
          <div className="grid grid-cols-1 gap-3 mt-4">
            <input className="rounded-lg border border-[#2A0E61] bg-[#030014CC] text-gray-200 p-3" value={newCertificate} onChange={(e) => setNewCertificate(e.target.value)} placeholder="Certificate text" />
          </div>
          <button onClick={addCertificate} className="mt-3 py-2 px-4 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold">
            Add Certificate
          </button>
        </section>

        <h2 className="text-2xl text-white font-semibold mt-8">Advanced JSON Editor</h2>
        <textarea
          value={jsonText}
          onChange={(e) => setJsonText(e.target.value)}
          className="mt-6 w-full min-h-[70vh] rounded-lg border border-[#2A0E61] bg-[#030014CC] text-gray-200 p-4 font-mono text-sm"
          spellCheck={false}
        />
      </div>
    </main>
  );
}
