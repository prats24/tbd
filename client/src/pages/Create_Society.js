// App.js

import React, { useState,useContext,useEffect } from 'react';
import SideBarContext, {ViewContext} from '../context/SideBarContext';
import { useRoutes } from 'react-router-dom';
import AdminRoutes from '../routes/Adminroutes';
import Sidebar from '../layouts/adminPanel/sideBar/sideBar';
import { useLocation } from 'react-router-dom';
import CreateSociety from '../layouts/adminPanel/society/create_society';
import Api from '../helpers/api'
import './AdminApp.css';

function App() {

 const location = useLocation();
 const [society,setSociety] = useState([]);
 const id = location.state?.id;
 console.log("Society ID: ",location?.state?.id)

 const {activeMenuItem,handleMenuClick,getView} = useContext(ViewContext)
 
 if(id){
  useEffect(async()=>{
   try{
    const res = await Api.getSocietyById(id)
    console.log("Society Data in Create Society Page: ",res.data.data._id)
    console.log(res.data.data)
    setSociety(res.data.data)
   }
   catch(e){
     console.log(e)
     window.alert("Unable to fetch Society Data")
   }
   },[])
 }
 else{
   console.log("Inside Create Society Button")
 }
 
 console.log("Society Object: ",society)

  return (
    <div className="app">
      <Sidebar activeMenuItem={activeMenuItem} onMenuClick={handleMenuClick} />
      <div className="view">{<CreateSociety society={society}/>}</div>
    </div>
  );
}

export default App;