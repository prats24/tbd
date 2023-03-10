import AdminPanel from '../pages/Admin_Panel'
import Reviews from '../layouts/adminPanel/reviews/reviews'
import DeliveryAgents from '../layouts/adminPanel/deliveryAgent/deliveryAgent'
import Discount from '../layouts/adminPanel/discount/discount'
import AdminCarousel from '../layouts/adminPanel/carousel/carousel'
import AdminCuisine from '../layouts/adminPanel/cuisine/cuisine'
import { MdReviews } from 'react-icons/md';
import { MdDeliveryDining } from 'react-icons/md';
import { TbDiscount2 } from 'react-icons/tb';
import { BiCarousel } from 'react-icons/bi';
import { MdOutlineFastfood } from 'react-icons/md'


console.log("Inside Admin Route")
const AdminNotificationRoute = [
  {
    type: "collapse",
    name: "Carousels",
    key: "carousel",
    icon: <BiCarousel/>,
    component: <AdminCarousel />,
  },
  {
    type: "collapse",
    name: "Cuisines",
    key: "cuisine",
    icon: <MdOutlineFastfood/>,
    component: <AdminCuisine />,
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
