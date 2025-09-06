import React from "react";
import styled, { keyframes } from "styled-components";
import { FaDownload } from "react-icons/fa";
import { theme } from "@/theme";
import { breakpoints } from "@/constants";

// Animations
const fadeInUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

const Container = styled.div`
  text-align: center;
  color: white;
`;

const SubTitle = styled.h3`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: white;
  animation: ${fadeInUp} 1s ease-out;

  @media (max-width: ${breakpoints.tablet}) {
    font-size: 1.7rem;
    margin-bottom: 1.2rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
`;

const Description = styled.p`
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 2rem;
  line-height: 1.6;
  animation: ${fadeInUp} 1s ease-out;
  animation-delay: 0.2s;
  opacity: 0;
  animation-fill-mode: forwards;

  @media (max-width: ${breakpoints.tablet}) {
    font-size: 1rem;
    margin-bottom: 1.5rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 0.95rem;
    margin-bottom: 1.2rem;
  }
`;

// Button styling for download button
const DownloadButton = styled.a`
  display: inline-flex;
  align-items: center;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #61dafb, ${theme.btnBg});
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 50px;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 8px 25px rgba(97, 218, 251, 0.3);
  animation: ${fadeInUp} 1s ease-out;
  animation-delay: 0.4s;
  opacity: 0;
  animation-fill-mode: forwards;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: left 0.5s ease;
  }

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 35px rgba(97, 218, 251, 0.4);
    animation: ${pulse} 2s ease-in-out infinite;

    &::before {
      left: 100%;
    }
  }

  @media (max-width: ${breakpoints.tablet}) {
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 0.7rem 1.2rem;
    font-size: 0.95rem;
  }
`;

// Icon styling for the download button
const DownloadIcon = styled(FaDownload)`
  margin-right: 0.5rem;
  font-size: 1rem;

  @media (max-width: ${breakpoints.mobile}) {
    margin-right: 0.4rem;
    font-size: 0.9rem;
  }
`;


// The ResumeSection component
const ResumeSection = () => {
  return (
    <Container>
      <SubTitle>Download My Resume</SubTitle>
      <Description>
        Get a detailed overview of my skills, experience, and achievements in a
        comprehensive PDF format.
      </Description>
      <DownloadButton
        href="/Resume-Sugriv.pdf"
        download="Resume-Sugriv-FullStackDev.pdf"
      >
        <DownloadIcon /> Download Resume
      </DownloadButton>
    </Container>
  );
};

export default ResumeSection;
