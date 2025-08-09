
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
  background: #f8f9fa;
  overflow-y: auto;

  @media (max-width: ${breakpoints.mobile}) {
    // Mobile specific styles if needed
  }

  @media (max-width: ${breakpoints.tablet}) {
    // Tablet specific styles if needed
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
