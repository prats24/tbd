import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistedStore } from './store';
import SideBarContext from './context/SideBarContext'
import HomeChefSideBarContext from './context/HomeChefSideBarContext'
import App from './App';
import AuthContext from './context/AuthContext';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import {CartProvider} from './context/CartContext';

ReactDOM.render(

      <React.StrictMode>
        <ThemeProvider theme={theme}>
        <AuthContext> 
          <CartProvider>    
            <SideBarContext> 
              <HomeChefSideBarContext> 
                <Router>
                  <App />
                </Router>
              </HomeChefSideBarContext> 
            </SideBarContext>
          </CartProvider>  
        </AuthContext>
        </ThemeProvider>
      </React.StrictMode>
,
  document.getElementById('root')
);
