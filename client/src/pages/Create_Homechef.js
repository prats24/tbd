// App.js

import React, { useState,useContext,useEffect } from 'react';
import SideBarContext, {ViewContext} from '../context/SideBarContext';
import Sidebar from '../layouts/adminPanel/sideBar/sideBar';
import { useLocation } from 'react-router-dom';
import CreateHomeChef from '../layouts/adminPanel/homechef/create_homechef';
import Api from '../helpers/api'
import './AdminApp.css';

function App() {

 const location = useLocation();
 const [homeChef,setHomeChef] = useState([]);
 const id = location.state?.id;
 console.log("HomeChef ID: ",location?.state?.id)
 const {activeMenuItem,handleMenuClick,getView} = useContext(ViewContext)
 
 if(id){
  useEffect(async()=>{
   try{
    const res = await Api.getHomeChefById(id)
    console.log("HomeChef Data in Create HomeChef Page: ",res.data.data._id)
    console.log(res.data.data)
    setHomeChef(res.data.data)
   }
   catch(e){
     console.log(e)
     window.alert("Unable to fetch HomeChef Data")
   }
   },[])
 }
 else{
   console.log("Inside Create HomeChef Button")
 }
 
 console.log("HomeChef Object: ",homeChef)

  return (
    <div className="app">
      <Sidebar activeMenuItem={activeMenuItem} onMenuClick={handleMenuClick} />
      <div className="view">{<CreateHomeChef homeChef={homeChef}/>}</div>
    </div>
  );
}

export default App;