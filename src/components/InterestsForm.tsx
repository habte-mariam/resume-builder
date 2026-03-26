import React from "react";
import { Heart, Trash, Plus, Sparkle } from "@phosphor-icons/react";

interface Interest {
  id?: number;
  name: string;
}

interface Props {
  interests: Interest[];
  setInterests: (interests: Interest[]) => void;
}

export default function InterestsForm({ interests, setInterests }: Props) {
  const addInterest = () => {
    setInterests([...interests, { name: "" }]);
  };

  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const newList = [...interests];
    newList[index] = { ...newList[index], name: value };
    setInterests(newList);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 text-left pb-10">
      <div className="border-b border-slate-100 pb-5 flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <Heart size={32} weight="duotone" className="text-pink-500" /> Interests
          </h2>
          <p className="text-slate-500 font-medium text-sm">Hobbies or things you are passionate about.</p>
        </div>
        <button onClick={addInterest} className="bg-pink-50 text-pink-700 px-4 py-2 rounded-xl font-bold text-sm hover:bg-pink-100 flex items-center gap-2 transition-all">
          <Plus size={18} weight="bold" /> Add Interest
        </button>
      </div>

      <div className="flex flex-wrap gap-3">
        {interests.map((interest, index) => (
          <div key={index} className="group flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-slate-100 shadow-sm hover:border-pink-200 transition-all">
            <Sparkle size={14} className="text-pink-400" />
            <input
              value={interest.name}
              onChange={(e) => handleChange(index, e)}
              className="font-bold text-slate-700 outline-none bg-transparent min-w-[100px] w-fit"
              placeholder="e.g. Photography"
            />
            <button onClick={() => setInterests(interests.filter((_, i) => i !== index))} className="text-slate-300 hover:text-red-500 transition-colors">
              <Trash size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}