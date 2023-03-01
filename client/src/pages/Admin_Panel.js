// App.js

import React, { useState,useContext } from 'react';
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
import SideBarContext, {ViewContext} from '../context/SideBarContext';
// import Users from './Users';
// import Orders from './Orders';
// import Settings from './Settings';
import './AdminApp.css';

function App() {
  // const [activeMenuItem, setActiveMenuItem] = useState('dashboard');
  const {activeMenuItem,handleMenuClick,getView} = useContext(ViewContext)
  // const handleMenuClick = (menuItem) => {
  //   setActiveMenuItem(menuItem);
  // };

  // const getView = () => {
  //   switch (activeMenuItem) {
  //     case 'Dashboard':
  //       return <Dashboard />;
  //     case 'Homechefs':
  //       return <HomeChef />;
  //     case 'Kitchens':
  //       return <AdminKitchen />;
  //     case 'Socities':
  //       return <Socities />;
  //     case 'Cusomters':
  //       return <Customers />;
  //     case 'Today\'s Orders':
  //       return <TodaysOrders />;
  //     case 'Order History':
  //       return <OrderHistory />;
  //     case 'Reviews':
  //       return <Reviews />;
  //     case 'Delivery Agents':
  //       return <DeliveryAgents />;
  //     case 'Discount':
  //       return <Discount />;
  //     default:
  //       return null;
  //   }
  // };

  return (
    <div className="app">
      <Sidebar activeMenuItem={activeMenuItem} onMenuClick={handleMenuClick} />
      <div className="view">{getView()}</div>
    </div>
  );
}

export default App;