import React from "react";
import styled, { keyframes } from "styled-components";
import { breakpoints } from "@/constants";
import { theme } from "@/theme";
import {
  Section,
  SectionInner,
  SectionTitle,
  SectionSubtitle,
} from "@/components/common/Section";
import Reveal from "@/components/common/Reveal";

const glow = keyframes`
  0%, 100% { box-shadow: 0 0 0 rgba(129, 140, 248, 0); }
  50% { box-shadow: 0 0 22px rgba(129, 140, 248, 0.35); }
`;

const CategoryBlock = styled.div`
  margin-bottom: 3rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const CategoryTitle = styled.h3`
  font-size: 1.15rem;
  color: ${theme.accent2};
  margin-bottom: 1.4rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const SkillsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.75rem;
`;

const SkillChip = styled.div`
  background: ${theme.surface};
  border: 1px solid ${theme.border};
  color: ${theme.textColor};
  padding: 0.7rem 1.3rem;
  border-radius: 999px;
  font-size: 0.95rem;
  font-weight: 500;
  text-align: center;
  backdrop-filter: blur(8px);
  transition: all 0.3s ease;
  cursor: default;

  &:hover {
    transform: translateY(-4px);
    background: ${theme.surfaceHover};
    border-color: rgba(129, 140, 248, 0.55);
    color: #fff;
    animation: ${glow} 2s ease-in-out infinite;
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 0.85rem;
    padding: 0.55rem 1rem;
  }
`;

const skillCategories = {
  Frontend: [
    "JavaScript",
    "TypeScript",
    "React.js",
    "Next.js",
    "Redux",
    "Tailwind CSS",
    "Styled Components",
    "MUI",
    "SCSS",
  ],
  Backend: [
    "Node.js",
    "Express.js",
    "NestJS",
    "REST APIs",
    "GraphQL",
    "Typesense",
    "BullMQ",
    "Redis",
    "RabbitMQ",
    "Socket.IO",
    "Prisma",
    "Sequelize",
  ],
  Databases: ["PostgreSQL", "MongoDB", "MySQL", "OracleDB"],
  "Cloud & Tools": ["AWS", "EC2", "RDS", "S3", "Docker", "Git", "GitLab", "GitHub"],
  AI: [
    "OpenAI API",
    "Voice AI (Realtime)",
    "Conversational AI",
    "AI-Powered Search",
    "Recommendation Systems",
    "RAG",
    "Prompt Engineering",
  ],
};

const SkillSection = () => {
  return (
    <Section id="skills">
      <SectionInner>
        <Reveal>
          <SectionTitle>Technical Skills</SectionTitle>
        </Reveal>
        <Reveal delay="0.1s">
          <SectionSubtitle>
            Technologies and tools I use to bring ideas to life
          </SectionSubtitle>
        </Reveal>

        {Object.entries(skillCategories).map(
          ([category, categorySkills], categoryIndex) => (
            <CategoryBlock key={category}>
              <Reveal delay={`${categoryIndex * 0.08}s`}>
                <CategoryTitle>{category}</CategoryTitle>
                <SkillsGrid>
                  {categorySkills.map((skill) => (
                    <SkillChip key={skill}>{skill}</SkillChip>
                  ))}
                </SkillsGrid>
              </Reveal>
            </CategoryBlock>
          )
        )}
      </SectionInner>
    </Section>
  );
};

export default SkillSection;
