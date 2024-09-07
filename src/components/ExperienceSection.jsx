import React from 'react';
import styled from 'styled-components';
import { experiences } from '@/constants';

import { Container, Item, ItemWrapper, Title } from './common';

// Company and role styling
const CompanyName = styled.h3`
  font-size: 1.5em;
  margin-bottom: 10px;
`;

const Role = styled.p`
  font-size: 1.2em;
  margin-bottom: 5px;
  font-weight: bold;
`;

const Duration = styled.p`
  font-size: 1em;
  color: ${({ theme }) => theme.textColor};
`;

// ExperienceSection component
const ExperienceSection = () => {

  return (
    <Container id="experience">
      <Title>Experience</Title>
      <ItemWrapper>
        {experiences.map((experience, index) => (
          <Item key={index} style={{ animationDelay: `${index * 0.2}s` }}>
            <CompanyName>{experience.company}</CompanyName>
            <Role>{experience.role}</Role>
            <Duration>{experience.duration}</Duration>
          </Item>
        ))}
      </ItemWrapper>
    </Container>
  );
};

export default ExperienceSection;
