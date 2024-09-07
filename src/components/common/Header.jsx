import React, { useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import { breakpoints } from "@/constants";
import slLogo from "../../../public/sl-brand.jpg";
import Image from "next/image";
import { FaBars, FaSun, FaMoon } from "react-icons/fa"; // Import the sun and moon icons
import { useTheme } from "../../../context";

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${({ theme }) => theme.sectionBg};
  padding: 20px;
  color: ${({ theme }) => theme.textColor};
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;

  @media (max-width: ${breakpoints.tablet}) {
    padding: 18px;
  }
`;

const Logo = styled.div`
  font-size: 1.5em;
  font-weight: bold;
`;

const Nav = styled.nav`
  display: flex;
  gap: 20px;

  @media (max-width: ${breakpoints.mobile}) {
    display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
    flex-direction: column;
    align-items: flex-start;
    background: ${({ theme }) => theme.sectionBg};
    width: 250px;
    height: 30vh;
    position: fixed;
    top: 0;
    right: 0;
    padding: 20px;
    z-index: 999;
    transform: ${({ isOpen }) =>
      isOpen ? "translateX(0)" : "translateX(100%)"};
    transition: transform 0.3s ease-in-out;
  }
`;

const NavLink = styled(Link)`
  color: ${({ theme }) => theme.textColor};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }

  img {
    border-radius: 50%;
    margin-left: 1rem;
  }
`;

const HamburgerIcon = styled.div`
  display: none;

  @media (max-width: ${breakpoints.mobile}) {
    display: block;
    cursor: pointer;
    font-size: 1.5em;
  }
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.textColor};
  cursor: pointer;
  font-size: 1.5em;
  padding: 10px;
`;

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();

  const handleLinkClick = (event) => {
    event.preventDefault();
    const targetId = event.currentTarget.getAttribute("href").slice(1);
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const headerOffset = 30; // Adjust based on your header height
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + document.documentElement.scrollTop - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
    setIsOpen(false); // Close the menu after clicking a link
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <HeaderContainer>
      <Logo>
        <NavLink href="/">
          <Image src={slLogo} width={40} height={32} alt="sl-brand" />
        </NavLink>
      </Logo>
      <HamburgerIcon onClick={toggleMenu}>
        <FaBars />
      </HamburgerIcon>
      <Nav isOpen={isOpen}>
        <NavLink onClick={handleLinkClick} href="#about">
          About
        </NavLink>
        <NavLink onClick={handleLinkClick} href="#skills">
          Skills
        </NavLink>
        <NavLink onClick={handleLinkClick} href="#experience">
          Experience
        </NavLink>
        <NavLink onClick={handleLinkClick} href="#projects">
          Projects
        </NavLink>
        <NavLink onClick={handleLinkClick} href="#contact">
          Get In Touch
        </NavLink>
      </Nav>
      <ToggleButton onClick={toggleTheme}>
        {isDarkMode ? <FaSun /> : <FaMoon />} {/* Toggle between sun and moon icons */}
      </ToggleButton>
    </HeaderContainer>
  );
};

export default Header;
