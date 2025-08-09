
import React, { useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import StyledButton from './common/Button';
import { Input } from './common/Input';
import { theme } from '@/theme';
import ResumeSection from './ResumeSection';
import emailjs from 'emailjs-com';
import { breakpoints } from '@/constants';

// Container for the entire Contact section
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
    transform: translateX(-30px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
`;

const slideInRight = keyframes`
  0% {
    opacity: 0;
    transform: translateX(30px);
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

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 600px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 2rem;
  gap: 1rem;
  animation: ${slideInLeft} 1s ease-out;
  animation-delay: 0.4s;
  opacity: 0;
  animation-fill-mode: forwards;

  @media (max-width: ${breakpoints.tablet}) {
    padding: 1.5rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 1.2rem;
  }
`;

const TextArea = styled.textarea`
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 5px;
  border: none;
  background: rgba(255, 255, 255, 0.9);
  color: #333;
  font-family: inherit;
  font-size: 1rem;
  resize: vertical;
  min-height: 120px;
  
  &::placeholder {
    color: #666;
  }
  
  &:focus {
    outline: none;
    background: white;
    box-shadow: 0 0 0 2px #61dafb;
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 4rem;

  @media (max-width: ${breakpoints.tablet}) {
    flex-direction: column;
    gap: 3rem;
  }
`;

const ContactSection = styled.div`
  flex: 1;
  
  @media (max-width: ${breakpoints.mobile}) {
    text-align: center;
  }
`;

const ResumeWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${slideInRight} 1s ease-out;
  animation-delay: 0.6s;
  opacity: 0;
  animation-fill-mode: forwards;
`;

const GetInTouch = () => {
  const formRef = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      'service_wu32dvj',     // From EmailJS dashboard
      'template_4iunawh',    // From EmailJS dashboard
      formRef.current,
      'vmvWVeb7rY4EAaRF4'      // From EmailJS dashboard
    )
    .then((result) => {
      console.log('Email sent:', result.text);
      alert('Message sent successfully!');
      formRef.current.reset();
    })
    .catch((error) => {
      console.error('Error sending email:', error.text);
      alert('Failed to send message. Please try again.');
    });
  };

  return (
    <Container id="contact">
      <ContentWrapper>
        <Title>Get In Touch</Title>
        <Subtitle>
          Let's discuss your next project or just say hello!
        </Subtitle>
        
        <Wrapper>
          <ContactSection>
            <ContactForm ref={formRef} onSubmit={sendEmail}>
              <Input type="text" name="fullName" placeholder="Your Name" required />
              <Input type="email" name="email" placeholder="Your Email" required />
              <TextArea name="message" placeholder="Your Message" rows="5" required></TextArea>
              <StyledButton type="submit">Send Message</StyledButton>
            </ContactForm>
          </ContactSection>
          
          <ResumeWrapper>
            <ResumeSection />
          </ResumeWrapper>
        </Wrapper>
      </ContentWrapper>
    </Container>
  );
};

export default GetInTouch;