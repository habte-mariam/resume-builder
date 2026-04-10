import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PersonalInfo from "../components/PersonalInfo";
import ExperienceForm from "../components/ExperienceForm";
import { EducationForm } from "../components/EductionForm";
import ProjectsForm from "../components/ProjectsForm";
import SkillsForm from "../components/SkillsForm";
import AwardsForm from "../components/AwardsForm";
import VolunteerForm from "../components/VolunteerForm";
import PublicationsForm from "../components/PublicationsForm";
import ReferencesForm from "../components/ReferencesForm";
import LanguagesForm from "../components/LanguagesForm";
import InterestsForm from "../components/InterestsForm";
import {
  CaretLeft, CaretRight,
  CheckCircle
} from "@phosphor-icons/react";

import ResumePreviewModal from "./ResumePreviewModal";

// 1. መጀመሪያ የዳታውን Type እንገልጻለን (ይህ 'never[]' errorን ያጠፋዋል)
interface ResumeData {
  profile: {
    fullName: string; email: string; phoneNumber: string;
    altPhone?: string; jobTitle: string;
    location: string; summary: string;
    gender?: string; age?: string; nationality?: string;
    telegram?: string; website: string; github: string;
    linkedin: string; twitter: string; stackOverflow: string;
    avatarUrl: string;
  };
  experience: any[];
  education: any[];
  projects: any[];
  skills: { name: string; level: string; category: string; }[];
  awards: any[];
  volunteer: any[];
  publications: any[];
  references: any[];
  languages: any[];
  interests: any[];
}

