// src/components/ContactSection.js

import React from 'react';
import { Container, Title } from './common';
import styled from 'styled-components';
import StyledButton from './common/Button';
import { Input } from './common/Input';
import { theme } from '@/theme';
import ResumeSection from './ResumeSection';
import { breakpoints } from '@/constants';


const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 700px;
  min-width: 500px;
  margin: 0 auto;
  border-radius: 8px;
  background-color: ${theme.sectionBg};
  padding: 2.5rem;
  gap: 1rem;

  @media (max-width: ${breakpoints.tablet}) {
    min-width: 100%;
    padding: 2rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 1.5rem;
  }
`;

const TextArea = styled.textarea`
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 5px;
  border: none;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;

  @media (max-width: ${breakpoints.tablet}) {
    flex-direction: column;
    gap: 2rem;
  }
`;

const SubWrapper = styled.div`
  @media (max-width: ${breakpoints.mobile}) {
    text-align: center;
  }
`;

const GetInTouch = () => {
  return (
    <Container id="contact">
      <Wrapper>
        <SubWrapper>
          <Title>Get In Touch</Title>
          <ContactForm>
            <Input type="text" name="fullName" placeholder="Your Name" />
            <Input type="email" email="email" placeholder="Your Email" />
            <TextArea placeholder="Your Message" rows="5" required></TextArea>
            <StyledButton type="submit">Send Message</StyledButton>
          </ContactForm>
        </SubWrapper>
        <ResumeSection />
      </Wrapper>
    </Container>
  );
};

export default GetInTouch;
