import React, { createContext, useCallback, useContext, useState } from "react";
import dynamic from "next/dynamic";
import AIFloatingButton from "./AIFloatingButton";

// The voice assistant is loaded on demand so it adds zero weight to the
// initial page bundle (no WebRTC/audio code until the user opts in).
const VoiceAssistant = dynamic(() => import("./VoiceAssistant"), { ssr: false });

const AIAssistantContext = createContext({ open: () => {}, isEnabled: false });

export const useAIAssistant = () => useContext(AIAssistantContext);

export default function AIAssistantProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return (
    <AIAssistantContext.Provider value={{ open, isEnabled: true }}>
      {children}
      {!isOpen && <AIFloatingButton />}
      {isOpen && <VoiceAssistant onClose={close} />}
    </AIAssistantContext.Provider>
  );
}
