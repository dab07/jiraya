import 'dotenv/config';

export default {
    expo: {
        name: "Jiraya",
        slug: "jiraya",
        version: "1.0.0",
        extra: {
            geminiApiKey: process.env.EXPO_PUBLIC_GEMINI_API_KEY,
        },
    },
};
