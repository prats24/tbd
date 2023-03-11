import AdminPanel from '../pages/Admin_Panel'
import Dashboard from '../layouts/homeChefDashboard/dashboard/dashboard'
import HomeChef from '../layouts/adminPanel/homechef/homechef'
import AdminKitchen from '../layouts/adminPanel/kitchen/kitchen'
import Society from '../layouts/adminPanel/society/society'
import Customer from '../layouts/adminPanel/customer/customer'
import TodaysOrders from '../layouts/adminPanel/orders/todaysOrders'
import OrderHistory from '../layouts/adminPanel/orders/orderHistory'
import Reviews from '../layouts/adminPanel/reviews/reviews'
import Menus from '../layouts/homeChefDashboard/menus/createMenu';
import CreateMenuItem from '../layouts/homeChefDashboard/menus/createMenuItems';

import { GiChefToque } from 'react-icons/gi';
import { TbToolsKitchen } from 'react-icons/tb';
import { AiOutlineDashboard } from 'react-icons/ai';
import { MdApartment } from 'react-icons/md';
import { HiUsers } from 'react-icons/hi';
import { SiFoodpanda } from 'react-icons/si';
import { BiFoodMenu } from 'react-icons/bi'


const AuthenticationRoutes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "homechefdashboard",
    icon: <AiOutlineDashboard/>,
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Menus",
    key: "Menus",
    icon: <BiFoodMenu />,
    component: <Menus />,
  },
  {
    type: "collapse",
    name: "Kitchens",
    key: "kitchen",
    icon: <TbToolsKitchen/>,
    component: <AdminKitchen />,
  },
  {
    type: "collapse",
    name: "Customers",
    key: "customer",
    icon: <HiUsers/>,
    component: <Customer />,
  },
  {
    type: "collapse",
    name: "Today's Orders",
    key: "todaysorders",
    icon: <SiFoodpanda/>,
    component: <TodaysOrders />,
  },
  {
    type: "collapse",
    name: "Order History",
    key: "orderhistory",
    icon: <SiFoodpanda/>,
    component: <OrderHistory />,
  },
];

export default AuthenticationRoutes;
