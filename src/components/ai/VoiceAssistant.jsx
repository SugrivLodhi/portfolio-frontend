import React, { useCallback, useEffect, useRef, useState } from "react";
import { Mic, MicOff, Send, X, Volume2, VolumeX } from "lucide-react";

const STATUS = {
  IDLE: "idle",
  CONNECTING: "connecting",
  LISTENING: "listening",
  THINKING: "thinking",
  SPEAKING: "speaking",
  ERROR: "error",
};

const STATUS_LABEL = {
  [STATUS.CONNECTING]: "Connecting…",
  [STATUS.LISTENING]: "Listening…",
  [STATUS.THINKING]: "Thinking…",
  [STATUS.SPEAKING]: "Speaking…",
  [STATUS.IDLE]: "Ready",
  [STATUS.ERROR]: "Unavailable",
};

const FRIENDLY_ERRORS = {
  mic: "Microphone access was denied. You can allow it in your browser settings, or use text chat.",
  unsupported: "Voice isn't available in this browser. Try Chrome or Edge — or use text chat instead.",
  connect: "I couldn't connect to the AI assistant. Please try again or use text chat.",
  session: "Could not start a voice session. Please check your OpenAI API key/model.",
};

const voiceSupported = () =>
  typeof window !== "undefined" &&
  typeof RTCPeerConnection !== "undefined" &&
  !!navigator.mediaDevices?.getUserMedia;

const speechRecognitionSupported = () =>
  typeof window !== "undefined" &&
  !!(window.SpeechRecognition || window.webkitSpeechRecognition);

