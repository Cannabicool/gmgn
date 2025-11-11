import { GoogleGenAI } from "@google/genai";
import { AnalysisResult } from '../types';

// Helper to initialize the Gemini client, allowing for a mock fallback.
const getAiClient = () => {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
        console.warn("API_KEY environment variable not set. Using mock response.");
        return null;
    }
    return new GoogleGenAI({ apiKey });
}

const mockInsight = `Looks like the bots are your biggest fans. Stay based.`;

export const generateInsights = async (result: AnalysisResult): Promise<string> => {
    const ai = getAiClient();
    if (!ai) {
        return new Promise((resolve) => setTimeout(() => resolve(mockInsight), 500));
    }
    
    const { counts, totalCasts, username, persona } = result;
    const getPercentage = (value: number) => totalCasts > 0 ? ((value / totalCasts) * 100).toFixed(0) : 0;
    
    const ignoredPercent = getPercentage(counts.ignored);
    const botPercent = getPercentage(counts.botReplied);
    const humanPercent = getPercentage(counts.humanReplied);

    const prompt = `
        You are a crypto-native, slightly sarcastic, and witty Farcaster analyst called CLANKER. Your personality is like a seasoned degen who has seen it all.
        Your task is to provide a "hot take" on a user's "gm/gn" stats.
        The user's assigned persona is: "${persona}". Use this persona as the main inspiration for your take.

        Analyze the following data for the user "${username}" and generate a single, short, funny, and witty sentence as a hot take that reflects their persona.
        Keep it concise and punchy. Maximum 15 words.
        Do not repeat the stats. Just give a vibe-based interpretation.
        Use crypto slang if it feels natural.

        Data for context:
        - Total "gm/gn" casts: ${totalCasts}
        - Ignored: ${ignoredPercent}%
        - Bot Replies: ${botPercent}%
        - Human Replies: ${humanPercent}%
        
        Generate the hot take for the "${persona}" now.
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-pro',
            contents: prompt,
            config: {
                temperature: 0.8,
                thinkingConfig: {
                    thinkingBudget: 32768,
                }
            }
        });

        return response.text;
    } catch (error) {
        console.error("Error generating insights from Gemini:", error);
        return "Couldn't get a take from the AI overlords, but your chart looks cool.";
    }
};