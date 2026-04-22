const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

export async function sendToGemini(userMessage, conversationHistory = []) {
  const apiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY;

  if (!apiKey || apiKey === "your_gemini_api_key_here") {
    throw new Error(
      "Gemini API key not set. Add EXPO_PUBLIC_GEMINI_API_KEY to your .env file.",
    );
  }

  const contents = [
    ...conversationHistory.map((msg) => ({
      role: msg.sender === "user" ? "user" : "model",
      parts: [{ text: msg.text }],
    })),
    {
      role: "user",
      parts: [{ text: userMessage }],
    },
  ];

  const response = await fetch(GEMINI_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-goog-api-key": apiKey,
    },
    body: JSON.stringify({
      system_instruction: {
        parts: [
          {
            text: "You are Hummel, a helpful and friendly AI assistant. Be concise and clear in your responses.",
          },
        ],
      },
      contents,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    console.error("Gemini API error body:", errorBody);
    let detail = errorBody;
    try {
      detail = JSON.parse(errorBody)?.error?.message || errorBody;
    } catch {}
    throw new Error(`API error ${response.status}: ${detail}`);
  }

  const data = await response.json();
  return data.candidates[0].content.parts[0].text;
}
