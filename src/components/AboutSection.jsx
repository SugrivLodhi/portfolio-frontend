// src/About.js

import React from "react";
import styled from "styled-components";
import { breakpoints } from "@/constants";
import Image from "next/image";
import photo from "../../public/sugriv.jpg";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;

  @media (max-width: ${breakpoints.tablet}) {
    flex-direction: column;
    text-align: center;
  }
`;

const TextSection = styled.div`
  flex: 1;
  padding-right: 20px;

  @media (max-width: ${breakpoints.tablet}) {
    padding-right: 0;
    margin-bottom: 20px;
  }
`;

const ImageSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;

  img {
    max-width: 100%;
    border-radius: 100%;
  }
`;

const About = () => {
  return (
    <Container>
      <TextSection>
        <h2>About Me</h2>
        <p>
          I am a Full Stack Developer with experience in building high-quality
          web applications. I specialize in JavaScript and have professional
          experience working with React, Node.js, and other modern web
          technologies. I am passionate about coding, constantly learning new
          skills, and improving my craft.
        </p>
      </TextSection>
      <ImageSection>
        <Image src={photo} alt="Your Name" />
      </ImageSection>
    </Container>
  );
};

export default About;
