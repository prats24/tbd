// App.js

import React, { useState,useContext } from 'react';
import SideBarContext, {ViewContext} from '../context/SideBarContext';
import Sidebar from '../layouts/adminPanel/sideBar/sideBar';
import CreateHomeChef from '../layouts/adminPanel/homechef/create_homechef';
// import Users from './Users';
// import Orders from './Orders';
// import Settings from './Settings';
import './AdminApp.css';

function App() {

 const {activeMenuItem,handleMenuClick,getView} = useContext(ViewContext)
 

  return (
    <div className="app">
      <Sidebar activeMenuItem={activeMenuItem} onMenuClick={handleMenuClick} />
      <div className="view">{<CreateHomeChef/>}</div>
    </div>
  );
}

export default App;