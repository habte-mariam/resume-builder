import { relations } from "drizzle-orm";
import 'dotenv/config';

import { pgTable, serial, text, timestamp, varchar, integer, boolean } from "drizzle-orm/pg-core";
export const profiles = pgTable("profiles", {
  id: serial("id").primaryKey(),
  fullName: varchar("full_name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  phoneNumber: varchar("phone_number", { length: 20 }),
  altPhone: varchar("alt_phone", { length: 20 }), // 1. ተጠባባቂ ስልክ
  jobTitle: varchar("job_title", { length: 150 }),
  summary: text("summary"),
  location: varchar("location", { length: 255 }),
  gender: varchar("gender", { length: 20 }),      // 2. ጾታ
  age: varchar("age", { length: 10 }),            // 3. እድሜ
  nationality: varchar("nationality", { length: 50 }), // 4. ዜግነት
  telegram: varchar("telegram", { length: 255 }), // 5. ቴሌግራም
  website: varchar("website", { length: 255 }),   // Portfolio
  github: varchar("github", { length: 255 }),
  linkedin: varchar("linkedin", { length: 255 }),
  avatarUrl: text("avatar_url"),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// 2. የስራ ልምድ (Detailed Experience)
export const experience = pgTable("experience", {
  id: serial("id").primaryKey(),
  profileId: integer("profile_id").references(() => profiles.id, { onDelete: "cascade" }),
  company: varchar("company", { length: 255 }).notNull(),
  location: varchar("location", { length: 100 }),
  role: varchar("role", { length: 150 }).notNull(),
  startDate: varchar("start_date", { length: 50 }).notNull(),
  endDate: varchar("end_date", { length: 50 }),
  current: boolean("current").default(false),
  description: text("description"),
});

// 3. ትምህርት (Education) - Updated for all levels
export const education = pgTable("education", {
  id: serial("id").primaryKey(),
  profileId: integer("profile_id").references(() => profiles.id, { onDelete: "cascade" }),
  school: varchar("school", { length: 255 }).notNull(), // የትምህርት ቤቱ ስም
  degree: varchar("degree", { length: 150 }).notNull(), // ለምሳሌ፡ "Elementary", "High School", "BSc"
  fieldOfStudy: varchar("field_of_study", { length: 150 }), // ለዩኒቨርሲቲ ብቻ (Optional)
  startDate: varchar("start_date", { length: 50 }),
  endDate: varchar("end_date", { length: 50 }),
  gpa: varchar("gpa", { length: 20 }), // ለምሳሌ፡ "8th Grade Result" ወይም "CGPA"
  description: text("description"), // ተጨማሪ ስኬቶች ወይም መግለጫ (ፎቶው ላይ እንዳለው)
});

// 4. ፕሮጀክቶች (Projects)
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  profileId: integer("profile_id").references(() => profiles.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  link: varchar("link", { length: 255 }),
  githubLink: varchar("github_link", { length: 255 }),
  technologies: text("technologies"), // Comma-separated list
});

// 5. ክህሎቶች (Skills & Tools)
export const skills = pgTable("skills", {
  id: serial("id").primaryKey(),
  profileId: integer("profile_id").references(() => profiles.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 100 }).notNull(),
  category: varchar("category", { length: 100 }), // e.g., "Frontend", "Soft Skills"
  level: varchar("level", { length: 50 }), // Expert, Beginner
});

// 6. ሰርቲፊኬቶችና ሽልማቶች (Certifications & Awards)
export const awards = pgTable("awards", {
  id: serial("id").primaryKey(),
  profileId: integer("profile_id").references(() => profiles.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 255 }).notNull(),
  issuer: varchar("issuer", { length: 255 }).notNull(),
  date: varchar("date", { length: 50 }),
  url: varchar("url", { length: 255 }),
  description: text("description"),
});

