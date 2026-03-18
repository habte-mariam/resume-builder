import InputField from "@/src/components/InputField";
import StepHeader from "@/src/components/StepHeader";

export default function EducationStep({ resume, setResume }: any) {
    const addEducation = () => {
        setResume({
            ...resume,
            education: [...resume.education, { school: "", degree: "", field: "", startYear: "", endYear: "", location: "", gpa: "", description: "" }]
        });
    };

    const updateEdu = (index: number, field: string, value: string) => {
        const newEdu = [...resume.education];
        newEdu[index][field] = value;
        setResume({ ...resume, education: newEdu });
    };

    return (
        <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-6">
            <StepHeader title="Education" desc="List your education history" icon="🎓" />
            {resume.education.map((edu: any, i: number) => (
                <div key={i} className="bg-white p-4 xs:p-6 sm:p-8 rounded-3xl border shadow-sm space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <InputField label="School/University" value={edu.school} onChange={(v) => updateEdu(i, "school", v)} />
                        <InputField label="Degree" value={edu.degree} onChange={(v) => updateEdu(i, "degree", v)} />
                        <InputField label="Field of Study" value={edu.field} onChange={(v) => updateEdu(i, "field", v)} />
                        <InputField label="Location" value={edu.location} onChange={(v) => updateEdu(i, "location", v)} />
                        <InputField label="Start Year" value={edu.startYear} onChange={(v) => updateEdu(i, "startYear", v)} />
                        <InputField label="Graduation Year" value={edu.endYear} onChange={(v) => updateEdu(i, "endYear", v)} />
                    </div>
                </div>
            ))}
            <button onClick={addEducation} className="text-blue-600 font-bold px-4">+ Add Education</button>
        </div>
    );
}