export default function Editor() {
  const { id } = useParams();
  const [currentStep, setCurrentStep] = useState(0);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // በ Editor ኮምፖነንትህ ውስጥ ከላይ አስቀምጠው
  const isLocalhost = Boolean(
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1" ||
    window.location.hostname === "[::1]"
  );

  const API_BASE_URL = isLocalhost
    ? "http://127.0.0.1:5000"
    : (import.meta.env.VITE_API_URL || 'https://resume-builder-xmsz.onrender.com');

  // አጠቃቀም (Example)
  // 2. በወሰንነው Type መሰረት State እንጀምራለን
  const [cvData, setCvData] = useState<ResumeData>({
    profile: {
      fullName: "", email: "", phoneNumber: "",
      altPhone: "", jobTitle: "",
      location: "", summary: "", gender: "",
      age: "", nationality: "", telegram: "", website: "", github: "", linkedin: "", twitter: "", stackOverflow: "", avatarUrl: ""
    },
    experience: [],
    education: [],
    projects: [],
    skills: [],
    awards: [],
    volunteer: [],
    publications: [],
    references: [],
    languages: [],
    interests: []
  });

  useEffect(() => {
    const fetchResumeData = async () => {
      if (!id) return;
      try {
        const response = await axios.get(`${API_BASE_URL}/api/resumes/${id}`);
        const data = response.data;

        setCvData({
          profile: {
            fullName: data.fullName || "",
            email: data.email || "",
            phoneNumber: data.phoneNumber || "",
            altPhone: data.altPhone || "",        // አዲስ
            jobTitle: data.jobTitle || "",
            location: data.location || "",
            summary: data.summary || "",
            gender: data.gender || "",            // አዲስ
            age: data.age || "",                  // አዲስ
            nationality: data.nationality || "",  // አዲስ
            telegram: data.telegram || "",        // አዲስ
            website: data.website || "",          // Portfolio
            github: data.github || "",
            linkedin: data.linkedin || "",
            twitter: data.twitter || "",
            stackOverflow: data.stackOverflow || "",
            // Twitter እና StackOverflow ካልፈለግሃቸው ማውጣት ትችላለህ
            avatarUrl: data.avatarUrl || ""
          },
          experience: Array.isArray(data.experience) ? data.experience : [],
          education: Array.isArray(data.education) ? data.education : [],
          projects: Array.isArray(data.projects) ? data.projects : [],
          skills: Array.isArray(data.skills) ? data.skills : [],
          awards: Array.isArray(data.awards) ? data.awards : [],
          volunteer: Array.isArray(data.volunteer) ? data.volunteer : [],
          publications: Array.isArray(data.publications) ? data.publications : [],
          references: Array.isArray(data.references) ? data.references : [],
          languages: Array.isArray(data.languages) ? data.languages : [],
          interests: Array.isArray(data.interests) ? data.interests : []
        });
      } catch (error) {
        console.error("Fetch Error:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchResumeData();
  }, [id, API_BASE_URL]);

  const steps = [
    { label: "Profile", icon: "👤" },
    { label: "Experience", icon: "💼" },
    { label: "Education", icon: "🎓" },
    { label: "Skills", icon: "🛠️" },
    { label: "Projects", icon: "🚀" },
    { label: "Awards", icon: "🏆" },
    { label: "Volunteer", icon: "🤝" },
    { label: "Publications", icon: "📚" },
    { label: "References", icon: "📞" },
    { label: "Languages", icon: "🌐" },
    { label: "Interests", icon: "🎨" }
  ];


  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCvData(prev => ({ ...prev, profile: { ...prev.profile, [name]: value } }));
  };

  const updateArrayData = (key: keyof ResumeData, newData: any[]) => {
    setCvData(prev => ({ ...prev, [key]: newData }));
  };

  const handleBulkSkillImport = (text: string) => {
    const newSkills = text.split(',')
      .map(s => s.trim())
      .filter(s => s !== "")
      .map(s => ({ name: s, level: "Intermediate", category: "General" }));

    setCvData(prev => ({ ...prev, skills: [...prev.skills, ...newSkills] }));
  };

  const handleSave = async () => {
    try {
      const payload = { ...cvData.profile, ...cvData };
      delete (payload as any).profile;

      await axios.put(`${API_BASE_URL}/api/resumes/${id}`, payload);
      alert("ሪዙሜው በተሳካ ሁኔታ ተቀምጧል! 🎉");
      setIsPreviewOpen(false);
    } catch (error) {
      console.error("Save Error:", error);
      alert("ማስቀመጥ አልተቻለም።");
    }
  };

  if (isLoading) return (
    <div className="h-screen flex flex-col items-center justify-center bg-slate-50">
      <div className="w-16 h-16 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
    </div>
  );

  const renderStep = () => {
    switch (currentStep) {
      case 0: return <PersonalInfo data={cvData.profile} onChange={handleProfileChange} onImageChange={(url) => setCvData(p => ({ ...p, profile: { ...p.profile, avatarUrl: url } }))} />;
      case 1: return <ExperienceForm experience={cvData.experience} setexperience={(d) => updateArrayData("experience", d)} />;
      case 2: return <EducationForm educationList={cvData.education} setEducation={(d) => updateArrayData("education", d)} />;
      case 3: return (
        <div className="space-y-6">
          <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100 mb-4">
            <label className="text-xs font-bold text-blue-600 uppercase mb-2 block">ክህሎቶችን በጅምላ አስገባ (React, Node...)</label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="ክህሎቶችን በኮማ ለይተህ አስገባ..."
                className="flex-1 p-3 rounded-xl border border-blue-200 text-sm outline-none"
                onKeyDown={(e: any) => {
                  if (e.key === 'Enter' && e.target.value) {
                    handleBulkSkillImport(e.target.value);
                    e.target.value = "";
                  }
                }}
              />
            </div>
          </div>
          <SkillsForm skills={cvData.skills} setSkills={(d) => updateArrayData("skills", d)} />
        </div>
      );
      case 4: return <ProjectsForm projects={cvData.projects} setProjects={(d) => updateArrayData("projects", d)} />;
      case 5: return <AwardsForm awards={cvData.awards} setAwards={(d) => updateArrayData("awards", d)} />;
      case 6: return <VolunteerForm volunteerWork={cvData.volunteer} setVolunteerWork={(d) => updateArrayData("volunteer", d)} />;
      case 7: return <PublicationsForm publications={cvData.publications} setPublications={(d) => updateArrayData("publications", d)} />;
      case 8: return <ReferencesForm references={cvData.references} setReferences={(d) => updateArrayData("references", d)} />;
      case 9: return <LanguagesForm languages={cvData.languages} setLanguages={(d) => updateArrayData("languages", d)} />;
      case 10: return <InterestsForm interests={cvData.interests} setInterests={(d) => updateArrayData("interests", d)} />;
      default: return null;
    }
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden">
      <aside className="w-80 bg-white border-r border-slate-200 p-6 hidden lg:flex flex-col">
        <div className="flex items-center gap-3 mb-8 px-2">
          <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center text-white font-black">R</div>
          <h1 className="text-xl font-black text-slate-900 tracking-tighter">CV EDITOR</h1>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto pr-2">
          {steps.map((step, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentStep(idx)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${currentStep === idx ? "bg-slate-900 text-white shadow-lg" : "text-slate-400 hover:bg-slate-50 hover:text-slate-600"
                }`}
            >
              <span className="text-lg opacity-80">{step.icon}</span>
              <span className="flex-1 text-left">{step.label}</span>
              {currentStep > idx && <CheckCircle size={18} weight="fill" className="text-emerald-500" />}
            </button>
          ))}
        </nav>

        <div className="mt-6 pt-6 border-t border-slate-100">
          <button
            onClick={() => setIsPreviewOpen(true)}
            className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-all"
          >
            <CheckCircle size={20} weight="bold" />
            አሳይና አውርድ
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto relative">
        <div className="max-w-4xl mx-auto py-12 px-6 lg:px-12">
          <div className="mb-10">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">{steps[currentStep].label} መረጃ</h2>
              <span className="text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                {currentStep + 1} / {steps.length}
              </span>
            </div>
            <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden flex">
              <div
                className="h-full bg-blue-600 transition-all duration-500"
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="min-h-[60vh]">
            {renderStep()}
          </div>

          <div className="mt-12 pt-8 border-t border-slate-200 flex items-center justify-between">
            <button
              onClick={() => setCurrentStep(s => Math.max(0, s - 1))}
              disabled={currentStep === 0}
              className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold transition-all ${currentStep === 0 ? "opacity-0 invisible" : "text-slate-500 hover:bg-slate-100"
                }`}
            >
              <CaretLeft size={20} weight="bold" /> ተመለስ
            </button>

            <button
              onClick={() => currentStep < steps.length - 1 ? setCurrentStep(s => s + 1) : setIsPreviewOpen(true)}
              className="flex items-center gap-2 bg-slate-900 text-white px-10 py-4 rounded-xl font-bold hover:bg-black transition-all"
            >
              {currentStep < steps.length - 1 ? (
                <>ቀጣይ ደረጃ <CaretRight size={20} weight="bold" /></>
              ) : (
                <>ጨርስና አሳይ <CheckCircle size={20} weight="bold" /></>
              )}
            </button>
          </div>
        </div>
      </main>

      <ResumePreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        onConfirm={handleSave}
        data={cvData}
      />
    </div>
  );
}