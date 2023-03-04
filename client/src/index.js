import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistedStore } from './store';
import SideBarContext from './context/SideBarContext'
import App from './App';
import AuthContext from './context/AuthContext';

ReactDOM.render(

      <React.StrictMode>
        <AuthContext> 
        <SideBarContext> 
        <Router>
          <App />
        </Router>
        </SideBarContext>
        </AuthContext>
      </React.StrictMode>
,
  document.getElementById('root')
);
