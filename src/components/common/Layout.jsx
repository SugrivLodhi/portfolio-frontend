// src/Layout.js

import React, { useContext, useState} from 'react';
import styled from 'styled-components';
import { breakpoints } from '@/constants';
import Header from './Header';
import About from '../AboutSection';
import Modal from './Modal';
import Login from '../Login';
import SignUp from '../Signup';
import { ContextProvider } from '@/context';
import Footer from '../Footer';
// Define breakpoints


const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;


// const Footer = styled.footer`
//   background: #282c34;
//   padding: 20px;
//   color: white;
//   text-align: center;
//   margin-top: auto;

//   @media (max-width: ${breakpoints.mobile}) {
//     padding: 15px;
//   }

//   @media (max-width: ${breakpoints.tablet}) {
//     padding: 18px;
//   }
// `;

const Main = styled.main`
  flex: 1;
  padding: 20px;
  background: #eae8e8;

  @media (max-width: ${breakpoints.mobile}) {
    padding: 10px;
  }

  @media (max-width: ${breakpoints.tablet}) {
    padding: 15px;
  }
`;

const Layout = ({children}) => {
 
  return (
    <Container>
     <Header/>
      <Main>
       {children}
      </Main>
    <Footer/>
    </Container>
  );
};

export default Layout;
