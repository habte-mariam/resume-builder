import React from "react";
import { 
  Briefcase, MapPin, Calendar, Trash, Plus, 
  CaretDown, CaretUp, CheckCircle 
} from "@phosphor-icons/react";

interface Experience {
  id?: number;
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

interface Props {
  experiences: Experience[];
  setExperiences: (experiences: Experience[]) => void;
}

export default function ExperienceForm({ experiences, setExperiences }: Props) {
  
  // አዲስ ባዶ ስራ ልምድ ለመጨመር
  const addExperience = () => {
    const newExp: Experience = {
      company: "",
      role: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: ""
    };
    setExperiences([...experiences, newExp]);
  };

  // መረጃ ሲቀየር ለማዘመን
  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const newExperiences = [...experiences];
    
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      newExperiences[index] = { ...newExperiences[index], [name]: checked };
    } else {
      newExperiences[index] = { ...newExperiences[index], [name]: value };
    }
    setExperiences(newExperiences);
  };

  // ስራ ልምድ ለማጥፋት
  const removeExperience = (index: number) => {
    const newExperiences = experiences.filter((_, i) => i !== index);
    setExperiences(newExperiences);
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
          className="flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-xl font-bold text-sm hover:bg-blue-100 transition-all"
        >
          <Plus size={18} weight="bold" /> Add Role
        </button>
      </div>

      {experiences.length === 0 && (
        <div className="py-20 text-center border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50/50">
          <Briefcase size={48} weight="thin" className="mx-auto text-slate-300 mb-4" />
          <p className="text-slate-400 font-medium">No experience added yet. Click the button above to start.</p>
        </div>
      )}

      <div className="space-y-6">
        {experiences.map((exp, index) => (
          <div key={index} className="group relative bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
            
            {/* Remove Button */}
            <button 
              onClick={() => removeExperience(index)}
              className="absolute -top-2 -right-2 p-2 bg-red-50 text-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hover:bg-red-500 hover:text-white"
            >
              <Trash size={18} weight="bold" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Company & Role */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Company Name *</label>
                <input 
                  name="company" 
                  value={exp.company} 
                  onChange={(e) => handleChange(index, e)}
                  className="w-full p-4 bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl outline-none transition-all font-semibold" 
                  placeholder="e.g. Google / Safaricom" 
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Job Role / Position *</label>
                <input 
                  name="role" 
                  value={exp.role} 
                  onChange={(e) => handleChange(index, e)}
                  className="w-full p-4 bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl outline-none transition-all font-semibold" 
                  placeholder="e.g. Senior Backend Developer" 
                />
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
                    placeholder="e.g. Addis Ababa, Ethiopia (or Remote)" 
                  />
                </div>
              </div>

              {/* Dates */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Start Date *</label>
                <div className="relative">
                  <Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input 
                    name="startDate" 
                    value={exp.startDate} 
                    onChange={(e) => handleChange(index, e)}
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl outline-none transition-all font-medium" 
                    placeholder="e.g. March 2022" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">End Date</label>
                  <label className="flex items-center gap-2 cursor-pointer group/check">
                    <input 
                      type="checkbox" 
                      name="current"
                      checked={exp.current}
                      onChange={(e) => handleChange(index, e)}
                      className="hidden" 
                    />
                    <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${exp.current ? "bg-blue-600 border-blue-600" : "border-slate-300"}`}>
                      {exp.current && <CheckCircle size={12} weight="fill" className="text-white" />}
                    </div>
                    <span className={`text-[10px] font-bold uppercase transition-colors ${exp.current ? "text-blue-600" : "text-slate-400"}`}>Currently Work Here</span>
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
                    placeholder="e.g. June 2024" 
                  />
                </div>
              </div>

              {/* Description - schema: description */}
              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Role Description & Achievements</label>
                <textarea 
                  name="description" 
                  value={exp.description} 
                  onChange={(e) => handleChange(index, e)}
                  className="w-full p-4 bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-3xl h-44 outline-none transition-all font-medium resize-none text-slate-700" 
                  placeholder="• Developed a high-traffic web application...&#10;• Improved system performance by 40%..." 
                />
              </div>

            </div>
          </div>
        ))}
      </div>

      {experiences.length > 0 && (
        <button 
          onClick={addExperience}
          className="w-full py-4 border-2 border-dashed border-slate-200 rounded-3xl text-slate-400 font-bold hover:bg-slate-50 hover:border-blue-200 hover:text-blue-500 transition-all flex items-center justify-center gap-2"
        >
          <Plus size={20} weight="bold" /> Add Another Experience
        </button>
      )}
    </div>
  );
}