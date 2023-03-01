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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
