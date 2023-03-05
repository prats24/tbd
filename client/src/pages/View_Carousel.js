// App.js

import React, { useState,useContext, useEffect } from 'react';
import SideBarContext, {ViewContext} from '../context/SideBarContext';
import { useLocation } from 'react-router-dom';
import Sidebar from '../layouts/adminPanel/sideBar/sideBar';
import ViewCarousel from '../layouts/adminPanel/carousel/view_carousel';
import Api from '../helpers/api'
// import Users from './Users';
// import Orders from './Orders';
// import Settings from './Settings';
import './AdminApp.css';

function App() {
  const location = useLocation();
  const [carousel,setCarousel] = useState([]);
  const id = location.state.id;
  console.log("Carousel ID: ",location.state.id)

 const {activeMenuItem,handleMenuClick,getView} = useContext(ViewContext)
  useEffect(async()=>{
  try{
   const res = await Api.getCarouselById(id)
   setCarousel(res.data.data)
  }
  catch(e){
    console.log(e)
    window.alert("Unable to fetch Carousel Data")
  }
  },[])

  return (
    <div className="app">
      <Sidebar activeMenuItem={activeMenuItem} onMenuClick={handleMenuClick} />
      <div className="view">{<ViewCarousel carousel={carousel}/>}</div>
    </div>
  );
}

export default App;