import React from 'react';

interface StepHeaderProps {
    title: string;
    desc: string;
    icon: string;
}

const StepHeader: React.FC<StepHeaderProps> = ({ title, desc, icon }) => {
    return (
        <div className="mb-10 animate-in fade-in slide-in-from-top-2">
            <span className="text-6xl mb-4 block filter drop-shadow-sm">{icon}</span>
            <h2 className="text-4xl font-black text-gray-900 tracking-tighter uppercase leading-none">{title}</h2>
            <p className="text-gray-500 font-medium mt-2 text-lg italic opacity-80">{desc}</p>
        </div>
    );
};

export default StepHeader;
