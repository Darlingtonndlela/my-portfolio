export const PROFILE_STORAGE_KEY = "dn_profile_data_v1";

export type TextEntry = {
  title: string;
  subtitle?: string;
  period?: string;
  bullets?: string[];
};

export type ProfileData = {
  name: string;
  profileImage?: string;
  location: string;
  phoneNumbers: string[];
  email: string;
  mephiPortfolioUrl?: string;
  summary: string;
  aboutHighlights: {
    title: string;
    description: string;
  }[];
  focusTitle: string;
  education: TextEntry[];
  experience: TextEntry[];
  publications: TextEntry[];
  awards: TextEntry[];
  training: string[];
  certifications: string[];
  technicalSkills: {
    nuclearSecurity: string[];
    programming: string[];
    tools: string[];
  };
  uiText: {
    tabs: {
      about: string;
      resume: string;
      portfolio: string;
      contact: string;
    };
    aboutTitle: string;
    doingTitle: string;
    certificatesTitle: string;
    educationTitle: string;
    experienceTitle: string;
    achievementsTitle: string;
    technicalSkillsTitle: string;
    contactTitle: string;
    mephiPortfolioLabel: string;
    missingProfileImageText: string;
    noCertificatesText: string;
    locationLabel: string;
    phoneLabel: string;
    emailLabel: string;
  };
};

export const defaultProfileData: ProfileData = {
  name: "Darlington Ndlela",
  profileImage: "",
  location: "Obninsk, Kaluzhskaya obl., Russia",
  phoneNumbers: ["+79960300161"],
  email: "darlingtonndlela@gmail.com",
  mephiPortfolioUrl: "https://eis.mephi.ru/Portfolio/",
  focusTitle: "Nuclear Science and Technology",
  summary:
    "Early-career Nuclear Science and Technology professional with a strong background in Computer Science. Specialized in applying Genetic Algorithms to nuclear infrastructure reliability and safety optimization.",
  aboutHighlights: [
    {
      title: "Nuclear Safety Research",
      description: "Applying GA methods and reliability models to strengthen NPP safety outcomes.",
    },
    {
      title: "Computational Modelling",
      description:
        "Building data-driven analysis workflows for complex nuclear engineering contexts.",
    },
    {
      title: "Infrastructure Reliability",
      description:
        "Practical operations experience with secure and reliable institutional systems.",
    },
    {
      title: "Nuclear Security",
      description: "Focused on risk assessment, security culture, and protection systems.",
    },
  ],
  education: [
    {
      title: "MSc in Nuclear Physics and Technology",
      subtitle: "National Research Nuclear University MEPhI, Russia",
      period: "Expected August 2026",
      bullets: [
        "Related Coursework: Nuclear Infrastructure, Safety of Nuclear Power Engineering, NPP Reliability Analysis, Genetic Algorithms in Safety of NPPs, Dosimetry.",
        "GPA: 4.83/5",
      ],
    },
    {
      title: "BSc (Hons) Computer Science",
      subtitle: "Midlands State University, Zimbabwe",
      period: "2022",
      bullets: [
        "Related Coursework: Information Security, Database Systems, Machine Learning, Data Mining.",
        "Grade: 1st Class Honours",
      ],
    },
  ],
  experience: [
    {
      title: "Server Technician",
      subtitle: "Midlands State University, Gweru",
      period: "Dec 2022 - Jan 2024",
      bullets: [
        "Managed secure server environments and optimized database system performance.",
        "Maintained critical infrastructure with 99.9% uptime through regular monitoring.",
      ],
    },
    {
      title: "IT Intern",
      subtitle: "Runde Rural District Council, Zvishavane",
      period: "Jan 2020 - Feb 2021",
      bullets: [
        "Supported maintenance of IT systems with access control and hardware security configurations.",
        "Documented standardized procedures to improve response to technical incidents.",
      ],
    },
  ],
  publications: [
    {
      title: "Genetic Algorithm-Based Optimization for Safety of NPPs",
      subtitle: "XI International Scientific and Practical Conference of Young Scientists (KOMANDA)",
      period: "September 2025",
    },
    {
      title: "Application of Genetic Algorithm for Estimating Weibull Parameters for Incidents at a NPP",
      subtitle: 'VIII International Scientific Conference "Technogenic Systems and Environmental Risk"',
      period: "April 2025",
    },
    {
      title: "Application of Genetic Algorithms in Nuclear Reactor Safety Optimization",
      subtitle: 'International Youth Forum "Russia-Africa: Nuclear Education"',
      period: "February 2025",
    },
  ],
  awards: [
    {
      title: "Winner (3rd Place) - AtomFuture 2025",
      subtitle: 'XXI International Youth Scientific and Practical Conference "THE FUTURE OF NUCLEAR ENERGY"',
      period: "December 2025",
    },
    {
      title: "Prize Winner (2nd Place) - Obninsk Tech Nuclear Triathlon",
      subtitle: "Winter School 2025",
    },
    {
      title: "Grand Prize Participant - Global Atomic Quiz",
      period: "2025",
    },
  ],
  training: [
    "BFS Complex of Critical Facilities: Practical training course at SSC RF-IPPE (Rosatom), July 2025.",
    "International Winter School on Radiochemistry (Rosatom and Lomonosov MSU), November 2025.",
    "Management of Knowledge and Technology in Nuclear Energy (NRNU MEPHI), February 2025.",
    "Popularization of Peaceful Nuclear Technologies (NRNU MEPHI), June 2025.",
  ],
  certifications: [
    "IAEA GSR Part 1 (Rev 1): Governmental, Legal and Regulatory Framework for Safety.",
    "IAEA GSR Part 2: Leadership and Management for Safety.",
    "IAEA GSR Part 3: Radiation Protection and Safety of Radiation Sources.",
    "IAEA GSR Part 4 (Rev 1): Safety Assessment for Facilities and Activities.",
    "IAEA GSR Part 5 and Joint Convention: Radioactive Waste Management.",
    "IAEA GSR Part 6: Decommissioning Implementation.",
    "IAEA GSR Part 7: Preparedness and Response for a Nuclear or Radiological Emergency.",
  ],
  technicalSkills: {
    nuclearSecurity: [
      "Threat and Risk Assessment",
      "Information and Computer Security",
      "Nuclear Security Culture",
      "Physical Protection Systems",
    ],
    programming: [
      "Python (TensorFlow)",
      "Java",
      "C++",
      "SQL",
      "PHP",
      "JavaScript",
      "React.js",
    ],
    tools: ["Git", "Linux Server Security", "Windows Server Security", "Agile Methodologies"],
  },
  uiText: {
    tabs: {
      about: "About",
      resume: "Resume",
      portfolio: "Portfolio",
      contact: "Contact",
    },
    aboutTitle: "About Me",
    doingTitle: "What I'm Doing",
    certificatesTitle: "Certificates",
    educationTitle: "Education",
    experienceTitle: "Experience",
    achievementsTitle: "Achievements",
    technicalSkillsTitle: "Technical Skills",
    contactTitle: "Contact",
    mephiPortfolioLabel: "MEPhI Portfolio",
    missingProfileImageText: "Add profile photo from admin panel",
    noCertificatesText: "No certificates added yet.",
    locationLabel: "Location",
    phoneLabel: "Phone",
    emailLabel: "Email",
  },
};
