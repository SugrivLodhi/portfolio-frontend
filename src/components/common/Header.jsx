// src/Header.js

import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { breakpoints } from "@/constants";
import slLogo from '../../../public/sl-brand.jpg'
import { theme } from "@/theme";
import Image from "next/image";
const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${theme.sectionBg};
  padding: 20px;
  color: white;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;

  @media (max-width: ${breakpoints.mobile}) {
    flex-direction: column;
    padding: 15px;
  }

  @media (max-width: ${breakpoints.tablet}) {
    padding: 18px;
  }
`;

const Logo = styled.div`
  font-size: 1.5em;
  font-weight: bold;

  @media (max-width: ${breakpoints.mobile}) {
    margin-bottom: 15px;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 20px;

  @media (max-width: ${breakpoints.mobile}) {
    flex-direction: column;
    align-items: center;
  }
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
  img {
    border-radius:50%;
    margin-left: 1rem;
  }
`;

const Header = () => {
  const handleLinkClick = (event) => {
    event.preventDefault();
    const targetId = event.currentTarget.getAttribute('href').slice(1);
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const headerOffset = 30; // Adjust based on your header height
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + document.documentElement.scrollTop - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };
  
  // Usage
  
  return (
    <HeaderContainer>
      <Logo>
        <NavLink href="/">
        <Image src={slLogo} width={40} height={32} alt="sl-brand" />
        </NavLink>
      </Logo>
      <Nav>
        <NavLink  onClick={handleLinkClick} href="#about">About</NavLink>
        <NavLink onClick={handleLinkClick} href="#skills">Skills</NavLink>
        <NavLink onClick={handleLinkClick} href="#experience">Experience</NavLink>
        <NavLink onClick={handleLinkClick} href="#projects">Projects</NavLink>
        <NavLink onClick={handleLinkClick} href="#contact">Get In Touch</NavLink>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;
