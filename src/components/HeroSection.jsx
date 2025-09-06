import React from "react";
import styled, { keyframes } from "styled-components";
import { FaGithub, FaLinkedin, FaTwitter, FaDownload } from "react-icons/fa";
import { theme } from "@/theme";
import { breakpoints } from "@/constants";

// Animations
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const typewriter = keyframes`
  from { width: 0 }
  to { width: 100% }
`;

const blink = keyframes`
  from, to { border-color: transparent }
  50% { border-color: ${theme.btnBg}; }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
`;

const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Styled Components
const HeroContainer = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(-45deg, #667eea, #764ba2, #f093fb, #f5576c);
  background-size: 400% 400%;
  animation: ${gradientShift} 15s ease infinite;
  position: relative;
  overflow: hidden;
  padding: 0 20px;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
    z-index: 1;
  }

  @media (max-width: ${breakpoints.tablet}) {
    min-height: 90vh;
    padding: 0 15px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    min-height: 85vh;
    padding: 0 10px;
  }
`;

const ContentWrapper = styled.div`
  text-align: center;
  color: white;
  z-index: 2;
  position: relative;
  max-width: 800px;
  width: 100%;
`;

const Name = styled.h1`
  font-size: 4rem;
  font-weight: 700;
  margin-bottom: 1rem;
  animation: ${fadeInUp} 1s ease-out;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);

  @media (max-width: ${breakpoints.tablet}) {
    font-size: 3rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 2.5rem;
  }
`;

const Title = styled.div`
  font-size: 2rem;
  margin-bottom: 2rem;
  overflow: hidden;
  white-space: nowrap;
  border-right: 3px solid ${theme.btnBg};
  width: fit-content;
  margin: 0 auto 2rem;
  animation: ${typewriter} 3s steps(30, end) forwards,
    ${blink} 0.75s step-end infinite;
  animation-delay: 0.5s;

  @media (max-width: ${breakpoints.tablet}) {
    font-size: 1.5rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 1.2rem;
    white-space: normal;
    border-right: none;
    animation: ${fadeInUp} 1s ease-out;
    animation-delay: 1s;
  }
`;

const Description = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 3rem;
  animation: ${fadeInUp} 1s ease-out;
  animation-delay: 1s;
  opacity: 0;
  animation-fill-mode: forwards;

  @media (max-width: ${breakpoints.tablet}) {
    font-size: 1.1rem;
    margin-bottom: 2.5rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 1rem;
    margin-bottom: 2rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 3rem;
  animation: ${fadeInUp} 1s ease-out;
  animation-delay: 1.5s;
  opacity: 0;
  animation-fill-mode: forwards;

  @media (max-width: ${breakpoints.mobile}) {
    flex-direction: column;
    align-items: center;
    gap: 0.8rem;
  }
`;

const CTAButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background: ${theme.btnBg};
  color: white;
  text-decoration: none;
  border-radius: 50px;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
    background: #2c2c91;
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 0.8rem 1.5rem;
    font-size: 0.9rem;
  }
`;

const SecondaryButton = styled(CTAButton)`
  background: transparent;
  border: 2px solid white;
  color: white;

  &:hover {
    background: white;
    color: ${theme.btnBg};
  }
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  animation: ${fadeInUp} 1s ease-out;
  animation-delay: 2s;
  opacity: 0;
  animation-fill-mode: forwards;
`;

const SocialLink = styled.a`
  color: white;
  font-size: 1.8rem;
  transition: all 0.3s ease;
  animation: ${float} 3s ease-in-out infinite;
  animation-delay: ${(props) => props.delay || "0s"};

  &:hover {
    transform: translateY(-5px) scale(1.1);
    color: #61dafb;
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 1.5rem;
  }
`;

const ScrollIndicator = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  animation: ${float} 2s ease-in-out infinite;
  cursor: pointer;
  z-index: 2;

  &::after {
    content: "↓";
    display: block;
    font-size: 2rem;
    margin-top: 0.5rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    bottom: 1rem;
    font-size: 0.9rem;

    &::after {
      font-size: 1.5rem;
    }
  }
`;

const HeroSection = () => {
  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <HeroContainer>
      <ContentWrapper>
        <Name>Sugriv Lodhi</Name>
        <Title>Full Stack Developer</Title>
        <Description>
          Passionate about creating exceptional digital experiences with modern
          web technologies. Specializing in React, Node.js, and building
          scalable applications that make a difference.
        </Description>
        <ButtonGroup>
          <CTAButton href="#contact">Get In Touch</CTAButton>
          <SecondaryButton
                   href="/Resume-Sugriv.pdf"
           download="Resume-Sugriv-FullStackDev.pdf"
          >
            <FaDownload /> Download Resume
          </SecondaryButton>
        </ButtonGroup>
        <SocialLinks>
          <SocialLink
            href="https://github.com/SugrivLodhi"
            target="_blank"
            rel="noopener noreferrer"
            delay="0s"
          >
            <FaGithub />
          </SocialLink>
          <SocialLink
            href="https://www.linkedin.com/in/sugriv-lodhi-ab7b33143/"
            target="_blank"
            rel="noopener noreferrer"
            delay="0.2s"
          >
            <FaLinkedin />
          </SocialLink>
          <SocialLink
            href="https://x.com/sugriv_lodhi"
            target="_blank"
            rel="noopener noreferrer"
            delay="0.4s"
          >
            <FaTwitter />
          </SocialLink>
        </SocialLinks>
      </ContentWrapper>
      <ScrollIndicator onClick={scrollToAbout}>Scroll Down</ScrollIndicator>
    </HeroContainer>
  );
};

export default HeroSection;
