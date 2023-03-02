// App.js

import React, { useState,useContext } from 'react';
import SideBarContext, {ViewContext} from '../context/SideBarContext';
import { useRoutes } from 'react-router-dom';
import AdminRoutes from '../routes/Adminroutes';
import Sidebar from '../layouts/adminPanel/sideBar/sideBar';
import Dashboard from '../layouts/adminPanel/dashboard/dashboard';
import HomeChef from '../layouts/adminPanel/homechef/homechef';
import AdminKitchen from '../layouts/adminPanel/kitchen/kitchen';
import Socities from '../layouts/adminPanel/society/society';
import Customers from '../layouts/adminPanel/customer/customer';
import TodaysOrders from '../layouts/adminPanel/orders/todaysOrders';
import OrderHistory from '../layouts/adminPanel/orders/orderHistory';
import Reviews from '../layouts/adminPanel/reviews/reviews';
import DeliveryAgents from '../layouts/adminPanel/deliveryAgent/deliveryAgent';
import Discount from '../layouts/adminPanel/discount/discount';
import CreateSociety from '../layouts/adminPanel/society/create_society';
// import Users from './Users';
// import Orders from './Orders';
// import Settings from './Settings';
import './AdminApp.css';

function App() {

 const {activeMenuItem,handleMenuClick,getView} = useContext(ViewContext)
 

  return (
    <div className="app">
      <Sidebar activeMenuItem={activeMenuItem} onMenuClick={handleMenuClick} />
      <div className="view">{<CreateSociety/>}</div>
    </div>
  );
}

export default App;