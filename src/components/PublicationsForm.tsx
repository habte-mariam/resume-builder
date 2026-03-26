import React from "react";
import { Book, Globe, Calendar, Trash, Plus, Quotes } from "@phosphor-icons/react";

interface Publication {
    id?: number;
    name: string;
    publisher: string;
    releaseDate: string;
    url: string;
    summary: string;
}

interface Props {
    publications: Publication[];
    setPublications: (pubs: Publication[]) => void;
}

export default function PublicationsForm({ publications, setPublications }: Props) {
    const addPublication = () => {
        setPublications([...publications, { name: "", publisher: "", releaseDate: "", url: "", summary: "" }]);
    };

    const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const newList = [...publications];
        newList[index] = { ...newList[index], [name]: value };
        setPublications(newList);
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500 text-left pb-10">
            <div className="border-b border-slate-100 pb-5 flex justify-between items-end">
                <div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                        <Book size={32} weight="duotone" className="text-emerald-600" /> Publications
                    </h2>
                    <p className="text-slate-500 font-medium text-sm">Research papers, articles, or books you've published.</p>
                </div>
                <button onClick={addPublication} className="bg-emerald-50 text-emerald-700 px-4 py-2 rounded-xl font-bold text-sm hover:bg-emerald-100 flex items-center gap-2 transition-all border border-emerald-100">
                    <Plus size={18} weight="bold" /> Add Publication
                </button>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {publications.map((pub, index) => (
                    <div key={index} className="group relative bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
                        <button
                            onClick={() => setPublications(publications.filter((_, i) => i !== index))}
                            className="absolute -top-2 -right-2 p-2 bg-red-50 text-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
                        >
                            <Trash size={18} weight="bold" />
                        </button>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="col-span-2 space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Publication Name / Title *</label>
                                <div className="relative">
                                    <Quotes size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <input name="name" value={pub.name} onChange={(e) => handleChange(index, e)} className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent focus:border-emerald-500 rounded-2xl outline-none font-semibold transition-all" placeholder="e.g. AI Trends in 2026" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Publisher / Journal</label>
                                <input name="publisher" value={pub.publisher} onChange={(e) => handleChange(index, e)} className="w-full p-4 bg-slate-50 border-2 border-transparent focus:border-emerald-500 rounded-2xl outline-none font-semibold transition-all" placeholder="e.g. IEEE / Medium / Tech Blog" />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Release Date</label>
                                <div className="relative">
                                    <Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <input name="releaseDate" value={pub.releaseDate} onChange={(e) => handleChange(index, e)} className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent focus:border-emerald-500 rounded-2xl outline-none transition-all" placeholder="e.g. Feb 2025" />
                                </div>
                            </div>

                            <div className="col-span-2 space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Publication URL</label>
                                <div className="relative">
                                    <Globe size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <input name="url" value={pub.url} onChange={(e) => handleChange(index, e)} className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent focus:border-emerald-500 rounded-2xl outline-none transition-all" placeholder="https://doi.org/..." />
                                </div>
                            </div>

                            <div className="col-span-2 space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Short Summary</label>
                                <textarea name="summary" value={pub.summary} onChange={(e) => handleChange(index, e)} className="w-full p-4 bg-slate-50 border-2 border-transparent focus:border-emerald-500 rounded-2xl h-24 outline-none resize-none transition-all shadow-inner" placeholder="Briefly explain what your publication covers..." />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}