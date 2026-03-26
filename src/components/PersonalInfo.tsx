import React from "react";
import {
    User, Envelope, Phone, MapPin,
    Globe, GithubLogo, LinkedinLogo, TwitterLogo, StackOverflowLogo,
    Briefcase, IdentificationCard
} from "@phosphor-icons/react";

interface Props {
    data: any;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export default function PersonalInfo({ data, onChange }: Props) {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500 text-left pb-10">
            {/* Header Section */}
            <div className="border-b border-slate-100 pb-5">
                <div className="flex items-center gap-3 mb-2">
                    <IdentificationCard size={32} weight="duotone" className="text-blue-600" />
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">Primary Profile</h2>
                </div>
                <p className="text-slate-500 font-medium">This information will appear at the top of your resume.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">

                {/* Full Name - schema: fullName */}
                <div className="col-span-2 space-y-2">
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name *</label>
                    <div className="relative">
                        <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            name="fullName"
                            required
                            value={data.fullName || ""}
                            onChange={onChange}
                            className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl outline-none transition-all font-semibold shadow-sm"
                            placeholder="e.g. Abebe Bikila"
                        />
                    </div>
                </div>

                {/* Job Title - schema: jobTitle */}
                <div className="space-y-2">
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Professional Title</label>
                    <div className="relative">
                        <Briefcase size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            name="jobTitle"
                            value={data.jobTitle || ""}
                            onChange={onChange}
                            className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl outline-none transition-all font-medium"
                            placeholder="e.g. Senior Software Engineer"
                        />
                    </div>
                </div>

                {/* Location - schema: location */}
                <div className="space-y-2">
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Location</label>
                    <div className="relative">
                        <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            name="location"
                            value={data.location || ""}
                            onChange={onChange}
                            className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl outline-none transition-all font-medium"
                            placeholder="Addis Ababa, Ethiopia"
                        />
                    </div>
                </div>

                {/* Email - schema: email */}
                <div className="space-y-2">
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address *</label>
                    <div className="relative">
                        <Envelope size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            name="email"
                            type="email"
                            required
                            value={data.email || ""}
                            onChange={onChange}
                            className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl outline-none transition-all font-medium"
                            placeholder="name@example.com"
                        />
                    </div>
                </div>

                {/* Phone - schema: phoneNumber */}
                <div className="space-y-2">
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Phone Number</label>
                    <div className="relative">
                        <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            name="phoneNumber"
                            value={data.phoneNumber || ""}
                            onChange={onChange}
                            className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl outline-none transition-all font-medium"
                            placeholder="+251 9..."
                        />
                    </div>
                </div>

                {/* --- Social Links Section --- */}
                <div className="col-span-2 pt-6 mt-4 border-t border-slate-100">
                    <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest mb-6">Online Presence & Links</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        {/* Website - schema: website */}
                        <div className="space-y-1">
                            <div className="flex items-center gap-2 text-slate-400 mb-1">
                                <Globe size={16} /> <span className="text-[10px] font-bold uppercase">Portfolio Website</span>
                            </div>
                            <input name="website" value={data.website || ""} onChange={onChange} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 text-sm" placeholder="https://yourportfolio.com" />
                        </div>

                        {/* GitHub - schema: github */}
                        <div className="space-y-1">
                            <div className="flex items-center gap-2 text-slate-400 mb-1">
                                <GithubLogo size={16} /> <span className="text-[10px] font-bold uppercase">GitHub Profile</span>
                            </div>
                            <input name="github" value={data.github || ""} onChange={onChange} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 text-sm" placeholder="github.com/username" />
                        </div>

                        {/* LinkedIn - schema: linkedin */}
                        <div className="space-y-1">
                            <div className="flex items-center gap-2 text-slate-400 mb-1">
                                <LinkedinLogo size={16} /> <span className="text-[10px] font-bold uppercase">LinkedIn URL</span>
                            </div>
                            <input name="linkedin" value={data.linkedin || ""} onChange={onChange} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 text-sm" placeholder="linkedin.com/in/username" />
                        </div>

                        {/* Twitter - schema: twitter */}
                        <div className="space-y-1">
                            <div className="flex items-center gap-2 text-slate-400 mb-1">
                                <TwitterLogo size={16} /> <span className="text-[10px] font-bold uppercase">Twitter / X</span>
                            </div>
                            <input name="twitter" value={data.twitter || ""} onChange={onChange} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 text-sm" placeholder="@username" />
                        </div>

                        {/* StackOverflow - schema: stackOverflow */}
                        <div className="space-y-1 md:col-span-2">
                            <div className="flex items-center gap-2 text-slate-400 mb-1">
                                <StackOverflowLogo size={16} /> <span className="text-[10px] font-bold uppercase">Stack Overflow</span>
                            </div>
                            <input name="stackOverflow" value={data.stackOverflow || ""} onChange={onChange} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 text-sm" placeholder="stackoverflow.com/users/..." />
                        </div>
                    </div>
                </div>

                {/* Summary - schema: summary */}
                <div className="col-span-2 space-y-2 pt-4">
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Professional Summary</label>
                    <textarea
                        name="summary"
                        value={data.summary || ""}
                        onChange={onChange}
                        className="w-full p-4 bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-3xl h-44 outline-none transition-all font-medium resize-none shadow-inner text-slate-700"
                        placeholder="Write a compelling summary of your career and skills..."
                    />
                </div>
            </div>
        </div>
    );
}