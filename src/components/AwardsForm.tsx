import React from "react";
import { Trophy, Medal, Link, Calendar, Trash, Plus } from "@phosphor-icons/react";

interface Award {
  id?: number;
  title: string;
  issuer: string;
  date: string;
  url: string;
  description: string;
}

interface Props {
  awards: Award[];
  setAwards: (awards: Award[]) => void;
}

export default function AwardsForm({ awards, setAwards }: Props) {
  const addAward = () => {
    setAwards([...awards, { title: "", issuer: "", date: "", url: "", description: "" }]);
  };

  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const newAwards = [...awards];
    newAwards[index] = { ...newAwards[index], [name]: value };
    setAwards(newAwards);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 text-left pb-10">
      <div className="border-b border-slate-100 pb-5 flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <Trophy size={32} weight="duotone" className="text-yellow-500" /> Awards & Certs
          </h2>
          <p className="text-slate-500 font-medium text-sm">Recognitions, certifications, and honors you've received.</p>
        </div>
        <button onClick={addAward} className="bg-yellow-50 text-yellow-700 px-4 py-2 rounded-xl font-bold text-sm hover:bg-yellow-100 flex items-center gap-2 transition-all border border-yellow-100">
          <Plus size={18} weight="bold" /> Add Award
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {awards.map((award, index) => (
          <div key={index} className="group relative bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
            <button
              onClick={() => setAwards(awards.filter((_, i) => i !== index))}
              className="absolute -top-2 -right-2 p-2 bg-red-50 text-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hover:bg-red-500 hover:text-white"
            >
              <Trash size={18} weight="bold" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Award/Cert Title *</label>
                <div className="relative">
                  <Medal size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input name="title" value={award.title} onChange={(e) => handleChange(index, e)} className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent focus:border-yellow-500 rounded-2xl outline-none font-semibold transition-all" placeholder="e.g. Employee of the Year" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Issuer / Organization *</label>
                <input name="issuer" value={award.issuer} onChange={(e) => handleChange(index, e)} className="w-full p-4 bg-slate-50 border-2 border-transparent focus:border-yellow-500 rounded-2xl outline-none font-semibold transition-all" placeholder="e.g. Google / Microsoft" />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Date</label>
                <div className="relative">
                  <Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input name="date" value={award.date} onChange={(e) => handleChange(index, e)} className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent focus:border-yellow-500 rounded-2xl outline-none transition-all" placeholder="e.g. Jan 2024" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Credential URL</label>
                <div className="relative">
                  <Link size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input name="url" value={award.url} onChange={(e) => handleChange(index, e)} className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent focus:border-yellow-500 rounded-2xl outline-none transition-all" placeholder="https://verify.link/..." />
                </div>
              </div>

              <div className="col-span-2 space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Short Description</label>
                <textarea name="description" value={award.description} onChange={(e) => handleChange(index, e)} className="w-full p-4 bg-slate-50 border-2 border-transparent focus:border-yellow-500 rounded-2xl h-24 outline-none resize-none transition-all" placeholder="Briefly explain what this recognition was for..." />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}