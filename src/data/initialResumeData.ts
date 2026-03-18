// 1. መጀመሪያ Type Definition (TypeScript ከሆነ የምትጠቀመው)
export interface ResumeData {
    firstName: string; lastName: string; email: string; phone: string;
    jobTitle: string; street: string; city: string; country: string;
    profileImage: string; dateOfBirth: string; gender: string; nationality: string;
    website: string; linkedin: string; github: string; twitter: string;
    summary: string;
    education: any[];
    experience: any[];
    projects: any[];
    hardSkills: string[];
    softSkills: string[];
    languages: any[];
    certifications: any[];
    awards: any[];
    volunteer: any[];
    hobbies: string[];
    references: any[];
    layout: string; themeColor: string; fontSize: string;
}

// 2. Initial State - እዚህ ጋር Addressን ሰባብረን አስገብተነዋል
export const initialResumeData: ResumeData = {
    firstName: "", lastName: "", email: "", phone: "+251 ", jobTitle: "",
    street: "", city: "", country: "", // አድራሻውን እዚህ ሰባበርነው
    profileImage: "", dateOfBirth: "", gender: "", nationality: "",
    website: "", linkedin: "", github: "", twitter: "",
    summary: "",
    education: [{ school: "", degree: "", field: "", startYear: "", endYear: "", location: "", gpa: "", description: "" }],
    experience: [{ company: "", role: "", location: "", startDate: "", endDate: "", isCurrent: false, desc: "" }],
    projects: [{ title: "", link: "", description: "", technologies: "" }],
    hardSkills: [""],
    softSkills: [""],
    languages: [{ name: "", level: "Native" }],
    certifications: [{ title: "", issuer: "", date: "", link: "" }],
    awards: [{ title: "", year: "", issuer: "" }],
    volunteer: [{ organization: "", role: "", startDate: "", endDate: "", desc: "" }],
    hobbies: [""],
    references: [{ name: "", position: "", company: "", email: "", phone: "" }],
    layout: "modern", themeColor: "#2563eb", fontSize: "medium"
};