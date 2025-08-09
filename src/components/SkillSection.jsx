import React from 'react';
import styled, { keyframes } from 'styled-components';
import { skills, breakpoints } from '@/constants';
import { theme } from '@/theme';

// Container for the entire Skills section
const Container = styled.section`
  padding: 100px 20px;
  background: ${theme.sectionBg};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.05) 50%, transparent 70%);
    z-index: 1;
  }

  @media (max-width: ${breakpoints.tablet}) {
    padding: 80px 15px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 60px 10px;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
  text-align: center;
`;

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

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const glow = keyframes`
  0%, 100% { box-shadow: 0 5px 15px rgba(97, 218, 251, 0.3); }
  50% { box-shadow: 0 5px 25px rgba(97, 218, 251, 0.6); }
`;

// Title styling
const Title = styled.h2`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: white;
  animation: ${fadeInUp} 1s ease-out;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: linear-gradient(90deg, #61dafb, ${theme.btnBg});
    border-radius: 2px;
  }

  @media (max-width: ${breakpoints.tablet}) {
    font-size: 2.5rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 3rem;
  animation: ${fadeInUp} 1s ease-out;
  animation-delay: 0.2s;
  opacity: 0;
  animation-fill-mode: forwards;

  @media (max-width: ${breakpoints.tablet}) {
    font-size: 1.1rem;
    margin-bottom: 2.5rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 1rem;
    margin-bottom: 2rem;
  }
`;

// Skills list container
const SkillsGrid = styled.div`
  display: flex;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;

  @media (max-width: ${breakpoints.tablet}) {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1.2rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 1rem;
  }
`;

// Individual skill item styling and animation
const SkillItem = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  padding: 1.5rem 1rem;
  border-radius: 15px;
  font-size: 1.1rem;
  font-weight: bold;
  text-align: center;
  animation: ${fadeInUp} 1s ease-out;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
    transition: left 0.5s ease;
  }

  &:hover {
    transform: translateY(-10px) scale(1.05);
    background: rgba(255, 255, 255, 0.15);
    border-color: #61dafb;
    animation: ${glow} 2s ease-in-out infinite;
    
    &::before {
      left: 100%;
    }
  }
  
  animation-delay: ${props => props.delay || '0s'};
  opacity: 0;
  animation-fill-mode: forwards;

  @media (max-width: ${breakpoints.tablet}) {
    font-size: 1rem;
    padding: 1.2rem 0.8rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 0.9em;
    padding: 1rem 0.6rem;
  }
`;

const SkillCategory = styled.div`
  margin-bottom: 3rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const CategoryTitle = styled.h3`
  font-size: 1.5rem;
  color: #61dafb;
  margin-bottom: 1.5rem;
  font-weight: 600;
  animation: ${fadeInUp} 1s ease-out;
  
  @media (max-width: ${breakpoints.mobile}) {
    font-size: 1.3rem;
    margin-bottom: 1rem;
  }
`;

// Categorize skills
const skillCategories = {
  'Frontend': ['JavaScript', 'TypeScript', 'React.js', 'Next.js', 'HTML3', 'CSS3', 'TailwindCSS', 'SCSS', 'Styled-component'],
  'Backend': ['Node.js', 'Express', 'Graphql'],
  'Database': ['PostgreSQL', 'MongoDB', 'MySQL'],
  'Tools & Others': ['GitLab', 'GitHub']
};

// SkillSection component
const SkillSection = () => {
  return (
    <Container id="skills">
      <ContentWrapper>
        <Title>Technical Skills</Title>
        <Subtitle>
          Technologies and tools I use to bring ideas to life
        </Subtitle>
        
        {Object.entries(skillCategories).map(([category, categorySkills], categoryIndex) => (
          <SkillCategory key={category}>
            <CategoryTitle style={{ animationDelay: `${categoryIndex * 0.1}s` }}>
              {category}
            </CategoryTitle>
            <SkillsGrid>
              {categorySkills.map((skill, index) => (
                <SkillItem 
                  key={skill} 
                  delay={`${(categoryIndex * 0.2) + (index * 0.1)}s`}
                >
                  {skill}
                </SkillItem>
              ))}
            </SkillsGrid>
          </SkillCategory>
        ))}
      </ContentWrapper>
    </Container>
  );
};

export default SkillSection;
