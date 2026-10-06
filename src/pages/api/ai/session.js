import { knowledgeProvider } from "@/lib/assistant/knowledge";

const REALTIME_MODEL =
  process.env.OPENAI_REALTIME_MODEL || "gpt-realtime-2.1-mini";
const REALTIME_VOICE = process.env.OPENAI_REALTIME_VOICE || "alloy";

/**
 * Mints a short-lived ephemeral client secret for the browser's WebRTC
 * connection to the OpenAI Realtime API. The permanent OPENAI_API_KEY
 * never leaves the server.
 *
 * Uses the current endpoint: POST /v1/realtime/client_secrets with a
 * nested { session: { type: "realtime", model, audio, instructions } } body.
 */
export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!process.env.OPENAI_API_KEY) {
    return res.status(503).json({ error: "AI assistant is not configured." });
  }

  if (!process.env.OPENAI_API_KEY.startsWith("sk-")) {
    console.error("OPENAI_API_KEY does not look like a valid OpenAI secret key.");
  }

  const body = {
    session: {
      type: "realtime",
      model: REALTIME_MODEL,
      audio: {
        output: { voice: REALTIME_VOICE },
      },
      instructions: knowledgeProvider.getSystemPrompt(),
    },
  };

  try {
    const response = await fetch(
      "https://api.openai.com/v1/realtime/client_secrets",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error(
        "OpenAI client_secrets error:",
        response.status,
        data?.error?.message || JSON.stringify(data)
      );
      return res.status(response.status === 429 ? 429 : 502).json({
        error: "Could not create a voice session. Please try again.",
        detail: data?.error?.message,
      });
    }

    const clientSecret = data.value;
    const expiresAt = data.expires_at;

    if (!clientSecret) {
      console.error("OpenAI client_secrets response missing value:", data);
      return res
        .status(502)
        .json({ error: "Could not create a voice session." });
    }

    return res.status(200).json({
      clientSecret,
      expiresAt,
      model: REALTIME_MODEL,
    });
  } catch (err) {
    console.error("Realtime session error:", err);
    return res.status(502).json({
      error: "Could not reach the AI service. Please try again.",
    });
  }
}
