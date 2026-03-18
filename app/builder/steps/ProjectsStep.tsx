import InputField from "@/src/components/InputField";
import StepHeader from "@/src/components/StepHeader";

export default function ProjectsStep({ resume, setResume }: any) {
    const addProject = () => {
        setResume({ ...resume, projects: [...resume.projects, { title: "", link: "", description: "", technologies: "" }] });
    };

    const updateProj = (index: number, field: string, value: string) => {
        const newProj = [...resume.projects];
        newProj[index][field] = value;
        setResume({ ...resume, projects: newProj });
    };

    return (
        <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-6">
            <StepHeader title="Projects" desc="List your best projects" icon="🚀" />
            {resume.projects.map((proj: any, i: number) => (
                <div key={i} className="bg-white p-6 rounded-3xl border shadow-sm space-y-4">
                    <InputField label="Project Title" value={proj.title} onChange={(v) => updateProj(i, "title", v)} />
                    <InputField label="Tech Stack" placeholder="React, Next.js, etc." value={proj.technologies} onChange={(v) => updateProj(i, "technologies", v)} />
                    <InputField label="Project Link" value={proj.link} onChange={(v) => updateProj(i, "link", v)} />
                    <textarea
                        className="w-full p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="Description..."
                        value={proj.description}
                        onChange={(e) => updateProj(i, "description", e.target.value)}
                    />
                </div>
            ))}
            <button onClick={addProject} className="text-blue-600 font-bold px-4">+ Add Project</button>
        </div>
    );
}