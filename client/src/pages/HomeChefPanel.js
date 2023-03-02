// App.js

import React, { useState } from 'react';
import { useRoutes } from 'react-router-dom';
import AdminRoutes from '../routes/Adminroutes';
import Sidebar from '../layouts/adminPanel/sideBar/sideBar';
import Dashboard from '../layouts/adminPanel/dashboard/dashboard';
import HomeChef from '../layouts/adminPanel/homechef/homechef';
// import Users from './Users';
// import Orders from './Orders';
// import Settings from './Settings';
import './HomeChefPanelStyle.css';

function App() {
  const [activeMenuItem, setActiveMenuItem] = useState('dashboard');

  const handleMenuClick = (menuItem) => {
    setActiveMenuItem(menuItem);
  };

  const getView = () => {
    switch (activeMenuItem) {
      case 'dashboard':
        return <Dashboard />;
      case 'homechef':
        return <HomeChef />;
      // case 'orders':
      //   return <Orders />;
      // case 'settings':
      //   return <Settings />;
      default:
        return null;
    }
  };

  return (
    <div className="app">
      <Sidebar activeMenuItem={activeMenuItem} onMenuClick={handleMenuClick} />
      <div className="view">{getView()}</div>
    </div>
  );
}

export default App;