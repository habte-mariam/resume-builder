import React from "react";
import { Lightning, Trash, Plus, Star } from "@phosphor-icons/react"; // ጥቅም ላይ ያልዋሉ አይኮኖች (Circle, CheckCircle) ወጥተዋል

interface Skill {
    id?: number;
    name: string;
    category: string;
    level: string;
}

interface Props {
    skills: Skill[];
    setSkills: (skills: Skill[]) => void;
}

export default function SkillsForm({ skills, setSkills }: Props) {
    const addSkill = () => {
        setSkills([...skills, { name: "", category: "Frontend", level: "Intermediate" }]);
    };

    const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        const newSkills = [...skills];
        newSkills[index] = { ...newSkills[index], [name]: value };
        setSkills(newSkills);
    };

    const removeSkill = (index: number) => {
        setSkills(skills.filter((_, i) => i !== index));
    };

    const getLevelColor = (level: string) => {
        switch (level) {
            case "Beginner": return "bg-slate-100 text-slate-600 ring-slate-200";
            case "Intermediate": return "bg-blue-50 text-blue-600 ring-blue-100";
            case "Expert": return "bg-indigo-50 text-indigo-600 ring-indigo-100";
            default: return "bg-slate-50 text-slate-500 ring-slate-100";
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 text-left pb-10">
            <div className="border-b border-slate-100 pb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-yellow-400/10 rounded-lg">
                            <Lightning size={28} weight="fill" className="text-yellow-500" />
                        </div>
                        <h2 className="text-3xl font-black text-slate-900 tracking-tight">Skills & Expertise</h2>
                    </div>
                    <p className="text-slate-500 font-medium ml-1">Showcase your technical depth and professional capabilities.</p>
                </div>
                <button
                    onClick={addSkill}
                    className="group flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-2xl font-bold text-sm hover:bg-blue-600 transition-all shadow-lg shadow-slate-200 active:scale-95"
                >
                    <Plus size={18} weight="bold" className="group-hover:rotate-90 transition-transform" />
                    Add New Skill
                </button>
            </div>

            {skills.length === 0 && (
                <div className="py-16 text-center border-2 border-dashed border-slate-200 rounded-4xl bg-slate-50/50"> {/* rounded-4xl ተብሎ ተስተካክሏል */}
                    <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                        <Star size={32} weight="thin" className="text-slate-300" />
                    </div>
                    <p className="text-slate-400 font-medium">No skills added yet. Let's add some of your talents!</p>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {skills.map((skill, index) => (
                    <div
                        key={index}
                        className="group relative flex flex-col gap-4 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-blue-500/5 hover:border-blue-200 transition-all duration-300"
                    > {/* rounded-3xl ተብሎ ተስተካክሏል */}
                        <button
                            onClick={() => removeSkill(index)}
                            className="absolute top-4 right-4 p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-all opacity-0 group-hover:opacity-100"
                        >
                            <Trash size={18} weight="bold" />
                        </button>

                        <div className="flex-1 space-y-4">
                            <div className="space-y-1">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] ml-1">Skill Name</label>
                                <input
                                    name="name"
                                    value={skill.name}
                                    onChange={(e) => handleChange(index, e)}
                                    className="w-full text-lg font-bold text-slate-800 outline-none bg-transparent placeholder:text-slate-200"
                                    placeholder="e.g. React.js"
                                />
                            </div>

                            <div className="flex flex-wrap gap-3">
                                <div className="flex-1 min-w-30"> {/* min-w-30 ተብሎ ተስተካክሏል */}
                                    <select
                                        name="category"
                                        value={skill.category}
                                        onChange={(e) => handleChange(index, e)}
                                        className="w-full text-[11px] font-bold uppercase tracking-wider bg-slate-50 border-none px-3 py-2 rounded-xl text-slate-500 outline-none cursor-pointer hover:bg-slate-100 transition-colors"
                                    >
                                        <option value="Frontend">Frontend</option>
                                        <option value="Backend">Backend</option>
                                        <option value="Design">Design</option>
                                        <option value="Tools">Tools</option>
                                        <option value="Soft Skills">Soft Skills</option>
                                        <option value="Language">Language</option>
                                    </select>
                                </div>

                                <div className="flex-1 min-w-30"> {/* min-w-30 ተብሎ ተስተካክሏል */}
                                    <select
                                        name="level"
                                        value={skill.level}
                                        onChange={(e) => handleChange(index, e)}
                                        className={`w-full text-[11px] font-bold uppercase tracking-wider px-3 py-2 rounded-xl ring-1 outline-none cursor-pointer transition-all ${getLevelColor(skill.level)}`}
                                    >
                                        <option value="Beginner">Beginner</option>
                                        <option value="Intermediate">Intermediate</option>
                                        <option value="Expert">Expert</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="w-full h-1.5 bg-slate-50 rounded-full overflow-hidden">
                            <div
                                className={`h-full transition-all duration-1000 ${skill.level === 'Expert' ? 'w-full bg-indigo-500' :
                                    skill.level === 'Intermediate' ? 'w-2/3 bg-blue-500' :
                                        'w-1/3 bg-slate-400'
                                    }`}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}