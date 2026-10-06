import { knowledgeProvider } from "@/lib/assistant/knowledge";

const CHAT_MODEL = process.env.OPENAI_CHAT_MODEL || "gpt-4.1-mini";

const GENERIC_ERROR =
  "I couldn't connect to the AI assistant. Please try again or use the contact form.";

/**
 * Text-chat fallback. Uses the Responses API with the same injected
 * knowledge base as the voice session, so answers are consistent.
 */
export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!process.env.OPENAI_API_KEY) {
    return res.status(503).json({ error: GENERIC_ERROR });
  }

  const { message, history = [] } = req.body || {};
  if (typeof message !== "string" || !message.trim() || message.length > 2000) {
    return res.status(400).json({ error: "A message is required." });
  }

  try {
    const input = [
      ...history.slice(-10).map((m) => ({
        role: m.role === "assistant" ? "assistant" : "user",
        content: String(m.text || "").slice(0, 2000),
      })),
      { role: "user", content: message.trim() },
    ];

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: CHAT_MODEL,
        instructions: knowledgeProvider.getSystemPrompt(),
        input,
        max_output_tokens: 400,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("OpenAI responses error:", data?.error?.message || response.status);
      return res.status(response.status === 429 ? 429 : 502).json({ error: GENERIC_ERROR });
    }

    const text =
      data.output_text ||
      data.output
        ?.flatMap((item) => item.content || [])
        .filter((c) => c.type === "output_text")
        .map((c) => c.text)
        .join("") ||
      "";

    return res.status(200).json({ reply: text || "I don't have verified information about that." });
  } catch (err) {
    console.error("Chat error:", err);
    return res.status(502).json({ error: GENERIC_ERROR });
  }
}
