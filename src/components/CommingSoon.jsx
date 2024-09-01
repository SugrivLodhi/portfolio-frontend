// src/pages/ComingSoon.js

import React from 'react';
import styled, { keyframes } from 'styled-components';
import { FaSpinner } from 'react-icons/fa';

// Keyframes for animated gradient background
const gradientAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

// Keyframes for typewriter effect
const typewriter = keyframes`
  from { width: 0 }
  to { width: 100% }
`;

// Keyframes for blinking caret
const blinkCaret = keyframes`
  from, to { border-color: transparent }
  50% { border-color: white; }
`;

// Keyframes for fading in subtext
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to{
    opacity: 1;
    transform: translateY(0);
  }
`;

// Keyframes for spinner rotation
const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

// Container with animated gradient background
const ComingSoonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  animation: ${gradientAnimation} 15s ease infinite;
  color: white;
  text-align: center;
  position: relative;
  overflow: hidden;
  padding: 20px;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

// Heading with typewriter effect
const ComingSoonText = styled.h1`
  font-size: 4em;
  margin: 0;
  overflow: hidden;
  white-space: nowrap;
  border-right: 0.15em solid white;
  width: 0;
  animation: 
    ${typewriter} 3s steps(20, end) forwards, 
    ${blinkCaret} 0.75s step-end infinite;
  
  @media (max-width: 768px) {
    font-size: 2.5em;
  }
`;

// Subtext with fade-in effect
const SubText = styled.p`
  font-size: 1.5em;
  margin-top: 20px;
  opacity: 0;
  animation: ${fadeInUp} 1.5s ease forwards;
  animation-delay: 3s;

  @media (max-width: 768px) {
    font-size: 1.2em;
  }
`;

// Spinner icon with rotation animation
const Spinner = styled(FaSpinner)`
  margin-top: 30px;
  font-size: 2em;
  animation: ${spin} 2s linear infinite;
  
  @media (max-width: 768px) {
    font-size: 1.5em;
    margin-top: 20px;
  }
`;

const ComingSoon = () => {
  return (
    <ComingSoonContainer>
      <ComingSoonText>Coming Soon</ComingSoonText>
      <SubText>We are working hard to bring you something amazing.</SubText>
      <Spinner />
    </ComingSoonContainer>
  );
};

export default ComingSoon;
