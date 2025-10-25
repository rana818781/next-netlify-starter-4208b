import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    if (!prompt) return alert("Please enter a prompt!");
    setLoading(true);

    try {
      const res = await fetch("/api/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      setImageUrl(data.imageUrl);
    } catch (err) {
      console.error(err);
      alert("Failed to generate image.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Hello from my AI Image Generator!</h1>
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your prompt"
        style={{ width: "300px", padding: "10px" }}
      />
      <br /><br />
      <button onClick={generateImage} style={{ padding: "10px 20px" }}>
        {loading ? "Generating..." : "Generate Image"}
      </button>
      <br /><br />
      {imageUrl && (
        <div>
          <h3>Generated Image:</h3>
          <img src={imageUrl} alt="AI Generated" style={{ maxWidth: "500px" }} />
        </div>
      )}
    </div>
  );
}


