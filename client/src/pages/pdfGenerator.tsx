import { Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer';

Font.register({
    family: 'Ethiopic',
    src: 'https://cdn.jsdelivr.net/gh/googlefonts/noto-fonts@master/hinted/ttf/NotoSansEthiopic/NotoSansEthiopic-Regular.ttf'
} as any);
Font.register({
    family: 'Times-Roman',
    src: 'https://fonts.gstatic.com/s/tinos/v19/buE4pooMIs_p6zUuc_Z2.ttf' // Tinos የሚባል የ Times New Roman አማራጭ ነው
});

const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#F8FAFC', // Soft white background
        fontFamily: 'Times-Roman'
    },
    // --- ዘመናዊ Curve Sidebar (3D Look) ---
    leftColumn: {
        width: '38%',
        backgroundColor: '#1E293B', // Dark Slate
        color: '#FFFFFF',
        padding: 20,
        paddingTop: 40,
        height: '100%',
        position: 'relative',
        // በዲዛይን በኩል ለየት ያለ እይታ ለመስጠት
        borderRight: '5pt solid #3B82F6',
    },
    // ለሴክሽኖቹ የ 3D ጥላ (Shadow) ውጤት
    sectionCard: {
        backgroundColor: '#334155',
        padding: 10,
        borderRadius: 8,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
    },
    avatarContainer: {
        alignItems: 'center',
        marginBottom: 25,
    },
    avatar: {
        width: 100,
        height: 120,
        borderRadius: 4,
        border: '2pt solid #3B82F6',
        objectFit: 'cover',
    },
    leftTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#3B82F6', // Neon Blue
        marginBottom: 8,
        textTransform: 'uppercase',
        borderBottom: '1pt solid #475569',
        paddingBottom: 3,
    },
    leftText: {
        fontSize: 9,
        marginBottom: 5,
        lineHeight: 1.4,
        color: '#E2E8F0',
    },// --- Skills Section Styling ---
    skillSection: {
        marginBottom: 12,
    },
    categoryLabel: {
        fontSize: 9,
        fontFamily: 'Times-Bold',
        color: '#3B82F6',
        marginBottom: 4,
        textTransform: 'uppercase',
    },
    skillsRow: {
        flexDirection: 'row',
        flexWrap: 'wrap', // ይህ በጣም አስፈላጊ ነው! ስኪሎቹ ሲበዙ ወደ ታች እንዲወርዱ ያደርጋል
    },
    skillBadge: {
        backgroundColor: '#3B82F6',
        paddingVertical: 3,      // ከላይ እና ከታች 3pt ክፍተት
        paddingHorizontal: 6,    // ከግራ እና ከቀኝ 6pt ክፍተት
        borderRadius: 4,
        marginRight: 4,          // በጎን በኩል በባጆቹ መካከል ክፍተት እንዲኖር
        marginBottom: 4,         // በረድፎች መካከል ክፍተት እንዲኖር (መደራረብን ይከላከላል)
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    skillText: {
        color: '#FFFFFF',
        fontSize: 8,             // ጽሁፉ በሳጥኑ ውስጥ እንዲያርፍ መጠኑ ትንሽ ቢሆን ይመረጣል
        fontFamily: 'Times-Roman',
        letterSpacing: 0.3,      // ፊደላቱ እርስ በርስ እንዳይጋፉ
    },


    // --- የቀኝ አምድ (Main Content) ---
    rightColumn: {
        width: '60%',
        padding: 30,
    },
    header: {
        marginBottom: 25,
        padding: 15,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        borderLeft: '10pt solid #1E293B', // Curve effect mimicking bar
        shadowColor: '#E2E8F0',
        shadowOpacity: 0.8,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#0F172A',
        textTransform: 'uppercase',
    },
    jobTitle: {
        fontSize: 14,
        color: '#3B82F6',
        marginTop: 4,
        fontWeight: 'bold',
    },
    contactInfo: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginTop: 10,
        fontSize: 9,
        color: '#64748B',
    },

    // 3D Header for Main Sections
    rightSectionTitle: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#FFFFFF',
        backgroundColor: '#1E293B',
        padding: "4 12",
        borderRadius: 6,
        marginBottom: 12,
        marginTop: 20,
        textTransform: 'uppercase',
    },

    itemContainer: {
        marginBottom: 15,
        paddingLeft: 10,
        borderLeft: '2pt solid #E2E8F0',
    },
    itemHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    itemTitle: { fontSize: 11, fontWeight: 'bold', color: '#1E293B' },
    itemDate: { fontSize: 9, color: '#64748B', fontWeight: 'bold' },
    itemSubtitle: { fontSize: 10, color: '#3B82F6', marginBottom: 4 },
    itemDesc: { fontSize: 9.5, color: '#475569', lineHeight: 1.5 },

    referenceGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 15,
    },
    refCard: {
        width: '45%',
        padding: 8,
        backgroundColor: '#F1F5F9',
        borderRadius: 6,
    }
});

