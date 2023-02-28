import AdminPanel from '../pages/Admin_Panel'
import Dashboard from '../layouts/adminPanel/dashboard/dashboard'
import HomeChef from '../layouts/adminPanel/homechef/homechef'
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';


const AuthenticationRoutes = [
  {
    type: "collapse",
    name: "dashboard",
    key: "admindashboard",
    icon: <DashboardIcon/>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "homechef",
    key: "homechef",
    icon: <PersonIcon/>,
    route: "/dashboard",
    component: <HomeChef />,
  },
];

export default AuthenticationRoutes;
