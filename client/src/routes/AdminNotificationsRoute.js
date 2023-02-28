import AdminPanel from '../pages/Admin_Panel'
import Reviews from '../layouts/adminPanel/reviews/reviews'
import DeliveryAgents from '../layouts/adminPanel/deliveryAgent/deliveryAgent'
import Discount from '../layouts/adminPanel/discount/discount'

import { MdReviews } from 'react-icons/md';
import { MdDeliveryDining } from 'react-icons/md';
import { TbDiscount2 } from 'react-icons/tb';


const AdminNotificationRoute = [
  {
    type: "collapse",
    name: "Reviews",
    key: "reviews",
    icon: <MdReviews/>,
    component: <Reviews />,
  },
  {
    type: "collapse",
    name: "Delivery Agents",
    key: "deliveryagent",
    icon: <MdDeliveryDining/>,
    component: <DeliveryAgents />,
  },
  {
    type: "collapse",
    name: "Discount",
    key: "discount",
    icon: <TbDiscount2/>,
    component: <Discount />,
  },
];

export default AdminNotificationRoute;
