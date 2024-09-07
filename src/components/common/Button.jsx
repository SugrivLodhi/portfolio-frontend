import { breakpoints } from "@/constants";
import React from "react";
import styled from "styled-components";

const Button = styled.button`
  padding: 0.8rem;
  border: none;
  border-radius: 3px;
  background-color: ${({theme})=>theme.btnBg};
  color: ${({theme})=>theme.textColor};
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: ${({theme})=>theme.btnBgHover};
  }

  @media (max-width: ${breakpoints.tablet}) {
    padding: 0.6rem;
    font-size: 0.875rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 0.5rem;
    font-size: 0.75rem;
  }
`;

const StyledButton = ({ children, type = "button" }) => {
  return <Button type={type}>{children}</Button>;
};

export default StyledButton;
