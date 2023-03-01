import React, { useState, useContext, useEffect } from 'react';
import './adminLoginStyle.css';
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
      const res = await Api.signIn({email, password});
      console.log(res.data);
      if(res.data.status == 'success'){
        navigate('/adminpanel');
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
        setLoading(false);
        navigate('/adminpanel');
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
      <p className='welcometitle'>Welcome back</p>
      <form onSubmit={handleSubmit}>
        <label className="user_name">
          <p>Username:</p>
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label className="pass_word">
          <p>Password:</p>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type="submit">Log In</button>
      </form>
    </div>
  )
}

export default Login;
