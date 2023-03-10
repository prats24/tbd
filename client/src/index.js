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

ReactDOM.render(

      <React.StrictMode>
        <AuthContext> 
        <SideBarContext> 
        <HomeChefSideBarContext> 
        <Router>
          <App />
        </Router>
        </HomeChefSideBarContext> 
        </SideBarContext>
        </AuthContext>
      </React.StrictMode>
,
  document.getElementById('root')
);