// 7. በጎ ፈቃድ አገልግሎት (Volunteer Experience)
export const volunteer = pgTable("volunteer", {
  id: serial("id").primaryKey(),
  profileId: integer("profile_id").references(() => profiles.id, { onDelete: "cascade" }),
  organization: varchar("organization", { length: 255 }).notNull(),
  role: varchar("role", { length: 150 }).notNull(),
  startDate: varchar("start_date", { length: 50 }),
  endDate: varchar("end_date", { length: 50 }),
  description: text("description"),
});

// 8. ጽሁፎችና ህትመቶች (Publications)
export const publications = pgTable("publications", {
  id: serial("id").primaryKey(),
  profileId: integer("profile_id").references(() => profiles.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 255 }).notNull(),
  publisher: varchar("publisher", { length: 255 }),
  releaseDate: varchar("release_date", { length: 50 }),
  url: varchar("url", { length: 255 }),
  summary: text("summary"),
});

// 9. ዋቢዎች (References - Optional for some CVs)
export const references = pgTable("references", {
  id: serial("id").primaryKey(),
  profileId: integer("profile_id").references(() => profiles.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 255 }).notNull(),
  relationship: varchar("relationship", { length: 150 }), // e.g., "Manager"
  company: varchar("company", { length: 255 }),
  email: varchar("email", { length: 255 }),
  phone: varchar("phone", { length: 50 }),
});

// 10. ቋንቋዎች (Languages)
export const languages = pgTable("languages", {
  id: serial("id").primaryKey(),
  profileId: integer("profile_id").references(() => profiles.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 100 }).notNull(),
  proficiency: varchar("proficiency", { length: 100 }), // Native, Fluent, etc.
});

// 11. ፍላጎቶች (Interests)
export const interests = pgTable("interests", {
  id: serial("id").primaryKey(),
  profileId: integer("profile_id").references(() => profiles.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 150 }).notNull(),
});

export const profilesRelations = relations(profiles, ({ many }) => ({
  experience: many(experience),
  education: many(education),
  skills: many(skills),
  projects: many(projects),
  awards: many(awards),
  volunteer: many(volunteer),
  publications: many(publications),
  references: many(references),
  languages: many(languages),
  interests: many(interests),
}));
// ለእያንዳንዱ ተቀባይ ሰንጠረዥ (Child Tables) ግንኙነቱን መግለጽ
export const experienceRelations = relations(experience, ({ one }) => ({
  profile: one(profiles, { fields: [experience.profileId], references: [profiles.id] }),
}));

export const educationRelations = relations(education, ({ one }) => ({
  profile: one(profiles, { fields: [education.profileId], references: [profiles.id] }),
}));

export const skillsRelations = relations(skills, ({ one }) => ({
  profile: one(profiles, { fields: [skills.profileId], references: [profiles.id] }),
}));

export const projectsRelations = relations(projects, ({ one }) => ({
  profile: one(profiles, { fields: [projects.profileId], references: [profiles.id] }),
}));

export const awardsRelations = relations(awards, ({ one }) => ({
  profile: one(profiles, { fields: [awards.profileId], references: [profiles.id] }),
}));

export const volunteerRelations = relations(volunteer, ({ one }) => ({
  profile: one(profiles, { fields: [volunteer.profileId], references: [profiles.id] }),
}));

export const publicationsRelations = relations(publications, ({ one }) => ({
  profile: one(profiles, { fields: [publications.profileId], references: [profiles.id] }),
}));

export const referencesRelations = relations(references, ({ one }) => ({
  profile: one(profiles, { fields: [references.profileId], references: [profiles.id] }),
}));

export const languagesRelations = relations(languages, ({ one }) => ({
  profile: one(profiles, { fields: [languages.profileId], references: [profiles.id] }),
}));

export const interestsRelations = relations(interests, ({ one }) => ({
  profile: one(profiles, { fields: [interests.profileId], references: [profiles.id] }),
}));