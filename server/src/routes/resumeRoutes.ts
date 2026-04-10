import { Router } from 'express';
import { db } from '../db/index.js';
import { profiles } from '../db/schema.js';
import { eq } from 'drizzle-orm'; // 👈 ቀለል ያለ import

const router = Router();

// 1. አዲስ ሪዙሜ ለመፍጠር (Dashboard ላይ ለሚመጣው ጥሪ)
router.post('/', async (req, res) => {
    try {
        const { title } = req.body;

        const newProfile = await db.insert(profiles).values({
            fullName: title || "Untitled Name",
            email: `user_${Date.now()}@example.com`, // Unique ለማድረግ
            phoneNumber: null,
            altPhone: null,
            jobTitle: null,
            gender: null,
            age: null,
            nationality: null,
            telegram: null,
            updatedAt: new Date(),
        }).returning();

        res.status(201).json(newProfile[0]);
    } catch (error) {
        console.error("❌ Create Error:", error);
        res.status(500).json({ error: "ዳታቤዝ ላይ መመዝገብ አልተቻለም" });
    }
});

// 2. ሁሉንም ሪዙሜዎች ለማምጣት
router.get('/', async (req, res) => {
    try {
        const allProfiles = await db.select().from(profiles);
        res.json(allProfiles);
    } catch (error) {
        res.status(500).json({ error: "ዳታ ማምጣት አልተቻለም" });
    }
});

// 3. አንድን ሪዙሜ በ ID ብቻ ለይቶ ለማምጣት (Editor ገጽ ሲከፈት)
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const profile = await db.select().from(profiles).where(eq(profiles.id, Number(id)));

        if (profile.length === 0) {
            return res.status(404).json({ error: "ሪዙሜው አልተገኘም" });
        }
        res.json(profile[0]);
    } catch (error) {
        console.error("Fetch Error:", error);
        res.status(500).json({ error: "መረጃውን ማምጣት አልተቻለም" });
    }
});

// 4. መረጃን ለማሻሻል (Save ሲደረግ)
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        // updatedAt በራሱ እንዲታደስ
        const finalData = { ...updateData, updatedAt: new Date() };

        await db.update(profiles).set(finalData).where(eq(profiles.id, Number(id)));
        res.json({ message: "Updated successfully" });
    } catch (error) {
        console.error("Update Error:", error);
        res.status(500).json({ error: "Update failed" });
    }
});

export default router;