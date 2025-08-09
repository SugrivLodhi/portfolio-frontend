import { breakpoints } from "@/constants";
import { theme } from "@/theme";
import React from "react";
import styled from "styled-components";

const Button = styled.button`
  padding: 1rem 2rem;
  border: none;
  border-radius: 50px;
  background: linear-gradient(135deg, ${theme.btnBg}, #61dafb);
  color: #ffffff;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(49, 57, 145, 0.3);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left 0.5s ease;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(49, 57, 145, 0.4);
    
    &::before {
      left: 100%;
    }
  }

  @media (max-width: ${breakpoints.tablet}) {
    padding: 0.8rem 1.5rem;
    font-size: 0.875rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 0.7rem 1.2rem;
    font-size: 0.75rem;
  }
`;

const StyledButton = ({ children, type = "button" }) => {
  return <Button type={type}>{children}</Button>;
};

export default StyledButton;
