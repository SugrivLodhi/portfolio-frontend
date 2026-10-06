import React from "react";
import styled, { keyframes } from "styled-components";
import { FaGithub, FaLinkedin, FaTwitter, FaDownload, FaMicrophone } from "react-icons/fa";
import { theme } from "@/theme";
import { breakpoints } from "@/constants";
import { useAIAssistant } from "@/components/ai/AIAssistantProvider";

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

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-16px); }
`;

const drift = keyframes`
  0% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(60px, -40px) scale(1.15); }
  66% { transform: translate(-40px, 30px) scale(0.9); }
  100% { transform: translate(0, 0) scale(1); }
`;

const blink = keyframes`
  from, to { border-color: transparent }
  50% { border-color: ${theme.accent2}; }
`;

const typewriter = keyframes`
  from { width: 0 }
  to { width: 100% }
`;

// Styled Components
const HeroContainer = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${theme.bg};
  position: relative;
  overflow: hidden;
  padding: 0 20px;

  /* subtle grid */
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(148, 163, 184, 0.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(148, 163, 184, 0.05) 1px, transparent 1px);
    background-size: 56px 56px;
    mask-image: radial-gradient(ellipse 80% 60% at 50% 40%, black 30%, transparent 75%);
    z-index: 0;
  }

  @media (max-width: ${breakpoints.tablet}) {
    min-height: 92vh;
  }
`;

const Orb = styled.div`
  position: absolute;
  border-radius: 50%;
  filter: blur(90px);
  opacity: 0.5;
  animation: ${drift} 18s ease-in-out infinite;
  z-index: 0;
`;

const OrbOne = styled(Orb)`
  width: 480px;
  height: 480px;
  background: #4f46e5;
  top: -120px;
  left: -80px;
`;

const OrbTwo = styled(Orb)`
  width: 420px;
  height: 420px;
  background: #0e7490;
  bottom: -140px;
  right: -60px;
  animation-delay: -6s;
`;

const OrbThree = styled(Orb)`
  width: 300px;
  height: 300px;
  background: #7c3aed;
  top: 40%;
  left: 55%;
  opacity: 0.35;
  animation-delay: -12s;
`;

const ContentWrapper = styled.div`
  text-align: center;
  color: white;
  z-index: 2;
  position: relative;
  max-width: 820px;
  width: 100%;
`;

const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.45rem 1.1rem;
  margin-bottom: 2rem;
  border-radius: 999px;
  border: 1px solid ${theme.border};
  background: ${theme.surface};
  backdrop-filter: blur(8px);
  font-size: 0.85rem;
  color: ${theme.textMuted};
  animation: ${fadeInUp} 0.8s ease-out;

  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #34d399;
    box-shadow: 0 0 8px #34d399;
  }
`;

const Name = styled.h1`
  font-size: 4.5rem;
  font-weight: 700;
  letter-spacing: -0.03em;
  margin-bottom: 1.2rem;
  animation: ${fadeInUp} 0.9s ease-out;
  background: linear-gradient(120deg, #f8fafc 30%, #818cf8 60%, #22d3ee 90%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: ${breakpoints.tablet}) {
    font-size: 3.2rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 2.6rem;
  }
`;

const Title = styled.div`
  font-size: 1.9rem;
  font-weight: 500;
  color: ${theme.textMuted};
  margin-bottom: 2rem;
  overflow: hidden;
  white-space: nowrap;
  border-right: 3px solid ${theme.accent2};
  width: fit-content;
  margin: 0 auto 2rem;
  animation: ${typewriter} 2.2s steps(24, end) forwards,
    ${blink} 0.75s step-end infinite;
  animation-delay: 0.4s;

  .accent {
    color: ${theme.accent2};
  }

  @media (max-width: ${breakpoints.tablet}) {
    font-size: 1.4rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 1.15rem;
    white-space: normal;
    border-right: none;
    animation: ${fadeInUp} 0.9s ease-out;
    animation-delay: 0.6s;
    animation-fill-mode: both;
  }
