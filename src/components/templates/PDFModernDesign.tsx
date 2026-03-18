import { Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    fontFamily: 'Helvetica',
  },
  // Sidebar (Left - 30%)
  sidebar: {
    width: '30%',
    backgroundColor: '#f8fafc', // blue-50/80 approximate
    padding: 25,
    borderRightWidth: 1,
    borderRightColor: '#e2e8f0',
    height: '100%',
  },
  // Main Content (Right - 70%)
  main: {
    width: '70%',
    padding: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
    alignSelf: 'center',
    borderWidth: 3,
    borderColor: '#bfdbfe',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1d4ed8', // blue-700
    textAlign: 'center',
    marginBottom: 4,
  },
  jobTitleSidebar: {
    fontSize: 12,
    color: '#60a5fa', // blue-400
    textAlign: 'center',
    marginBottom: 20,
  },
  sidebarSectionTitle: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#64748b', // slate-500
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
    marginTop: 15,
  },
  sidebarText: {
    fontSize: 9,
    color: '#334155',
    marginBottom: 5,
  },
  skillBadge: {
    backgroundColor: '#dbeafe', // blue-100
    color: '#1d4ed8',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 8,
    fontSize: 8,
    marginRight: 4,
    marginBottom: 4,
  },
  // Main Content Styles
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eff6ff',
    paddingBottom: 4,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1d4ed8',
  },
  contentBody: {
    fontSize: 10,
    color: '#334155',
    lineHeight: 1.5,
  },
  expHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
    marginTop: 8,
  },
  roleText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  companyText: {
    fontSize: 10,
    color: '#3b82f6', // blue-500
    fontWeight: 'bold',
  },
  dateText: {
    fontSize: 8,
    color: '#94a3b8',
  }
});

export const PDFModernDesign = ({ data }: { data: any }) => {
  const stripHtml = (html: string) => html?.replace(/<[^>]*>?/gm, '') || '';

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Sidebar */}
        <View style={styles.sidebar}>
          {data.profileImage && (
            <Image src={data.profileImage} style={styles.profileImage} />
          )}
          <Text style={styles.name}>{data.firstName} {data.lastName}</Text>
          {data.jobTitle && <Text style={styles.jobTitleSidebar}>{data.jobTitle}</Text>}

          <Text style={styles.sidebarSectionTitle}>Contact</Text>
          {data.email && <Text style={styles.sidebarText}>{data.email}</Text>}
          {data.phone && <Text style={styles.sidebarText}>{data.phone}</Text>}
          {data.address && <Text style={styles.sidebarText}>{data.address}</Text>}
          {data.linkedin && <Text style={styles.sidebarText}>LinkedIn: {data.linkedin.split('/').pop()}</Text>}

          <Text style={styles.sidebarSectionTitle}>Skills</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {data.hardSkills?.map((skill: string, i: number) => (
              <Text key={i} style={styles.skillBadge}>{skill}</Text>
            ))}
          </View>

          <Text style={styles.sidebarSectionTitle}>Languages</Text>
          {data.languages?.map((lang: any, i: number) => (
            <Text key={i} style={styles.sidebarText}>{lang.name} ({lang.level})</Text>
          ))}
        </View>

        {/* Main Content */}
        <View style={styles.main}>
          {data.summary && (
            <View>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Summary</Text>
              </View>
              <Text style={styles.contentBody}>{stripHtml(data.summary)}</Text>
            </View>
          )}

          {data.experience?.length > 0 && (
            <View>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Experience</Text>
              </View>
              {data.experience.map((exp: any, i: number) => (
                <View key={i} style={{ marginBottom: 10 }}>
                  <View style={styles.expHeader}>
                    <Text style={styles.roleText}>{exp.role}</Text>
                    <Text style={styles.dateText}>{exp.startDate} - {exp.isCurrent ? 'Present' : exp.endDate}</Text>
                  </View>
                  <Text style={styles.companyText}>{exp.company}</Text>
                  <Text style={[styles.contentBody, { marginTop: 4 }]}>{stripHtml(exp.desc)}</Text>
                </View>
              ))}
            </View>
          )}

          {data.education?.length > 0 && (
            <View>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Education</Text>
              </View>
              {data.education.map((edu: any, i: number) => (
                <View key={i} style={{ marginBottom: 8 }}>
                  <View style={styles.expHeader}>
                    <Text style={styles.roleText}>{edu.degree}</Text>
                    <Text style={styles.dateText}>{edu.startYear} - {edu.endYear}</Text>
                  </View>
                  <Text style={styles.companyText}>{edu.school}</Text>
                  {edu.gpa && <Text style={[styles.dateText, { color: '#60a5fa' }]}>GPA: {edu.gpa}</Text>}
                </View>
              ))}
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
};