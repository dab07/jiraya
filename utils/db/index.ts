import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';
import {nanoid} from "nanoid";
import {MockInterview} from "./schema";
import {eq} from "drizzle-orm";
const sql = neon(process.env.EXPO_PUBLIC_DATABASE_URL!);

const index = drizzle(sql, {schema});

export const allInterviewDetails = async (data : {
        jobTitle: string;
        jobExp : string;
        jobDescription: string;
        jobSkills : string;
        jsonMockResponse: string;
    }) => {
    try {
        const result = await index.insert(MockInterview).values({
            mockId: nanoid(),
            jsonMockResponse: data.jsonMockResponse,
            jobTitle: data.jobTitle,
            jobDesciption: data.jobDescription,
            jobExperience: data.jobExp,
            jobSkills: data.jobSkills,
            updated_at: new Date(),
        }).returning();

        return result[0];
    } catch (error) {
        console.error('Error saving mock interview:', error);
        throw error;
    }
}

export async function getMockInterviewById(mockId: string) {
    try {
        const result = await index.select().from(MockInterview).where(eq(MockInterview.mockId, mockId));
        if (result.length > 0) {
            return {
                ...result[0],
                jsonMockResponse: JSON.parse(result[0].jsonMockResponse) // Parse JSON string back to object
            };
        }
        return null;
    } catch (error) {
        console.error('Error retrieving mock interview:', error);
        throw error;
    }
}
