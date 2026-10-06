import React from "react";
import styled, { keyframes } from "styled-components";
import Image from "next/image";
import photo from "../../public/sugrivlodhi.png";
import { theme } from "@/theme";
import { breakpoints } from "@/constants";
import { Section, SectionTitle } from "@/components/common/Section";
import Reveal from "@/components/common/Reveal";

const pulse = keyframes`
  0%, 100% { transform: scale(1); opacity: 0.7; }
  50% { transform: scale(1.06); opacity: 1; }
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 4rem;
  position: relative;
  z-index: 2;

  @media (max-width: ${breakpoints.tablet}) {
    flex-direction: column-reverse;
    gap: 3rem;
    text-align: center;
  }
`;

const TextSection = styled.div`
  flex: 1;

  h2 {
    text-align: left;
    display: block;

    &::after {
      left: 0;
      transform: none;
    }

    @media (max-width: ${breakpoints.tablet}) {
      text-align: center;

      &::after {
        left: 50%;
        transform: translateX(-50%);
      }
    }
  }
`;

const Description = styled.p`
  font-size: 1.15rem;
  line-height: 1.8;
  color: ${theme.textMuted};
  margin-bottom: 1.5rem;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 1rem;
  }
`;

const HighlightText = styled.span`
  color: ${theme.accent2};
  font-weight: 600;
`;

const StatsContainer = styled.div`
  display: flex;
  gap: 1.25rem;
  margin-top: 2.5rem;

  @media (max-width: ${breakpoints.mobile}) {
    justify-content: center;
    flex-wrap: wrap;
  }
`;

const StatItem = styled.div`
  text-align: center;
  padding: 1.25rem 1.5rem;
  background: ${theme.surface};
  border: 1px solid ${theme.border};
  border-radius: 14px;
  min-width: 130px;
  backdrop-filter: blur(8px);
  transition: all 0.3s ease;

  &:hover {
    border-color: rgba(129, 140, 248, 0.45);
    transform: translateY(-4px);
  }

  .number {
    font-family: var(--font-heading), inherit;
    font-size: 2rem;
    font-weight: 700;
    background: ${theme.glowGradient};
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    display: block;
  }

  .label {
    font-size: 0.85rem;
    color: ${theme.textMuted};
    margin-top: 0.4rem;
    display: block;
  }

  @media (max-width: ${breakpoints.mobile}) {
    min-width: 110px;
    padding: 1rem;

    .number {
      font-size: 1.5rem;
    }
  }
`;

const ImageSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 340px;
  height: 340px;

  &::before {
    content: "";
    position: absolute;
    inset: -18px;
    background: conic-gradient(from 0deg, #6366f1, #8b5cf6, #22d3ee, #6366f1);
    border-radius: 50%;
    z-index: -1;
    animation: ${pulse} 4s ease-in-out infinite;
    filter: blur(6px);
    opacity: 0.7;
  }

  @media (max-width: ${breakpoints.tablet}) {
    width: 270px;
    height: 270px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    width: 210px;
    height: 210px;
  }
`;

const ProfileImage = styled(Image)`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid ${theme.bgAlt};
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.5);
  transition: transform 0.4s ease;

  &:hover {
    transform: scale(1.04);
  }
`;

const About = () => {
  return (
    <Section id="about" $alt>
      <ContentWrapper>
        <TextSection>
          <Reveal>
            <SectionTitle>About Me</SectionTitle>
            <Description style={{ marginTop: "1.75rem" }}>
              I'm a <HighlightText>Full Stack Developer with 5+ years of experience</HighlightText>{" "}
              building scalable, production-ready web applications and end-to-end
              digital products. I work across{" "}
              <HighlightText>
                React.js, Next.js, Node.js, NestJS, TypeScript, PostgreSQL, MongoDB, and AWS
              </HighlightText>
              , with a strong focus on clean architecture, performance, and
              maintainable engineering.
            </Description>
            <Description>
              My experience spans <HighlightText>e-commerce, marketplaces, search, recommendation systems, and AI-powered product experiences</HighlightText>. At GearX, I work across frontend and backend systems, contributing to features such as intelligent search, product recommendations, bundles, checkout workflows, admin platforms, and performance optimization.
            </Description>
            <Description>
              I'm also building with <HighlightText>AI, LLMs, conversational interfaces, and voice-based experiences</HighlightText>, combining AI capabilities with practical product engineering to create smarter and more useful applications.
            </Description>
          </Reveal>
          <Reveal delay="0.15s">
            <StatsContainer>
              <StatItem>
                <span className="number">5+</span>
                <span className="label">Years Experience</span>
              </StatItem>
              <StatItem>
                <span className="number">10+</span>
                <span className="label">Projects Completed</span>
              </StatItem>
              <StatItem>
                <span className="number">25+</span>
                <span className="label">Technologies</span>
              </StatItem>
            </StatsContainer>
          </Reveal>
        </TextSection>
        <ImageSection>
          <Reveal delay="0.1s">
            <ImageWrapper>
              <ProfileImage
                src={photo}
                alt="Sugriv Lodhi"
                width={340}
                height={340}
              />
            </ImageWrapper>
          </Reveal>
        </ImageSection>
      </ContentWrapper>
    </Section>
  );
};

export default About;
