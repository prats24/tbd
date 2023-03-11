// App.js

import React, { useContext, useEffect } from 'react';
import HomeChefSidebar from '../layouts/homeChefDashboard/sideBar/sideBar';

import {HomeChefViewContext} from '../context/HomeChefSideBarContext';
import Api from '../helpers/api';
import './AdminApp.css';
import { userContext } from '../context/AuthContext';

function App() {
  
  const {activeMenuItem,handleMenuClick,getView} = useContext(HomeChefViewContext);
  const {userDetail, setUserDetail} = useContext(userContext);

  useEffect(()=>{
    Api.getHomeChefLoginDetails()
    .then((res)=>{
      if(res.data.status == 'success'){
        console.log('setting user detail');
        setUserDetail(res.data.data);
        navigate('/homechefdashboard');
      }
    }).catch((err)=>{
      console.log("Fail to fetch data of user");
      console.log(err);
      return;
    })
    // setLoading(false);
  }, [])


  return (
    <div className="app">
      <HomeChefSidebar activeMenuItem={activeMenuItem} onMenuClick={handleMenuClick} />
      <div className="view">{getView()}</div>
    </div>
  );
}

export default App;