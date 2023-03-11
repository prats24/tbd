// App.js

import React, { useState,useContext, useEffect } from 'react';
import SideBarContext, {HomeChefViewContext} from '../context/HomeChefSideBarContext';
import Sidebar from '../layouts/homeChefDashboard/sideBar/sideBar';
import { useLocation } from 'react-router-dom';
import CreateMenuItem from '../layouts/homeChefDashboard/menus/createMenuItems';
import Api from '../helpers/api'
import './AdminApp.css';

function App() {

const location = useLocation();
const [menuItem,setMenuItem] = useState([]);
const id = location.state?.id;
console.log("MenuItem ID: ",location?.state?.id)
 const {activeMenuItem,handleMenuClick,getView} = useContext(HomeChefViewContext)
 
 if(id){
  useEffect(async()=>{
   try{
    const res = await Api.getMenuItemById(id)
    console.log("MenuItem Data in Create Carousel Page: ",res.data.data._id)
    console.log(res.data.data)
    setMenuItem(res.data.data)
   }
   catch(e){
     console.log(e)
     window.alert("Unable to fetch Menu Item Data")
   }
   },[])
 }
 else{
   console.log("Inside Create Menu Item Button")
 }
 
 console.log("Menu Item Object: ",menuItem)

  return (
    <div className="app">
      <Sidebar activeMenuItem={activeMenuItem} onMenuClick={handleMenuClick} />
      <div className="view">{<CreateMenuItem menuItem={menuItem}/>}</div>
    </div>
  );
}

export default App;