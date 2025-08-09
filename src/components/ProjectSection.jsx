
import React from 'react';
import styled, { keyframes } from 'styled-components';
import { projects, breakpoints } from '@/constants';
import { theme } from '@/theme';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';

// Container for the entire Projects section
const Container = styled.section`
  padding: 100px 20px;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  position: relative;
  overflow: hidden;

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
`;

// Animations
const fadeInUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(30px);
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

// Title styling
const Title = styled.h2`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: ${theme.sectionBg};
  text-align: center;
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
    background: linear-gradient(90deg, ${theme.btnBg}, #61dafb);
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
  color: #666;
  text-align: center;
  margin-bottom: 4rem;
  animation: ${fadeInUp} 1s ease-out;
  animation-delay: 0.2s;
  opacity: 0;
  animation-fill-mode: forwards;

  @media (max-width: ${breakpoints.tablet}) {
    font-size: 1.1rem;
    margin-bottom: 3rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 1rem;
    margin-bottom: 2rem;
  }
`;

// Projects grid
const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  
  @media (max-width: ${breakpoints.tablet}) {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

// Project card
const ProjectCard = styled.div`
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  animation: ${fadeInUp} 1s ease-out;
  animation-delay: ${props => props.delay || '0s'};
  opacity: 0;
  animation-fill-mode: forwards;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, ${theme.btnBg}, #61dafb);
  }
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
    
    .project-image {
      transform: scale(1.05);
    }
  }
`;

const ProjectImage = styled.div`
  height: 200px;
  background: linear-gradient(135deg, ${theme.btnBg}, #61dafb);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: white;
  transition: transform 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '🚀';
    font-size: 4rem;
    animation: ${float} 3s ease-in-out infinite;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left 0.5s ease;
  }
  
  &:hover::after {
    left: 100%;
  }
`;

const ProjectContent = styled.div`
  padding: 2rem;
  
  @media (max-width: ${breakpoints.mobile}) {
    padding: 1.5rem;
  }
`;

// Project title and description styling
const ProjectTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: ${theme.sectionBg};
  font-weight: 700;
  
  @media (max-width: ${breakpoints.mobile}) {
    font-size: 1.3rem;
  }
`;

const ProjectDescription = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: #666;
  margin-bottom: 1.5rem;
  
  @media (max-width: ${breakpoints.mobile}) {
    font-size: 0.95rem;
  }
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const ProjectLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 1.5rem;
  background: ${theme.btnBg};
  color: white;
  text-decoration: none;
  border-radius: 25px;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(49, 57, 145, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(49, 57, 145, 0.4);
    background: #2c2c91;
  }
  
  @media (max-width: ${breakpoints.mobile}) {
    padding: 0.6rem 1.2rem;
    font-size: 0.85rem;
  }
`;

const SecondaryLink = styled(ProjectLink)`
  background: transparent;
  color: ${theme.btnBg};
  border: 2px solid ${theme.btnBg};
  box-shadow: none;
  
  &:hover {
    background: ${theme.btnBg};
    color: white;
    box-shadow: 0 4px 15px rgba(49, 57, 145, 0.3);
  }
`;

// ProjectSection component
const ProjectSection = () => {
  return (
    <Container id="projects">
      <ContentWrapper>
        <Title>Featured Projects</Title>
        <Subtitle>
          A showcase of my recent work and personal projects
        </Subtitle>
        
        <ProjectsGrid>
          {projects.map((project, index) => (
            <ProjectCard key={index} delay={`${index * 0.2}s`}>
              <ProjectImage className="project-image" />
              <ProjectContent>
                <ProjectTitle>{project.title}</ProjectTitle>
                <ProjectDescription>{project.description}</ProjectDescription>
                <ProjectLinks>
                  <ProjectLink href={project.link} target="_blank" rel="noopener noreferrer">
                    <FaExternalLinkAlt /> View Live
                  </ProjectLink>
                  {/* Uncomment if you have GitHub links
                  <SecondaryLink href="#" target="_blank" rel="noopener noreferrer">
                    <FaGithub /> Code
                  </SecondaryLink>
                  */}
                </ProjectLinks>
              </ProjectContent>
            </ProjectCard>
          ))}
        </ProjectsGrid>
      </ContentWrapper>
    </Container>
  );
};

export default ProjectSection;
