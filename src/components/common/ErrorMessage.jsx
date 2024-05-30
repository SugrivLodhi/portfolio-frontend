import { breakpoints } from '@/constants';
import React from 'react';
import styled from 'styled-components';

const ErrorText = styled.span`
  display: block;
  margin-top: 0.25rem;
  color: red;
  font-size: 0.875rem;

  @media (max-width: ${breakpoints.tablet}) {
    font-size: 0.75rem;
  }

  @media (max-width: ${breakpoints.mobile} ) {
    font-size: 0.625rem;
  }
`;

const ErrorMessage = ({ children }) => {
  if (!children) return null;
  return <ErrorText>{children}</ErrorText>;
};

export default ErrorMessage;
