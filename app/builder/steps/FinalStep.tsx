"use client";
import React, { useState, useEffect } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Download, CheckCircle, Layout as LayoutIcon } from "lucide-react";

// 1. HTML Templates (ለስክሪን ፕሪቪው ብቻ)
import ModernDesign from "@/src/components/templates/ModernDesign";
import ClassicDesign from "@/src/components/templates/ClassicDesign";

// 2. React-PDF Templates (ለዳውንሎድ ብቻ)
import { PDFModernDesign } from "@/src/components/templates/PDFModernDesign";
import { PDFClassicDesign } from "@/src/components/templates/PDFClassicDesign";

export default function FinalStep({ resume, setResume }: any) {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);

  if (!isClient) return null;

  return (
    <div className="animate-in fade-in duration-700 pb-20 px-4">
      {/* Header Section */}
      <div className="max-w-5xl mx-auto mb-10 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 text-green-600 rounded-full mb-4">
          <CheckCircle size={32} />
        </div>
        <h2 className="text-4xl font-black text-gray-900 tracking-tight">🎉 Your CV is Ready!</h2>
        <p className="text-gray-500 mt-2 font-medium">Review your professional resume and download it below.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 max-w-[1400px] mx-auto items-start justify-center">

        {/* Preview Area */}
        <div className="flex-1 w-full flex justify-center sticky top-5">
          <div
            id="cv-preview"
            className="bg-white shadow-[0_30px_60px_rgba(0,0,0,0.12)] border border-gray-100 overflow-hidden"
            style={{
              width: "210mm",
              minHeight: "297mm",
              transform: "scale(0.85)",
              transformOrigin: "top center"
            }}
          >
            {resume.layout === 'modern' ? <ModernDesign data={resume} /> : <ClassicDesign data={resume} />}
          </div>
        </div>

        {/* Sidebar Actions */}
        <div className="w-full lg:w-96 space-y-6 sticky top-5">
          <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-blue-900/5 border border-blue-50">
            <h3 className="font-bold text-xl mb-6 flex items-center gap-2 text-gray-800">
              <LayoutIcon size={22} className="text-blue-600" /> Export Options
            </h3>

            <div className="space-y-4">
              {/* ተለዋዋጭ የ PDF ዳውንሎድ ሊንክ */}
              <PDFDownloadLink
                document={
                  resume.layout === 'modern'
                    ? <PDFModernDesign data={resume} />
                    : <PDFClassicDesign data={resume} />
                }
                fileName={`${resume.firstName || 'Resume'}_CV.pdf`}
              >
                {({ loading }) => (
                  <button
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white p-5 rounded-2xl font-black flex items-center justify-center gap-3 transition-all shadow-lg hover:shadow-blue-200 active:scale-95"
                  >
                    <Download size={24} />
                    {loading ? "Preparing PDF..." : "Download PDF"}
                  </button>
                )}
              </PDFDownloadLink>

              <div className="pt-6 border-t border-gray-100 italic text-center">
                <p className="text-[11px] text-gray-400 uppercase tracking-tighter">
                  Format: PDF/A4 Standard
                </p>
              </div>
            </div>
          </div>

          {/* Template Switcher */}
          <div className="bg-slate-900 p-6 rounded-[2rem] text-white shadow-xl">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-4">Switch Template</span>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setResume({ ...resume, layout: 'modern' })}
                className={`py-3 rounded-xl text-sm font-bold transition-all ${resume.layout === 'modern' ? 'bg-white text-black' : 'bg-slate-800 text-slate-400'}`}
              >
                Modern
              </button>
              <button
                onClick={() => setResume({ ...resume, layout: 'classic' })}
                className={`py-3 rounded-xl text-sm font-bold transition-all ${resume.layout === 'classic' ? 'bg-white text-black' : 'bg-slate-800 text-slate-400'}`}
              >
                Classic
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}