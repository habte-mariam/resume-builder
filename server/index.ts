import express from 'express';
import cors from 'cors';
import { eq } from 'drizzle-orm';
import { db } from "./db";
import { profiles } from './db/schema';
import { generateResumePDF } from './utils/pdfGenerator';

console.log("--- SERVER STARTING ---");

const app = express();
app.use(cors());
app.use(express.json());

// 1. አዲስ ሪዙሜ ለማስቀመጥ (Create or Save)
app.post('/api/resumes', async (req, res) => {
    try {
        const data = req.body;

        // ሪዙሜውን ወደ Profiles ሰንጠረዥ ማስገባት
        const [newProfile] = await db.insert(profiles).values({
            fullName: data.fullName || "New User",
            email: data.email || `${Date.now()}@example.com`,
            phoneNumber: data.phoneNumber,
            jobTitle: data.jobTitle,
            summary: data.summary,
            location: data.location,
            website: data.website,
            github: data.github,
            linkedin: data.linkedin,
            stackOverflow: data.stackOverflow,
            twitter: data.twitter,
            avatarUrl: data.avatarUrl,
        }).returning();

        // ማሳሰቢያ፡ እዚህ ጋር የ Experience, Education ወዘተ ዳታዎችንም 
        // በ profile_id አማካኝነት ማስገባት ይቻላል።

        res.status(201).json(newProfile);
    } catch (error) {
        console.error("Database Insert Error:", error);
        res.status(500).json({ error: "ዳታውን መመዝገብ አልተቻለም" });
    }
});

// 2. ሁሉንም ሪዙሜዎች በዝርዝር ለማየት (Dashboard ላይ ለመጠቀም)
app.get('/api/resumes', async (req, res) => {
    try {
        const allResumes = await db.select().from(profiles);
        res.json(allResumes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch resumes" });
    }
});

// 3. ፒዲኤፍ አውርዶ ለተጠቃሚው ለመላክ

app.get('/api/resumes/:id/download', async (req, res) => {
    const profileId = Number(req.params.id);

    try {
        // ሁሉንም ተዛማጅ ዳታዎች (Relations) በአንድ ላይ ሰብስቦ ማምጣት
        // ማሳሰቢያ፡ ይህ እንዲሰራ በ schema.ts ላይ relations መገለጽ አለባቸው።
        // ካልተገለጹ እያንዳንዱን table በ eq(profileId) ለብቻ fetch ማድረግ ይቻላል።
        const profileData = await db.query.profiles.findFirst({
            where: eq(profiles.id, profileId),
            with: {
                experience: true,
                education: true,
                skills: true,
                projects: true,
                awards: true,
                volunteer: true,
                publications: true,
                references: true,
                languages: true,
                interests: true,
            }
        });

        if (!profileData) {
            return res.status(404).send("ሪዙሜው አልተገኘም (Profile not found)");
        }

        // PDF Generator ፋንክሽንን መጥራት
        generateResumePDF({ profile: profileData, ...profileData }, res);

    } catch (error) {
        console.error("PDF Download Error:", error);
        res.status(500).send("PDF ማመንጨት አልተቻለም");
    }
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});