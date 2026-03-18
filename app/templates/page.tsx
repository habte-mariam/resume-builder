import Link from "next/link"; // መጀመሪያ ይህንን Import አድርግ

export default function TemplatesPage() {
    const templates = [
        { id: 1, name: "Modern Blue", color: "bg-blue-600" },
        { id: 2, name: "Classic Black", color: "bg-gray-900" },
        { id: 3, name: "Minimalist", color: "bg-white border" },
    ];

    return (
        <div className="p-10 max-w-6xl mx-auto">
            {/* Back Button */}
            <div className="mb-6">
                <Link
                    href="/"
                    className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2 transition"
                >
                    ← Back to Home
                </Link>
            </div>

            <h1 className="text-4xl font-black mb-12 text-center tracking-tight">
                Choose Your <span className="text-blue-600">Template</span>
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {templates.map((t) => (
                    <div
                        key={t.id}
                        className="group border rounded-3xl p-5 hover:shadow-2xl hover:border-blue-200 transition-all duration-300 cursor-pointer bg-white"
                    >
                        <div className={`${t.color} h-72 rounded-2xl mb-5 shadow-inner group-hover:scale-[1.02] transition-transform`}></div>
                        <h3 className="font-bold text-xl text-center text-gray-800">{t.name}</h3>
                        <p className="text-center text-gray-500 text-sm mt-2 font-medium">Click to select</p>
                    </div>
                ))}
            </div>
        </div>
    );
}