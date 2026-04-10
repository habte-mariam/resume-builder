import React from "react";
import {
    User, Envelope, Phone, MapPin,
    Globe, GithubLogo, LinkedinLogo,
    Briefcase, IdentificationCard, ImageSquare, Trash,
    TelegramLogo, GenderIntersex, Calendar, Flag, PhoneCall
} from "@phosphor-icons/react";

interface Props {
    data: any;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void; // HTMLSelectElement እዚህ መኖሩን አረጋግጥ
    onImageChange?: (imageUrl: string) => void;
}

export default function PersonalInfo({ data, onChange, onImageChange }: Props) {
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && onImageChange) {
            const reader = new FileReader();
            reader.onloadend = () => {
                onImageChange(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

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

                {/* Photo Upload Section */}
                <div className="md:col-span-2 flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50 hover:bg-slate-50 transition-all group">
                    {data.avatarUrl ? (
                        <div className="relative w-32 h-32">
                            <img
                                src={data.avatarUrl}
                                alt="Profile"
                                className="w-full h-full object-cover rounded-2xl shadow-md"
                            />
                            <button
                                onClick={() => onImageChange?.("")}
                                className="absolute -top-2 -right-2 bg-red-500 text-white p-1.5 rounded-full shadow-lg hover:bg-red-600 transition-colors"
                            >
                                <Trash size={14} weight="bold" />
                            </button>
                        </div>
                    ) : (
                        <label className="flex flex-col items-center cursor-pointer">
                            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-3 group-hover:scale-110 transition-transform">
                                <ImageSquare size={32} weight="duotone" className="text-blue-500" />
                            </div>
                            <span className="text-sm font-bold text-slate-600">ፎቶ ይጫኑ</span>
                            <span className="text-xs text-slate-400 mt-1">PNG, JPG (Max. 2MB)</span>
                            <input
                                type="file"
                                className="hidden"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                        </label>
                    )}
                </div>

                {/* Full Name */}
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

                {/* Job Title */}
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

                {/* Location */}
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

                {/* Email Address */}
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

                {/* Phone Number */}
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

                {/* Alternate Phone (ተጠባባቂ ስልክ) */}
                <div className="space-y-2">
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Alt. Phone</label>
                    <div className="relative">
                        <PhoneCall size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            name="altPhone"
                            value={data.altPhone || ""}
                            onChange={onChange}
                            className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl outline-none transition-all font-medium"
                            placeholder="Optional backup number"
                        />
                    </div>
                </div>

                {/* Nationality (ዜግነት) */}
                <div className="space-y-2">
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Nationality</label>
                    <div className="relative">
                        <Flag size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            name="nationality"
                            value={data.nationality || ""}
                            onChange={onChange}
                            className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl outline-none transition-all font-medium"
                            placeholder="Ethiopian"
                        />
                    </div>
                </div>

                {/* Gender & Age (ጾታ እና እድሜ) */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Gender</label>
                        <div className="relative">
                            <GenderIntersex size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                            <select
                                name="gender"
                                value={data.gender || ""}
                                onChange={onChange}
                                className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl outline-none transition-all font-medium appearance-none"
                            >
                                <option value="">Select</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Age</label>
                        <div className="relative">
                            <Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                name="age"
                                value={data.age || ""}
                                onChange={onChange}
                                className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl outline-none transition-all font-medium"
                                placeholder="e.g. 25"
                            />
                        </div>
                    </div>
                </div>

                {/* --- Social Links Section --- */}
                <div className="col-span-2 pt-6 mt-4 border-t border-slate-100">
                    <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest mb-6">Online Presence & Links</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        {/* Telegram (ቴሌግራም) */}
                        <div className="space-y-1">
                            <div className="flex items-center gap-2 text-slate-400 mb-1">
                                <TelegramLogo size={16} /> <span className="text-[10px] font-bold uppercase">Telegram Username</span>
                            </div>
                            <input name="telegram" value={data.telegram || ""} onChange={onChange} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 text-sm" placeholder="@username" />
                        </div>

                        {/* Website */}
                        <div className="space-y-1">
                            <div className="flex items-center gap-2 text-slate-400 mb-1">
                                <Globe size={16} /> <span className="text-[10px] font-bold uppercase">Portfolio Website</span>
                            </div>
                            <input name="website" value={data.website || ""} onChange={onChange} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 text-sm" placeholder="https://yourportfolio.com" />
                        </div>

                        {/* GitHub */}
                        <div className="space-y-1">
                            <div className="flex items-center gap-2 text-slate-400 mb-1">
                                <GithubLogo size={16} /> <span className="text-[10px] font-bold uppercase">GitHub Profile</span>
                            </div>
                            <input name="github" value={data.github || ""} onChange={onChange} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 text-sm" placeholder="github.com/username" />
                        </div>

                        {/* LinkedIn */}
                        <div className="space-y-1">
                            <div className="flex items-center gap-2 text-slate-400 mb-1">
                                <LinkedinLogo size={16} /> <span className="text-[10px] font-bold uppercase">LinkedIn URL</span>
                            </div>
                            <input name="linkedin" value={data.linkedin || ""} onChange={onChange} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 text-sm" placeholder="linkedin.com/in/username" />
                        </div>
                    </div>
                </div>

                {/* Summary */}
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