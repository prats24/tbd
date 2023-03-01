import AdminPanel from '../pages/Admin_Panel'
import Dashboard from '../layouts/adminPanel/dashboard/dashboard'
import HomeChef from '../layouts/adminPanel/homechef/homechef'
import AdminKitchen from '../layouts/adminPanel/kitchen/kitchen'
import Society from '../layouts/adminPanel/society/society'
import Customer from '../layouts/adminPanel/customer/customer'
import TodaysOrders from '../layouts/adminPanel/orders/todaysOrders'
import OrderHistory from '../layouts/adminPanel/orders/orderHistory'
import Reviews from '../layouts/adminPanel/reviews/reviews'

import { GiChefToque } from 'react-icons/gi';
import { TbToolsKitchen } from 'react-icons/tb';
import { AiOutlineDashboard } from 'react-icons/ai';
import { MdApartment } from 'react-icons/md';
import { HiUsers } from 'react-icons/hi';
import { SiFoodpanda } from 'react-icons/si';







const AuthenticationRoutes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "admindashboard",
    icon: <AiOutlineDashboard/>,
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Homechefs",
    key: "homechef",
    icon: <GiChefToque/>,
    component: <HomeChef />,
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
    name: "Socities",
    key: "society",
    icon: <MdApartment/>,
    component: <Society />,
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
