// pages/api/generate-image.js
import { google } from "googleapis";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: "Missing prompt" });
  }

  try {
    console.log("Prompt received:", prompt);

    // Temporary placeholder — this will be replaced with real Gemini API call later.
    return res.status(200).json({
      imageUrl: "https://placehold.co/600x400?text=Generated+Image",
    });
  } catch (error) {
    console.error("Error generating image:", error);
    return res.status(500).json({ error: "Image generation failed" });
  }
}
