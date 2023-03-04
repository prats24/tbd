import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Userprofile from '../pages/Userprofile';
import Mydetails from '../layouts/user_profile/Mydetails';
import Userorders from '../layouts/user_profile/Userorders';
import Myminiorders from '../layouts/user_profile/Myminiorders';
import Home from '../pages/Home';
import Allfoods from '../pages/Allfoods';
import Checkout from '../pages/Checkout';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import SocietySearch from '../pages/SocietySearch';
import Kitchens from '../pages/Kitchens';
import CarouselKitchen from '../pages/CarouselKitchen'
import AdminLogin from '../pages/AdminLogin'
import AdminPanel from '../pages/Admin_Panel'
import CreateSociety from '../pages/Create_Society'
import ViewSociety from '../pages/View_Society'
import AdminCarousel from '../pages/Admin_Carousel'
import CreateHomeChef from '../pages/Create_Homechef'

const AuthenticationRoutes = (isLoggedIn) => [
  {
    path: '/',
    element: <SocietySearch />,
  },
  {
    path: '/createsociety',
    element: <CreateSociety />,
  },
  {
    path: '/createhomechef',
    element: <CreateHomeChef />,
  },
  {
    path: '/viewsociety',
    element: <ViewSociety />,
  },
  {
    path: '/admincarousel',
    element: <AdminCarousel />,
  },
  {
    path: '/adminpanel',
    element: <AdminPanel />,
  },
  {
    path: '/admin',
    element: <AdminLogin />,
  },
  {
    path: '/allmeals',
    element: <Allfoods />,
  },
  {
    path: '/carouselkitchen',
    element: <CarouselKitchen />,
  },
  {
    path: '/allkitchens',
    element: <Kitchens />,
  },
  {
    path: '/checkout',
    element: <Checkout />,
  },
  {
    path: '/login',
    element: isLoggedIn ? <Navigate to="/profile" /> : <Login />,
  },
  {
    path: '/signout',
    element: <Navigate to="/" />,
  },
  {
    path: '/profile/*',
    element: isLoggedIn ? <Userprofile /> : <Navigate to="/login" />,
    children: [
      {
        path: 'details',
        element: <Mydetails />,
      },
      {
        path: 'orders',
        element: <Userorders />,
      },
      {
        path: 'o',
        element: <Myminiorders />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

export default AuthenticationRoutes;
