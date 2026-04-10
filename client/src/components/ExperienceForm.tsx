import React from "react";
import {
  Briefcase, MapPin, Calendar, Trash, Plus, Buildings, IdentificationBadge
} from "@phosphor-icons/react";

interface Experience {
  id: number; // Date.now() በመጠቀም Unique ID እንሰጠዋለን
  profileId?: number;
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

interface Props {
  experience: Experience[];
  setexperience: (experience: Experience[]) => void;
}

export default function ExperienceForm({ experience, setexperience }: Props) {

  const addExperience = () => {
    const newExp: Experience = {
      id: Date.now(),
      company: "",
      role: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: ""
    };
    setexperience([...experience, newExp]);
  };

  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const newexperience = [...experience];

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      // 'Current' ከተመረጠ endDateን ባዶ እናደርጋለን
      newexperience[index] = {
        ...newexperience[index],
        [name]: checked,
        endDate: checked ? "" : newexperience[index].endDate
      };
    } else {
      newexperience[index] = { ...newexperience[index], [name]: value };
    }
    setexperience(newexperience);
  };

  const removeExperience = (index: number) => {
    setexperience(experience.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500 text-left pb-10">

      {/* Header */}
      <div className="border-b border-slate-100 pb-5 flex justify-between items-end">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Briefcase size={32} weight="duotone" className="text-blue-600" />
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Work Experience</h2>
          </div>
          <p className="text-slate-500 font-medium">Add your relevant work history and achievements.</p>
        </div>
        <button
          onClick={addExperience}
          className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
        >
          <Plus size={18} weight="bold" /> Add Role
        </button>
      </div>

      {experience.length === 0 && (
        <div className="py-20 text-center border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50/50">
          <Briefcase size={48} weight="thin" className="mx-auto text-slate-300 mb-4" />
          <p className="text-slate-400 font-medium">No experience added yet. Click the button above to start.</p>
        </div>
      )}

      <div className="space-y-6">
        {experience.map((exp, index) => (
          <div key={exp.id} className="group relative bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all">

            <button
              onClick={() => removeExperience(index)}
              className="absolute -top-2 -right-2 p-2 bg-red-50 text-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hover:bg-red-500 hover:text-white z-10"
            >
              <Trash size={18} weight="bold" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Company Name */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Company Name *</label>
                <div className="relative">
                  <Buildings size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    name="company"
                    value={exp.company}
                    onChange={(e) => handleChange(index, e)}
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl outline-none transition-all font-semibold"
                    placeholder="e.g. Ethio Telecom"
                  />
                </div>
              </div>

              {/* Job Role */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Job Role *</label>
                <div className="relative">
                  <IdentificationBadge size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    name="role"
                    value={exp.role}
                    onChange={(e) => handleChange(index, e)}
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl outline-none transition-all font-semibold"
                    placeholder="e.g. Data Analyst"
                  />
                </div>
              </div>

              {/* Location */}
              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Location</label>
                <div className="relative">
                  <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    name="location"
                    value={exp.location}
                    onChange={(e) => handleChange(index, e)}
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl outline-none transition-all font-medium"
                    placeholder="e.g. Addis Ababa, Ethiopia"
                  />
                </div>
              </div>

              {/* Start Date */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Start Date *</label>
                <div className="relative">
                  <Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    name="startDate"
                    value={exp.startDate}
                    onChange={(e) => handleChange(index, e)}
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl outline-none transition-all font-medium"
                    placeholder="Mar 2022"
                  />
                </div>
              </div>

              {/* End Date with Toggle */}
              <div className="space-y-2">
                <div className="flex justify-between items-center mb-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">End Date</label>
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      name="current"
                      checked={exp.current}
                      onChange={(e) => handleChange(index, e)}
                      className="sr-only peer"
                    />
                    <div className="w-8 h-4 bg-slate-200 rounded-full peer peer-checked:bg-blue-600 transition-all relative after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:after:translate-x-4"></div>
                    <span className={`text-[10px] font-bold uppercase transition-colors ${exp.current ? "text-blue-600" : "text-slate-400"}`}>Current</span>
                  </label>
                </div>
                <div className="relative">
                  <Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    name="endDate"
                    disabled={exp.current}
                    value={exp.current ? "Present" : exp.endDate}
                    onChange={(e) => handleChange(index, e)}
                    className={`w-full pl-12 pr-4 py-4 border-2 border-transparent rounded-2xl outline-none transition-all font-medium ${exp.current ? "bg-slate-100 text-slate-400 cursor-not-allowed" : "bg-slate-50 focus:border-blue-500 focus:bg-white"}`}
                    placeholder="Jun 2024"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Achievements & Responsibilities</label>
                <textarea
                  name="description"
                  value={exp.description}
                  onChange={(e) => handleChange(index, e)}
                  className="w-full p-4 bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-3xl h-44 outline-none transition-all font-medium resize-none text-slate-700 shadow-inner"
                  placeholder="• Managed high customer traffic and resolved technical issues...&#10;• Analyzed data to improve business efficiency..."
                />
              </div>

            </div>
          </div>
        ))}
      </div>

      {experience.length > 0 && (
        <button
          onClick={addExperience}
          className="w-full py-6 border-2 border-dashed border-slate-200 rounded-3xl text-slate-400 font-bold hover:bg-slate-50 hover:border-blue-300 hover:text-blue-600 transition-all flex items-center justify-center gap-2 group"
        >
          <Plus size={20} weight="bold" className="group-hover:rotate-90 transition-transform" />
          Add Another Experience
        </button>
      )}
    </div>
  );
}