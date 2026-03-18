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

interface ClassicDesignProps {
    data: ResumeData;
}

const ClassicDesign: React.FC<ClassicDesignProps> = ({ data }) => {
    const hasSkills = data.hardSkills?.some(Boolean) || data.softSkills?.some(Boolean);
    const hasLanguages = data.languages?.some(lang => lang.name);
    const hasExperience = data.experience?.some(exp => exp.role || exp.company || exp.desc);
    const hasEducation = data.education?.some(edu => edu.school || edu.degree || edu.description);
    const hasAwards = data.awards?.some(award => award.title);

    return (
        <div className="w-[210mm] min-h-[297mm] mx-auto my-8 bg-white shadow-lg rounded-lg overflow-hidden border border-slate-200 print:w-full print:shadow-none print:rounded-none print:border-none" style={{ fontFamily: 'Georgia, serif' }}>
            <div className="px-12 py-10">
                {/* Header */}
                <div className="flex flex-col items-center border-b border-slate-300 pb-6 mb-8">
                    {data.profileImage && (
                        <img src={data.profileImage} alt="Profile" className="w-24 h-24 rounded-full object-cover border-2 border-slate-300 mb-3" />
                    )}
                    <h1 className="text-3xl font-bold text-slate-800 tracking-tight">{data.firstName} {data.lastName}</h1>
                    {data.jobTitle && <h2 className="text-lg font-medium text-slate-500 mt-1">{data.jobTitle}</h2>}
                    <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mt-3 text-slate-600 text-sm">
                        {data.email && <span className="flex items-center gap-1"><Mail className="w-4 h-4" />{data.email}</span>}
                        {data.phone && <span className="flex items-center gap-1"><Phone className="w-4 h-4" />{data.phone}</span>}
                        {data.address && <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{data.address}</span>}
                        {data.linkedin && <span className="flex items-center gap-1"><Linkedin className="w-4 h-4" />{data.linkedin}</span>}
                        {data.github && <span className="flex items-center gap-1"><Github className="w-4 h-4" />{data.github}</span>}
                        {data.website && <span className="flex items-center gap-1"><Globe className="w-4 h-4" />{data.website}</span>}
                    </div>
                </div>
                {/* Main Content */}
                <div className="flex flex-col gap-8">
                    {data.summary && (
                        <section>
                            <h3 className="text-xl font-bold text-slate-700 mb-2 flex items-center gap-2"><User className="w-5 h-5 text-slate-400" />Summary</h3>
                            <div className="prose prose-slate max-w-none text-slate-700" dangerouslySetInnerHTML={{ __html: data.summary }} />
                        </section>
                    )}
                    {hasExperience && (
                        <section>
                            <h3 className="text-xl font-bold text-slate-700 mb-2 flex items-center gap-2"><Briefcase className="w-5 h-5 text-slate-400" />Experience</h3>
                            <div className="flex flex-col gap-4">
                                {data.experience?.filter(exp => exp.role || exp.company || exp.desc).map((exp: any, i: number) => (
                                    <div key={i}>
                                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                            <div>
                                                {exp.role && <span className="font-semibold text-slate-800">{exp.role}</span>}
                                                {exp.company && <span className="text-slate-500 ml-2">{exp.company}</span>}
                                            </div>
                                            {(exp.startDate || exp.endDate || exp.isCurrent) && (
                                                <div className="text-xs text-slate-400">
                                                    {exp.startDate}{exp.startDate && (exp.endDate || exp.isCurrent) ? ' - ' : ''}{exp.isCurrent ? 'Present' : exp.endDate}
                                                </div>
                                            )}
                                        </div>
                                        {exp.location && <div className="text-xs text-slate-500 mb-1">{exp.location}</div>}
                                        {exp.desc && <div className="prose prose-slate max-w-none text-slate-700 text-sm mt-1" dangerouslySetInnerHTML={{ __html: exp.desc }} />}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                    {hasEducation && (
                        <section>
                            <h3 className="text-xl font-bold text-slate-700 mb-2 flex items-center gap-2"><GraduationCap className="w-5 h-5 text-slate-400" />Education</h3>
                            <div className="flex flex-col gap-4">
                                {data.education?.filter(edu => edu.school || edu.degree).map((edu: any, i: number) => (
                                    <div key={i}>
                                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                            <div>
                                                {edu.degree && <span className="font-semibold text-slate-800">{edu.degree}</span>}
                                                {edu.school && <span className="text-slate-500 ml-2">{edu.school}</span>}
                                            </div>
                                            {(edu.startYear || edu.endYear) && (
                                                <div className="text-xs text-slate-400">{edu.startYear}{edu.endYear && ` - ${edu.endYear}`}</div>
                                            )}
                                        </div>
                                        {(edu.field || edu.location) && (
                                            <div className="text-xs text-slate-500 mb-1">{edu.field}{edu.field && edu.location && ' | '}{edu.location}</div>
                                        )}
                                        {edu.gpa && <div className="text-xs text-slate-400">GPA: {edu.gpa}</div>}
                                        {edu.description && <div className="prose prose-slate max-w-none text-slate-700 text-sm mt-1" dangerouslySetInnerHTML={{ __html: edu.description }} />}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                    {(hasSkills || hasLanguages) && (
                        <section>
                            <h3 className="text-xl font-bold text-slate-700 mb-2">Skills & Languages</h3>
                            {hasSkills && (
                                <div className="flex flex-wrap gap-2 mb-2">
                                    {data.hardSkills?.filter(Boolean).map((skill: string, i: number) => (
                                        <span key={`hard-${i}`} className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-semibold">{skill}</span>
                                    ))}
                                    {data.softSkills?.filter(Boolean).map((skill: string, i: number) => (
                                        <span key={`soft-${i}`} className="bg-slate-50 text-slate-500 px-3 py-1 rounded-full text-xs font-semibold">{skill}</span>
                                    ))}
                                </div>
                            )}
                            {hasLanguages && (
                                <div className="flex flex-wrap gap-2">
                                    {data.languages?.filter(lang => lang.name).map((lang: { name: string; level: string }, i: number) => (
                                        <span key={`lang-${i}`} className="bg-slate-200 text-slate-700 px-3 py-1 rounded-full text-xs font-medium">
                                            {lang.name}{lang.level && <span className="text-slate-400"> ({lang.level})</span>}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </section>
                    )}
                    {hasAwards && (
                        <section>
                            <h3 className="text-xl font-bold text-slate-700 mb-2 flex items-center gap-2"><Award className="w-5 h-5 text-slate-400" />Awards</h3>
                            <ul className="flex flex-col gap-1">
                                {data.awards?.filter(award => award.title).map((award: any, i: number) => (
                                    <li key={i} className="text-slate-700 text-sm flex items-center gap-2">
                                        <Award className="w-4 h-4 text-slate-300" />
                                        <span className="font-semibold">{award.title}</span>
                                        {award.year && <span className="text-xs text-slate-400">{award.year}</span>}
                                        {award.issuer && <span className="text-xs text-slate-400 ml-1">{award.issuer}</span>}
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ClassicDesign;
