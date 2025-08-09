import React from 'react';
import styled, { keyframes } from 'styled-components';
import { experiences } from '@/constants';
import { theme } from '@/theme';
import { breakpoints } from '@/constants';

// Container for the entire Experience section
const Container = styled.section`
  padding: 100px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.1);
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
  max-width: 1000px;
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

const slideInLeft = keyframes`
  0% {
    opacity: 0;
    transform: translateX(-50px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
`;

const slideInRight = keyframes`
  0% {
    opacity: 0;
    transform: translateX(50px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
`;

// Title styling
const Title = styled.h2`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: white;
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
    background: linear-gradient(90deg, #61dafb, white);
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
  color: rgba(255, 255, 255, 0.9);
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

// Timeline container
const Timeline = styled.div`
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 0;
    bottom: 0;
    width: 3px;
    background: linear-gradient(to bottom, #61dafb, white, #61dafb);
    transform: translateX(-50%);
    border-radius: 2px;
  }

  @media (max-width: ${breakpoints.tablet}) {
    &::before {
      left: 30px;
    }
  }
`;

// Timeline item
const TimelineItem = styled.div`
  position: relative;
  margin-bottom: 3rem;
  
  &:nth-child(odd) {
    padding-right: 50%;
    padding-left: 0;
    
    .content {
      margin-right: 2rem;
      animation: ${slideInLeft} 1s ease-out;
      animation-delay: ${props => props.delay || '0s'};
      opacity: 0;
      animation-fill-mode: forwards;
    }
    
    .dot {
      right: -8px;
    }
  }
  
  &:nth-child(even) {
    padding-left: 50%;
    padding-right: 0;
    
    .content {
      margin-left: 2rem;
      animation: ${slideInRight} 1s ease-out;
      animation-delay: ${props => props.delay || '0s'};
      opacity: 0;
      animation-fill-mode: forwards;
    }
    
    .dot {
      left: -8px;
    }
  }

  @media (max-width: ${breakpoints.tablet}) {
    &:nth-child(odd),
    &:nth-child(even) {
      padding-left: 60px;
      padding-right: 0;
      
      .content {
        margin-left: 0;
        margin-right: 0;
        animation: ${slideInRight} 1s ease-out;
        animation-delay: ${props => props.delay || '0s'};
        opacity: 0;
        animation-fill-mode: forwards;
      }
      
      .dot {
        left: 22px;
        right: auto;
      }
    }
  }
`;

// Timeline dot
const TimelineDot = styled.div`
  position: absolute;
  top: 20px;
  width: 16px;
  height: 16px;
  background: #61dafb;
  border: 3px solid white;
  border-radius: 50%;
  box-shadow: 0 0 0 3px rgba(97, 218, 251, 0.3);
  z-index: 2;
`;

// Experience card
const ExperienceCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 1.5rem;
  }
`;

// Company and role styling
const CompanyName = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: ${theme.sectionBg};
  font-weight: 700;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 1.3rem;
  }
`;

const Role = styled.p`
  font-size: 1.1rem;
  margin-bottom: 0.8rem;
  font-weight: 600;
  color: ${theme.btnBg};

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 1rem;
  }
`;

const Duration = styled.p`
  font-size: 0.95rem;
  color: #666;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &::before {
    content: '📅';
    font-size: 1rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 0.9rem;
  }
`;

// ExperienceSection component
const ExperienceSection = () => {
  return (
    <Container id="experience">
      <ContentWrapper>
        <Title>Professional Experience</Title>
        <Subtitle>
          My journey through different roles and companies
        </Subtitle>
        
        <Timeline>
          {experiences.map((experience, index) => (
            <TimelineItem key={index} delay={`${index * 0.3}s`}>
              <TimelineDot className="dot" />
              <ExperienceCard className="content">
                <CompanyName>{experience.company}</CompanyName>
                <Role>{experience.role}</Role>
                <Duration>{experience.duration}</Duration>
              </ExperienceCard>
            </TimelineItem>
          ))}
        </Timeline>
      </ContentWrapper>
    </Container>
  );
};

export default ExperienceSection;
