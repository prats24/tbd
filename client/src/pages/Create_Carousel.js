// App.js

import React, { useState,useContext, useEffect } from 'react';
import SideBarContext, {ViewContext} from '../context/SideBarContext';
import Sidebar from '../layouts/adminPanel/sideBar/sideBar';
import { useLocation } from 'react-router-dom';
import CreateCarousel from '../layouts/adminPanel/carousel/create_carousel';
import Api from '../helpers/api'
import './AdminApp.css';

function App() {

const location = useLocation();
const [carousel,setCarousel] = useState([]);
const id = location.state?.id;
console.log("Carousel ID: ",location?.state?.id)
 const {activeMenuItem,handleMenuClick,getView} = useContext(ViewContext)
 
 if(id){
  useEffect(async()=>{
   try{
    const res = await Api.getCarouselById(id)
    console.log("Carousel Data in Create Carousel Page: ",res.data.data._id)
    console.log(res.data.data)
    setCarousel(res.data.data)
   }
   catch(e){
     console.log(e)
     window.alert("Unable to fetch Carousel Data")
   }
   },[])
 }
 else{
   console.log("Inside Create Carousel Button")
 }
 
 console.log("Carousel Object: ",carousel)

  return (
    <div className="app">
      <Sidebar activeMenuItem={activeMenuItem} onMenuClick={handleMenuClick} />
      <div className="view">{<CreateCarousel carousel={carousel}/>}</div>
    </div>
  );
}

export default App;