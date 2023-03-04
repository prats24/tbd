// App.js

import React, { useState,useContext } from 'react';
import SideBarContext, {ViewContext} from '../context/SideBarContext';
import Sidebar from '../layouts/adminPanel/sideBar/sideBar';
import CreateKitchen from '../layouts/adminPanel/kitchen/create_kitchen';
// import Users from './Users';
// import Orders from './Orders';
// import Settings from './Settings';
import './AdminApp.css';

function App() {

 const {activeMenuItem,handleMenuClick,getView} = useContext(ViewContext)
 

  return (
    <div className="app">
      <Sidebar activeMenuItem={activeMenuItem} onMenuClick={handleMenuClick} />
      <div className="view">{<CreateKitchen/>}</div>
    </div>
  );
}

export default App;