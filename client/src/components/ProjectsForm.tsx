import React from "react";
import { Folder, Link, GithubLogo, Code, Trash, Plus } from "@phosphor-icons/react";

interface Project {
  id?: number;
  name: string;
  description: string;
  link: string;
  githubLink: string;
  technologies: string;
}

interface Props {
  projects: Project[];
  setProjects: (projects: Project[]) => void;
}

export default function ProjectsForm({ projects, setProjects }: Props) {
  const addProject = () => {
    setProjects([...projects, { name: "", description: "", link: "", githubLink: "", technologies: "" }]);
  };

  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const newProjects = [...projects];
    newProjects[index] = { ...newProjects[index], [name]: value };
    setProjects(newProjects);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 text-left pb-10">
      <div className="border-b border-slate-100 pb-5 flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <Folder size={32} weight="duotone" className="text-blue-600" /> Projects
          </h2>
          <p className="text-slate-500 font-medium text-sm">Showcase your best work and open-source contributions.</p>
        </div>
        <button onClick={addProject} className="bg-blue-50 text-blue-600 px-4 py-2 rounded-xl font-bold text-sm hover:bg-blue-100 flex items-center gap-2 transition-all">
          <Plus size={18} weight="bold" /> Add Project
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {projects.map((proj, index) => (
          <div key={index} className="group relative bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
            <button
              onClick={() => setProjects(projects.filter((_, i) => i !== index))}
              className="absolute -top-2 -right-2 p-2 bg-red-50 text-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hover:bg-red-500 hover:text-white"
            >
              <Trash size={18} weight="bold" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-2 space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Project Name *</label>
                <input name="name" value={proj.name} onChange={(e) => handleChange(index, e)} className="w-full p-4 bg-slate-50 border-2 border-transparent focus:border-blue-500 rounded-2xl outline-none font-semibold" placeholder="e.g. E-commerce Mobile App" />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><Link size={14} /> Live Demo Link</label>
                <input name="link" value={proj.link} onChange={(e) => handleChange(index, e)} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 text-sm" placeholder="https://..." />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><GithubLogo size={14} /> Source Code (GitHub)</label>
                <input name="githubLink" value={proj.githubLink} onChange={(e) => handleChange(index, e)} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 text-sm" placeholder="github.com/..." />
              </div>

              <div className="col-span-2 space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><Code size={14} /> Technologies Used (Comma separated)</label>
                <input name="technologies" value={proj.technologies} onChange={(e) => handleChange(index, e)} className="w-full p-4 bg-slate-50 border-2 border-transparent focus:border-blue-500 rounded-2xl outline-none font-medium" placeholder="React Native, Node.js, Firebase..." />
              </div>

              <div className="col-span-2 space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Description</label>
                <textarea name="description" value={proj.description} onChange={(e) => handleChange(index, e)} className="w-full p-4 bg-slate-50 border-2 border-transparent focus:border-blue-500 rounded-2xl h-32 outline-none resize-none" placeholder="Describe what you built and your role..." />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}