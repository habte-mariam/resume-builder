import React from "react";
import { Users, Envelope, Phone, Briefcase, Trash, Plus, IdentificationBadge } from "@phosphor-icons/react";

interface Reference {
  id?: number;
  name: string;
  relationship: string;
  company: string;
  email: string;
  phone: string;
}

interface Props {
  references: Reference[];
  setReferences: (refs: Reference[]) => void;
}

export default function ReferencesForm({ references, setReferences }: Props) {
  const addReference = () => {
    setReferences([...references, { name: "", relationship: "", company: "", email: "", phone: "" }]);
  };

  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newList = [...references];
    newList[index] = { ...newList[index], [name]: value };
    setReferences(newList);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 text-left pb-10">
      <div className="border-b border-slate-100 pb-5 flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <Users size={32} weight="duotone" className="text-purple-600" /> References
          </h2>
          <p className="text-slate-500 font-medium text-sm">People who can vouch for your professional character.</p>
        </div>
        <button onClick={addReference} className="bg-purple-50 text-purple-700 px-4 py-2 rounded-xl font-bold text-sm hover:bg-purple-100 flex items-center gap-2 transition-all">
          <Plus size={18} weight="bold" /> Add Reference
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {references.map((ref, index) => (
          <div key={index} className="group relative bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
            <button
              onClick={() => setReferences(references.filter((_, i) => i !== index))}
              className="absolute top-4 right-4 text-slate-300 hover:text-red-500 transition-colors"
            >
              <Trash size={20} />
            </button>

            <div className="space-y-4">
              {/* Full Name */}
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">Reference Name *</label>
                <input name="name" value={ref.name} onChange={(e) => handleChange(index, e)} className="w-full font-bold text-slate-800 outline-none border-b border-slate-100 focus:border-purple-500 bg-transparent py-1 transition-all" placeholder="e.g. Dr. Abebe" />
              </div>

              {/* Relationship & Company */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-400 uppercase flex items-center gap-1"><IdentificationBadge size={12} /> Relation</label>
                  <input name="relationship" value={ref.relationship} onChange={(e) => handleChange(index, e)} className="w-full text-sm text-slate-600 outline-none border-b border-slate-100 focus:border-purple-500 bg-transparent" placeholder="e.g. Manager" />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-400 uppercase flex items-center gap-1"><Briefcase size={12} /> Company</label>
                  <input name="company" value={ref.company} onChange={(e) => handleChange(index, e)} className="w-full text-sm text-slate-600 outline-none border-b border-slate-100 focus:border-purple-500 bg-transparent" placeholder="e.g. Google" />
                </div>
              </div>

              {/* Contact Info */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-400 uppercase flex items-center gap-1"><Envelope size={12} /> Email</label>
                  <input name="email" value={ref.email} onChange={(e) => handleChange(index, e)} className="w-full text-xs text-blue-600 outline-none" placeholder="ref@example.com" />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-400 uppercase flex items-center gap-1"><Phone size={12} /> Phone</label>
                  <input name="phone" value={ref.phone} onChange={(e) => handleChange(index, e)} className="w-full text-xs text-slate-600 outline-none" placeholder="+251 9..." />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}