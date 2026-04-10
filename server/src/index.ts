import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import resumeRoutes from './routes/resumeRoutes.js';
import { Request, Response } from 'express';

const app = express();

// 1. CORS Fix: ለልማት (Development) ወቅት ሁሉንም እንዲፈቅድ ማድረግ
app.use(cors({
    origin: (origin, callback) => {
        // ማንኛውንም ጥሪ ለመፍቀድ (በተለይ በ Docker ውስጥ ለሚፈጠር የ IP/Localhost መምታታት)
        callback(null, true);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Routes
app.use('/api/resumes', resumeRoutes);

app.get("/", (req: Request, res: Response) => {
    res.send("Resume Builder API is running... 🚀");
});

// 2. PORT Fix:
const PORT: number = Number(process.env.PORT) || 5000;

// 3. Listen Fix: በ Docker ውስጥ "0.0.0.0" የግድ አስፈላጊ ነው
app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Server is running on http://0.0.0.0:${PORT}`);
});

export default app;