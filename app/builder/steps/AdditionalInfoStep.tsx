import InputField from "@/src/components/InputField";
import StepHeader from "@/src/components/StepHeader";

export default function AdditionalInfoStep({ resume, setResume }: any) {

    // Helpers to add new items
    const addItem = (field: string, newItem: any) => {
        setResume({ ...resume, [field]: [...resume[field], newItem] });
    };

    const updateItem = (field: string, index: number, subField: string, value: string) => {
        const updatedList = [...resume[field]];
        updatedList[index][subField] = value;
        setResume({ ...resume, [field]: updatedList });
    };

    return (
        <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-10 pb-10">
            <StepHeader title="Extra Details" desc="Certificates, awards, and other activities" icon="🌟" />

            {/* 1. Certifications Section */}
            <section className="space-y-4">
                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">📜 Certifications</h3>
                <div className="grid gap-4">
                    {resume.certifications.map((cert: any, i: number) => (
                        <div key={i} className="bg-white p-6 rounded-3xl border shadow-sm grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <InputField label="Name" value={cert.title} onChange={(v) => updateItem("certifications", i, "title", v)} />
                            <InputField label="Issuer" value={cert.issuer} onChange={(v) => updateItem("certifications", i, "issuer", v)} />
                        </div>
                    ))}
                </div>
                <button onClick={() => addItem("certifications", { title: "", issuer: "", date: "" })} className="text-blue-600 text-sm font-bold ml-2">+ Add Certificate</button>
            </section>

            <hr className="border-gray-100" />

            {/* 2. Awards Section */}
            <section className="space-y-4">
                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">🏆 Awards</h3>
                <div className="grid gap-4">
                    {resume.awards.map((award: any, i: number) => (
                        <div key={i} className="bg-white p-6 rounded-3xl border shadow-sm grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <InputField label="Award Title" value={award.title} onChange={(v) => updateItem("awards", i, "title", v)} />
                            <InputField label="Year" value={award.year} onChange={(v) => updateItem("awards", i, "year", v)} />
                        </div>
                    ))}
                </div>
                <button onClick={() => addItem("awards", { title: "", year: "", issuer: "" })} className="text-blue-600 text-sm font-bold ml-2">+ Add Award</button>
            </section>

            <hr className="border-gray-100" />

            {/* 3. Volunteer Work Section */}
            <section className="space-y-4">
                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">🌱 Volunteer Work</h3>
                {resume.volunteer.map((vol: any, i: number) => (
                    <div key={i} className="bg-white p-6 rounded-3xl border shadow-sm space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <InputField label="Organization" value={vol.organization} onChange={(v) => updateItem("volunteer", i, "organization", v)} />
                            <InputField label="Role" value={vol.role} onChange={(v) => updateItem("volunteer", i, "role", v)} />
                        </div>
                    </div>
                ))}
                <button onClick={() => addItem("volunteer", { organization: "", role: "", desc: "" })} className="text-blue-600 text-sm font-bold ml-2">+ Add Volunteer Experience</button>
            </section>

            <hr className="border-gray-100" />

            {/* 4. Hobbies Section */}
            <section className="space-y-4">
                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">🎨 Hobbies</h3>
                <div className="bg-white p-6 rounded-3xl border shadow-sm">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Your Hobbies (use commas)</label>
                    <input
                        className="w-full p-4 bg-gray-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Reading, Coding, Traveling..."
                        value={Array.isArray(resume.hobbies) ? resume.hobbies.join(", ") : ""}
                        onChange={(e) => setResume({ ...resume, hobbies: e.target.value.split(",").map(s => s.trim()) })}
                    />
                </div>
            </section>
        </div>
    );
}