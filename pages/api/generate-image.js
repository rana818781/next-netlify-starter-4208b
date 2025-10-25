import { google } from "googleapis";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { prompt } = req.body;

  try {
    // Load credentials from Netlify environment variable
    const credentials = JSON.parse(process.env.SERVICE_ACCOUNT_JSON);

    // Authenticate using GoogleAuth
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/cloud-platform"],
    });

    const client = await auth.getClient();
    const accessToken = await client.getAccessToken();

    // Call Gemini / Vertex AI REST API
    const response = await fetch("https://generativeai.googleapis.com/v1beta2/images:generate", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${accessToken.token || accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gemini-image-alpha-1",
        prompt: prompt,
        size: "1024x1024"
      }),
    });

    const data = await response.json();

    // Send back image URL
    res.status(200).json({ imageUrl: data.url || "https://via.placeholder.com/512" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to generate image" });
  }
}
