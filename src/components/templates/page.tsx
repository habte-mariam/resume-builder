import React, { useState } from "react";
import ModernDesign from "./ModernDesign";
import ClassicDesign from "./ClassicDesign";

// Dummy resume data for preview
const sampleData = {
    firstName: "John",
    lastName: "Doe",
    jobTitle: "Full Stack Developer",
    profileImage: "https://randomuser.me/api/portraits/men/32.jpg",
    email: "john.doe@email.com",
    phone: "+251 912345678",
    address: "Addis Ababa, Ethiopia",
    linkedin: "linkedin.com/in/johndoe",
    github: "github.com/johndoe",
    website: "johndoe.com",
    hardSkills: ["React", "Node.js", "TypeScript", "SQL"],
    softSkills: ["Leadership", "Communication", "Teamwork"],
    languages: [
        { name: "English", level: "Fluent" },
        { name: "Amharic", level: "Native" }
    ],
    summary: "<p>Experienced developer with a passion for building scalable web applications. Skilled in <b>React</b>, <b>Node.js</b>, and <b>TypeScript</b>.</p>",
    experience: [
        {
            role: "Frontend Engineer",
            company: "Tech Solutions",
            location: "Addis Ababa",
            startDate: "2022",
            endDate: "2024",
            isCurrent: false,
            desc: "<ul><li>Developed responsive web apps</li><li>Led UI redesign project</li></ul>"
        },
        {
            role: "Backend Developer",
            company: "CloudSoft",
            location: "Remote",
            startDate: "2020",
            endDate: "2022",
            isCurrent: false,
            desc: "<ul><li>Built REST APIs</li><li>Optimized database queries</li></ul>"
        }
    ],
    education: [
        {
            school: "Addis Ababa University",
            degree: "BSc Computer Science",
            field: "Software Engineering",
            startYear: "2016",
            endYear: "2020",
            location: "Addis Ababa",
            gpa: "3.8",
            description: "<p>Graduated with honors. Specialized in web development.</p>"
        }
    ],
    awards: [
        { title: "Employee of the Year", year: "2023", issuer: "Tech Solutions" }
    ]
};

const TemplatePreview = () => {
    const [selected, setSelected] = useState<'modern' | 'classic'>('modern');

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-center gap-6 mb-8">
                    <button
                        className={`px-6 py-3 rounded-xl font-bold border-2 transition-all ${selected === 'modern' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-blue-600 border-blue-200 hover:bg-blue-50'}`}
                        onClick={() => setSelected('modern')}
                    >
                        Modern Template
                    </button>
                    <button
                        className={`px-6 py-3 rounded-xl font-bold border-2 transition-all ${selected === 'classic' ? 'bg-slate-700 text-white border-slate-700' : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'}`}
                        onClick={() => setSelected('classic')}
                    >
                        Classic Template
                    </button>
                </div>
                <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
                    {selected === 'modern' ? (
                        <ModernDesign data={sampleData} />
                    ) : (
                        <ClassicDesign data={sampleData} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default TemplatePreview;