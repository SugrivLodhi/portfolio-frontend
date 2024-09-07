import React from 'react';
import styled from 'styled-components';
import { FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';
import { breakpoints } from '@/constants';

const FooterContainer = styled.footer`
  padding: 30px;
  background-color: ${({theme})=> theme.sectionBg};
  color: ${({theme})=> theme.textColor};
  text-align: center;

  @media (max-width: ${breakpoints.tablet}) {
    padding: 25px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 20px;
  }
`;

const SocialMediaContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;

  @media (max-width: ${breakpoints.mobile}) {
    gap: 15px;
    margin-bottom: 15px;
  }
`;

const SocialLink = styled.a`
  color: ${({theme})=> theme.textColor};
  font-size: 1.5em;

  &:hover {
    color: #61dafb;
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 1.3em;
  }
`;

const ContactInfoContainer = styled.div`
  margin-bottom: 20px;

  @media (max-width: ${breakpoints.mobile}) {
    margin-bottom: 15px;
  }
`;

const QuickLinksContainer = styled.div`
  margin-bottom: 20px;

  @media (max-width: ${breakpoints.mobile}) {
    margin-bottom: 15px;
  }
`;

const QuickLink = styled.a`
  color: ${({ theme }) => theme.textColor};
  margin: 0 15px;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }

  @media (max-width: ${breakpoints.mobile}) {
    margin: 0 10px;
  }
`;

const CopyrightContainer = styled.div`
  font-size: 0.9em;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 0.8em;
  }
`;

const Footer = () => {
  const handleLinkClick = (event) => {
    event.preventDefault();
    const targetId = event.currentTarget.getAttribute('href').slice(1);
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      const footerOffset = -50; 
      const elementPosition = targetElement.getBoundingClientRect().bottom;
      const offsetPosition = elementPosition + window.pageYOffset - window.innerHeight + footerOffset;
  
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <FooterContainer>
      <SocialMediaContainer>
        <SocialLink href="https://www.linkedin.com/in/sugriv-lodhi-ab7b33143/" target="_blank" rel="noopener noreferrer">
          <FaLinkedin />
        </SocialLink>
        <SocialLink href="https://github.com/SugrivLodhi" target="_blank" rel="noopener noreferrer">
          <FaGithub />
        </SocialLink>
        <SocialLink href="https://x.com/sugriv_lodhi" target="_blank" rel="noopener noreferrer">
          <FaTwitter />
        </SocialLink>
      </SocialMediaContainer>
      <ContactInfoContainer>
        <p>Email: <a href="mailto:sugrivmlvt@gmail.com">sugrivmlvt@gmail.com</a></p>
        <p>Phone: (+91)-8278663913</p>
      </ContactInfoContainer>
      <QuickLinksContainer>
        <QuickLink onClick={handleLinkClick} href="#about">About</QuickLink>
        <QuickLink onClick={handleLinkClick} href="#projects">Projects</QuickLink>
        <QuickLink onClick={handleLinkClick} href="#contact">Contact</QuickLink>
      </QuickLinksContainer>
      <CopyrightContainer>
        <p>&copy; {new Date().getFullYear()} Sugriv Lodhi. All rights reserved.</p>
      </CopyrightContainer>
    </FooterContainer>
  );
}

export default Footer;
