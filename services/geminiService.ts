// This service is primarily handled inside the GeminiSummary component for direct React integration.
// However, in a larger app, we would centralize the API calls here.

import { GoogleGenAI } from "@google/genai";

export const createGeminiClient = () => {
  if (!process.env.API_KEY) {
    console.warn("Gemini API Key is missing");
    return null;
  }
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};
