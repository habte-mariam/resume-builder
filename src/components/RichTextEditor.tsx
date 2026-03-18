"use client";
import React from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

// Next.js SSR error እንዳያመጣ በ dynamic import እናስነሳዋለን
const ReactQuill = dynamic(() => import('react-quill'), {
    ssr: false,
    loading: () => <div className="h-40 bg-gray-50 animate-pulse rounded-3xl" />
});

interface EditorProps {
    label: string;
    value: string;
    onChange: (content: string) => void;
}

export default function RichTextEditor({ label, value, onChange }: EditorProps) {
    const modules = {
        toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'align': [] }],
            ['clean']
        ],
    };

    return (
        <div className="flex flex-col gap-2 w-full no-print">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">
                {label}
            </label>
            <div className="bg-white border-2 border-gray-100 rounded-[24px] overflow-hidden focus-within:border-blue-500 transition-all shadow-sm">
                <ReactQuill
                    theme="snow"
                    value={value}
                    onChange={onChange}
                    modules={modules}
                    className="editor-custom"
                />
            </div>

            {/* Custom Styling ለ Editor-ኡ */}
            <style jsx global>{`
                .ql-toolbar.ql-snow {
                    border: none !important;
                    background: #f9fafb;
                    border-bottom: 1px solid #f3f4f6 !important;
                    padding: 12px !important;
                }
                .ql-container.ql-snow {
                    border: none !important;
                    min-height: 150px;
                    font-family: inherit;
                    font-size: 14px;
                }
                .ql-editor {
                    padding: 20px !important;
                }
            `}</style>
        </div>
    );
}