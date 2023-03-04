// App.js

import React, { useState,useContext, useEffect } from 'react';
import SideBarContext, {ViewContext} from '../context/SideBarContext';
import { useLocation } from 'react-router-dom';
import Sidebar from '../layouts/adminPanel/sideBar/sideBar';
import ViewSociety from '../layouts/adminPanel/society/view_society';
import Api from '../helpers/api'
// import Users from './Users';
// import Orders from './Orders';
// import Settings from './Settings';
import './AdminApp.css';

function App() {
  const location = useLocation();
  const [society,setSociety] = useState([]);
  const id = location.state.id;
  console.log("Society ID: ",location.state.id)

 const {activeMenuItem,handleMenuClick,getView} = useContext(ViewContext)
  useEffect(async()=>{
  try{
   const res = await Api.getSocietyById(id)
   setSociety(res.data.data)
  }
  catch(e){
    console.log(e)
    window.alert("Unable to fetch Society Data")
  }
  },[])

  return (
    <div className="app">
      <Sidebar activeMenuItem={activeMenuItem} onMenuClick={handleMenuClick} />
      <div className="view">{<ViewSociety society={society}/>}</div>
    </div>
  );
}

export default App;