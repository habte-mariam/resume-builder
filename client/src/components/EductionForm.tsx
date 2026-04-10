import React from "react";
import {
    GraduationCap, Calendar, Trash, Plus,
    BookOpen, Certificate, ChartBar
} from "@phosphor-icons/react";

// 1. በ Drizzle Schema መሰረት የተስተካከለ Interface
interface Education {
    id: number;
    profileId?: number; // ከቀድሞው resumeId ወደ profileId ተቀይሯል
    school: string;
    degree: string;
    fieldOfStudy: string;
    startDate: string;
    endDate: string;
    gpa: string; // አዲስ የተጨመረ በ Schema መሰረት
    description: string;
}

interface Props {
    educationList: Education[];
    setEducation: (education: Education[]) => void;
}

export const EducationForm: React.FC<Props> = ({ educationList, setEducation }) => {

    const addEducation = () => {
        const newEdu: Education = {
            id: Date.now(),
            school: "",
            degree: "",
            fieldOfStudy: "",
            startDate: "",
            endDate: "",
            gpa: "",
            description: "",
        };
        setEducation([...educationList, newEdu]);
    };

    const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const newList = [...educationList];
        newList[index] = { ...newList[index], [name]: value };
        setEducation(newList);
    };

    const removeEducation = (index: number) => {
        setEducation(educationList.filter((_, i) => i !== index));
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500 text-left pb-10">

            {/* Header */}
            <div className="border-b border-slate-100 pb-5 flex justify-between items-end">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <GraduationCap size={32} weight="duotone" className="text-blue-600" />
                        <h2 className="text-3xl font-black text-slate-900 tracking-tight">Education</h2>
                    </div>
                    <p className="text-slate-500 font-medium">Add your academic qualifications and achievements.</p>
                </div>
                <button
                    onClick={addEducation}
                    className="flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-xl font-bold text-sm hover:bg-blue-100 transition-all"
                >
                    <Plus size={18} weight="bold" /> Add Education
                </button>
            </div>

            {educationList.length === 0 && (
                <div className="py-20 text-center border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50/50">
                    <GraduationCap size={48} weight="thin" className="mx-auto text-slate-300 mb-4" />
                    <p className="text-slate-400 font-medium">No education added yet. Start by adding your degree.</p>
                </div>
            )}

            <div className="space-y-6">
                {educationList.map((edu, index) => (
                    <div key={edu.id} className="group relative bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all">

                        <button
                            onClick={() => removeEducation(index)}
                            className="absolute -top-2 -right-2 p-2 bg-red-50 text-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hover:bg-red-500 hover:text-white z-10"
                        >
                            <Trash size={18} weight="bold" />
                        </button>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            {/* School Name */}
                            <div className="md:col-span-2 space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">School / University *</label>
                                <div className="relative">
                                    <BookOpen size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <input
                                        name="school"
                                        value={edu.school}
                                        onChange={(e) => handleChange(index, e)}
                                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl outline-none transition-all font-semibold"
                                        placeholder="e.g. Addis Ababa University"
                                    />
                                </div>
                            </div>

                            {/* Degree */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Degree *</label>
                                <div className="relative">
                                    <Certificate size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <input
                                        name="degree"
                                        value={edu.degree}
                                        onChange={(e) => handleChange(index, e)}
                                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl outline-none transition-all font-semibold"
                                        placeholder="e.g. BSc, High School, etc."
                                    />
                                </div>
                            </div>

                            {/* Field of Study */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Field of Study</label>
                                <input
                                    name="fieldOfStudy"
                                    value={edu.fieldOfStudy}
                                    onChange={(e) => handleChange(index, e)}
                                    className="w-full p-4 bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl outline-none transition-all font-semibold"
                                    placeholder="e.g. Computer Science"
                                />
                            </div>

                            {/* Start Date */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Start Date</label>
                                <div className="relative">
                                    <Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <input
                                        name="startDate"
                                        value={edu.startDate}
                                        onChange={(e) => handleChange(index, e)}
                                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl outline-none transition-all font-medium"
                                        placeholder="e.g. Sep 2018"
                                    />
                                </div>
                            </div>

                            {/* End Date */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">End Date</label>
                                <div className="relative">
                                    <Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <input
                                        name="endDate"
                                        value={edu.endDate}
                                        onChange={(e) => handleChange(index, e)}
                                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl outline-none transition-all font-medium"
                                        placeholder="e.g. July 2022"
                                    />
                                </div>
                            </div>

                            {/* GPA - አዲስ በ Schemaው መሰረት የተጨመረ */}
                            <div className="md:col-span-2 space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">GPA / Result</label>
                                <div className="relative">
                                    <ChartBar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <input
                                        name="gpa"
                                        value={edu.gpa}
                                        onChange={(e) => handleChange(index, e)}
                                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl outline-none transition-all font-semibold"
                                        placeholder="e.g. 3.8 or 8th Grade Result"
                                    />
                                </div>
                            </div>

                            {/* Description */}
                            <div className="md:col-span-2 space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Description / Achievements</label>
                                <textarea
                                    name="description"
                                    value={edu.description}
                                    onChange={(e) => handleChange(index, e)}
                                    className="w-full p-4 bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-3xl h-32 outline-none transition-all font-medium resize-none text-slate-700 shadow-inner"
                                    placeholder="e.g. Specialized in Software Engineering..."
                                />
                            </div>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};