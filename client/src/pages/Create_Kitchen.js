// App.js

import React, {useState,useContext, useEffect} from 'react';
import SideBarContext, {ViewContext} from '../context/SideBarContext';
import Sidebar from '../layouts/adminPanel/sideBar/sideBar';
import { useLocation } from 'react-router-dom';
import CreateKitchen from '../layouts/adminPanel/kitchen/create_kitchen';
import Api from '../helpers/api'
import './AdminApp.css';

function App() {
 const location = useLocation();
 const [kitchen,setKitchen] = useState([]);
 const id = location.state?.id;
 console.log("Kitchen ID: ",location?.state?.id)

 const {activeMenuItem,handleMenuClick,getView} = useContext(ViewContext)

 if(id){
 useEffect(async()=>{
  try{
   const res = await Api.getKitchenById(id)
   console.log("Kitchen Data in Create Kitchen Page: ",res.data.data._id)
   setKitchen(res.data.data)
  }
  catch(e){
    console.log(e)
    window.alert("Unable to fetch Kitchen Data")
  }
  },[])
}
else{
  console.log("Inside Create Kitchen Button")
}

  return (
    <div className="app">
      <Sidebar activeMenuItem={activeMenuItem} onMenuClick={handleMenuClick} />
      <div className="view">{<CreateKitchen kitchen={kitchen}/>}</div>
    </div>
  );
}

export default App;