import { breakpoints } from "@/constants";
import styled, { keyframes } from "styled-components";

export const Container = styled.section`
  padding: 50px;
  background-color: ${({theme})=>theme.cardBg};
  text-align: center;
  border-bottom: 1px solid ${({theme})=>theme.borderColor};
  @media (max-width: ${breakpoints.mobile}) {
    padding: 30px;
  }

  @media (max-width: ${breakpoints.tablet}) {
    padding: 36px;
  }
  @media (max-width: ${breakpoints.mobile}) {
    padding: 24px;
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

export const ItemWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
  width: 100%;
  @media (max-width: ${breakpoints.tablet}) {
    gap: 0.8rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    gap: 0.5rem;
  }
`;

// Individual project item styling and animation
export const Item = styled.div`
  background: ${({theme})=>theme.sectionBg};
  color: ${({theme})=> theme.textColor};
  padding: 20px;
  border-radius: 8px;
  width: 100%;
  max-width: 400px;
  margin: 10px;
  text-align: left;
  animation: ${fadeInUp} 1s ease-out;
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-10px);
  }

  @media (max-width: ${breakpoints.tablet}) {
    padding: 16px;
    
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 12px;
  }
`;

// Title styling and animation
export const Title = styled.h2`
   font-size: 2.5em;
   margin-bottom: 30px;
  color: ${({ theme }) => theme.textColor};
  animation: ${fadeInUp} 1s ease-out;

  @media (max-width: ${breakpoints.tablet}) {
    font-size: 2em;
    margin-bottom: 25px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 1.8em;
    margin-bottom: 20px;
  }
`;

// Subtitle styling and animation
export const SubTitle = styled.h3`
  font-size: 2em;
  margin-bottom: 24px;
  color: ${({ theme }) => theme.textColor};
  animation: ${fadeInUp} 1s ease-out;

  @media (max-width: ${breakpoints.tablet}) {
    font-size: 1.7em;
    margin-bottom: 20px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 1.5em;
    margin-bottom: 18px;
  }
`;