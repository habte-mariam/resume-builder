import { Document, Page, Text, View, StyleSheet, Font, Image } from '@react-pdf/renderer';

// ስታይሎችን እዚህ እንገልጻለን
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Helvetica', // React-pdf Helvetica, Times-Roman, Courier ይደግፋል
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#cbd5e1',
    paddingBottom: 20,
    marginBottom: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  jobTitle: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 4,
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 10,
    gap: 10,
  },
  contactItem: {
    fontSize: 9,
    color: '#475569',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#334155',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    paddingBottom: 4,
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  entryTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  entrySub: {
    fontSize: 10,
    color: '#64748b',
  },
  date: {
    fontSize: 9,
    color: '#94a3b8',
  },
  description: {
    fontSize: 10,
    color: '#334155',
    lineHeight: 1.5,
    marginTop: 4,
  },
  badgeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
  },
  badge: {
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    fontSize: 8,
    color: '#475569',
  }
});

export const PDFClassicDesign = ({ data }: { data: any }) => {
  // HTML tags ለማጥፋት የሚረዳ (dangerouslySetInnerHTML ስለማይሰራ)
  const stripHtml = (html: string) => html?.replace(/<[^>]*>?/gm, '') || '';

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          {data.profileImage && (
            <Image src={data.profileImage} style={styles.profileImage} />
          )}
          <Text style={styles.name}>{data.firstName} {data.lastName}</Text>
          {data.jobTitle && <Text style={styles.jobTitle}>{data.jobTitle}</Text>}

          <View style={styles.contactRow}>
            {data.email && <Text style={styles.contactItem}>{data.email}</Text>}
            {data.phone && <Text style={styles.contactItem}>{data.phone}</Text>}
            {data.address && <Text style={styles.contactItem}>{data.address}</Text>}
          </View>
        </View>

        {/* Summary */}
        {data.summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Summary</Text>
            <Text style={styles.description}>{stripHtml(data.summary)}</Text>
          </View>
        )}

        {/* Experience */}
        {data.experience?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Experience</Text>
            {data.experience.map((exp: any, i: number) => (
              <View key={i} style={{ marginBottom: 10 }}>
                <View style={styles.entryHeader}>
                  <Text style={styles.entryTitle}>{exp.role} {exp.company ? `| ${exp.company}` : ''}</Text>
                  <Text style={styles.date}>{exp.startDate} - {exp.isCurrent ? 'Present' : exp.endDate}</Text>
                </View>
                <Text style={styles.description}>{stripHtml(exp.desc)}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Education */}
        {data.education?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {data.education.map((edu: any, i: number) => (
              <View key={i} style={{ marginBottom: 8 }}>
                <View style={styles.entryHeader}>
                  <Text style={styles.entryTitle}>{edu.degree} {edu.school ? `| ${edu.school}` : ''}</Text>
                  <Text style={styles.date}>{edu.startYear} - {edu.endYear}</Text>
                </View>
                {edu.description && <Text style={styles.description}>{stripHtml(edu.description)}</Text>}
              </View>
            ))}
          </View>
        )}

        {/* Skills */}
        {(data.hardSkills?.length > 0 || data.softSkills?.length > 0) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            <View style={styles.badgeContainer}>
              {data.hardSkills?.map((skill: string, i: number) => (
                <Text key={i} style={styles.badge}>{skill}</Text>
              ))}
              {data.softSkills?.map((skill: string, i: number) => (
                <Text key={i} style={styles.badge}>{skill}</Text>
              ))}
            </View>
          </View>
        )}
      </Page>
    </Document>
  );
};