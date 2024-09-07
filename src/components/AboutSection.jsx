import React from "react";
import styled, { keyframes } from "styled-components";
import Image from "next/image";
import photo from "../../public/sugriv.jpg";
import { Title } from "./common";

// Container for the entire About section
const Container = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 50px 20px;
  background-color: ${({theme})=>theme.cardBg};
  position: relative;
  overflow: hidden;
  border-bottom: 1px solid ${({theme})=>theme.borderColor};

  @media (max-width: 1024px) {
    flex-direction: column-reverse;
    text-align: center;
  }

  @media (max-width: 768px) {
    padding: 40px 15px;
  }

  @media (max-width: 480px) {
    padding: 30px 10px;
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

// Keyframes for image hover effect
const scaleUp = keyframes`
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.05);
  }
`;

// Styling for the text section
const TextSection = styled.div`
  flex: 1;
  padding-right: 40px;
  animation: ${fadeInUp} 1s ease-out;

  h2 {
    font-size: 2.5em;
    margin-bottom: 20px;
    color: ${({ theme }) => theme.textColor};
    animation: ${slideInFromLeft} 1s ease-out;
  }

  p {
    font-size: 1.2em;
    line-height: 1.6;
    color: ${({ theme }) => theme.textColor};
    animation: ${slideInFromLeft} 1s ease-out 0.5s;
  }

  @media (max-width: 1024px) {
    padding-right: 0;
    margin-top: 30px;

    h2 {
      font-size: 2em;
    }

    p {
      font-size: 1.1em;
    }
  }

  @media (max-width: 768px) {
    h2 {
      font-size: 1.8em;
    }

    p {
      font-size: 1em;
    }
  }

  @media (max-width: 480px) {
    h2 {
      font-size: 1.5em;
    }

    p {
      font-size: 0.9em;
    }
  }
`;

// Styling for the image container
const ImageSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    max-width: 300px;
    width: 100%;
    height: auto;
    border-radius: 50%;
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
    animation: ${fadeInUp} 1s ease-out;

    &:hover {
      animation: ${scaleUp} 0.3s ease-out forwards;
    }
  }

  @media (max-width: 1024px) {
    img {
      max-width: 250px;
    }
  }

  @media (max-width: 768px) {
    img {
      max-width: 200px;
    }
  }

  @media (max-width: 480px) {
    img {
      max-width: 150px;
    }
  }
`;

// The About component with CSS animations
const About = () => {
  return (
    <Container id="about">
      <TextSection>
        <Title>About Me</Title>
        <p>
          I am a Full Stack Developer with a focus on JavaScript, adept at building dynamic, maintainable, and responsive web applications. Skilled in both frontend and backend with React.js and Node.js, I’m committed to writing clean code and continuously improving my craft.
        </p>
      </TextSection>
      <ImageSection>
        <Image src={photo} alt="Sugriv" />
      </ImageSection>
    </Container>
  );
};

export default About;