export const MyResumePDF = ({ data }: { data: any }) => {
    const p = data.profile || {};

    return (
        <Document title={`${p.fullName || 'Resume'} - CV`}>
            <Page size="A4" style={styles.page}>

                {/* --- LEFT SIDEBAR --- */}
                <View style={styles.leftColumn}>
                    <View style={styles.avatarContainer}>
                        {p.avatarUrl ? (
                            <Image src={p.avatarUrl} style={styles.avatar} />
                        ) : (
                            <View style={[styles.avatar, { backgroundColor: '#334155' }]} />
                        )}
                    </View>

                    {/* Profile Summary & Personal Details */}
                    <View style={styles.sectionCard}>
                        <Text style={styles.leftTitle}>Profile</Text>

                        {/* Summary - ስለ ባለሙያው አጭር መግለጫ */}
                        <Text style={[styles.leftText, { marginBottom: 10 }]}>{p.summary}</Text>

                        {/* ተጨማሪ የግል መረጃዎች (ካሉ ብቻ እንዲታዩ ተደርጓል) */}
                        <View style={{ marginTop: 5, borderTopWidth: 1, borderTopColor: '#475569', paddingTop: 8 }}>
                            {p.gender && (
                                <Text style={styles.leftText}>• Gender: {p.gender}</Text>
                            )}
                            {p.age && (
                                <Text style={styles.leftText}>• Age: {p.age}</Text>
                            )}
                            {p.nationality && (
                                <Text style={styles.leftText}>• Nationality: {p.nationality}</Text>
                            )}
                        </View>
                    </View>
                    {/* Skills from Schema - Categorized View */}
                    {data.skills?.length > 0 && (
                        <View style={styles.sectionCard}>
                            <Text style={styles.leftTitle}>Skills & Competencies</Text>

                            {/* ዳታውን በ Category Group የማድረግ Logic */}
                            {Object.entries(
                                data.skills.reduce((acc: any, skill: any) => {
                                    const cat = skill.category || "General";
                                    if (!acc[cat]) acc[cat] = [];
                                    acc[cat].push(skill.name);
                                    return acc;
                                }, {})
                            ).map(([category, names]: [string, any], idx: number) => (
                                <View key={idx} style={{ marginBottom: 10 }}>
                                    {/* የምድቡ ስም (ለምሳሌ Programming:) */}
                                    <Text style={{
                                        fontSize: 9,
                                        fontFamily: 'Times-Bold',
                                        color: '#3B82F6',
                                        marginBottom: 4,
                                        textTransform: 'uppercase'
                                    }}>
                                        {category}:
                                    </Text>

                                    {/* የክህሎት ዝርዝር በባጅ (Badge) መልክ */}
                                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 4 }}>
                                        {names.map((name: string, i: number) => (
                                            <View key={i} style={styles.skillBadge}>
                                                <Text style={styles.skillText}>{name}</Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>
                            ))}
                        </View>
                    )}

                    {/* Languages from Schema */}
                    {data.languages?.length > 0 && (
                        <View style={styles.sectionCard}>
                            <Text style={styles.leftTitle}>Languages</Text>
                            {data.languages.map((l: any, i: number) => (
                                <Text key={i} style={styles.leftText}>• {l.name} - {l.proficiency}</Text>
                            ))}
                        </View>
                    )}

                    {/* Interests from Schema */}
                    {data.interests?.length > 0 && (
                        <View style={styles.sectionCard}>
                            <Text style={styles.leftTitle}>Interests</Text>
                            <Text style={styles.leftText}>
                                {data.interests.map((it: any) => it.name).join(', ')}
                            </Text>
                        </View>
                    )}
                </View>

                {/* --- RIGHT CONTENT --- */}
                <View style={styles.rightColumn}>
                    {/* Main Header */}
                    <View style={styles.header}>
                        <Text style={styles.name}>{p.fullName}</Text>
                        <Text style={styles.jobTitle}>{p.jobTitle}</Text>

                        <View style={styles.contactInfo}>
                            {/* የመጀመሪያው ረድፍ: ዋና መገናኛዎች */}
                            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 4 }}>
                                <Text>{p.email}</Text>
                                <Text>• {p.phoneNumber}</Text>
                                {p.altPhone && <Text>• Alt: {p.altPhone}</Text>}
                                <Text>• {p.location}</Text>
                            </View>

                            {/* ሁለተኛው ረድፍ: ሶሻል ሚዲያ እና ፖርትፎሊዮ */}
                            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
                                {p.website && <Text>Portfolio: {p.website}</Text>}
                                {p.linkedin && <Text>• LinkedIn: {p.linkedin}</Text>}
                                {p.github && <Text>• GitHub: {p.github}</Text>}
                                {p.telegram && <Text>• Telegram: {p.telegram}</Text>}
                            </View>
                        </View>
                    </View>
                    {/* Work Experience */}
                    {data.experience?.length > 0 && (
                        <View>
                            <Text style={styles.rightSectionTitle}>Professional Experience</Text>
                            {data.experience.map((exp: any, i: number) => (
                                <View key={i} style={styles.itemContainer}>
                                    <View style={styles.itemHeader}>
                                        <Text style={styles.itemTitle}>{exp.role}</Text>
                                        <Text style={styles.itemDate}>{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</Text>
                                    </View>
                                    <Text style={styles.itemSubtitle}>{exp.company} | {exp.location}</Text>
                                    <Text style={styles.itemDesc}>{exp.description}</Text>
                                </View>
                            ))}
                        </View>
                    )}

                    {/* Education Section - Updated for 1-8, 9-10, 11-12 */}
                    {data.education?.length > 0 && (
                        <View>
                            <Text style={styles.rightSectionTitle}>Education</Text>
                            {data.education.map((edu: any, i: number) => {
                                // እርከኖችን በስማቸው ለመለየት (Optional logic for cleaner display)
                                const isSchoolLevel = ["1-8", "9-10", "11-12", "Elementary", "Secondary", "Preparatory School"].some(term =>
                                    edu.degree?.includes(term)
                                );

                                return (
                                    <View key={i} style={styles.itemContainer}>
                                        <View style={styles.itemHeader}>
                                            {/* flex-1 በመጨመር ጽሁፉ ቢረዝም እንኳ ወደ ታች እንዲታጠፍ ያደርገዋል */}
                                            <View style={{ flex: 1, paddingRight: 10 }}>
                                                <Text style={styles.itemTitle}>
                                                    {edu.degree}
                                                    {edu.fieldOfStudy && !isSchoolLevel ? ` in ${edu.fieldOfStudy}` :
                                                        edu.fieldOfStudy ? ` (${edu.fieldOfStudy})` : ''}
                                                </Text>
                                            </View>

                                            {/* shrink-0 ቀኑ እንዳይጨመቅ ያደርገዋል */}
                                            <View style={{ flexShrink: 0 }}>
                                                <Text style={styles.itemDate}>
                                                    {edu.startDate} - {edu.endDate}
                                                </Text>
                                            </View>
                                        </View>

                                        <Text style={styles.itemSubtitle}>
                                            {edu.school} {edu.gpa ? `| CGPA: ${edu.gpa}` : ''}
                                        </Text>

                                        {edu.description && (
                                            <Text style={styles.itemDesc}>{edu.description}</Text>
                                        )}
                                    </View>
                                );
                            })}
                        </View>
                    )}

                    {/* Projects */}
                    {data.projects?.length > 0 && (
                        <View>
                            <Text style={styles.rightSectionTitle}>Key Projects</Text>
                            {data.projects.map((proj: any, i: number) => (
                                <View key={i} style={styles.itemContainer}>
                                    <Text style={styles.itemTitle}>{proj.name}</Text>
                                    <Text style={styles.itemDesc}>{proj.description}</Text>
                                    <Text style={{ fontSize: 8, color: '#3B82F6', marginTop: 3 }}>Tech: {proj.technologies}</Text>
                                </View>
                            ))}
                        </View>
                    )}

                    {/* Awards & Volunteer (Two Columns if both exist) */}
                    <View style={{ flexDirection: 'row', gap: 20 }}>
                        {data.awards?.length > 0 && (
                            <View style={{ flex: 1 }}>
                                <Text style={styles.rightSectionTitle}>Awards</Text>
                                {data.awards.map((aw: any, i: number) => (
                                    <View key={i} style={{ marginBottom: 5 }}>
                                        <Text style={[styles.itemTitle, { fontSize: 9 }]}>{aw.title}</Text>
                                        <Text style={{ fontSize: 8, color: '#64748B' }}>{aw.issuer} | {aw.date}</Text>
                                    </View>
                                ))}
                            </View>
                        )}
                        {data.volunteer?.length > 0 && (
                            <View style={{ flex: 1 }}>
                                <Text style={styles.rightSectionTitle}>Volunteer</Text>
                                {data.volunteer.map((vol: any, i: number) => (
                                    <View key={i} style={{ marginBottom: 5 }}>
                                        <Text style={[styles.itemTitle, { fontSize: 9 }]}>{vol.role}</Text>
                                        <Text style={{ fontSize: 8, color: '#64748B' }}>{vol.organization}</Text>
                                    </View>
                                ))}
                            </View>
                        )}
                    </View>

                    {/* References */}
                    {data.references?.length > 0 && (
                        <View>
                            <Text style={styles.rightSectionTitle}>References</Text>
                            <View style={styles.referenceGrid}>
                                {data.references.map((ref: any, i: number) => (
                                    <View key={i} style={styles.refCard}>
                                        <Text style={{ fontSize: 10, fontWeight: 'bold' }}>{ref.name}</Text>
                                        <Text style={{ fontSize: 8, color: '#3B82F6' }}>{ref.relationship} at {ref.company}</Text>
                                        <Text style={{ fontSize: 8 }}>{ref.email} | {ref.phone}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                    )}
                </View>
            </Page>
        </Document>
    );
};