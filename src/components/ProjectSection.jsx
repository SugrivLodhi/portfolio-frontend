import React from "react";
import styled, { keyframes } from "styled-components";
import { projects, breakpoints } from "@/constants";
import { theme } from "@/theme";
import { FaExternalLinkAlt, FaLock } from "react-icons/fa";
import {
  Section,
  SectionInner,
  SectionTitle,
  SectionSubtitle,
  Chip,
} from "@/components/common/Section";
import Reveal from "@/components/common/Reveal";

const shine = keyframes`
  from { transform: translateX(-120%) skewX(-20deg); }
  to { transform: translateX(220%) skewX(-20deg); }
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
  gap: 1.75rem;
  text-align: left;

  @media (max-width: ${breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }
`;

const ProjectCard = styled.div`
  background: ${theme.surface};
  border: 1px solid ${theme.border};
  border-radius: 18px;
  overflow: hidden;
  transition: all 0.35s ease;
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;

  &:hover {
    transform: translateY(-8px);
    border-color: rgba(129, 140, 248, 0.5);
    box-shadow: 0 24px 50px rgba(0, 0, 0, 0.45),
      0 0 0 1px rgba(129, 140, 248, 0.2);
  }
`;

const CardBanner = styled.div`
  height: 120px;
  background: linear-gradient(135deg, #1e1b4b, #312e81 50%, #0e7490);
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  .tag {
    font-size: 0.8rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(226, 232, 240, 0.85);
    font-weight: 600;
    padding: 0.4rem 1rem;
    border: 1px solid rgba(255, 255, 255, 0.25);
    border-radius: 999px;
    backdrop-filter: blur(4px);
    background: rgba(255, 255, 255, 0.08);
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 40%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.12),
      transparent
    );
    animation: ${shine} 4.5s ease-in-out infinite;
  }
`;

const ProjectContent = styled.div`
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  flex: 1;

  @media (max-width: ${breakpoints.mobile}) {
    padding: 1.4rem;
  }
`;

const ProjectTitle = styled.h3`
  font-size: 1.35rem;
  margin-bottom: 0.75rem;
  color: ${theme.textColor};
  font-weight: 700;
`;

const ProjectDescription = styled.p`
  font-size: 0.95rem;
  line-height: 1.65;
  color: ${theme.textMuted};
  margin-bottom: 1.25rem;
  flex: 1;
`;

const TagsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  margin-bottom: 1.5rem;
`;

const ProjectLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  align-self: flex-start;
  padding: 0.6rem 1.4rem;
  background: ${(p) => (p.$disabled ? "transparent" : theme.accentGradient)};
  color: ${(p) => (p.$disabled ? theme.textMuted : "white")};
  border: ${(p) => (p.$disabled ? `1px solid ${theme.border}` : "none")};
  text-decoration: none;
  border-radius: 999px;
  font-weight: 600;
  font-size: 0.85rem;
  transition: all 0.3s ease;
  cursor: ${(p) => (p.$disabled ? "default" : "pointer")};
  box-shadow: ${(p) =>
    p.$disabled ? "none" : "0 6px 18px rgba(99, 102, 241, 0.3)"};

  &:hover {
    transform: ${(p) => (p.$disabled ? "none" : "translateY(-2px)")};
    box-shadow: ${(p) =>
      p.$disabled ? "none" : "0 10px 24px rgba(99, 102, 241, 0.45)"};
  }
`;

const ProjectSection = () => {
  return (
    <Section id="projects">
      <SectionInner>
        <Reveal>
          <SectionTitle>Featured Projects</SectionTitle>
        </Reveal>
        <Reveal delay="0.1s">
          <SectionSubtitle>
            A showcase of my recent work and client projects
          </SectionSubtitle>
        </Reveal>

        <ProjectsGrid>
          {projects.map((project, index) => (
            <Reveal key={index} delay={`${index * 0.08}s`}>
              <ProjectCard>
                <CardBanner>
                  <span className="tag">{project.tag}</span>
                </CardBanner>
                <ProjectContent>
                  <ProjectTitle>{project.title}</ProjectTitle>
                  <ProjectDescription>
                    {project.description}
                  </ProjectDescription>
                  <TagsRow>
                    {project.tags?.map((tag) => (
                      <Chip key={tag}>{tag}</Chip>
                    ))}
                  </TagsRow>
                  {project.isClient ? (
                    <ProjectLink as="span" $disabled>
                      <FaLock /> Client Work
                    </ProjectLink>
                  ) : (
                    <ProjectLink
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaExternalLinkAlt /> View Live
                    </ProjectLink>
                  )}
                </ProjectContent>
              </ProjectCard>
            </Reveal>
          ))}
        </ProjectsGrid>
      </SectionInner>
    </Section>
  );
};

export default ProjectSection;
