import React from "react";
import styled, { keyframes } from "styled-components";
import { FaMicrophone } from "react-icons/fa";
import { useAIAssistant } from "./AIAssistantProvider";

const pulseRing = keyframes`
  0% { transform: scale(1); opacity: 0.6; }
  100% { transform: scale(1.7); opacity: 0; }
`;
//floating button container
const FloatContainer = styled.button`
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  z-index: 998;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  box-shadow: 0 10px 30px rgba(99, 102, 241, 0.45);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-4px) scale(1.05);
    box-shadow: 0 16px 40px rgba(99, 102, 241, 0.6);
  }

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: rgba(129, 140, 248, 0.5);
    animation: ${pulseRing} 2s ease-out infinite;
    z-index: -1;
  }

  @media (max-width: 480px) {
    width: 56px;
    height: 56px;
    bottom: 1rem;
    right: 1rem;
  }
`;

const Avatar = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid rgba(255, 255, 255, 0.25);

  @media (max-width: 480px) {
    width: 30px;
    height: 30px;
  }
`;

export default function AIFloatingButton() {
  const { open } = useAIAssistant();

  return (
    <FloatContainer onClick={open} aria-label="Talk to Sugriv AI">
      <Avatar src="/sugrivlodhi.png" alt="Sugriv AI" />
    </FloatContainer>
  );
}
