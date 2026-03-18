"use client";
import { useState } from "react";
import Link from "next/link";
import PersonalInfoStep from "./steps/PersonalInfoStep";
import SummaryStep from "./steps/SummaryStep";
import EducationStep from "./steps/EducationStep";
import ExperienceStep from "./steps/ExperienceStep";
import ProjectsStep from "./steps/ProjectsStep";
import SkillsStep from "./steps/SkillsStep";
import FinalStep from "./steps/FinalStep";
import { initialResumeData } from "@/src/data/initialResumeData";
import AdditionalInfoStep from "./steps/AdditionalInfoStep";

export default function Builder() {
    const [step, setStep] = useState(1);
    const [resume, setResume] = useState(initialResumeData);

    const totalSteps = 8;
    const nextStep = () => setStep((prev) => Math.min(prev + 1, totalSteps));
    const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

    const renderStep = () => {
        switch (step) {// switch ውስጥ እንዲህ ይስተካከላል፦
            case 1: return <PersonalInfoStep resume={resume} setResume={setResume} />;
            case 2: return <SummaryStep resume={resume} setResume={setResume} />;
            case 3: return <EducationStep resume={resume} setResume={setResume} />;
            case 4: return <ExperienceStep resume={resume} setResume={setResume} />;
            case 5: return <ProjectsStep resume={resume} setResume={setResume} />;
            case 6: return <SkillsStep resume={resume} setResume={setResume} />; // Skills + Languages እዚህ ገቡ
            case 7: return <AdditionalInfoStep resume={resume} setResume={setResume} />; // Certs/Awards/Hobbies
            case 8: return <FinalStep resume={resume} setResume={setResume} />; // Preview and Print

            default: return <div className="p-10 text-center text-gray-400">Section under development...</div>;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <nav className="bg-white border-b px-4 py-3 flex justify-between items-center sticky top-0 z-50 shadow-sm">
                <Link href="/" className="font-bold text-blue-600 flex items-center gap-2">
                    <span>←</span> Back to Home
                </Link>
                <div className="flex flex-col items-center">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Step {step} of {totalSteps}</span>
                    <div className="flex gap-1.5 mt-1.5">
                        {[...Array(totalSteps)].map((_, i) => (
                            <div key={i} className={`h-1.5 w-6 rounded-full ${i + 1 <= step ? "bg-blue-600" : "bg-gray-200"}`} />
                        ))}
                    </div>
                </div>
                <div className="w-48"></div> {/* Placeholder for alignment */}
            </nav>
            
            <main className="max-w-3xl mx-auto px-4 mt-10">
                {renderStep()}
            </main>
            
            {/* Next/Back Buttons */}
            <div className="mt-8 xs:mt-10 sm:mt-12 flex flex-col xs:flex-row justify-between items-center border-t pt-6 xs:pt-8 gap-4 xs:gap-0 max-w-3xl mx-auto px-4">
                <button
                    onClick={prevStep}
                    disabled={step === 1}
                    className={`w-full xs:w-auto px-8 xs:px-10 py-4 rounded-2xl font-black transition-all ${step === 1 ? "opacity-0 pointer-events-none" : "bg-white border-2 text-gray-500 hover:bg-gray-50 active:scale-95"}`}
                >
                    Back
                </button>
                {step < totalSteps ? (
                    <button
                        onClick={nextStep}
                        className="w-full xs:w-auto bg-blue-600 text-white px-10 xs:px-14 py-4 rounded-2xl font-black hover:bg-blue-700 shadow-xl shadow-blue-100 active:scale-95 transition-all"
                    >
                        Next Step
                    </button>
                ) : null}
            </div>

        </div>
    );
}