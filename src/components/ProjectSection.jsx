// src/components/ProjectSection.js

import React from 'react';
import styled, { keyframes } from 'styled-components';
import {  projects } from '@/constants';
import { Container, fadeInUp, Item, ItemWrapper, Title } from './common';


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
      <ItemWrapper>
        {projects.map((project, index) => (
          <Item key={index} style={{ animationDelay: `${index * 0.2}s` }}>
            <ProjectTitle>{project.title}</ProjectTitle>
            <ProjectDescription>{project.description}</ProjectDescription>
            <ProjectLink href={project.link} target="_blank" rel="noopener noreferrer">
              View Project
            </ProjectLink>
          </Item>
        ))}
      </ItemWrapper>
    </Container>
  );
};

export default ProjectSection;