export default function VoiceAssistant({ onClose }) {
  const [mode] = useState("voice"); // kept for hook-order stability; UI shows both voice + text
  const [status, setStatus] = useState(STATUS.CONNECTING);
  const [errorMsg, setErrorMsg] = useState(null);
  const [messages, setMessages] = useState([
    { role: "assistant", text: "I am Sugriv Lodhi, and this is my AI portfolio assistant. Ask me about my experience, skills, or projects." },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [chatBusy, setChatBusy] = useState(false);
  const [speakEnabled, setSpeakEnabled] = useState(true);
  const [isDictating, setIsDictating] = useState(false);

  const pcRef = useRef(null);
  const dcRef = useRef(null);
  const streamRef = useRef(null);
  const audioRef = useRef(null);
  const transcriptRef = useRef("");
  const listRef = useRef(null);
  const endedRef = useRef(false);
  const [logs, setLogs] = useState([]);
  const recognitionRef = useRef(null);

  const pushLog = (line) => {
    setLogs((prev) => [...prev.slice(-20), line]);
    // Also mirror to the browser console for easy devtools debugging
    // eslint-disable-next-line no-console
    console.log(`[VoiceAssistant] ${line}`);
  };

  const pushMessage = useCallback((role, text) => {
    setMessages((prev) => {
      if (
        role === "assistant" &&
        prev.length &&
        prev[prev.length - 1].role === "assistant" &&
        prev[prev.length - 1].streaming
      ) {
        const next = [...prev];
        next[next.length - 1] = { role, text, streaming: true };
        return next;
      }
      return [...prev, { role, text, streaming: role === "assistant" }];
    });
  }, []);

  const finalizeAssistant = useCallback(() => {
    setMessages((prev) =>
      prev.map((m, i) =>
        i === prev.length - 1 ? { ...m, streaming: false } : m
      )
    );
  }, []);

  const teardown = useCallback(() => {
    endedRef.current = true;
    try {
      dcRef.current?.close();
    } catch {}
    try {
      pcRef.current?.close();
    } catch {}
    streamRef.current?.getTracks().forEach((t) => t.stop());
    pcRef.current = null;
    dcRef.current = null;
    streamRef.current = null;
  }, []);

  const handleRealtimeEvent = useCallback(
    (event) => {
      const type = event.type || "";
      pushLog(`event: ${type}`);

      if (type === "input_audio_buffer.speech_started") {
        setStatus(STATUS.LISTENING);
        finalizeAssistant();
      } else if (type === "input_audio_buffer.speech_stopped") {
        setStatus(STATUS.THINKING);
      } else if (
        type === "conversation.item.input_audio_transcription.completed" &&
        event.transcript
      ) {
        setMessages((prev) => [
          ...prev,
          { role: "user", text: event.transcript },
        ]);
      } else if (
        type === "response.audio_transcript.delta" ||
        type === "response.output_audio_transcript.delta" ||
        type === "response.content_part.text.delta" ||
        type === "response.output_text.delta"
      ) {
        transcriptRef.current += event.delta || "";
        pushMessage("assistant", transcriptRef.current);
      } else if (
        type === "response.audio_transcript.done" ||
        type === "response.output_audio_transcript.done" ||
        type === "response.content_part.done" ||
        type === "response.output_text.done"
      ) {
        transcriptRef.current = "";
        finalizeAssistant();
      } else if (
        type === "response.audio.delta" ||
        type === "response.output_audio.delta"
      ) {
        setStatus(STATUS.SPEAKING);
      } else if (type === "response.created") {
        transcriptRef.current = "";
        setStatus(STATUS.THINKING);
      } else if (type === "response.done") {
        finalizeAssistant();
        setStatus(STATUS.LISTENING);
      } else if (type === "error") {
        console.error("Realtime error:", event.error);
        pushLog(`Realtime error: ${JSON.stringify(event.error)}`);
        setErrorMsg(FRIENDLY_ERRORS.connect);
        setStatus(STATUS.ERROR);
      }
    },
    [finalizeAssistant, pushMessage]
  );

  const startVoice = useCallback(async () => {
    if (!voiceSupported()) {
      setErrorMsg(FRIENDLY_ERRORS.unsupported);
      setStatus(STATUS.ERROR);
      return;
    }
    setStatus(STATUS.CONNECTING);
    setErrorMsg(null);
    endedRef.current = false;

    try {
      pushLog("Requesting session from /api/ai/session");
      const sessionRes = await fetch("/api/ai/session", { method: "POST" });
      const sessionText = await sessionRes.text();
      let sessionData;
      try {
        sessionData = JSON.parse(sessionText);
      } catch {
        sessionData = { raw: sessionText };
      }

      pushLog(`Session response: ${sessionRes.status}`);
      if (!sessionRes.ok) {
        console.error("Session request failed:", sessionRes.status, sessionData);
        setErrorMsg(
          sessionRes.status === 429
            ? "Rate limited by the AI service. Please try again in a moment."
            : sessionData?.error?.message || sessionData?.error || FRIENDLY_ERRORS.session
        );
        setStatus(STATUS.ERROR);
        return;
      }

      const { clientSecret, model } = sessionData || {};
      if (!clientSecret) {
        console.error("Missing clientSecret:", sessionData);
        setErrorMsg(FRIENDLY_ERRORS.session);
        setStatus(STATUS.ERROR);
        return;
      }
      pushLog(`Using model: ${model}`);

      // Stop browser TTS so it doesn't overlap with the realtime AI voice.
      if (typeof window !== "undefined") {
        window.speechSynthesis?.cancel();
      }
      stopDictation();

      let stream;
      try {
        stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      } catch (micErr) {
        pushLog(`Mic permission error: ${micErr?.name || micErr}`);
        setErrorMsg(FRIENDLY_ERRORS.mic);
        setStatus(STATUS.ERROR);
        return;
      }
      streamRef.current = stream;

      const pc = new RTCPeerConnection({ iceServers: [] });
      pcRef.current = pc;

      pc.onconnectionstatechange = () => {
        pushLog(`PeerConnection state: ${pc.connectionState}`);
        if (pc.connectionState === "failed" || pc.connectionState === "disconnected") {
          setErrorMsg(FRIENDLY_ERRORS.connect);
          setStatus(STATUS.ERROR);
        }
      };

      const remoteAudio = audioRef.current || new Audio();
      remoteAudio.autoplay = true;
      audioRef.current = remoteAudio;
      pc.ontrack = (e) => {
        pushLog("Remote audio track received");
        remoteAudio.srcObject = e.streams[0];
      };

      stream.getTracks().forEach((track) => pc.addTrack(track, stream));

      const dc = pc.createDataChannel("oai-events");
      dcRef.current = dc;
      dc.onopen = () => pushLog("Data channel open");
      dc.onclose = () => pushLog("Data channel closed");
      dc.onerror = (e) => {
        pushLog(`Data channel error: ${e}`);
        setErrorMsg(FRIENDLY_ERRORS.connect);
        setStatus(STATUS.ERROR);
      };
      dc.onmessage = (e) => {
        try {
          handleRealtimeEvent(JSON.parse(e.data));
        } catch (parseErr) {
          pushLog(`Failed to parse event: ${parseErr}`);
        }
      };

      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      pushLog("Local SDP offer created");

      const sdpRes = await fetch("https://api.openai.com/v1/realtime/calls", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${clientSecret}`,
          "Content-Type": "application/sdp",
        },
        body: offer.sdp,
      });
      if (!sdpRes.ok) {
        const sdpText = await sdpRes.text();
        pushLog(`SDP exchange failed: ${sdpRes.status} ${sdpText}`);
        throw new Error(`sdp ${sdpRes.status}`);
      }
      await pc.setRemoteDescription({ type: "answer", sdp: await sdpRes.text() });
      pushLog("Remote SDP answer set");

      setStatus(STATUS.LISTENING);
    } catch (err) {
      console.error("Voice connection failed:", err);
      pushLog(`Connection exception: ${err?.message || err}`);
      teardown();
      setErrorMsg(FRIENDLY_ERRORS.connect);
      setStatus(STATUS.ERROR);
    }
  }, [teardown]);

  const endConversation = useCallback(() => {
    teardown();
    setStatus(STATUS.IDLE);
  }, [teardown]);

  useEffect(() => {
    endedRef.current = false;
    startVoice();
    return teardown;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    listRef.current?.scrollTo({
      top: listRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  const speakText = useCallback(
    (text) => {
      if (!speakEnabled || typeof window === "undefined") return;
      const synth = window.speechSynthesis;
      if (!synth || !text) return;
      synth.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      const voices = synth.getVoices();
      const enVoice = voices.find((v) => v.lang?.startsWith("en")) || voices[0];
      if (enVoice) utterance.voice = enVoice;
      utterance.rate = 1;
      utterance.pitch = 1;
      synth.speak(utterance);
    },
    [speakEnabled]
  );

  const stopDictation = useCallback(() => {
    try {
      recognitionRef.current?.stop();
    } catch {}
    setIsDictating(false);
  }, []);

  const startDictation = useCallback(() => {
    if (!speechRecognitionSupported()) {
      setErrorMsg("Speech recognition isn't supported in this browser.");
      return;
    }
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = "en-US";
    recognitionRef.current = recognition;

    recognition.onstart = () => {
      setIsDictating(true);
      pushLog("Speech recognition started");
    };
    recognition.onend = () => {
      setIsDictating(false);
      pushLog("Speech recognition ended");
    };
    recognition.onerror = (e) => {
      setIsDictating(false);
      pushLog(`Speech recognition error: ${e.error}`);
    };
    recognition.onresult = (e) => {
      let final = "";
      let interim = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const r = e.results[i];
        if (r.isFinal) final += r[0].transcript;
        else interim += r[0].transcript;
      }
      setInputValue(final || interim);
      if (final.trim()) {
        setInputValue(final.trim());
        setTimeout(() => sendText(), 100);
      }
    };

    try {
      recognition.start();
    } catch (e) {
      pushLog(`Could not start dictation: ${e.message}`);
    }
  }, []);

  const sendText = async () => {
    const text = inputValue.trim();
    if (!text || chatBusy) return;
    setInputValue("");
    setMessages((prev) => [...prev, { role: "user", text }]);
    setChatBusy(true);
    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          history: messages.filter((m) => !m.streaming),
        }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text:
            data.reply ||
            data.error ||
            FRIENDLY_ERRORS.connect,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: FRIENDLY_ERRORS.connect },
      ]);
    } finally {
      setChatBusy(false);
    }
  };

  const speaking = status === STATUS.SPEAKING;
  const connecting = status === STATUS.CONNECTING;

  useEffect(() => {
    // Only speak text replies when the realtime voice session is not active,
    // to avoid two voices talking over each other.
    if (status !== STATUS.IDLE && status !== STATUS.ERROR) return;
    const last = messages[messages.length - 1];
    if (
      last?.role === "assistant" &&
      !last.streaming &&
      speakEnabled &&
      last.text
    ) {
      speakText(last.text);
    }
  }, [messages, speakEnabled, speakText, status]);

  // If the realtime AI starts speaking, stop any browser text-to-speech.
  useEffect(() => {
    if (status === STATUS.SPEAKING && typeof window !== "undefined") {
      window.speechSynthesis?.cancel();
    }
  }, [status]);

  useEffect(() => () => stopDictation(), [stopDictation]);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-3xl bg-gradient-to-b from-[#0f172a] to-[#1e293b] text-white shadow-2xl border border-white/10 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full overflow-hidden border border-white/20 bg-slate-800">
              <img
                src="/sugrivlodhi.png"
                alt="Sugriv Lodhi"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-left">
              <span className="block font-semibold text-sm tracking-wide">Sugriv Lodhi</span>
              <span className="text-[10px] text-slate-400">AI assistant · speaking for me</span>
            </div>
          </div>
          <button
            onClick={() => {
              teardown();
              onClose();
            }}
            className="p-1.5 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Close assistant"
          >
            <X size={18} />
          </button>
        </div>

        {/* Orb + status */}
        <div className="flex flex-col items-center pt-8 pb-4">
          <div className="relative w-24 h-24 flex items-center justify-center">
            <div
              className={`absolute inset-0 rounded-full bg-blue-500/30 transition-all duration-300 ${
                speaking ? "scale-125 animate-pulse" : status === STATUS.LISTENING ? "scale-110" : "scale-100"
              }`}
            />
            <div
              className={`absolute inset-2 rounded-full bg-blue-500/50 transition-all duration-200 ${
                speaking ? "animate-ping" : ""
              }`}
            />
            <div
              className={`relative w-16 h-16 rounded-full flex items-center justify-center transition-colors ${
                status === STATUS.ERROR ? "bg-red-500" : "bg-gradient-to-br from-blue-500 to-indigo-600"
              } ${connecting ? "animate-pulse" : ""}`}
            >
              {status === STATUS.ERROR ? <MicOff size={26} /> : <Mic size={26} />}
            </div>
          </div>
          <h2 className="mt-4 text-lg font-semibold">I am Sugriv Lodhi</h2>
          <p className="text-xs text-slate-400 mt-1">Ask me about my work, skills, or projects</p>
          {mode === "voice" && (
            <span className="mt-1.5 inline-block px-2 py-0.5 rounded-full bg-white/5 text-[10px] text-slate-500 uppercase tracking-wider">
              Voice + Chat
            </span>
          )}
          <p
            className={`mt-2 text-sm font-medium ${
              status === STATUS.ERROR ? "text-red-400" : "text-blue-300"
            }`}
          >
            {errorMsg ? null : STATUS_LABEL[status]}
          </p>
          {errorMsg && (
            <p className="mt-2 text-sm text-red-300 text-center px-6 max-w-xs">{errorMsg}</p>
          )}

          {/* Dev-only diagnostic toggle */}
          <details className="mt-3 text-[10px] text-slate-500 max-w-xs">
            <summary className="cursor-pointer select-none">Diagnostics</summary>
            <div className="mt-1 max-h-24 overflow-y-auto text-left font-mono">
              {logs.map((l, i) => (
                <div key={i}>{l}</div>
              ))}
            </div>
          </details>
        </div>

        {/* Transcript / chat */}
        <div ref={listRef} className="flex-1 overflow-y-auto px-5 py-3 space-y-3 min-h-[120px]">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[85%] px-3.5 py-2 rounded-2xl text-sm leading-relaxed ${
                  m.role === "user"
                    ? "bg-blue-600 text-white rounded-br-md"
                    : "bg-white/10 text-slate-100 rounded-bl-md"
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
          {chatBusy && (
            <div className="flex justify-start">
              <div className="bg-white/10 text-slate-300 px-3.5 py-2 rounded-2xl text-sm animate-pulse">
                Thinking…
              </div>
            </div>
          )}
        </div>

        {/* Controls — text input + voice input + TTS toggle + realtime voice */}
        <div className="px-5 py-4 border-t border-white/10 space-y-3">
          <div className="flex gap-2">
            <button
              onClick={isDictating ? stopDictation : startDictation}
              disabled={!speechRecognitionSupported() || chatBusy}
              className={`p-2.5 rounded-xl transition-colors ${
                isDictating
                  ? "bg-red-500/90 hover:bg-red-500 animate-pulse"
                  : "bg-white/10 hover:bg-white/20 disabled:opacity-40"
              }`}
              aria-label={isDictating ? "Stop dictation" : "Dictate a question"}
              title={speechRecognitionSupported() ? "Dictate" : "Not supported"}
            >
              {isDictating ? <MicOff size={18} /> : <Mic size={18} />}
            </button>
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendText()}
              placeholder="Type a question or tap the mic to talk…"
              className="flex-1 bg-white/10 rounded-xl px-4 py-2.5 text-sm outline-none placeholder:text-slate-500 focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={() => setSpeakEnabled((v) => !v)}
              className={`p-2.5 rounded-xl transition-colors ${
                speakEnabled ? "bg-blue-600/80 hover:bg-blue-500" : "bg-white/10 hover:bg-white/20"
              }`}
              aria-label={speakEnabled ? "Mute replies" : "Speak replies"}
              title={speakEnabled ? "Replies are spoken" : "Replies are muted"}
            >
              {speakEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
            </button>
            <button
              onClick={sendText}
              disabled={chatBusy || !inputValue.trim()}
              className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-40 transition-colors"
              aria-label="Send message"
            >
              <Send size={18} />
            </button>
          </div>

          <div className="flex justify-center gap-3">
            {status === STATUS.ERROR || status === STATUS.IDLE ? (
              <button
                onClick={startVoice}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-sm font-medium transition-colors"
              >
                <Mic size={16} /> Start Realtime Voice
              </button>
            ) : (
              <button
                onClick={endConversation}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-red-500/90 hover:bg-red-500 text-sm font-medium transition-colors"
              >
                <MicOff size={16} /> End Realtime Voice
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
