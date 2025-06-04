import {
    GoogleGenAI,
} from '@google/genai';

import {Alert} from "react-native";
import Constants from 'expo-constants';

export const getInterviewQuestions = async (content : string ) => {
    try {

        const apiKey = Constants.expoConfig?.extra?.geminiApiKey;
        if (!apiKey) {
            throw new Error('API key not configured. Please check your .env.local file');
        }

        const ai = new GoogleGenAI({
            apiKey: apiKey,
        });
        const config = {
            responseMimeType: 'text/plain',
        };
        const model = 'gemini-2.5-flash-preview-04-17';
        const contents = [
            {
                role: 'user',
                parts: [
                    {
                        text: content,
                    },
                ],
            },
        ];
        const response = await ai.models.generateContentStream({
            model,
            config,
            contents,
        });
        let fullResponse = '';
        for await (const chunk of response) {
            fullResponse += chunk.text;
        }


        let trimFullResponse = fullResponse.trim();

        if (trimFullResponse.startsWith('```json')) {
            trimFullResponse = trimFullResponse.replace('```json', '', ).replace(/\s*```$/, '');
        }
        else if (trimFullResponse.startsWith('```')) {
            trimFullResponse = trimFullResponse.replace(/^```\s*/, '').replace(/\s*```$/, '');
        }
        const parsedGeminiResponse = JSON.parse(trimFullResponse);
        return JSON.parse(parsedGeminiResponse);
    } catch (error) {
        console.error('Error generating interview questions:', error);
        Alert.alert('Error', 'Failed to generate interview questions');
    }

}
