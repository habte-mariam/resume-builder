// import PDFDocument from 'pdfkit';
import PDFDocument from 'pdfkit/js/pdfkit.standalone.js';
import { Response } from 'express';

export const generateResumePDF = (allData: any, res: Response) => {
    // 1. ሰነዱን መፍጠር (A4 size)
    const doc = new PDFDocument({
        size: 'A4',
        margin: 50,
        bufferPages: true
    });

    // ለብሮውዘሩ PDF መሆኑን መናገር
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=resume-${allData.profile.fullName.replace(/\s+/g, '_')}.pdf`);

    doc.pipe(res);

    // --- ረዳት ፋንክሽን ለርዕሶች (Helper for Sections) ---
    const addSectionTitle = (title: string) => {
        doc.moveDown()
            .fillColor('#065f46') // Emerald Green
            .fontSize(14)
            .text(title.toUpperCase(), { underline: false })
            .moveDown(0.5);

        // ከርዕሱ ስር መስመር ማስመር
        doc.moveTo(50, doc.y - 5).lineTo(550, doc.y - 5).strokeColor('#e5e7eb').stroke();
        doc.moveDown(0.5);
    };

    // --- 1. የግል መረጃ (HEADER) ---
    const p = allData.profile;
    doc.fillColor('#111827').fontSize(24).text(p.fullName, { align: 'left' });
    doc.fillColor('#059669').fontSize(14).text(p.jobTitle || '', { align: 'left' });

    doc.fillColor('#4b5563').fontSize(10).moveDown(0.2);
    const contactInfo = [p.email, p.phoneNumber, p.location].filter(Boolean).join(' | ');
    doc.text(contactInfo);

    // Social Links
    const links = [p.linkedin, p.github, p.website].filter(Boolean).join(' | ');
    if (links) doc.text(links);

    // --- SUMMARY ---
    if (p.summary) {
        addSectionTitle("Professional Summary");
        doc.fillColor('#374151').fontSize(11).text(p.summary, { align: 'justify', lineGap: 2 });
    }

    // --- 2. EXPERIENCE ---
    if (allData.experience?.length > 0) {
        addSectionTitle("Work Experience");
        allData.experience.forEach((exp: any) => {
            doc.fillColor('#111827').fontSize(12).text(`${exp.role} at ${exp.company}`, { continued: true });
            doc.fillColor('#6b7280').fontSize(10).text(`  (${exp.startDate} - ${exp.current ? 'Present' : exp.endDate})`, { align: 'right' });
            if (exp.description) {
                doc.fillColor('#374151').fontSize(10).text(exp.description, { indent: 15 });
            }
            doc.moveDown(0.5);
        });
    }

    // --- 3. EDUCATION ---
    if (allData.education?.length > 0) {
        addSectionTitle("Education");
        allData.education.forEach((edu: any) => {
            doc.fillColor('#111827').fontSize(11).text(`${edu.degree} in ${edu.fieldOfStudy}`, { continued: true });
            doc.fillColor('#6b7280').fontSize(10).text(` | ${edu.school} (${edu.endDate})`, { align: 'right' });
            doc.moveDown(0.2);
        });
    }

    // --- 4. SKILLS ---
    if (allData.skills?.length > 0) {
        addSectionTitle("Skills");
        const skillList = allData.skills.map((s: any) => `${s.name} (${s.level || ''})`).join(', ');
        doc.fillColor('#374151').fontSize(10).text(skillList);
    }

    // --- 5. PROJECTS ---
    if (allData.projects?.length > 0) {
        addSectionTitle("Projects");
        allData.projects.forEach((proj: any) => {
            doc.fillColor('#111827').fontSize(11).text(proj.name, { continued: true });
            if (proj.link) doc.fillColor('#2563eb').fontSize(9).text(`  [Link: ${proj.link}]`);
            doc.fillColor('#374151').fontSize(10).text(proj.description);
            doc.moveDown(0.3);
        });
    }

    // --- 6. LANGUAGES & INTERESTS (SIDE BY SIDE OR COMPACT) ---
    if (allData.languages?.length > 0 || allData.interests?.length > 0) {
        addSectionTitle("Languages & Interests");
        if (allData.languages) {
            const langs = allData.languages.map((l: any) => `${l.name}: ${l.proficiency}`).join(' | ');
            doc.fillColor('#374151').fontSize(10).text(`Languages: ${langs}`);
        }
        if (allData.interests) {
            const ints = allData.interests.map((i: any) => i.name).join(', ');
            doc.moveDown(0.2).text(`Interests: ${ints}`);
        }
    }

    // መጨረሻ
    doc.end();
};