import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios"; // 🚀 Using standard axios since local instance is missing
import {
    Plus,
    UserCircle,
    Layout,
    X,
    FolderSimple,
    Clock,
    MagnifyingGlass,
    List,
    SquaresFour
} from "@phosphor-icons/react";

export default function Dashboard() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [cvName, setCvName] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // ✅ ለሁለቱም እንዲሰራ የሚከተለውን መንገድ ተጠቀም
    // ሎካል ላይ .env ፋይል ውስጥ VITE_API_URL ካለ እሱን ያነባል፣ ካልሆነ localhost ይጠቀማል
    const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
    const handleCreate = async () => {
        if (!cvName.trim()) return;

        setLoading(true);
        try {
            // 🚀 API_BASE_URL በመጠቀም ጥሪ እናደርጋለን
            const response = await axios.post(`${API_BASE_URL}/api/resumes`, {
                title: cvName,
                experience: [],
                education: [],
                skills: [],
                projects: [],
                awards: [],
                volunteer: [],
                publications: [],
                references: [],
                languages: [],
                interests: [],
                profile: {
                    fullName: "",
                    email: "",
                    phoneNumber: "",
                    altPhone: "",
                    jobTitle: "",
                    location: "",
                    summary: "",
                    gender: "",
                    age: "",
                    nationality: "",
                    telegram: "",
                    website: "",
                    github: "",
                    linkedin: "",
                    twitter: "",
                    stackOverflow: "",
                    avatarUrl: ""
                },
            });

            const newResume = response.data;
            setIsModalOpen(false);
            setCvName("");

            // ሰርቨሩ የሰጠንን ID ተጠቅመን ወደ Editor ገጽ እንሄዳለን
            navigate(`/editor/${newResume.id}`);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error("Network Error Details:", error.response?.data || error.message);
            } else {
                console.error("Unexpected Error:", error);
            }
            alert("ከቤክአንድ ጋር መገናኘት አልተቻለም። ሰርቨሩ በ 5000 ላይ መነሳቱን አረጋግጥ።");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="flex min-h-screen bg-[#FBFBFB] text-slate-900 font-sans">

            {/* --- SIDEBAR (Desktop Only) --- */}
            <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-slate-100 p-6 sticky top-0 h-screen">
                <div className="flex items-center gap-3 mb-10 px-2">
                    <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                        <Layout size={18} weight="fill" className="text-white" />
                    </div>
                    <span className="text-xl font-black tracking-tighter">BUILDER</span>
                </div>

                <nav className="space-y-1 flex-1">
                    <button className="flex items-center gap-3 w-full p-3 bg-slate-900 text-white rounded-xl font-medium shadow-lg shadow-slate-200 transition-all">
                        <SquaresFour size={20} weight="fill" /> Dashboard
                    </button>
                    <button className="flex items-center gap-3 w-full p-3 text-slate-500 hover:bg-slate-50 rounded-xl font-medium transition-all">
                        <FolderSimple size={20} /> My Projects
                    </button>
                    <button className="flex items-center gap-3 w-full p-3 text-slate-500 hover:bg-slate-50 rounded-xl font-medium transition-all">
                        <UserCircle size={20} /> Profile
                    </button>
                </nav>

                <div className="bg-blue-50 p-4 rounded-2xl">
                    <p className="text-xs font-bold text-blue-600 uppercase mb-1">Pro Plan</p>
                    <p className="text-[11px] text-blue-400 leading-tight">Get unlimited exports and premium templates.</p>
                </div>
            </aside>

            {/* --- MAIN CONTENT --- */}
            <main className="flex-1 flex flex-col min-w-0">

                {/* Mobile Header */}
                <header className="lg:hidden flex justify-between items-center p-4 bg-white border-b">
                    <div className="font-black text-xl tracking-tighter">BUILDER</div>
                    <UserCircle size={32} weight="duotone" className="text-slate-400" />
                </header>

                <div className="p-6 lg:p-12 max-w-5xl w-full mx-auto">

                    {/* Welcome & Search */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                        <div>
                            <h1 className="text-4xl font-black tracking-tight mb-2">Hello! 👋</h1>
                            <p className="text-slate-500 font-medium">Ready to build your next big opportunity?</p>
                        </div>
                        <div className="relative group">
                            <MagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-black transition-colors" />
                            <input
                                type="text"
                                placeholder="Search resumes..."
                                className="pl-11 pr-6 py-3 bg-white border border-slate-200 rounded-2xl w-full md:w-64 outline-none focus:border-black transition-all shadow-sm"
                            />
                        </div>
                    </div>

                    {/* Dashboard Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* New Card Button */}
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="h-64 bg-linear-to-br from-blue-600 to-indigo-700 rounded-[2.5rem] p-8 flex flex-col justify-between items-start text-white shadow-xl shadow-blue-100 hover:scale-[1.02] transition-transform relative overflow-hidden group"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
                            <div className="bg-white/20 p-3 rounded-xl backdrop-blur-md">
                                <Plus size={24} weight="bold" />
                            </div>
                            <div className="text-left">
                                <h3 className="text-xl font-bold">New Resume</h3>
                                <p className="text-blue-100 text-sm opacity-80">Start with a blank slate</p>
                            </div>
                        </button>

                        {/* Existing CV Card (Static Example) */}
                        <div className="h-64 bg-white border border-slate-100 rounded-[2.5rem] p-6 flex flex-col shadow-sm hover:shadow-md transition-all cursor-pointer group">
                            <div className="flex-1 bg-slate-50 rounded-2xl mb-4 flex items-center justify-center border border-slate-50 group-hover:bg-slate-100 transition-colors">
                                <Layout size={40} className="text-slate-200" />
                            </div>
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="font-bold text-slate-800">Software Engineer CV</h3>
                                    <span className="text-[11px] text-slate-400 font-bold uppercase flex items-center gap-1">
                                        <Clock size={14} /> Edited yesterday
                                    </span>
                                </div>
                                <button className="p-2 hover:bg-slate-50 rounded-lg transition-colors">
                                    <List size={20} weight="bold" className="text-slate-400" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* --- CREATE MODAL --- */}
            {isModalOpen && (
                <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-white/80 backdrop-blur-xl transition-opacity animate-in fade-in duration-300"
                        onClick={() => !loading && setIsModalOpen(false)}
                    ></div>

                    {/* Modal Content */}
                    <div className="relative bg-white w-full max-w-lg rounded-[2.5rem] p-10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border border-slate-100 animate-in zoom-in-95 duration-300">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-8 right-8 text-slate-400 hover:text-black transition-colors"
                            disabled={loading}
                        >
                            <X size={24} weight="bold" />
                        </button>

                        <div className="space-y-8">
                            <div>
                                <h2 className="text-3xl font-black tracking-tight mb-2">Create New</h2>
                                <p className="text-slate-500 font-medium leading-relaxed">Give your project a name. This is only visible to you.</p>
                            </div>

                            <div className="space-y-2">
                                <input
                                    type="text"
                                    value={cvName}
                                    onChange={(e) => setCvName(e.target.value)}
                                    placeholder="Resume Title (e.g. My Next Job)"
                                    className="w-full text-xl font-bold py-4 border-b-2 border-slate-100 focus:border-black outline-none transition-all placeholder:text-slate-200"
                                    autoFocus
                                    onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
                                    disabled={loading}
                                />
                            </div>

                            <button
                                onClick={handleCreate}
                                disabled={!cvName.trim() || loading}
                                className="w-full py-5 bg-black text-white rounded-2xl font-bold text-lg hover:bg-slate-800 disabled:bg-slate-200 disabled:text-slate-400 transition-all shadow-xl shadow-slate-200 active:scale-[0.98] flex items-center justify-center gap-2"
                            >
                                {loading ? "Creating..." : "Start Building"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Floating Action Button (Mobile Only) */}
            <button
                onClick={() => setIsModalOpen(true)}
                className="lg:hidden fixed bottom-6 right-6 w-14 h-14 bg-black text-white rounded-2xl shadow-2xl flex items-center justify-center active:scale-90 transition-transform z-40"
            >
                <Plus size={28} weight="bold" />
            </button>
        </div>
    );
}