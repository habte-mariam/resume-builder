from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from weasyprint import HTML
import os

app = FastAPI()

# የ Next.js ዳታን የሚመስል የ Python ሞዴል


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ResumeData(BaseModel):
    firstName: str
    lastName: str
    email: str
    phone: str
    jobTitle: str
    street: str
    city: str
    country: str
    profileImage: Optional[str] = ""
    summary: str
    education: List[dict]
    experience: List[dict]
    projects: List[dict]
    hardSkills: List[str]
    softSkills: List[str]
    languages: List[dict]
    layout: str
    themeColor: str


@app.post("/generate-pdf")
async def generate_resume(data: ResumeData):
    # 1. በጣም ቀላል የሆነ የሙከራ ዲዛይን (Template 1)
    html_template = f"""
    <html>
        <head>
            <style>
                body {{ font-family: 'Helvetica', sans-serif; padding: 50px; color: #333; }}
                .header {{ border-bottom: 4px solid {data.themeColor}; padding-bottom: 20px; }}
                h1 {{ margin: 0; color: {data.themeColor}; }}
                .contact {{ font-size: 12px; color: #666; }}
                .section-title {{ font-size: 18px; font-weight: bold; margin-top: 30px; color: {data.themeColor}; }}
                .item {{ margin-bottom: 10px; }}
            </style>
        </head>
        <body>
            <div class="header">
                <h1>{data.firstName.upper()} {data.lastName.upper()}</h1>
                <p>{data.jobTitle}</p>
                <div class="contact">
                    {data.email} | {data.phone} | {data.city}, {data.country}
                </div>
            </div>

            <div class="section-title">PROFESSIONAL SUMMARY</div>
            <p>{data.summary}</p>

            <div class="section-title">EXPERIENCE</div>
            {"".join([f"<div class='item'><strong>{exp['role']}</strong> at {exp['company']}</div>" for exp in data.experience])}

            <div class="section-title">SKILLS</div>
            <p>{", ".join(data.hardSkills)}</p>
        </body>
    </html>
    """

    # 2. ፒዲኤፉን ማመንጨት
    pdf_path = f"resume_{data.firstName}.pdf"
    HTML(string=html_template).write_pdf(pdf_path)

    return {"status": "Success", "file_path": pdf_path}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
