import AdminPanel from '../pages/Admin_Panel'
import Reviews from '../layouts/adminPanel/reviews/reviews'
import DeliveryAgents from '../layouts/adminPanel/deliveryAgent/deliveryAgent'
import Discount from '../layouts/adminPanel/discount/discount'
import Carousel from '../layouts/adminPanel/carousel/carousel'
import { MdReviews } from 'react-icons/md';
import { MdDeliveryDining } from 'react-icons/md';
import { TbDiscount2 } from 'react-icons/tb';
import { BiCarousel } from 'react-icons/bi';



const AdminNotificationRoute = [
  {
    type: "collapse",
    name: "Carousel",
    key: "carousel",
    icon: <BiCarousel/>,
    component: <Carousel />,
  },
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
