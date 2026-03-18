import StepHeader from "@/src/components/StepHeader";
import RichTextEditor from "@/src/components/RichTextEditor";

export default function SummaryStep({ resume, setResume }: any) {
    return (
        <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-6">
            <StepHeader title="Professional Summary" desc="Write a short summary about your professional identity" icon="📝" />
            <RichTextEditor
                label="Professional Summary"
                value={resume.summary}
                onChange={(v: string) => setResume({ ...resume, summary: v })}
            />
            <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 no-print">
                <p className="text-xs text-blue-600 font-medium">
                    💡 <b>Tip:</b> Use <b>bold</b> or bullet points to highlight your key achievements.
                </p>
            </div>
        </div>
    );
}