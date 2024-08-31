import { breakpoints } from "@/constants";
import { theme } from "@/theme";
import styled, { keyframes } from "styled-components";

export const Container = styled.section`
  padding: 50px;
  background-color: ${theme.cardBg};
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.5rem;
  @media (max-width: ${breakpoints.mobile}) {
    padding: 30px;
  }

  @media (max-width: ${breakpoints.tablet}) {
    padding: 40px;
  }
`;

export const fadeInUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;



export const Title = styled.h2`
  font-size: 2.5em;
  margin-bottom: 30px;
  animation: ${fadeInUp} 1s ease-out;
`;