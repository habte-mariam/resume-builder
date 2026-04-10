import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import { X, CheckCircle, PencilLine, DownloadSimple, Monitor, FilePdf } from "@phosphor-icons/react";
import { MyResumePDF } from "./pdfGenerator";

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  data: any;
}

export default function ResumePreviewModal({ isOpen, onClose, onConfirm, data }: PreviewModalProps) {
  if (!isOpen) return null;

  // የፋይል ስም አወጣጥ (ስም ከሌለ 'Resume' እንዲል)
  const fileName = `${data.profile?.fullName?.replace(/\s+/g, '_') || 'My_Resume'}.pdf`;

  return (
    <div className="fixed inset-0 bg-slate-900/90 backdrop-blur-md flex items-center justify-center z-100 p-0 sm:p-4 md:p-8">
      {/* Modal Container */}
      <div className="bg-white rounded-none sm:rounded-3xl w-full max-w-6xl h-full sm:h-[95vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">

        {/* Header Section */}
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-white">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-100 p-2 rounded-xl text-emerald-600 hidden xs:block">
              <CheckCircle size={24} weight="fill" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">የመጨረሻ ዕይታ (Preview)</h2>
              <p className="text-slate-500 text-[10px] sm:text-xs uppercase tracking-wider font-medium">ሪዙሜው ከመቀመጡ በፊት እዚህ ጋር ያረጋግጡ</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full transition-all text-slate-400 hover:text-slate-600 active:scale-90"
          >
            <X size={26} weight="bold" />
          </button>
        </div>

        {/* PDF Rendering Area */}
        <div className="flex-1 bg-slate-200/50 p-2 sm:p-6 md:p-8 overflow-hidden flex flex-col items-center justify-center relative">
          <div className="h-full w-full max-w-4xl rounded-xl overflow-hidden shadow-2xl border border-slate-200 bg-white relative">

            {/* Desktop: PDF Viewer */}
            <div className="hidden md:block h-full w-full">
              <PDFViewer width="100%" height="100%" className="border-none" showToolbar={false}>
                <MyResumePDF data={data} />
              </PDFViewer>
            </div>

            {/* Mobile/Tablet Placeholder: PDFViewer በስልክ ላይ ስለማይሰራ */}
            <div className="md:hidden flex flex-col items-center justify-center h-full p-8 text-center bg-slate-50">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4">
                <Monitor size={40} weight="duotone" />
              </div>
              <h3 className="text-slate-800 font-bold text-lg mb-2">ለሞባይል ተጠቃሚዎች</h3>
              <p className="text-slate-500 text-sm mb-6">
                ሙሉ የፒዲኤፍ እይታው በኮምፒውተር ላይ በደንብ ይታያል። አሁን ዳታውን ለማረጋገጥ ከታች ያለውን "PDF አውርድ" የሚለውን ይጠቀሙ።
              </p>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-200 text-slate-600 rounded-lg text-xs font-bold">
                <FilePdf size={20} /> {fileName}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Actions Section */}
        <div className="px-6 py-5 border-t border-slate-100 flex flex-col sm:flex-row gap-4 justify-between items-center bg-white shadow-[0_-10px_20px_rgba(0,0,0,0.02)]">
          <p className="text-slate-400 text-[10px] uppercase tracking-[0.2em] font-black hidden lg:block">
            Ethio Telecom • Resume Builder
          </p>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            {/* ተመለስ Button */}
            <button
              onClick={onClose}
              className="px-6 py-3 border-2 border-slate-100 rounded-2xl font-bold text-slate-600 hover:bg-slate-50 hover:border-slate-200 transition-all flex items-center justify-center gap-2 text-sm active:scale-95"
            >
              <PencilLine size={20} weight="bold" /> ዳታ አርም
            </button>

            {/* ቀጥታ Download (React-PDF Client side) */}
            <PDFDownloadLink
              document={<MyResumePDF data={data} />}
              fileName={fileName}
              className="px-6 py-3 bg-emerald-50 text-emerald-700 rounded-2xl font-bold hover:bg-emerald-100 transition-all flex items-center justify-center gap-2 text-sm border-2 border-emerald-100 active:scale-95"
            >
              {({ loading }) => (
                <>
                  <DownloadSimple size={20} weight="bold" />
                  {loading ? 'በዝግጅት ላይ...' : 'PDF አውርድ'}
                </>
              )}
            </PDFDownloadLink>

            {/* አረጋግጥና አስቀምጥ (Server side) */}
            <button
              onClick={onConfirm}
              className="px-10 py-3 bg-black text-white rounded-2xl font-bold hover:bg-slate-800 shadow-xl shadow-slate-200 transition-all flex items-center justify-center gap-2 text-sm active:scale-95"
            >
              <CheckCircle size={20} weight="bold" /> አረጋግጥና ጨርስ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}