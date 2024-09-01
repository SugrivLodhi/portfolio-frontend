// src/components/ResumeSection.js

import React from 'react';
import styled from 'styled-components';
import { FaDownload } from 'react-icons/fa';
import { Container, SubTitle, Title } from './common';
import { theme } from '@/theme';


// Button styling for download button
const DownloadButton = styled.a`
  display: inline-flex;
  align-items: center;
  padding: 15px 30px;
  background-color: ${theme.btnBg};
  color: white;
  font-size: 1.2em;
  font-weight: bold;
  border-radius: 8px;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #21a1f1;
  }
`;

// Icon styling for the download button
const DownloadIcon = styled(FaDownload)`
  margin-right: 10px;
`;

const ResumeSection = () => {
  return (
    <Container >
      <SubTitle>Download My Resume</SubTitle>
      <DownloadButton href="Resume-Sugriv-resume-Full-Stack-Developer.pdf" download="sugriv.pdf">
        <DownloadIcon /> Download Resume
      </DownloadButton>
    </Container>
  );
};

export default ResumeSection;
