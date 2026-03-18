import StepHeader from "@/src/components/StepHeader";
import InputField from "@/src/components/InputField";
import RichTextEditor from "@/src/components/RichTextEditor";

export default function ExperienceStep({ resume, setResume }: any) {
    const addExperience = () => {
        setResume({
            ...resume,
            experience: [...resume.experience, { company: "", role: "", location: "", startDate: "", endDate: "", isCurrent: false, desc: "" }]
        });
    };

    const updateExp = (index: number, field: string, value: any) => {
        const newExp = [...resume.experience];
        newExp[index][field] = value;
        setResume({ ...resume, experience: newExp });
    };

    return (
        <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-6">
            <StepHeader title="Work Experience" desc="Add your work history" icon="💼" />
            {resume.experience.map((exp: any, i: number) => (
                <div key={i} className="bg-white p-4 xs:p-6 sm:p-8 rounded-3xl border shadow-sm space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <InputField label="Company" value={exp.company} onChange={(v) => updateExp(i, "company", v)} />
                        <InputField label="Role" value={exp.role} onChange={(v) => updateExp(i, "role", v)} />
                        <InputField label="Start Date" value={exp.startDate} onChange={(v) => updateExp(i, "startDate", v)} />
                        <InputField label="End Date" value={exp.endDate} onChange={(v) => updateExp(i, "endDate", v)} />
                    </div>
                    <RichTextEditor
                        label="Job Description"
                        value={exp.desc}
                        onChange={(v: string) => updateExp(i, "desc", v)}
                    />
                </div>
            ))}
            <button onClick={addExperience} className="text-blue-600 font-bold px-4">+ Add Experience</button>
        </div>
    );
}