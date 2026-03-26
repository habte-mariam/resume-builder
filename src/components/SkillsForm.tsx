import React from "react";
import { Lightning, Trash, Plus, ChartBar } from "@phosphor-icons/react";

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
        setSkills([...skills, { name: "", category: "", level: "Intermediate" }]);
    };

    const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        const newSkills = [...skills];
        newSkills[index] = { ...newSkills[index], [name]: value };
        setSkills(newSkills);
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500 text-left pb-10">
            <div className="border-b border-slate-100 pb-5 flex justify-between items-end">
                <div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                        <Lightning size={32} weight="duotone" className="text-blue-600" /> Skills & Expertise
                    </h2>
                    <p className="text-slate-500 font-medium text-sm">List your technical skills and proficiency levels.</p>
                </div>
                <button onClick={addSkill} className="bg-blue-50 text-blue-600 px-4 py-2 rounded-xl font-bold text-sm hover:bg-blue-100 flex items-center gap-2">
                    <Plus size={18} weight="bold" /> Add Skill
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {skills.map((skill, index) => (
                    <div key={index} className="group flex items-center gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm hover:border-blue-200 transition-all">
                        <div className="flex-1 space-y-3">
                            <input
                                name="name"
                                value={skill.name}
                                onChange={(e) => handleChange(index, e)}
                                className="w-full font-bold text-slate-800 outline-none border-b border-transparent focus:border-blue-500 bg-transparent"
                                placeholder="Skill (e.g. TypeScript)"
                            />
                            <div className="flex gap-2">
                                <select name="category" value={skill.category} onChange={(e) => handleChange(index, e)} className="text-[10px] font-black uppercase bg-slate-100 px-2 py-1 rounded text-slate-500 outline-none">
                                    <option value="">Category</option>
                                    <option value="Frontend">Frontend</option>
                                    <option value="Backend">Backend</option>
                                    <option value="Tools">Tools</option>
                                    <option value="Soft Skills">Soft Skills</option>
                                </select>
                                <select name="level" value={skill.level} onChange={(e) => handleChange(index, e)} className="text-[10px] font-black uppercase bg-blue-50 px-2 py-1 rounded text-blue-600 outline-none">
                                    <option value="Beginner">Beginner</option>
                                    <option value="Intermediate">Intermediate</option>
                                    <option value="Expert">Expert</option>
                                </select>
                            </div>
                        </div>
                        <button onClick={() => setSkills(skills.filter((_, i) => i !== index))} className="p-2 text-slate-300 hover:text-red-500 transition-colors">
                            <Trash size={20} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}