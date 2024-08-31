// src/Header.js

import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { breakpoints } from "@/constants";

import { theme } from "@/theme";
const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${theme.sectionBg};
  padding: 20px;
  color: white;

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
`;

const Header = () => {
 
  return (
    <HeaderContainer>
      <Logo>
        <NavLink href="/">Home</NavLink>
      </Logo>
      <Nav>
        <NavLink href="#about">About</NavLink>
        <NavLink href="#skills">Skills</NavLink>
        <NavLink href="#experience">Experience</NavLink>
        <NavLink href="#projects">Projects</NavLink>
        <NavLink href="#resume">Resume</NavLink>
        <NavLink href="#contact">Get In Touch</NavLink>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;
