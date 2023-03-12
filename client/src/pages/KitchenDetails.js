import React, { useState,useContext,useEffect } from 'react';
import KitchenDetail from '../layouts/kitchens/KitchenDetail';
import Foodlist from '../layouts/kitchens/Foodlist';
import Navbar from '../layouts/reusables/Navbar';
import Api from '../helpers/api'
import { useLocation } from 'react-router-dom';
import MenuItem from '../layouts/MenuItems/menuItem';
 
export default function KitchenDetails() {

  const location = useLocation();
  const [kitchen,setKitchen] = useState([]);
  const id = location.state?.id;
  console.log("Kitchen ID: ",location?.state?.id)

  if(id){
    useEffect(async()=>{
     try{
      const res = await Api.getKitchenById(id)
      console.log("Kitchen Data in Create Kitchen Page: ",res.data.data._id)
      console.log(res.data.data)
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
   
   console.log("Kitchen Object: ",kitchen)
  

  return (
    <div>
      <KitchenDetail  kitchen={kitchen} />
    </div>
  );
}
