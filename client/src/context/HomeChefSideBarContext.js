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
import AdminCarousel from '../layouts/adminPanel/carousel/carousel';
import AdminCuisine from '../layouts/adminPanel/cuisine/cuisine';
import Menus from '../layouts/homeChefDashboard/menus/createMenu'

export const HomeChefViewContext = React.createContext();

export default function HomeChefSideBarContext({children}) {
    const [activeMenuItem, setActiveMenuItem] = useState('dashboard');
    const handleMenuClick = (menuItem) => {
        setActiveMenuItem(menuItem);
      };
      const getView = () => {
        switch (activeMenuItem) {
          case 'Dashboard':
            return <Dashboard />;
          case 'Menus':
            return <Menus/>;
          case 'Kitchens':
            return <AdminKitchen />;
          case 'Cusomters':
            return <Customers />;
          case 'Today\'s Orders':
            return <TodaysOrders />;
          case 'Order History':
            return <OrderHistory />;
          case 'Reviews':
            return <Reviews />;
          case 'Discount':
            return <Discount />;
          default:
            return null;
        }
      };
    
  return (
      <HomeChefViewContext.Provider value={{activeMenuItem, handleMenuClick, getView}}>
        {children}
      </HomeChefViewContext.Provider>
  )
}