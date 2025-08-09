
import React, { useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import { breakpoints } from "@/constants";
import slLogo from "../../../public/sl-brand.jpg";
import { theme } from "@/theme";
import Image from "next/image";
import { FaBars } from "react-icons/fa";

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(0, 52, 89, 0.95);
  backdrop-filter: blur(10px);
  padding: 20px;
  color: white;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  transition: all 0.3s ease;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  @media (max-width: ${breakpoints.tablet}) {
    padding: 18px;
  }
`;

const Logo = styled.div`
  font-size: 1.5em;
  font-weight: bold;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 20px;

  @media (max-width: ${breakpoints.mobile}) {
    display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
    flex-direction: column;
    align-items: flex-start;
    background: rgba(0, 52, 89, 0.98);
    backdrop-filter: blur(20px);
    width: 250px;
    height: 30vh;
    position: fixed;
    top: 0;
    right: 0;
    padding: 20px;
    z-index: 999;
    border-left: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: -5px 0 15px rgba(0, 0, 0, 0.2);
    transform: ${({ isOpen }) => (isOpen ? "translateX(0)" : "translateX(100%)")};
    transition: transform 0.3s ease-in-out;
  }
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-weight: 500;
  position: relative;
  transition: all 0.3s ease;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, #61dafb, white);
    transition: width 0.3s ease;
  }

  &:hover {
    color: #61dafb;
    
    &::after {
      width: 100%;
    }
  }

  img {
    border-radius: 50%;
    margin-left: 1rem;
    transition: transform 0.3s ease;
    
    &:hover {
      transform: rotate(360deg);
    }
  }
`;

const HamburgerIcon = styled.div`
  display: none;
  cursor: pointer;
  padding: 5px;
  border-radius: 5px;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: scale(1.1);
  }

  @media (max-width: ${breakpoints.mobile}) {
    display: block;
    font-size: 1.5em;
  }
`;

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = (event) => {
    event.preventDefault();
    const targetId = event.currentTarget.getAttribute('href').slice(1);
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const headerOffset = 80; // Adjust based on your header height
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + document.documentElement.scrollTop - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
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
        <NavLink onClick={handleLinkClick} href="#about">About</NavLink>
        <NavLink onClick={handleLinkClick} href="#skills">Skills</NavLink>
        <NavLink onClick={handleLinkClick} href="#experience">Experience</NavLink>
        <NavLink onClick={handleLinkClick} href="#projects">Projects</NavLink>
        <NavLink onClick={handleLinkClick} href="#contact">Get In Touch</NavLink>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;
