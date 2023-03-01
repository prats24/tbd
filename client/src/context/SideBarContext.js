import React, { useState } from 'react'
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

export const ViewContext = React.createContext();

export default function SideBarContext({children}) {
    const [activeMenuItem, setActiveMenuItem] = useState('dashboard');
    const handleMenuClick = (menuItem) => {
        setActiveMenuItem(menuItem);
      };
      const getView = () => {
        switch (activeMenuItem) {
          case 'Dashboard':
            return <Dashboard />;
          case 'Homechefs':
            return <HomeChef />;
          case 'Kitchens':
            return <AdminKitchen />;
          case 'Socities':
            return <Socities />;
          case 'Cusomters':
            return <Customers />;
          case 'Today\'s Orders':
            return <TodaysOrders />;
          case 'Order History':
            return <OrderHistory />;
          case 'Reviews':
            return <Reviews />;
          case 'Delivery Agents':
            return <DeliveryAgents />;
          case 'Discount':
            return <Discount />;
          case 'Create':
            return <Discount />;
          default:
            return null;
        }
      };
    
  return (
      <ViewContext.Provider value={{activeMenuItem, handleMenuClick, getView}}>
        {children}
      </ViewContext.Provider>
  )
}