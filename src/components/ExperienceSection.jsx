import React from "react";
import styled from "styled-components";
import { experiences } from "@/constants";
import { theme } from "@/theme";
import { breakpoints } from "@/constants";
import {
  Section,
  SectionTitle,
  SectionSubtitle,
} from "@/components/common/Section";
import Reveal from "@/components/common/Reveal";

const ContentWrapper = styled.div`
  max-width: 920px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
  text-align: center;
`;

const Timeline = styled.div`
  position: relative;
  text-align: left;

  &::before {
    content: "";
    position: absolute;
    left: 50%;
    top: 0;
    bottom: 0;
    width: 2px;
    background: linear-gradient(
      to bottom,
      transparent,
      ${theme.accent},
      ${theme.accent2},
      transparent
    );
    transform: translateX(-50%);
  }

  @media (max-width: ${breakpoints.tablet}) {
    &::before {
      left: 22px;
    }
  }
`;

const TimelineItem = styled.div`
  position: relative;
  margin-bottom: 2.5rem;

  &:nth-child(odd) {
    padding-right: 50%;
    padding-left: 0;

    .content {
      margin-right: 2.5rem;
    }

    .dot {
      right: -8px;
    }
  }

  &:nth-child(even) {
    padding-left: 50%;
    padding-right: 0;

    .content {
      margin-left: 2.5rem;
    }

    .dot {
      left: -8px;
    }
  }

  @media (max-width: ${breakpoints.tablet}) {
    &:nth-child(odd),
    &:nth-child(even) {
      padding-left: 56px;
      padding-right: 0;

      .content {
        margin-left: 0;
        margin-right: 0;
      }

      .dot {
        left: 14px;
        right: auto;
      }
    }
  }
`;

const TimelineDot = styled.div`
  position: absolute;
  top: 24px;
  width: 16px;
  height: 16px;
  background: ${theme.accent};
  border: 3px solid ${theme.bg};
  border-radius: 50%;
  box-shadow: 0 0 0 3px rgba(129, 140, 248, 0.3), 0 0 16px rgba(129, 140, 248, 0.5);
  z-index: 2;
`;

const ExperienceCard = styled.div`
  background: ${theme.surface};
  backdrop-filter: blur(8px);
  padding: 1.75rem 2rem;
  border-radius: 16px;
  border: 1px solid ${theme.border};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    border-color: rgba(129, 140, 248, 0.45);
    background: ${theme.surfaceHover};
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 1.4rem;
  }
`;

const CompanyName = styled.h3`
  font-size: 1.35rem;
  margin-bottom: 0.4rem;
  color: ${theme.textColor};
  font-weight: 700;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 1.15rem;
  }
`;

const Role = styled.p`
  font-size: 1rem;
  margin-bottom: 0.7rem;
  font-weight: 600;
  background: ${theme.glowGradient};
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
`;

const Duration = styled.p`
  font-size: 0.85rem;
  color: ${theme.textMuted};
  font-weight: 500;
  letter-spacing: 0.03em;
`;

const ExperienceSection = () => {
  return (
    <Section id="experience" $alt>
      <ContentWrapper>
        <Reveal>
          <SectionTitle>Professional Experience</SectionTitle>
        </Reveal>
        <Reveal delay="0.1s">
          <SectionSubtitle>
            My journey through different roles and companies
          </SectionSubtitle>
        </Reveal>

        <Timeline>
          {experiences.map((experience, index) => (
            <TimelineItem key={index}>
              <TimelineDot className="dot" />
              <Reveal delay={`${index * 0.1}s`} className="content">
                <ExperienceCard>
                  <CompanyName>{experience.company}</CompanyName>
                  <Role>{experience.role}</Role>
                  <Duration>{experience.duration}</Duration>
                </ExperienceCard>
              </Reveal>
            </TimelineItem>
          ))}
        </Timeline>
      </ContentWrapper>
    </Section>
  );
};

export default ExperienceSection;
