import React from "react";
import styled, { keyframes } from "styled-components";
import Image from "next/image";
import photo from "../../public/sugriv.jpg";
import { theme } from "@/theme";
import { breakpoints } from "@/constants";

// Container for the entire About section
const Container = styled.section`
  padding: 100px 20px;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="%23000" opacity="0.05"/><circle cx="75" cy="75" r="1" fill="%23000" opacity="0.05"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
    opacity: 0.3;
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
  display: flex;
  align-items: center;
  gap: 4rem;
  position: relative;
  z-index: 2;

  @media (max-width: ${breakpoints.tablet}) {
    flex-direction: column-reverse;
    gap: 3rem;
    text-align: center;
  }
`;

// Keyframes for text animations
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideInFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const slideInFromRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

// Styling for the text section
const TextSection = styled.div`
  flex: 1;
  animation: ${slideInFromLeft} 1s ease-out;

  @media (max-width: ${breakpoints.tablet}) {
    animation: ${fadeInUp} 1s ease-out;
  }
`;

const Title = styled.h2`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: ${theme.sectionBg};
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 60px;
    height: 4px;
    background: linear-gradient(90deg, ${theme.btnBg}, #61dafb);
    border-radius: 2px;
  }

  @media (max-width: ${breakpoints.tablet}) {
    font-size: 2.5rem;
    text-align: center;
    
    &::after {
      left: 50%;
      transform: translateX(-50%);
    }
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 2rem;
  }
`;

const Description = styled.p`
  font-size: 1.2rem;
  line-height: 1.8;
  color: #555;
  margin-bottom: 2rem;
  
  @media (max-width: ${breakpoints.tablet}) {
    font-size: 1.1rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 1rem;
  }
`;

const HighlightText = styled.span`
  color: ${theme.btnBg};
  font-weight: 600;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, ${theme.btnBg}, transparent);
  }
`;

const StatsContainer = styled.div`
  display: flex;
  gap: 2rem;
  margin-top: 2rem;

  @media (max-width: ${breakpoints.mobile}) {
    justify-content: center;
    gap: 1.5rem;
  }
`;

const StatItem = styled.div`
  text-align: center;
  
  .number {
    font-size: 2rem;
    font-weight: 700;
    color: ${theme.btnBg};
    display: block;
  }
  
  .label {
    font-size: 0.9rem;
    color: #666;
    margin-top: 0.5rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    .number {
      font-size: 1.5rem;
    }
    
    .label {
      font-size: 0.8rem;
    }
  }
`;

// Styling for the image container
const ImageSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${slideInFromRight} 1s ease-out;
  position: relative;

  @media (max-width: ${breakpoints.tablet}) {
    animation: ${fadeInUp} 1s ease-out;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 350px;
  height: 350px;
  
  &::before {
    content: '';
    position: absolute;
    top: -20px;
    left: -20px;
    right: -20px;
    bottom: -20px;
    background: linear-gradient(45deg, ${theme.btnBg}, #61dafb);
    border-radius: 50%;
    z-index: -1;
    animation: ${pulse} 3s ease-in-out infinite;
  }

  @media (max-width: ${breakpoints.tablet}) {
    width: 280px;
    height: 280px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    width: 220px;
    height: 220px;
  }
`;

const ProfileImage = styled(Image)`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 5px solid white;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
  }
`;

// The About component with CSS animations
const About = () => {
  return (
    <Container id="about">
      <ContentWrapper>
        <TextSection>
          <Title>About Me</Title>
          <Description>
            I am a <HighlightText>Full Stack Developer</HighlightText> with a passion for creating 
            exceptional digital experiences. With expertise in modern web technologies like 
            <HighlightText> React.js, Node.js, and TypeScript</HighlightText>, I build scalable, 
            maintainable applications that solve real-world problems.
          </Description>
          <Description>
            My journey in web development has been driven by curiosity and a commitment to 
            continuous learning. I believe in writing clean, efficient code and staying 
            up-to-date with the latest industry trends and best practices.
          </Description>
          <StatsContainer>
            <StatItem>
              <span className="number">3+</span>
              <span className="label">Years Experience</span>
            </StatItem>
            <StatItem>
              <span className="number">10+</span>
              <span className="label">Projects Completed</span>
            </StatItem>
            <StatItem>
              <span className="number">15+</span>
              <span className="label">Technologies</span>
            </StatItem>
          </StatsContainer>
        </TextSection>
        <ImageSection>
          <ImageWrapper>
            <ProfileImage src={photo} alt="Sugriv Lodhi" width={350} height={350} />
          </ImageWrapper>
        </ImageSection>
      </ContentWrapper>
    </Container>
  );
};

export default About;
