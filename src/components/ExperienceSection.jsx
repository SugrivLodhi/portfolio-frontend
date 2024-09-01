// src/components/ExperienceSection.js

import React from 'react';
import styled, { keyframes } from 'styled-components';
import { breakpoints, experiences } from '@/constants';

import { Container, Item, ItemWrapper, Title } from './common';
import { theme } from '@/theme';
import ProjectSection, { ProjectItem, ProjectsGrid } from './ProjectSection';

// Define animations
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

// Container for the experience section
const ExperienceContainer = styled.section`
  padding: 50px;
  background-color: #eaeaea;
  text-align: center;

  @media (max-width: ${breakpoints.mobile}) {
    padding: 30px;
  }

  @media (max-width: ${breakpoints.tablet}) {
    padding: 40px;
  }
`;

// Title styling with animation


// Experience list container
const ExperienceList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
`;

// Individual experience item styling and animation
const ExperienceItem = styled.div`
  background: ${theme.sectionBg};
  color: white;
  padding: 20px;
  border-radius: 8px;
  width: 100%;
  max-width: 400px;
  text-align: left;
  animation: ${fadeInUp} 1s ease-out;
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-10px);
  }
`;

// Company and role styling
const CompanyName = styled.h3`
  font-size: 1.5em;
  margin-bottom: 10px;
`;

const Role = styled.p`
  font-size: 1.2em;
  margin-bottom: 5px;
  font-weight: bold;
`;

const Duration = styled.p`
  font-size: 1em;
  color: #b3b3b3;
`;

// ExperienceSection component
const ExperienceSection = () => {
  

  return (
    <Container id="experience">
      <Title>Experience</Title>
      <ItemWrapper>
        {experiences.map((experience, index) => (
          <Item key={index} style={{ animationDelay: `${index * 0.2}s` }}>
            <CompanyName>{experience.company}</CompanyName>
            <Role>{experience.role}</Role>
            <Duration>{experience.duration}</Duration>
          </Item>
        ))}
      </ItemWrapper>
    </Container>
  );
};

export default ExperienceSection;
