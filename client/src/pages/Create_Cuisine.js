// App.js

import React, { useState,useContext, useEffect } from 'react';
import SideBarContext, {ViewContext} from '../context/SideBarContext';
import Sidebar from '../layouts/adminPanel/sideBar/sideBar';
import { useLocation } from 'react-router-dom';
import CreateCuisine from '../layouts/adminPanel/cuisine/create_cuisine';
import Api from '../helpers/api'
import './AdminApp.css';

function App() {

const location = useLocation();
const [cuisine,setCuisine] = useState([]);
const id = location.state?.id;
console.log("Cuisine ID: ",location?.state?.id)
 const {activeMenuItem,handleMenuClick,getView} = useContext(ViewContext)
 
 if(id){
  useEffect(async()=>{
   try{
    const res = await Api.getCuisineById(id)
    console.log("Cuisine Data in Create Carousel Page: ",res.data.data._id)
    console.log(res.data.data)
    setCuisine(res.data.data)
   }
   catch(e){
     console.log(e)
     window.alert("Unable to fetch Cuisine Data")
   }
   },[])
 }
 else{
   console.log("Inside Create Cuisine Button")
 }
 
 console.log("Cuisine Object: ",cuisine)

  return (
    <div className="app">
      <Sidebar activeMenuItem={activeMenuItem} onMenuClick={handleMenuClick} />
      <div className="view">{<CreateCuisine cuisine={cuisine}/>}</div>
    </div>
  );
}

export default App;