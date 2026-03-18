import React from 'react';

interface InputFieldProps {
    label: string;
    placeholder?: string;
    value: string;
    onChange: (v: string) => void;
}

const InputField: React.FC<InputFieldProps> = ({ label, placeholder = "", value, onChange }) => {
    return (
        <div className="flex flex-col gap-2 w-full">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">{label}</label>
            <input
                type="text"
                value={value}
                placeholder={placeholder}
                className="p-5 bg-gray-50 border-2 border-transparent rounded-[24px] focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50 outline-none transition-all text-gray-700 font-medium"
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
};

export default InputField;
