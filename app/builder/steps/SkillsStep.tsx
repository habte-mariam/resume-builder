import StepHeader from "@/src/components/StepHeader";
import InputField from "@/src/components/InputField";

export default function SkillsStep({ resume, setResume }: any) {

    // Language ማስተካከያ helper
    const updateLang = (index: number, field: string, value: string) => {
        const newLang = [...resume.languages];
        newLang[index][field] = value;
        setResume({ ...resume, languages: newLang });
    };

    const addLanguage = () => {
        setResume({ ...resume, languages: [...resume.languages, { name: "", level: "Native" }] });
    };

    return (
        <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-10">
            <StepHeader title="Expertise & Languages" desc="Technical skills and languages you speak" icon="🛠️" />

            {/* 1. Skills Section */}
            <section className="bg-white p-6 sm:p-8 rounded-3xl border shadow-sm space-y-6">
                <h3 className="text-lg font-bold text-gray-800 border-b pb-2">Technical & Soft Skills</h3>

                <div className="space-y-4">
                    <div>
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">
                            Hard Skills (JavaScript, React, Figma...)
                        </label>
                        <textarea
                            className="w-full p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-blue-500 outline-none min-h-[100px]"
                            placeholder="List your technical skills separated by commas..."
                            value={Array.isArray(resume.hardSkills) ? resume.hardSkills.join(", ") : ""}
                            onChange={(e) => setResume({ ...resume, hardSkills: e.target.value.split(",").map(s => s.trim()) })}
                        />
                    </div>

                    <div>
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">
                            Soft Skills (Leadership, Communication...)
                        </label>
                        <textarea
                            className="w-full p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-blue-500 outline-none min-h-[80px]"
                            placeholder="e.g. Project Management, Teamwork..."
                            value={Array.isArray(resume.softSkills) ? resume.softSkills.join(", ") : ""}
                            onChange={(e) => setResume({ ...resume, softSkills: e.target.value.split(",").map(s => s.trim()) })}
                        />
                    </div>
                </div>
            </section>

            {/* 2. Languages Section */}
            <section className="bg-white p-6 sm:p-8 rounded-3xl border shadow-sm space-y-6">
                <h3 className="text-lg font-bold text-gray-800 border-b pb-2">Languages</h3>

                <div className="space-y-4">
                    {resume.languages.map((lang: any, i: number) => (
                        <div key={i} className="flex flex-col sm:flex-row gap-4 items-end animate-in fade-in duration-300">
                            <div className="flex-1 w-full">
                                <InputField label="Language" value={lang.name} onChange={(v) => updateLang(i, "name", v)} />
                            </div>
                            <div className="w-full sm:w-1/3">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 block">Proficiency</label>
                                <select
                                    className="w-full p-3.5 bg-gray-50 border border-transparent rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all appearance-none cursor-pointer"
                                    value={lang.level}
                                    onChange={(e) => updateLang(i, "level", e.target.value)}
                                >
                                    <option>Native</option>
                                    <option>Fluent</option>
                                    <option>Intermediate</option>
                                    <option>Basic</option>
                                </select>
                            </div>
                        </div>
                    ))}

                    <button
                        onClick={addLanguage}
                        className="text-blue-600 text-sm font-bold flex items-center gap-1 hover:underline"
                    >
                        + Add Another Language
                    </button>
                </div>
            </section>
        </div>
    );
}