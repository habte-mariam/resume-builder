import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-white text-gray-900">
      {/* 1. Header/Navigation - Fixed & Responsive */}
      <nav className="fixed top-0 left-0 right-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-3 py-3 sm:px-4 sm:py-4 md:px-6 md:py-6">
          <h1 className="text-lg xs:text-xl md:text-2xl font-black text-blue-600 tracking-tighter">
            AI-RESUME
          </h1>
          <div className="flex items-center gap-2 sm:gap-3 md:gap-6 font-medium text-xs md:text-sm">
            <Link href="/templates" className="hidden xs:block hover:text-blue-600 transition">
              Templates
            </Link>
            <Link
              href="/builder"
              className="bg-blue-600 text-white px-3 py-2 xs:px-4 xs:py-2 md:px-6 md:py-2.5 rounded-full hover:bg-blue-700 transition shadow-lg shadow-blue-100 text-[10px] xs:text-xs md:text-sm font-bold"
            >
              Create My Resume
            </Link>
          </div>
        </div>
      </nav>

      {/* 2. Hero Section - Added pt-32 to prevent overlap */}
      <section className="flex flex-col items-center justify-center text-center px-3 xs:px-4 sm:px-6 pt-28 xs:pt-32 md:pt-48 pb-8 xs:pb-10">
        <span className="bg-blue-50 text-blue-600 text-[9px] xs:text-[10px] md:text-xs font-black px-3 xs:px-4 py-1 xs:py-1.5 rounded-full mb-4 xs:mb-6 uppercase tracking-[0.2em] animate-fade-in">
          The Future of Job Hunting
        </span>
        <h1 className="text-2xl xs:text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black max-w-5xl leading-[1.05] xs:leading-[0.95] mb-6 xs:mb-8 tracking-tighter">
          Build a Professional <br className="hidden md:block" />
          <span className="text-blue-600">Resume in Minutes,</span>
        </h1>
        <p className="text-gray-500 text-sm xs:text-base md:text-xl max-w-xs xs:max-w-md sm:max-w-xl md:max-w-2xl mb-8 xs:mb-10 leading-relaxed font-medium">
          Easily create stunning resumes. Enter your information, choose a professional design, and download as PDF.
        </p>
        <div className="w-full xs:w-auto">
          <Link
            href="/builder"
            className="block xs:inline-block bg-blue-600 text-white px-6 xs:px-10 py-4 xs:py-5 rounded-2xl font-black text-base xs:text-lg hover:bg-blue-700 transition-all hover:scale-[1.02] active:scale-95 shadow-2xl shadow-blue-200"
          >
            Start Building Now — It's Free
          </Link>
        </div>
      </section>

      {/* 3. Feature Showcase - Responsive Grid */}
      <section className="mt-10 xs:mt-16 sm:mt-20 grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-4 xs:gap-6 md:gap-12 max-w-xs xs:max-w-2xl sm:max-w-4xl md:max-w-6xl px-3 xs:px-6 pb-16 xs:pb-24 md:pb-32">
        <div className="text-center p-5 xs:p-8 bg-gray-50/50 rounded-[24px] xs:rounded-[32px] border border-transparent hover:border-blue-100 transition-colors">
          <div className="text-3xl xs:text-4xl mb-3 xs:mb-4">🚀</div>
          <h3 className="font-black text-lg xs:text-xl mb-1 xs:mb-2 tracking-tight">Fast & Easy</h3>
          <p className="text-gray-500 text-xs xs:text-sm font-medium leading-relaxed">Finish your resume in minutes, no design skills required.</p>
        </div>
        <div className="text-center p-5 xs:p-8 bg-gray-50/50 rounded-[24px] xs:rounded-[32px] border border-transparent hover:border-blue-100 transition-colors">
          <div className="text-3xl xs:text-4xl mb-3 xs:mb-4">💎</div>
          <h3 className="font-black text-lg xs:text-xl mb-1 xs:mb-2 tracking-tight">ATS Friendly</h3>
          <p className="text-gray-500 text-xs xs:text-sm font-medium leading-relaxed">Your resume is built to be easily read by company systems (ATS).</p>
        </div>
        <div className="text-center p-5 xs:p-8 bg-gray-50/50 rounded-[24px] xs:rounded-[32px] border border-transparent hover:border-blue-100 transition-colors xs:col-span-2 md:col-span-1">
          <div className="text-3xl xs:text-4xl mb-3 xs:mb-4">📄</div>
          <h3 className="font-black text-lg xs:text-xl mb-1 xs:mb-2 tracking-tight">PDF Export</h3>
          <p className="text-gray-500 text-xs xs:text-sm font-medium leading-relaxed">Download a print-ready PDF with just one click.</p>
        </div>
      </section>
    </main>
  );
}