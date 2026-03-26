import React, { useState } from "react";
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
  CaretLeft, CaretRight, FloppyDiskBack,
  CheckCircle
} from "@phosphor-icons/react";
import ResumePreviewModal from "./ResumePreviewModal";

export default function Editor() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const [cvData, setCvData] = useState({
    profile: {
      fullName: "", email: "", phoneNumber: "", jobTitle: "",
      location: "", summary: "", website: "", github: "",
      linkedin: "", twitter: "", stackOverflow: ""
    },
    experiences: [],
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

  const steps = [
    "Profile", "Experience", "Education", "Skills", "Projects",
    "Awards", "Volunteer", "Publications", "References", "Languages", "Interests"
  ];

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCvData(prev => ({
      ...prev,
      profile: { ...prev.profile, [name]: value }
    }));
  };

  const updateArrayData = (key: string, newData: any[]) => {
    setCvData(prev => ({ ...prev, [key]: newData }));
  };

  // ዳታውን ወደ Backend የሚልክ ተግባር
  const handleSave = async () => {
    try {
      const payload = {
        ...cvData.profile,
        experience: cvData.experiences,
        education: cvData.education,
        projects: cvData.projects,
        skills: cvData.skills,
        awards: cvData.awards,
        volunteer: cvData.volunteer,
        publications: cvData.publications,
        references: cvData.references,
        languages: cvData.languages,
        interests: cvData.interests
      };

      const response = await fetch('http://localhost:3001/api/resumes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const savedData = await response.json();
        alert("ሪዙሜው በተሳካ ሁኔታ ተቀምጧል! 🎉");
        if (savedData.id) {
          window.location.href = `http://localhost:3001/api/resumes/${savedData.id}/download`;
        }
      } else {
        const errorData = await response.json();
        alert(`ስህተት: ${errorData.error}`);
      }
    } catch (error) {
      alert("ከቤክአንድ ጋር መገናኘት አልተቻለም።");
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0: return <PersonalInfo data={cvData.profile} onChange={handleProfileChange} />;
      case 1: return <ExperienceForm experiences={cvData.experiences} setExperiences={(d: any[]) => updateArrayData("experiences", d)} />;
      case 2: return <EducationForm educationList={cvData.education} setEducation={(d: any[]) => updateArrayData("education", d)} />;
      case 3: return <SkillsForm skills={cvData.skills} setSkills={(d: any[]) => updateArrayData("skills", d)} />;
      case 4: return <ProjectsForm projects={cvData.projects} setProjects={(d: any[]) => updateArrayData("projects", d)} />;
      case 5: return <AwardsForm awards={cvData.awards} setAwards={(d: any[]) => updateArrayData("awards", d)} />;
      case 6: return <VolunteerForm volunteerWork={cvData.volunteer} setVolunteerWork={(d: any[]) => updateArrayData("volunteer", d)} />;
      case 7: return <PublicationsForm publications={cvData.publications} setPublications={(d: any[]) => updateArrayData("publications", d)} />;
      case 8: return <ReferencesForm references={cvData.references} setReferences={(d: any[]) => updateArrayData("references", d)} />;
      case 9: return <LanguagesForm languages={cvData.languages} setLanguages={(d: any[]) => updateArrayData("languages", d)} />;
      case 10: return <InterestsForm interests={cvData.interests} setInterests={(d: any[]) => updateArrayData("interests", d)} />;
      default: return <div className="text-center py-20 font-bold text-slate-400 text-2xl tracking-tighter italic">All Sections Completed! 🎉</div>;
    }
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-slate-200 p-8 hidden lg:flex flex-col">
        <div className="mb-10 flex items-center gap-2 text-blue-600 font-black text-xl tracking-tighter uppercase">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">R</div>
          <span className="text-slate-900">Builder</span>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto pr-2 custom-scrollbar">
          {steps.map((step, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentStep(idx)}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all flex items-center gap-3 ${currentStep === idx ? "bg-blue-50 text-blue-600 shadow-sm" : "text-slate-400 hover:bg-slate-50 hover:text-slate-600"
                }`}
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] border-2 ${currentStep === idx ? "border-blue-600 bg-blue-600 text-white" : "border-slate-200 text-slate-300"
                }`}>
                {idx + 1}
              </div>
              {step}
            </button>
          ))}
        </nav>

        {/* Sidebar Save Button (Opens Preview First) */}
        <button
          onClick={() => setIsPreviewOpen(true)}
          className="mt-6 w-full bg-slate-900 text-white p-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all shadow-lg"
        >
          <FloppyDiskBack size={20} weight="bold" /> Save Resume
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto py-16 px-8">
          <div className="mb-12 h-1.5 bg-slate-100 rounded-full overflow-hidden flex gap-1">
            {steps.map((_, i) => (
              <div key={i} className={`h-full flex-1 transition-all duration-500 ${i <= currentStep ? "bg-blue-500" : "bg-slate-200"}`} />
            ))}
          </div>

          <div className="min-h-[60vh]">{renderStep()}</div>

          <div className="mt-12 pt-8 border-t border-slate-100 flex justify-between">
            <button
              onClick={() => setCurrentStep(s => Math.max(0, s - 1))}
              disabled={currentStep === 0}
              className={`flex items-center gap-2 font-bold px-6 py-3 rounded-xl transition-all ${currentStep === 0 ? "opacity-0 pointer-events-none" : "text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                }`}
            >
              <CaretLeft size={20} weight="bold" /> Previous
            </button>

            {currentStep < steps.length - 1 ? (
              <button
                onClick={() => setCurrentStep(s => s + 1)}
                className="flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-md"
              >
                Continue <CaretRight size={20} weight="bold" />
              </button>
            ) : (
              <button
                onClick={() => setIsPreviewOpen(true)}
                className="flex items-center gap-2 bg-emerald-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-md shadow-emerald-100"
              >
                Finish & Preview <CheckCircle size={20} weight="bold" />
              </button>
            )}
          </div>
        </div>
      </main>

      {/* Preview Modal */}
      <ResumePreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        onConfirm={handleSave} // እዚህ ጋር ነው በትክክል ሴቭ የሚያደርገው
        data={cvData}
      />
    </div>
  );
}