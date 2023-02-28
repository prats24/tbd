import React, { useState } from 'react';
import './adminLoginStyle.css';
import Api from '../../helpers/api';
import {useNavigate} from 'react-router-dom';


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

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

  return (
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
  );
}

export default Login;
