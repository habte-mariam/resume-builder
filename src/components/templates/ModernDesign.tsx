import React from "react";
import { Mail, Phone, MapPin, Linkedin, Github, Globe, Award, GraduationCap, Briefcase, User } from "lucide-react";

type ResumeData = {
    firstName: string;
    lastName: string;
    jobTitle: string;
    profileImage?: string;
    email?: string;
    phone?: string;
    address?: string;
    linkedin?: string;
    github?: string;
    website?: string;
    hardSkills?: string[];
    softSkills?: string[];
    languages?: { name: string; level: string }[];
    summary?: string;
    experience?: Array<{
        role: string;
        company: string;
        location?: string;
        startDate?: string;
        endDate?: string;
        isCurrent?: boolean;
        desc?: string;
    }>;
    education?: Array<{
        school: string;
        degree: string;
        field?: string;
        startYear?: string;
        endYear?: string;
        location?: string;
        gpa?: string;
        description?: string;
    }>;
    awards?: Array<{
        title: string;
        year?: string;
        issuer?: string;
    }>;
};

interface ModernDesignProps {
    data: ResumeData;
}

const ModernDesign: React.FC<ModernDesignProps> = ({ data }) => {
    const hasSkills = data.hardSkills?.some(Boolean) || data.softSkills?.some(Boolean);
    const hasLanguages = data.languages?.some(lang => lang.name);
    const hasExperience = data.experience?.some(exp => exp.role || exp.company || exp.desc);
    const hasEducation = data.education?.some(edu => edu.school || edu.degree || edu.description);
    const hasAwards = data.awards?.some(award => award.title);

    return (
        <div className="w-[210mm] min-h-[297mm] mx-auto my-8 bg-white shadow-2xl rounded-2xl overflow-hidden border border-blue-100 print:w-full print:shadow-none print:rounded-none print:border-none" style={{ fontFamily: 'Inter, sans-serif' }}>
            <div className="flex flex-col md:flex-row h-full">
                {/* Sidebar */}
                <aside className="md:w-[30%] w-full bg-blue-50/80 px-8 py-10 flex flex-col items-center gap-8 border-r border-blue-100">
                    {data.profileImage && (
                        <img src={data.profileImage} alt="Profile" className="w-32 h-32 rounded-full object-cover border-4 border-blue-200 shadow-md mb-4" />
                    )}
                    <div className="text-center">
                        <h1 className="text-2xl font-extrabold text-blue-700 tracking-tight leading-tight">{data.firstName} {data.lastName}</h1>
                        {data.jobTitle && <h2 className="text-base font-semibold text-blue-400 mt-1">{data.jobTitle}</h2>}
                    </div>
                    {/* Contact Info */}
                    <div className="w-full mt-6">
                        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-2"><User className="w-4 h-4 text-blue-400" />Profile</h3>
                        <ul className="space-y-2 text-sm text-slate-700">
                            {data.email && <li className="flex items-center gap-2"><Mail className="w-4 h-4 text-blue-400" />{data.email}</li>}
                            {data.phone && <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-blue-400" />{data.phone}</li>}
                            {data.address && <li className="flex items-center gap-2"><MapPin className="w-4 h-4 text-blue-400" />{data.address}</li>}
                            {data.linkedin && <li className="flex items-center gap-2"><Linkedin className="w-4 h-4 text-blue-400" />{data.linkedin}</li>}
                            {data.github && <li className="flex items-center gap-2"><Github className="w-4 h-4 text-blue-400" />{data.github}</li>}
                            {data.website && <li className="flex items-center gap-2"><Globe className="w-4 h-4 text-blue-400" />{data.website}</li>}
                        </ul>
                    </div>
                    {/* Skills */}
                    {hasSkills && (
                        <div className="w-full mt-8">
                            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Skills</h3>
                            <div className="flex flex-wrap gap-2">
                                {data.hardSkills?.filter(Boolean).map((skill: string, i: number) => (
                                    <span key={`hard-${i}`} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">{skill}</span>
                                ))}
                                {data.softSkills?.filter(Boolean).map((skill: string, i: number) => (
                                    <span key={`soft-${i}`} className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-semibold">{skill}</span>
                                ))}
                            </div>
                        </div>
                    )}
                    {/* Languages */}
                    {hasLanguages && (
                        <div className="w-full mt-8">
                            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Languages</h3>
                            <ul className="flex flex-wrap gap-2">
                                {data.languages?.filter(lang => lang.name).map((lang: { name: string; level: string }, i: number) => (
                                    <li key={i} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                                        {lang.name} {lang.level && <span className="text-slate-400">({lang.level})</span>}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </aside>
                {/* Main Content */}
                <main className="md:w-[70%] w-full px-8 py-10 bg-white flex flex-col gap-10">
                    {data.summary && (
                        <section>
                            <h2 className="text-lg font-bold text-blue-700 flex items-center gap-2 mb-2"><User className="w-5 h-5 text-blue-400" />Summary</h2>
                            <div className="prose prose-blue max-w-none text-slate-700 text-base" dangerouslySetInnerHTML={{ __html: data.summary }} />
                        </section>
                    )}
                    {hasExperience && (
                        <section>
                            <h2 className="text-lg font-bold text-blue-700 flex items-center gap-2 mb-2"><Briefcase className="w-5 h-5 text-blue-400" />Experience</h2>
                            <div className="flex flex-col gap-6">
                                {data.experience?.filter(exp => exp.role || exp.company || exp.desc).map((exp: any, i: number) => (
                                    <div key={i}>
                                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1 md:gap-0">
                                            <div>
                                                {exp.role && <span className="font-bold text-slate-800 text-base">{exp.role}</span>}
                                                {exp.company && <span className="text-blue-500 font-semibold ml-2">{exp.company}</span>}
                                            </div>
                                            {(exp.startDate || exp.endDate || exp.isCurrent) && (
                                                <div className="text-xs text-slate-400 font-medium">
                                                    {exp.startDate}{exp.startDate && (exp.endDate || exp.isCurrent) ? ' - ' : ''}{exp.isCurrent ? 'Present' : exp.endDate}
                                                </div>
                                            )}
                                        </div>
                                        {exp.location && <div className="text-xs text-slate-500 mb-1">{exp.location}</div>}
                                        {exp.desc && <div className="prose prose-blue max-w-none text-slate-700 text-sm mt-1" dangerouslySetInnerHTML={{ __html: exp.desc }} />}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                    {hasEducation && (
                        <section>
                            <h2 className="text-lg font-bold text-blue-700 flex items-center gap-2 mb-2"><GraduationCap className="w-5 h-5 text-blue-400" />Education</h2>
                            <div className="flex flex-col gap-6">
                                {data.education?.filter(edu => edu.school || edu.degree).map((edu: any, i: number) => (
                                    <div key={i}>
                                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1 md:gap-0">
                                            <div>
                                                {edu.degree && <span className="font-bold text-slate-800 text-base">{edu.degree}</span>}
                                                {edu.school && <span className="text-blue-500 font-semibold ml-2">{edu.school}</span>}
                                            </div>
                                            {(edu.startYear || edu.endYear) && (
                                                <div className="text-xs text-slate-400 font-medium">{edu.startYear}{edu.endYear && ` - ${edu.endYear}`}</div>
                                            )}
                                        </div>
                                        {(edu.field || edu.location) && (
                                            <div className="text-xs text-slate-500 mb-1">{edu.field}{edu.field && edu.location && ' | '}{edu.location}</div>
                                        )}
                                        {edu.gpa && <div className="text-xs text-blue-400">GPA: {edu.gpa}</div>}
                                        {edu.description && <div className="prose prose-blue max-w-none text-slate-700 text-sm mt-1" dangerouslySetInnerHTML={{ __html: edu.description }} />}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                    {hasAwards && (
                        <section>
                            <h2 className="text-lg font-bold text-blue-700 flex items-center gap-2 mb-2"><Award className="w-5 h-5 text-blue-400" />Awards</h2>
                            <ul className="flex flex-col gap-2">
                                {data.awards?.filter(award => award.title).map((award: any, i: number) => (
                                    <li key={i} className="text-slate-700 text-sm flex items-center gap-2">
                                        <Award className="w-4 h-4 text-blue-300" />
                                        <span className="font-semibold">{award.title}</span>
                                        {award.year && <span className="text-xs text-slate-400">{award.year}</span>}
                                        {award.issuer && <span className="text-xs text-slate-400 ml-2">{award.issuer}</span>}
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}
                </main>
            </div>
        </div>
    );
};

export default ModernDesign;
