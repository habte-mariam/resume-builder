"use client";
import { useState } from "react";
import Link from "next/link";

export default function Builder() {
    const [step, setStep] = useState(1);
    const [resume, setResume] = useState({
        // 1. Personal Information & Links
        firstName: "", lastName: "", email: "", phone: "+251 ", jobTitle: "", address: "",
        profileImage: "", dateOfBirth: "", gender: "", nationality: "",
        website: "", linkedin: "", github: "", twitter: "",

        // 2. Professional Summary
        summary: "",

        // 3. Education
        education: [{ school: "", degree: "", field: "", startYear: "", endYear: "", location: "", gpa: "", description: "" }],

        // 4. Experience
        experience: [{ company: "", role: "", location: "", startDate: "", endDate: "", isCurrent: false, desc: "" }],

        // 5. Projects
        projects: [{ title: "", link: "", description: "", technologies: "" }],

        // 6. Skills
        hardSkills: [""],
        softSkills: [""],

        // 7. Languages
        languages: [{ name: "", level: "Native" }],

        // 8. Certifications & Awards
        certifications: [{ title: "", issuer: "", date: "", link: "" }],
        awards: [{ title: "", year: "", issuer: "" }],

        // 9. Volunteer & Hobbies
        volunteer: [{ organization: "", role: "", startDate: "", endDate: "", desc: "" }],
        hobbies: [""],

        // 11. References
        references: [{ name: "", position: "", company: "", email: "", phone: "" }],

        // 12. Settings
        layout: "modern", themeColor: "#2563eb", fontSize: "medium"
    });

    const totalSteps = 10;
    const nextStep = () => setStep((prev) => Math.min(prev + 1, totalSteps));
    const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 pb-20 font-sans">
            {/* ናቪጌሽን */}
            <nav className="bg-white border-b p-4 flex justify-between items-center sticky top-0 z-50 shadow-sm">
                <Link href="/" className="font-bold text-blue-600 flex items-center gap-2">
                    <span>←</span> Back to Home
                </Link>
                <div className="flex flex-col items-center">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Step {step} of {totalSteps}</span>
                    <div className="flex gap-1 mt-1">
                        {[...Array(totalSteps)].map((_, i) => (
                            <div key={i} className={`h-1 w-5 rounded-full ${i + 1 <= step ? "bg-blue-600" : "bg-gray-200"}`} />
                        ))}
                    </div>
                </div>
                <div className="flex gap-2">
                    <button onClick={() => window.print()} className="bg-gray-900 text-white px-5 py-2 rounded-xl text-sm font-bold hover:bg-black transition">
                        Preview & Print
                    </button>
                </div>
            </nav>

            <div className="max-w-3xl mx-auto mt-12 px-6">
                <div className="min-h-[550px]">

                    {/* Step 1: Personal Info & Links */}
                    {step === 1 && (
                        <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-8">
                            <StepHeader title="Personal Information" desc="መሰረታዊ መረጃዎን እና ማህበራዊ ገጾችዎን ያስገቡ" icon="👤" />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 bg-white p-8 rounded-3xl border shadow-sm">
                                <InputField label="First Name" value={resume.firstName} onChange={(v) => setResume({ ...resume, firstName: v })} />
                                <InputField label="Last Name" value={resume.lastName} onChange={(v) => setResume({ ...resume, lastName: v })} />
                                <InputField label="Job Title" value={resume.jobTitle} placeholder="e.g. Full Stack Developer" onChange={(v) => setResume({ ...resume, jobTitle: v })} />
                                <InputField label="Email Address" value={resume.email} onChange={(v) => setResume({ ...resume, email: v })} />
                                <InputField label="Phone" value={resume.phone} onChange={(v) => setResume({ ...resume, phone: v })} />
                                <InputField label="Address" value={resume.address} placeholder="City, Country" onChange={(v) => setResume({ ...resume, address: v })} />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 bg-blue-50/30 p-8 rounded-3xl border border-blue-100">
                                <InputField label="LinkedIn URL" value={resume.linkedin} onChange={(v) => setResume({ ...resume, linkedin: v })} />
                                <InputField label="GitHub URL" value={resume.github} onChange={(v) => setResume({ ...resume, github: v })} />
                                <InputField label="Portfolio Website" value={resume.website} onChange={(v) => setResume({ ...resume, website: v })} />
                                <InputField label="Twitter/X" value={resume.twitter} onChange={(v) => setResume({ ...resume, twitter: v })} />
                            </div>
                        </div>
                    )}

                    {/* Step 2: Summary */}
                    {step === 2 && (
                        <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                            <StepHeader title="Professional Summary" desc="ስለ ስራ ማንነትዎ አጭር ማጠቃለያ ይጻፉ" icon="📝" />
                            <textarea
                                value={resume.summary}
                                rows={10}
                                className="w-full p-6 bg-white border rounded-3xl shadow-sm focus:ring-2 focus:ring-blue-500 outline-none transition text-lg"
                                onChange={(e) => setResume({ ...resume, summary: e.target.value })}
                                placeholder="Write a compelling summary of your career..."
                            />
                        </div>
                    )}

                    {/* Step 3: Education */}
                    {step === 3 && (
                        <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-6">
                            <StepHeader title="Education" desc="የትምህርት ታሪክዎን ይጥቀሱ" icon="🎓" />
                            {resume.education.map((edu, i) => (
                                <div key={i} className="bg-white p-8 rounded-3xl border shadow-sm space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <InputField label="School/University" value={edu.school} onChange={(v) => { let n = [...resume.education]; n[i].school = v; setResume({ ...resume, education: n }) }} />
                                        <InputField label="Degree" value={edu.degree} onChange={(v) => { let n = [...resume.education]; n[i].degree = v; setResume({ ...resume, education: n }) }} />
                                        <InputField label="Field of Study" value={edu.field} onChange={(v) => { let n = [...resume.education]; n[i].field = v; setResume({ ...resume, education: n }) }} />
                                        <InputField label="Graduation Year" value={edu.endYear} onChange={(v) => { let n = [...resume.education]; n[i].endYear = v; setResume({ ...resume, education: n }) }} />
                                    </div>
                                </div>
                            ))}
                            <button onClick={() => setResume({ ...resume, education: [...resume.education, { school: "", degree: "", field: "", startYear: "", endYear: "", location: "", gpa: "", description: "" }] })} className="text-blue-600 font-bold px-4">+ Add Education</button>
                        </div>
                    )}

                    {/* Step 4: Experience */}
                    {step === 4 && (
                        <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-6">
                            <StepHeader title="Work Experience" desc="የስራ ልምድዎን ያስገቡ" icon="💼" />
                            {resume.experience.map((exp, i) => (
                                <div key={i} className="bg-white p-8 rounded-3xl border shadow-sm space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <InputField label="Company" value={exp.company} onChange={(v) => { let n = [...resume.experience]; n[i].company = v; setResume({ ...resume, experience: n }) }} />
                                        <InputField label="Role" value={exp.role} onChange={(v) => { let n = [...resume.experience]; n[i].role = v; setResume({ ...resume, experience: n }) }} />
                                    </div>
                                    <textarea className="w-full p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-blue-500 outline-none" rows={4} placeholder="What were your achievements?" value={exp.desc} onChange={(e) => { let n = [...resume.experience]; n[i].desc = e.target.value; setResume({ ...resume, experience: n }) }} />
                                </div>
                            ))}
                            <button onClick={() => setResume({ ...resume, experience: [...resume.experience, { company: "", role: "", location: "", startDate: "", endDate: "", isCurrent: false, desc: "" }] })} className="text-blue-600 font-bold px-4">+ Add Experience</button>
                        </div>
                    )}

                    {/* Step 5: Projects */}
                    {step === 5 && (
                        <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-6">
                            <StepHeader title="Projects" desc="የሰሯቸውን ምርጥ ፕሮጀክቶች ይጥቀሱ" icon="🚀" />
                            {resume.projects.map((proj, i) => (
                                <div key={i} className="bg-white p-8 rounded-3xl border shadow-sm space-y-4">
                                    <InputField label="Project Title" value={proj.title} onChange={(v) => { let n = [...resume.projects]; n[i].title = v; setResume({ ...resume, projects: n }) }} />
                                    <InputField label="Tech Stack" placeholder="React, Next.js, etc." value={proj.technologies} onChange={(v) => { let n = [...resume.projects]; n[i].technologies = v; setResume({ ...resume, projects: n }) }} />
                                    <textarea className="w-full p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Description..." value={proj.description} onChange={(e) => { let n = [...resume.projects]; n[i].description = e.target.value; setResume({ ...resume, projects: n }) }} />
                                </div>
                            ))}
                            <button onClick={() => setResume({ ...resume, projects: [...resume.projects, { title: "", link: "", description: "", technologies: "" }] })} className="text-blue-600 font-bold px-4">+ Add Project</button>
                        </div>
                    )}

                    {/* Step 6: Skills */}
                    {step === 6 && (
                        <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-6">
                            <StepHeader title="Skills" desc="ቴክኒካል እና የግል ችሎታዎች" icon="🛠️" />
                            <div className="bg-white p-8 rounded-3xl border shadow-sm space-y-6">
                                <div>
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Hard Skills (Comma Separated)</label>
                                    <textarea className="w-full p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-blue-500 outline-none" placeholder="JavaScript, React, Node.js, SQL..." onChange={(e) => setResume({ ...resume, hardSkills: e.target.value.split(",") })} />
                                </div>
                                <div>
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Soft Skills</label>
                                    <textarea className="w-full p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Leadership, Communication, Teamwork..." onChange={(e) => setResume({ ...resume, softSkills: e.target.value.split(",") })} />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 7: Languages */}
                    {step === 7 && (
                        <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-6">
                            <StepHeader title="Languages" desc="የሚችሏቸው ቋንቋዎች" icon="🌍" />
                            <div className="bg-white p-8 rounded-3xl border shadow-sm space-y-4">
                                {resume.languages.map((lang, i) => (
                                    <div key={i} className="flex gap-4">
                                        <div className="flex-1"><InputField label="Language" value={lang.name} onChange={(v) => { let n = [...resume.languages]; n[i].name = v; setResume({ ...resume, languages: n }) }} /></div>
                                        <div className="w-1/3">
                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 block">Level</label>
                                            <select className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none" value={lang.level} onChange={(e) => { let n = [...resume.languages]; n[i].level = e.target.value; setResume({ ...resume, languages: n }) }}>
                                                <option>Native</option><option>Fluent</option><option>Intermediate</option><option>Basic</option>
                                            </select>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button onClick={() => setResume({ ...resume, languages: [...resume.languages, { name: "", level: "Native" }] })} className="text-blue-600 font-bold px-4">+ Add Language</button>
                        </div>
                    )}

                    {/* Step 8: Certifications & Awards */}
                    {step === 8 && (
                        <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-6">
                            <StepHeader title="Certifications & Awards" desc="ሽልማቶችና ሰርቲፊኬቶች" icon="🏆" />
                            {resume.certifications.map((cert, i) => (
                                <div key={i} className="bg-white p-8 rounded-3xl border shadow-sm flex gap-4">
                                    <InputField label="Certification" value={cert.title} onChange={(v) => { let n = [...resume.certifications]; n[i].title = v; setResume({ ...resume, certifications: n }) }} />
                                    <InputField label="Issuer" value={cert.issuer} onChange={(v) => { let n = [...resume.certifications]; n[i].issuer = v; setResume({ ...resume, certifications: n }) }} />
                                </div>
                            ))}
                            <button onClick={() => setResume({ ...resume, certifications: [...resume.certifications, { title: "", issuer: "", date: "", link: "" }] })} className="text-blue-600 font-bold px-4">+ Add Certificate</button>
                        </div>
                    )}

                    {/* Step 9: Volunteer & Hobbies */}
                    {step === 9 && (
                        <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-6">
                            <StepHeader title="Volunteer & Hobbies" desc="በጎ ፈቃድ እና ፍላጎቶች" icon="🌱" />
                            <div className="bg-white p-8 rounded-3xl border shadow-sm">
                                <InputField label="Volunteer Experience" placeholder="Briefly describe..." value={resume.volunteer[0].role} onChange={(v) => { let n = [...resume.volunteer]; n[0].role = v; setResume({ ...resume, volunteer: n }) }} />
                                <div className="mt-6 border-t pt-6">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Hobbies (Comma Separated)</label>
                                    <input className="w-full p-4 bg-gray-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-blue-500" value={resume.hobbies.join(", ")} onChange={(e) => setResume({ ...resume, hobbies: e.target.value.split(",") })} />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 10: References */}
                    {step === 10 && (
                        <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-6">
                            <StepHeader title="References" desc="ምስክርነት የሚሰጡ ሰዎች" icon="📞" />
                            {resume.references.map((ref, i) => (
                                <div key={i} className="bg-white p-8 rounded-3xl border shadow-sm grid grid-cols-2 gap-4">
                                    <InputField label="Reference Name" value={ref.name} onChange={(v) => { let n = [...resume.references]; n[i].name = v; setResume({ ...resume, references: n }) }} />
                                    <InputField label="Phone/Email" value={ref.phone} onChange={(v) => { let n = [...resume.references]; n[i].phone = v; setResume({ ...resume, references: n }) }} />
                                </div>
                            ))}
                            <div className="bg-green-50 p-8 rounded-3xl border border-green-200 text-center">
                                <h3 className="text-green-800 font-bold text-xl">All Done!</h3>
                                <p className="text-green-600 mt-2">Check your preview and click print to download your PDF.</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Next/Back Buttons */}
                <div className="mt-12 flex justify-between items-center border-t pt-8">
                    <button onClick={prevStep} disabled={step === 1} className={`px-8 py-3 rounded-2xl font-bold transition ${step === 1 ? "opacity-0" : "bg-white border text-gray-600 hover:bg-gray-50"}`}>
                        Back
                    </button>
                    {step < totalSteps ? (
                        <button onClick={nextStep} className="bg-blue-600 text-white px-12 py-3 rounded-2xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-100 transition">
                            Next Step
                        </button>
                    ) : (
                        <button onClick={() => window.print()} className="bg-green-600 text-white px-12 py-3 rounded-2xl font-bold hover:bg-green-700 shadow-lg shadow-green-100 transition">
                            Finish & Download
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

// Helpers
function StepHeader({ title, desc, icon }: { title: string, desc: string, icon: string }) {
    return (
        <div className="mb-8">
            <span className="text-5xl mb-3 block">{icon}</span>
            <h2 className="text-3xl font-black text-gray-900 tracking-tight uppercase">{title}</h2>
            <p className="text-gray-500 font-medium mt-1">{desc}</p>
        </div>
    );
}

function InputField({ label, placeholder = "", value, onChange }: { label: string, placeholder?: string, value: string, onChange: (v: string) => void }) {
    return (
        <div className="flex flex-col gap-1.5 w-full">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">{label}</label>
            <input
                type="text"
                value={value}
                placeholder={placeholder}
                className="p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition text-sm"
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
}