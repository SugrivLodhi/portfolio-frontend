// src/Layout.js

import React  from 'react';
import styled from 'styled-components';
import { breakpoints } from '@/constants';
import Header from './Header';
import Footer from '../Footer';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;




const Main = styled.main`
  flex: 1;
  padding: 20px;
  background: #eae8e8;
  margin-top: 60px;  // Adjust this value according to the height of your header
  overflow-y: auto;

  @media (max-width: ${breakpoints.mobile}) {
    padding: 10px;
    margin-top: 40px;  // Adjust this value for mobile
  
  }

  @media (max-width: ${breakpoints.tablet}) {
    padding: 15px;
    margin-top: 55px;  // Adjust this value for tablets
  }
`;


const Layout = ({ children }) => {
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
