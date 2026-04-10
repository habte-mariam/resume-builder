import React from 'react';
import {
  Mail, Phone, MapPin, Globe,
  BookOpen, Briefcase,
  User, Star, Heart
} from 'lucide-react';

// ፕሮፕስ ታይፕ መግለጫ
interface ResumeProps {
  data: any;
}

const JhonyKillerTemplate: React.FC<ResumeProps> = ({ data }) => {
  if (!data) return <div className="p-10 text-center">Loading Resume Data...</div>;

  const p = data;
  const skills = data.skills || [];
  const education = data.education || [];
  const experience = data.experience || [];
  const languages = data.languages || [];

  // Skill level ወደ ፐርሰንት ለመቀየር
  const getLevelWidth = (level: string) => {
    const l = level?.toLowerCase();
    if (l === 'expert') return '90%';
    if (l === 'advanced') return '75%';
    if (l === 'intermediate') return '50%';
    return '30%';
  };

  return (
    <div className="max-w-[210mm] min-h-[297mm] mx-auto bg-white shadow-2xl flex text-[#334155] font-sans overflow-hidden print:shadow-none print:m-0">

      {/* --- SIDEBAR (LEFT) --- */}
      <div className="w-[35%] bg-[#2C3E50] text-white flex flex-col">
        {/* Profile Photo Area */}
        <div className="p-8 flex flex-col items-center">
          <div className="w-40 h-40 rounded-full border-4 border-[#5D6D7E] overflow-hidden bg-gray-300 relative mb-6">
            {p.avatarUrl ? (
              <img src={p.avatarUrl} alt={p.fullName} className="w-full h-full object-cover" />
            ) : (
              <User className="w-full h-full p-8 text-gray-500" />
            )}
          </div>
        </div>

        {/* Contact Section */}
        <div className="px-6 mb-8">
          <h2 className="bg-[#5D6D7E] py-2 px-4 text-center text-sm font-bold uppercase tracking-widest mb-4 skew-x-[-10deg]">
            Contact
          </h2>
          <div className="space-y-3 text-[10px]">
            <div className="flex items-center gap-3">
              <User size={14} className="text-[#AED6F1]" />
              <span>{p.fullName}</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone size={14} className="text-[#AED6F1]" />
              <span>{p.phoneNumber}</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail size={14} className="text-[#AED6F1]" />
              <span className="break-all">{p.email}</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin size={14} className="text-[#AED6F1]" />
              <span>{p.location}</span>
            </div>
          </div>
        </div>

        {/* Language Section */}
        <div className="px-6 mb-8">
          <h2 className="bg-[#5D6D7E] py-2 px-4 text-center text-sm font-bold uppercase tracking-widest mb-4 skew-x-[-10deg]">
            Language
          </h2>
          <div className="space-y-3">
            {languages.map((lang: any, i: number) => (
              <div key={i} className="text-[10px]">
                <div className="flex justify-between mb-1">
                  <span className="uppercase">{lang.name}</span>
                </div>
                <div className="h-1.5 w-full bg-[#1A252F] rounded-full">
                  <div
                    className="h-full bg-white rounded-full"
                    style={{ width: getLevelWidth(lang.proficiency) }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills Section */}
        <div className="px-6 mb-8 grow">
          <h2 className="bg-[#5D6D7E] py-2 px-4 text-center text-sm font-bold uppercase tracking-widest mb-4 skew-x-[-10deg]">
            Skills
          </h2>
          <div className="space-y-3">
            {skills.map((skill: any, i: number) => (
              <div key={i} className="text-[10px]">
                <div className="flex justify-between mb-1 uppercase tracking-tight">
                  <span>{skill.name}</span>
                </div>
                <div className="h-1.5 w-full bg-[#1A252F] rounded-full">
                  <div
                    className="h-full bg-white rounded-full"
                    style={{ width: getLevelWidth(skill.level) }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hobbies Section */}
        <div className="px-6 pb-10">
          <h2 className="bg-[#5D6D7E] py-2 px-4 text-center text-sm font-bold uppercase tracking-widest mb-4 skew-x-[-10deg]">
            Hobbies
          </h2>
          <div className="flex justify-around items-center pt-2">
            <Heart size={18} className="text-white opacity-80" />
            <Globe size={18} className="text-white opacity-80" />
            <BookOpen size={18} className="text-white opacity-80" />
            <Star size={18} className="text-white opacity-80" />
          </div>
        </div>
      </div>

      {/* --- MAIN CONTENT (RIGHT) --- */}
      <div className="flex-1 flex flex-col">
        {/* Header Title Area */}
        <div className="bg-[#2C3E50] p-12 text-white flex flex-col justify-center min-h-45">
          <h1 className="text-5xl font-black uppercase tracking-tighter mb-2">{p.fullName}</h1>
          <h3 className="text-2xl font-light tracking-[8px] text-[#AED6F1] uppercase">{p.jobTitle}</h3>
        </div>

        {/* Dynamic Sections Container */}
        <div className="p-10 space-y-8 grow">

          {/* Profile Section */}
          <section>
            <div className="flex items-center mb-4 overflow-hidden">
              <div className="bg-[#AED6F1] text-[#2C3E50] p-2 pr-12 rounded-r-full flex items-center gap-3 w-full relative">
                <User size={20} />
                <span className="font-bold uppercase tracking-widest">Profile</span>
                <div className="absolute -right-5 top-0 bottom-0 w-16 bg-white skew-x-[-30deg]" />
              </div>
            </div>
            <p className="text-[11px] leading-relaxed text-justify px-2 italic">
              {p.summary}
            </p>
          </section>

          {/* Education Section */}
          {education.length > 0 && (
            <section>
              <div className="flex items-center mb-4 overflow-hidden">
                <div className="bg-[#AED6F1] text-[#2C3E50] p-2 pr-12 rounded-r-full flex items-center gap-3 w-full relative">
                  <BookOpen size={20} />
                  <span className="font-bold uppercase tracking-widest">Education</span>
                  <div className="absolute -right-5 top-0 bottom-0 w-16 bg-white skew-x-[-30deg]" />
                </div>
              </div>
              <div className="space-y-4 px-2 text-[11px]">
                {education.map((edu: any, i: number) => (
                  <div key={i}>
                    <div className="flex justify-between font-bold text-[#2C3E50] mb-1">
                      <span>{edu.school}</span>
                      <span className="text-[#5D6D7E]">{edu.startDate} - {edu.endDate}</span>
                    </div>
                    <div className="text-[#3498DB] font-semibold mb-1 uppercase text-[9px]">{edu.degree} {edu.fieldOfStudy && `| ${edu.fieldOfStudy}`}</div>
                    <p className="text-gray-600 leading-snug">{edu.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Experience Section */}
          {experience.length > 0 && (
            <section>
              <div className="flex items-center mb-4 overflow-hidden">
                <div className="bg-[#AED6F1] text-[#2C3E50] p-2 pr-12 rounded-r-full flex items-center gap-3 w-full relative">
                  <Briefcase size={20} />
                  <span className="font-bold uppercase tracking-widest">Experience</span>
                  <div className="absolute -right-5 top-0 bottom-0 w-16 bg-white skew-x-[-30deg]" />
                </div>
              </div>
              <div className="space-y-4 px-2 text-[11px]">
                {experience.map((exp: any, i: number) => (
                  <div key={i}>
                    <div className="flex justify-between font-bold text-[#2C3E50] mb-1">
                      <span>{exp.company}</span>
                      <span className="text-[#5D6D7E]">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
                    </div>
                    <div className="text-[#3498DB] font-semibold mb-1 uppercase text-[9px]">{exp.role}</div>
                    <p className="text-gray-600 leading-snug">{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Footer Link */}
        <div className="bg-[#AED6F1] py-2 text-center text-[#2C3E50] text-[9px] font-bold tracking-widest uppercase">
          {p.website ? p.website.replace(/(^\w+:|^)\/\//, '') : 'WWW.MYRESUME.COM'}
        </div>
      </div>
    </div>
  );
};

export default JhonyKillerTemplate;