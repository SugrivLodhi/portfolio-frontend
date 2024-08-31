// src/components/ContactSection.js

import React from 'react';
import { Container, Title } from './common';
import styled from 'styled-components';
import StyledButton from './common/Button';
import { Input } from './common/Input';
import { theme } from '@/theme';



const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 500px;
  margin: 0 auto;
  background-color: ${theme.sectionBg};
    padding: 2.5rem;
    gap: 1rem;
`;



const TextArea = styled.textarea`
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 5px;
  border: none;
`;


const GetInTouch = () =>{
 
  return(
  <Container id="contact">
    <Title>Get In Touch</Title>
    <ContactForm>
      <Input type="text" name="fullName" placeholder="Your Name"  />
      <Input type="email" email="email" placeholder="Your Email"  />
      <TextArea placeholder="Your Message" rows="5" required></TextArea>
      <StyledButton type="submit">Send Message</StyledButton>
    </ContactForm>
  
  </Container>
);
}
export default GetInTouch;
