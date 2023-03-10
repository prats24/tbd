// App.js

import React, { useState,useContext } from 'react';
import SideBarContext, {ViewContext} from '../context/SideBarContext';
import Sidebar from '../layouts/adminPanel/sideBar/sideBar';
// import AdminCarousel from '../layouts/adminPanel/carousel/carousel';
import AdminCarousel from '../layouts/adminPanel/carousel/carousel';
import './AdminApp.css';

function App() {

 const {activeMenuItem,handleMenuClick,getView} = useContext(ViewContext)
 

  return (
    // <div className="app">
      <div>
      <Sidebar activeMenuItem={activeMenuItem} onMenuClick={handleMenuClick} />
      <div className="view">{<AdminCarousel/>}</div>
    </div>
  );
}

export default App;