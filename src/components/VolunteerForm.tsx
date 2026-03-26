import React from "react";
import { HandHeart, MapPin, Calendar, Trash, Plus } from "@phosphor-icons/react";

interface Volunteer {
  id?: number;
  organization: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface Props {
  volunteerWork: Volunteer[];
  setVolunteerWork: (volunteer: Volunteer[]) => void;
}

export default function VolunteerForm({ volunteerWork, setVolunteerWork }: Props) {
  const addVolunteer = () => {
    setVolunteerWork([...volunteerWork, { organization: "", role: "", startDate: "", endDate: "", description: "" }]);
  };

  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const newList = [...volunteerWork];
    newList[index] = { ...newList[index], [name]: value };
    setVolunteerWork(newList);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 text-left pb-10">
      <div className="border-b border-slate-100 pb-5 flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <HandHeart size={32} weight="duotone" className="text-red-500" /> Volunteer Experience
          </h2>
          <p className="text-slate-500 font-medium text-sm">Highlight your social impact and community service.</p>
        </div>
        <button onClick={addVolunteer} className="bg-red-50 text-red-600 px-4 py-2 rounded-xl font-bold text-sm hover:bg-red-100 flex items-center gap-2 transition-all">
          <Plus size={18} weight="bold" /> Add Experience
        </button>
      </div>

      <div className="space-y-6">
        {volunteerWork.map((vol, index) => (
          <div key={index} className="group relative bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
            <button
              onClick={() => setVolunteerWork(volunteerWork.filter((_, i) => i !== index))}
              className="absolute -top-2 -right-2 p-2 bg-red-50 text-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Trash size={18} weight="bold" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Organization *</label>
                <input name="organization" value={vol.organization} onChange={(e) => handleChange(index, e)} className="w-full p-4 bg-slate-50 border-2 border-transparent focus:border-red-500 rounded-2xl outline-none font-semibold transition-all" placeholder="e.g. Red Cross / Local Charity" />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Your Role *</label>
                <input name="role" value={vol.role} onChange={(e) => handleChange(index, e)} className="w-full p-4 bg-slate-50 border-2 border-transparent focus:border-red-500 rounded-2xl outline-none font-semibold transition-all" placeholder="e.g. Community Coordinator" />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Start Date</label>
                <div className="relative">
                  <Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input name="startDate" value={vol.startDate} onChange={(e) => handleChange(index, e)} className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent focus:border-red-500 rounded-2xl outline-none transition-all" placeholder="e.g. 2021" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">End Date</label>
                <div className="relative">
                  <Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input name="endDate" value={vol.endDate} onChange={(e) => handleChange(index, e)} className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent focus:border-red-500 rounded-2xl outline-none transition-all" placeholder="e.g. 2023 / Present" />
                </div>
              </div>

              <div className="col-span-2 space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Impact & Responsibilities</label>
                <textarea name="description" value={vol.description} onChange={(e) => handleChange(index, e)} className="w-full p-4 bg-slate-50 border-2 border-transparent focus:border-red-500 rounded-2xl h-32 outline-none resize-none transition-all" placeholder="Tell us about what you did and the impact you made..." />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}