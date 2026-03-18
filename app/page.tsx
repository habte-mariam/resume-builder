import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-white text-gray-900">
      {/* 1. Header/Navigation */}
      <nav className="w-full max-w-7xl flex justify-between items-center p-6">
        <h1 className="text-2xl font-black text-blue-600 tracking-tighter">AI-RESUME</h1>
        <div className="space-x-6 font-medium text-sm">
          <Link href="/templates" className="hover:text-blue-600 transition">Templates</Link>
          <Link href="/builder" className="bg-blue-600 text-white px-5 py-2.5 rounded-full hover:bg-blue-700 transition shadow-lg shadow-blue-200">
            Create My Resume
          </Link>
        </div>
      </nav>

      {/* 2. Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-4 mt-20 md:mt-32">
        <span className="bg-blue-50 text-blue-600 text-xs font-bold px-4 py-1.5 rounded-full mb-6 uppercase tracking-widest">
          The Future of Job Hunting
        </span>
        <h1 className="text-5xl md:text-7xl font-extrabold max-w-4xl leading-[1.1] mb-8">
          Build a Professional Resume <br />
          <span className="text-blue-600">in Minutes, Not Hours.</span>
        </h1>
        <p className="text-gray-500 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed">
          አስደናቂ ሲቪዎችን በቀላሉ ይፍጠሩ። የፈለጉትን መረጃ ያስገቡ፣ ፕሮፌሽናል የሆነ ዲዛይን ይምረጡ እና በ PDF ያውርዱ።
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/builder" className="bg-blue-600 text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-blue-200">
            Start Building Now — It's Free
          </Link>
        </div>
      </section>

      {/* 3. Feature Showcase */}
      <section className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl px-6 pb-20">
        <div className="text-center p-6">
          <div className="text-3xl mb-4">🚀</div>
          <h3 className="font-bold text-xl mb-2">Fast & Easy</h3>
          <p className="text-gray-500 text-sm">ምንም አይነት ዲዛይን እውቀት ሳይኖርዎት በደቂቃዎች ውስጥ ያጠናቅቃሉ።</p>
        </div>
        <div className="text-center p-6 border-x border-gray-100">
          <div className="text-3xl mb-4">💎</div>
          <h3 className="font-bold text-xl mb-2">ATS Friendly</h3>
          <p className="text-gray-500 text-sm">የእርስዎ ሲቪ በኩባንያዎች ሲስተም በቀላሉ እንዲነበብ ተደርጎ የተሰራ ነው።</p>
        </div>
        <div className="text-center p-6">
          <div className="text-3xl mb-4">📄</div>
          <h3 className="font-bold text-xl mb-2">PDF Export</h3>
          <p className="text-gray-500 text-sm">በአንድ ክሊክ ብቻ ለህትመት ዝግጁ የሆነ PDF ያውርዱ።</p>
        </div>
      </section>
    </main>
  );
}