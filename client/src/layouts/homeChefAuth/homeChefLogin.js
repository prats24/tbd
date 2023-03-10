import React, { useState, useContext, useEffect } from 'react';
import './homeChefLoginStyle.css';
import Api from '../../helpers/api';
import {useNavigate} from 'react-router-dom';
import AuthContext, { userContext } from "../../context/AuthContext";



function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const {userDetail, setUserDetail} = useContext(userContext);
  const [loading,setLoading] = useState(true);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(`Email: ${email}, Password: ${password}`);
    try{
      const res = await Api.homeChefSignIn({email, password});
      console.log(res.data);
      if(res.data.status == 'success'){
        setUserDetail(res.data.data);
        navigate('/homechefdashboard');
      }
    }catch(e){
      console.log(e);
    }
  };

  useEffect(()=>{
    Api.getLoginDetails()
    .then((res)=>{
      if(res.data.status == 'success'){
        console.log('setting user detail');
        setUserDetail(res.data.data);
        console.log(res.data.data);
        setLoading(false);
        if(res.data.data.role.roleName == 'Admin'){
          navigate('/adminpanel');
        }else{
          navigate('/');
        }
      }
    }).catch((err)=>{
      console.log("Fail to fetch data of user");
      setLoading(false);
      return;
    })
    // setLoading(false);
  }, [])

  return loading ? (<div></div>):(
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type="submit">Log In</button>
      </form>
    </div>
  )
}

export default Login;
