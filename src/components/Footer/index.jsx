// src/components/Footer.js

import React from 'react';
import styled from 'styled-components';
import { FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';
import { theme } from '@/theme';

const FooterContainer = styled.footer`
  padding: 30px;
  background-color: ${theme.sectionBg};
  color: white;
  text-align: center;
`;

const SocialMediaContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
`;

const SocialLink = styled.a`
  color: white;
  font-size: 1.5em;

  &:hover {
    color: #61dafb;
  }
`;

const ContactInfoContainer = styled.div`
  margin-bottom: 20px;
`;

const QuickLinksContainer = styled.div`
  margin-bottom: 20px;
`;

const QuickLink = styled.a`
  color: white;
  margin: 0 15px;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const CopyrightContainer = styled.div`
  font-size: 0.9em;
`;

const Footer = () => (
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
      <p>Email: <a href="mailto:your.email@example.com">sugrivmlvt.com</a></p>
      {/* Optional phone number */}
      <p>Phone: (+91)-8278663913</p>
    </ContactInfoContainer>
    <QuickLinksContainer>
      <QuickLink href="#about">About</QuickLink>
      <QuickLink href="#projects">Projects</QuickLink>
      <QuickLink href="#contact">Contact</QuickLink>
    </QuickLinksContainer>
    <CopyrightContainer>
      <p>&copy; {new Date().getFullYear()} Sugriv Lodhi. All rights reserved.</p>
    </CopyrightContainer>
  </FooterContainer>
);

export default Footer;
