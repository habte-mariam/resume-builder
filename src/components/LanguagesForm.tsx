import React from "react";
import { Translate, Trash, Plus, ChatCircleText } from "@phosphor-icons/react";

interface Language {
    id?: number;
    name: string;
    proficiency: string;
}

interface Props {
    languages: Language[];
    setLanguages: (langs: Language[]) => void;
}

export default function LanguagesForm({ languages, setLanguages }: Props) {
    const addLanguage = () => {
        setLanguages([...languages, { name: "", proficiency: "Fluent" }]);
    };

    const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        const newList = [...languages];
        newList[index] = { ...newList[index], [name]: value };
        setLanguages(newList);
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500 text-left pb-10">
            <div className="border-b border-slate-100 pb-5 flex justify-between items-end">
                <div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                        <Translate size={32} weight="duotone" className="text-orange-500" /> Languages
                    </h2>
                    <p className="text-slate-500 font-medium text-sm">List the languages you speak and your level of mastery.</p>
                </div>
                <button onClick={addLanguage} className="bg-orange-50 text-orange-700 px-4 py-2 rounded-xl font-bold text-sm hover:bg-orange-100 flex items-center gap-2 transition-all">
                    <Plus size={18} weight="bold" /> Add Language
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {languages.map((lang, index) => (
                    <div key={index} className="group flex items-center gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm hover:border-orange-200 transition-all">
                        <div className="flex-1 grid grid-cols-2 gap-3">
                            <div className="space-y-1">
                                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1"><ChatCircleText size={12} /> Language</label>
                                <input
                                    name="name"
                                    value={lang.name}
                                    onChange={(e) => handleChange(index, e)}
                                    className="w-full font-bold text-slate-800 outline-none bg-transparent border-b border-slate-50 focus:border-orange-500"
                                    placeholder="e.g. Amharic / English"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Proficiency</label>
                                <select
                                    name="proficiency"
                                    value={lang.proficiency}
                                    onChange={(e) => handleChange(index, e)}
                                    className="w-full text-xs font-bold text-orange-600 bg-orange-50 rounded px-2 py-1 outline-none"
                                >
                                    <option value="Native">Native</option>
                                    <option value="Fluent">Fluent</option>
                                    <option value="Professional">Professional</option>
                                    <option value="Intermediate">Intermediate</option>
                                    <option value="Elementary">Elementary</option>
                                </select>
                            </div>
                        </div>
                        <button onClick={() => setLanguages(languages.filter((_, i) => i !== index))} className="p-2 text-slate-300 hover:text-red-500 transition-colors">
                            <Trash size={20} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}