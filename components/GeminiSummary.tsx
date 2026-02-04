import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Sparkles, Loader2, AlertCircle } from 'lucide-react';

interface GeminiSummaryProps {
  content: string;
  title: string;
}

const GeminiSummary: React.FC<GeminiSummaryProps> = ({ content, title }) => {
  const [summary, setSummary] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const handleSummarize = async () => {
    if (!process.env.API_KEY) {
      setError('מפתח API חסר. לא ניתן לבצע סיכום.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `
        תפקידך לסכם מאמרים טכניים בעברית.
        אנא סכם את המאמר הבא בכותרת "${title}" ב-3 נקודות עיקריות קצרות וברורות.
        התמקד בעובדות החשובות ביותר.
        
        תוכן המאמר:
        ${content.substring(0, 5000)} // Limiting chars for demo safety
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview', // Using fast model for UI responsiveness
        contents: prompt,
      });

      if (response.text) {
        setSummary(response.text);
      } else {
        throw new Error('לא התקבלה תשובה');
      }
    } catch (err) {
      console.error(err);
      setError('אירעה שגיאה בעת יצירת הסיכום. אנא נסה שנית מאוחר יותר.');
    } finally {
      setLoading(false);
    }
  };

  if (summary) {
    return (
      <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-6 border border-indigo-100 my-8">
        <div className="flex items-center gap-2 mb-4 text-indigo-700">
          <Sparkles className="w-5 h-5" />
          <h3 className="font-bold text-lg">סיכום המאמר (נוצר ע"י Gemini)</h3>
        </div>
        <div className="prose prose-sm prose-indigo text-gray-700 whitespace-pre-wrap leading-relaxed">
          {summary}
        </div>
      </div>
    );
  }

  return (
    <div className="my-8">
      <button
        onClick={handleSummarize}
        disabled={loading}
        className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-lg font-medium transition-all shadow-sm disabled:opacity-70 w-full md:w-auto justify-center"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            מעבד סיכום...
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5" />
            קבל סיכום מהיר (AI)
          </>
        )}
      </button>
      {error && (
        <div className="mt-3 text-red-600 text-sm flex items-center gap-2 bg-red-50 p-3 rounded-lg">
          <AlertCircle className="w-4 h-4" />
          {error}
        </div>
      )}
    </div>
  );
};

export default GeminiSummary;