import React, { useRef } from 'react';

//Components
import Header from '../components/Header';
import Footer from '../components/Footer';

//Context
import AppProvider from '../context/App.provider';

const Layout = ({children}) => {
  return ( <AppProvider>
    <Header/>
    {children}
    <Footer/>
  </AppProvider> );
}
 
export default Layout;