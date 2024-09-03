import React from 'react';
import styled, { keyframes } from 'styled-components';
import { skills,breakpoints } from '@/constants';
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
  gap: 12px;
  flex-wrap: wrap;

  @media (max-width: ${breakpoints.tablet}) {
    gap: 10px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    gap: 8px;
  }
`;

// Individual skill item styling and animation
const SkillItem = styled.div`
  background: ${theme.sectionBg};
  color: white;
  padding: 12px;
  border-radius: 8px;
  min-width: 130px;
  margin: 10px;
  font-size: 1.2em;
  font-weight: bold;
  animation: ${fadeInUp} 1s ease-out;
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-10px);
  }

  @media (max-width: ${breakpoints.tablet}) {
    min-width: 110px;
    font-size: 1em;
    padding: 10px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    min-width: 90px;
    font-size: 0.9em;
    padding: 8px;
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
