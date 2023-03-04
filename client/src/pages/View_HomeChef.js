// App.js

import React, { useState,useContext, useEffect } from 'react';
import SideBarContext, {ViewContext} from '../context/SideBarContext';
import { useLocation } from 'react-router-dom';
import Sidebar from '../layouts/adminPanel/sideBar/sideBar';
import ViewHomeChef from '../layouts/adminPanel/homechef/view_homechef';
import Api from '../helpers/api'
// import Users from './Users';
// import Orders from './Orders';
// import Settings from './Settings';
import './AdminApp.css';

function App() {
  const location = useLocation();
  const [homeChef,setHomeChef] = useState([]);
  const id = location.state.id;
  console.log("HomeChef ID: ",location.state.id)

 const {activeMenuItem,handleMenuClick,getView} = useContext(ViewContext)
  useEffect(async()=>{
  try{
   const res = await Api.getHomeChefById(id)
   setHomeChef(res.data.data)
  }
  catch(e){
    console.log(e)
    window.alert("Unable to fetch HomeChef Data")
  }
  },[])

  return (
    <div className="app">
      <Sidebar activeMenuItem={activeMenuItem} onMenuClick={handleMenuClick} />
      <div className="view">{<ViewHomeChef homeChef={homeChef}/>}</div>
    </div>
  );
}

export default App;