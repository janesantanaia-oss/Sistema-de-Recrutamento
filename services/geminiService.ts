import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { CandidateAnswers, EvaluationResult, ScoreClassification } from '../types';

// Ensure the API key is available from environment variables
if (!process.env.API_KEY) {
  throw new Error("API_KEY is not defined in environment variables.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function evaluateCandidate(
  prompt: string,
  _candidateAnswers: CandidateAnswers, // Not directly used here, but kept for consistency
): Promise<EvaluationResult> {
  const modelName = 'gemini-3-pro-preview'; // Using a powerful model for complex reasoning and structured output

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: modelName,
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.NUMBER, description: 'Score total de 0-100.' },
            classification: {
              type: Type.STRING,
              enum: [
                ScoreClassification.Failed,
                ScoreClassification.TalentPool,
                ScoreClassification.Interview,
                ScoreClassification.HighPriority,
              ],
              description: 'Classificação final do candidato.'
            },
            strengths: { type: Type.ARRAY, items: { type: Type.STRING }, description: 'Lista de pontos fortes.' },
            redFlags: { type: Type.ARRAY, items: { type: Type.STRING }, description: 'Lista de "red flags" culturais e de performance.' },
            summary: { type: Type.STRING, description: 'Resumo objetivo do perfil do candidato.' },
            culturalRisks: { type: Type.STRING, description: 'Detalhamento dos riscos culturais.' },
            recommendation: { type: Type.STRING, description: 'Recomendação final.' },
          },
          required: [
            'score',
            'classification',
            'strengths',
            'redFlags',
            'summary',
            'culturalRisks',
            'recommendation',
          ],
        },
        thinkingConfig: { thinkingBudget: 2000 } // Allocate a reasonable thinking budget
      },
    });

    const jsonStr = response.text?.trim();

    if (!jsonStr) {
      throw new Error("AI did not return a valid JSON response.");
    }

    const result: EvaluationResult = JSON.parse(jsonStr);
    return result;

  } catch (error: any) {
    console.error("Error calling Gemini API:", error);
    if (error.response && error.response.error) {
        throw new Error(`Gemini API Error: ${error.response.error.message || JSON.stringify(error.response.error)}`);
    } else {
        throw new Error(`Failed to get evaluation from AI: ${error.message || 'Unknown error'}`);
    }
  }
}
