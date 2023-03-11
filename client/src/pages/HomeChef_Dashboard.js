// App.js

import React, { useContext } from 'react';
import HomeChefSidebar from '../layouts/homeChefDashboard/sideBar/sideBar';

import {HomeChefViewContext} from '../context/HomeChefSideBarContext';

import './AdminApp.css';

function App() {
  
  const {activeMenuItem,handleMenuClick,getView} = useContext(HomeChefViewContext)


  return (
    <div className="app">
      <HomeChefSidebar activeMenuItem={activeMenuItem} onMenuClick={handleMenuClick} />
      <div className="view">{getView()}</div>
    </div>
  );
}

export default App;