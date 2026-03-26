import { PDFViewer } from '@react-pdf/renderer';
import { X, CheckCircle, PencilLine } from 'phosphor-react'; // ወይም የምትጠቀመው Icon library
import { MyResumePDF } from './ResumeTemplate';

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  data: any;
}

export default function ResumePreviewModal({ isOpen, onClose, onConfirm, data }: PreviewModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-md flex items-center justify-center z-[100] p-4 sm:p-8">
      <div className="bg-white rounded-[2rem] w-full max-w-6xl h-[90vh] flex flex-col shadow-2xl overflow-hidden border border-white/20">

        {/* Header */}
        <div className="px-8 py-5 border-b border-slate-100 flex justify-between items-center bg-white">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900">የመጨረሻ ዕይታ</h2>
            <p className="text-slate-500 text-sm">ከማስቀመጥዎ በፊት ሪዙሜውን ያረጋግጡ</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400"
          >
            <X size={24} />
          </button>
        </div>

        {/* PDF Area */}
        <div className="flex-1 bg-slate-50 p-6">
          <div className="h-full w-full rounded-2xl overflow-hidden shadow-lg border border-slate-200">
            <PDFViewer width="100%" height="100%" className="border-none">
              <MyResumePDF data={data} />
            </PDFViewer>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="px-8 py-6 border-t border-slate-100 flex flex-col sm:flex-row gap-4 justify-end bg-white">
          <button
            onClick={onClose}
            className="px-6 py-3 border-2 border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center justify-center gap-2"
          >
            <PencilLine size={20} /> ተመለስና አስተካክል
          </button>
          <button
            onClick={onConfirm}
            className="px-10 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 shadow-xl shadow-slate-200 transition-all flex items-center justify-center gap-2"
          >
            <CheckCircle size={20} weight="fill" /> አረጋግጥና አስቀምጥ
          </button>
        </div>
      </div>
    </div>
  );
}