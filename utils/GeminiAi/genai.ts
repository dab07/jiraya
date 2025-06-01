import {
    GoogleGenAI,
} from '@google/genai';

import {Alert} from "react-native";
import Constants from 'expo-constants';

export const getInterviewQuestions = async (content : string ) => {
    try {

        console.log('Initializing Gemini API...');

        console.log('Constants.expoConfig:', Constants.expoConfig);
        console.log('Constants.expoConfig?.extra:', Constants.expoConfig?.extra);

        const apiKey = Constants.expoConfig?.extra?.geminiApiKey;
        if (!apiKey) {
            throw new Error('API key not configured. Please check your .env.local file');
        }

        console.log('API key found, creating AI instance...');


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

        return JSON.parse(fullResponse);
    } catch (error) {
        console.error('Error generating interview questions:', error);
        Alert.alert('Error', 'Failed to generate interview questions');
    }

}
