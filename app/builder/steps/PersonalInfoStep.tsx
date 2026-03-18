import InputField from "@/src/components/InputField";
import StepHeader from "@/src/components/StepHeader";

export default function PersonalInfoStep({ resume, setResume }: any) {
    return (
        <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-8">
            <StepHeader title="Personal Information" desc="Enter your basic details and social links" icon="👤" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 bg-white p-4 xs:p-6 sm:p-8 rounded-3xl border shadow-sm">
                <InputField label="First Name" value={resume.firstName} onChange={(v) => setResume({ ...resume, firstName: v })} />
                <InputField label="Last Name" value={resume.lastName} onChange={(v) => setResume({ ...resume, lastName: v })} />
                <InputField label="Job Title" value={resume.jobTitle} placeholder="e.g. Full Stack Developer" onChange={(v) => setResume({ ...resume, jobTitle: v })} />
                <InputField label="Email Address" value={resume.email} onChange={(v) => setResume({ ...resume, email: v })} />
                <InputField label="Phone" value={resume.phone} onChange={(v) => setResume({ ...resume, phone: v })} />
                <InputField label="Address" value={resume.address} placeholder="City, Country" onChange={(v) => setResume({ ...resume, address: v })} />
                <InputField label="Profile Image URL" value={resume.profileImage} onChange={(v) => setResume({ ...resume, profileImage: v })} />
                <InputField label="Nationality" value={resume.nationality} onChange={(v) => setResume({ ...resume, nationality: v })} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 bg-blue-50/30 p-4 xs:p-6 sm:p-8 rounded-3xl border border-blue-100">
                <InputField label="LinkedIn URL" value={resume.linkedin} onChange={(v) => setResume({ ...resume, linkedin: v })} />
                <InputField label="GitHub URL" value={resume.github} onChange={(v) => setResume({ ...resume, github: v })} />
                <InputField label="Portfolio Website" value={resume.website} onChange={(v) => setResume({ ...resume, website: v })} />
                <InputField label="Twitter/X" value={resume.twitter} onChange={(v) => setResume({ ...resume, twitter: v })} />
            </div>
        </div>
    );
}