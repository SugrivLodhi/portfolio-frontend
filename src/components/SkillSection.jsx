// src/components/SkillSection.js

import React from 'react';
import styled, { keyframes } from 'styled-components';
import {  skills } from '@/constants';
import { Container, Title } from './common';
import { theme } from '@/theme';


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


// Skills list container
const SkillsGrid = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
`;

// Individual skill item styling and animation
const SkillItem = styled.div`
  background: ${theme.sectionBg};
  color: white;
  padding: 20px;
  border-radius: 8px;
  min-width: 150px;
  margin: 10px;
  font-size: 1.2em;
  font-weight: bold;
  animation: ${fadeInUp} 1s ease-out;
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-10px);
  }
`;

// SkillSection component
const SkillSection = () => {
  return (
    <Container id="skills">
      <Title>Skills</Title>
      <SkillsGrid>
        {skills.map((skill, index) => (
          <SkillItem key={index} style={{ animationDelay: `${index * 0.2}s` }}>
            {skill}
          </SkillItem>
        ))}
      </SkillsGrid>
    </Container>
  );
};

export default SkillSection;