`;

const Description = styled.p`
  font-size: 1.2rem;
  line-height: 1.7;
  color: ${theme.textMuted};
  margin-bottom: 3rem;
  animation: ${fadeInUp} 0.9s ease-out;
  animation-delay: 0.9s;
  animation-fill-mode: both;

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
  animation: ${fadeInUp} 0.9s ease-out;
  animation-delay: 1.1s;
  animation-fill-mode: both;

  @media (max-width: ${breakpoints.mobile}) {
    flex-direction: column;
    align-items: center;
    gap: 0.8rem;
  }
`;

const CTAButton = styled.a`
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background: ${theme.accentGradient};
  color: white;
  text-decoration: none;
  border: none;
  border-radius: 50px;
  font-weight: 600;
  font-family: inherit;
  font-size: 1rem;
  transition: all 0.3s ease;
  box-shadow: 0 8px 24px rgba(99, 102, 241, 0.35);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 32px rgba(99, 102, 241, 0.5);
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 0.8rem 1.5rem;
    font-size: 0.9rem;
  }
`;

const SecondaryButton = styled(CTAButton)`
  background: ${theme.surface};
  border: 1px solid ${theme.border};
  color: ${theme.textColor};
  box-shadow: none;
  backdrop-filter: blur(8px);

  &:hover {
    background: ${theme.surfaceHover};
    border-color: rgba(129, 140, 248, 0.5);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  }
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  animation: ${fadeInUp} 0.9s ease-out;
  animation-delay: 1.3s;
  animation-fill-mode: both;
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  color: ${theme.textMuted};
  font-size: 1.3rem;
  background: ${theme.surface};
  border: 1px solid ${theme.border};
  backdrop-filter: blur(8px);
  transition: all 0.3s ease;
  animation: ${float} 4s ease-in-out infinite;
  animation-delay: ${(props) => props.delay || "0s"};

  &:hover {
    transform: translateY(-4px);
    color: ${theme.accent2};
    border-color: rgba(34, 211, 238, 0.4);
    box-shadow: 0 8px 20px rgba(34, 211, 238, 0.15);
  }
`;

const ScrollIndicator = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  color: ${theme.textMuted};
  font-size: 0.8rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  animation: ${float} 2s ease-in-out infinite;
  cursor: pointer;
  z-index: 2;

  &::after {
    content: "↓";
    display: block;
    font-size: 1.6rem;
    margin-top: 0.4rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    bottom: 1rem;
    font-size: 0.7rem;
  }
`;

const HeroSection = () => {
  const { open } = useAIAssistant();
  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <HeroContainer>
      <OrbOne />
      <OrbTwo />
      <OrbThree />
      <ContentWrapper>
        <Badge>
          <span className="dot" /> Open to new opportunities
        </Badge>
        <Name>Sugriv Lodhi</Name>
        <Title>
          Full Stack Developer <span className="accent">+ AI Engineer</span>
        </Title>
        <Description>
          Building scalable web applications and AI-powered digital
          experiences with React, Next.js, Node.js and modern cloud
          infrastructure.
        </Description>
        <ButtonGroup>
          <CTAButton as="button" onClick={open}>
            <FaMicrophone /> Talk to My AI
          </CTAButton>
          <SecondaryButton href="#projects">View Projects</SecondaryButton>
          <SecondaryButton
            href="/FullStack_Developer.pdf"
            download="Sugriv-FullStackDev.pdf"
          >
            <FaDownload /> Resume
          </SecondaryButton>
        </ButtonGroup>
        <SocialLinks>
          <SocialLink
            href="https://github.com/SugrivLodhi"
            target="_blank"
            rel="noopener noreferrer"
            delay="0s"
            aria-label="GitHub"
          >
            <FaGithub />
          </SocialLink>
          <SocialLink
            href="https://www.linkedin.com/in/sugriv-lodhi-ab7b33143/"
            target="_blank"
            rel="noopener noreferrer"
            delay="0.2s"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </SocialLink>
          <SocialLink
            href="https://x.com/sugriv_lodhi"
            target="_blank"
            rel="noopener noreferrer"
            delay="0.4s"
            aria-label="X (Twitter)"
          >
            <FaTwitter />
          </SocialLink>
        </SocialLinks>
      </ContentWrapper>
      <ScrollIndicator onClick={scrollToAbout}>Scroll</ScrollIndicator>
    </HeroContainer>
  );
};

export default HeroSection;
