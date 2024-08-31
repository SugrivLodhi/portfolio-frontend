// src/components/ProjectSection.js

import React from 'react';
import styled, { keyframes } from 'styled-components';
import {  projects } from '@/constants';
import { Container, fadeInUp, Title } from './common';
import { theme } from '@/theme';


// Define animations



// Projects list container
const ProjectsGrid = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
`;

// Individual project item styling and animation
const ProjectItem = styled.div`
  background: ${theme.sectionBg};
  color: white;
  padding: 20px;
  border-radius: 8px;
  width: 100%;
  max-width: 400px;
  margin: 10px;
  text-align: left;
  animation: ${fadeInUp} 1s ease-out;
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-10px);
  }
`;

// Project title and description styling
const ProjectTitle = styled.h3`
  font-size: 1.5em;
  margin-bottom: 10px;
`;

const ProjectDescription = styled.p`
  font-size: 1.1em;
  margin-bottom: 15px;
`;

const ProjectLink = styled.a`
  color: #61dafb;
  text-decoration: none;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;

// ProjectSection component
const ProjectSection = () => {
  
  return (
    <Container id="projects">
      <Title>Projects</Title>
      <ProjectsGrid>
        {projects.map((project, index) => (
          <ProjectItem key={index} style={{ animationDelay: `${index * 0.2}s` }}>
            <ProjectTitle>{project.title}</ProjectTitle>
            <ProjectDescription>{project.description}</ProjectDescription>
            <ProjectLink href={project.link} target="_blank" rel="noopener noreferrer">
              View Project
            </ProjectLink>
          </ProjectItem>
        ))}
      </ProjectsGrid>
    </Container>
  );
};

export default ProjectSection;
