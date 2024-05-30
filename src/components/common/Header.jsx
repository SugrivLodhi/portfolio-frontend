// src/Header.js

import React, { useContext } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { breakpoints } from '@/constants';
import { ContextProvider } from '@/context';
import { useRouter } from 'next/router';
const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #282c34;
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

const Header = ({onOpen}) => {
  const {dispatch} = useContext(ContextProvider)
   const route = useRouter()
  return (
    <HeaderContainer>
      <Logo>
        <NavLink href="/">Home</NavLink>
      </Logo>
      <Nav>
        <NavLink onClick={()=> dispatch({type:"openLoginPopup"})} href="#">Login</NavLink>
        <NavLink onClick={()=> dispatch({type:"openSignupPopup"})}  href="#">Sign Up</NavLink>
        <NavLink onClick={()=> route.push('/my-task')} href="#">Daily Task</NavLink>
        <NavLink  onClick={()=> route.push('/my-thought')} href="#">My Thought</NavLink>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;
