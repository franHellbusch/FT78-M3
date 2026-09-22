import { GoogleGenerativeAI } from "@google/generative-ai";

const RETRY_AFTER_FALLBACK_SECONDS = 30;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { contents, systemInstruction, generationConfig } = req.body ?? {};

    if (!Array.isArray(contents) || contents.length === 0) {
      return res.status(400).json({ error: "contents required and must be non-empty" });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: "gemini-flash-lite-latest",
      systemInstruction,
      generationConfig,
    });

    const result = await model.generateContent({ contents });

    return res.status(200).json(result.response);
  } catch (error) {
    if (error.status === 429) {
      console.warn("Rate limit hit on Gemini");
      return res.status(429).json({
        error: "Rate limit exceeded",
        retryAfterSeconds: RETRY_AFTER_FALLBACK_SECONDS,
      });
    }

    console.error("Error calling Gemini:", error);
    return res.status(500).json({ error: "Error generating response" });
  }
}
