import React, { useEffect } from 'react';
// import dotenv from 'dotenv';
import { ThemeProvider } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import './App.css';

import theme from './theme';
import ScrollToTop from './layouts/reusables/ScrollToTop';
import Navbar from './layouts/reusables/Navbar';
import Footer from './layouts/reusables/Footer';
import { getAllMeals } from './store/actions/productActions';
import useOnline from './hooks/useOnline.js';

import Routes from './routes';

function App() {

  return (
    // <ThemeProvider theme={theme}>
      <>
      <ScrollToTop />
      {/* <Navbar /> */}
      {window.location.pathname.startsWith("/admin") ? null : <Navbar />}
      <Routes />
      {/* {window.location.pathname.startsWith("/admin") ? null : <Routes />} */}
      {/* <Footer /> */}
      {/* {window.location.pathname.startsWith("/admin") ? null : <Footer />} */}
      </>
    // </ThemeProvider>
  );
}

export default App;
