import { integer, pgTable, varchar, serial, text, timestamp } from "drizzle-orm/pg-core";

export const MockInterview = pgTable("mockInterview", {
    id : serial('id').primaryKey(),
    mockId : varchar().notNull(),
    jsonMockResponse : text().notNull(),
    jobTitle : varchar().notNull(),
    jobDesciption : varchar().notNull(),
    jobExperience : integer().notNull(),
    createdBy : varchar().notNull(),
    updated_at: timestamp(),
    created_at: timestamp().defaultNow().notNull(),
})
