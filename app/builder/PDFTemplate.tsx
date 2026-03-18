import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

// ስታይል መፍጠሪያ
const styles = StyleSheet.create({
    page: { padding: 30, backgroundColor: '#fff', fontFamily: 'Helvetica' },
    section: { margin: 10, padding: 10 },
    header: { fontSize: 24, marginBottom: 10, fontWeight: 'bold', color: '#1e40af' },
    subHeader: { fontSize: 14, marginBottom: 5, color: '#4b5563' },
    text: { fontSize: 11, marginBottom: 5, lineHeight: 1.5 },
    row: { flexDirection: 'row', justifyContent: 'space-between' }
});

export const MyPDFDocument = ({ data }: { data: any }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            {/* Header */}
            <View style={styles.section}>
                <Text style={styles.header}>{data.firstName} {data.lastName}</Text>
                <Text style={styles.subHeader}>{data.jobTitle}</Text>
                <View style={styles.row}>
                    <Text style={styles.text}>{data.email}</Text>
                    <Text style={styles.text}>{data.phone}</Text>
                </View>
            </View>

            {/* Summary */}
            {data.summary && (
                <View style={styles.section}>
                    <Text style={{ fontSize: 14, fontWeight: 'bold', borderBottom: 1, marginBottom: 5 }}>Profile</Text>
                    <Text style={styles.text}>{data.summary.replace(/<[^>]*>?/gm, '')}</Text>
                </View>
            )}

            {/* Experience - ካለ ብቻ */}
            {data.experience?.length > 0 && data.experience[0].company && (
                <View style={styles.section}>
                    <Text style={{ fontSize: 14, fontWeight: 'bold', borderBottom: 1, marginBottom: 5 }}>Experience</Text>
                    {data.experience.map((exp: any, i: number) => (
                        <View key={i} style={{ marginBottom: 10 }}>
                            <Text style={{ fontSize: 12, fontWeight: 'bold' }}>{exp.role} at {exp.company}</Text>
                            <Text style={styles.text}>{exp.startDate} - {exp.endDate}</Text>
                        </View>
                    ))}
                </View>
            )}
        </Page>
    </Document>
);