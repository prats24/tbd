import * as axios from 'axios';
import getCookie from './getCookie.js';

class Api {
  constructor() {
    this.api_token = null;
    this.client = null;
    this.api_url = 'http://localhost:8092/api/v1';
    // this.api_url = process.env.REACT_APP_API_ENDPOINT;
  }

  init = () => {
    // this.api_token = getCookie(window.store.getState().authReducer.token);

    let headers = {
      Accept: 'application/json',
    };

    if (this.api_token) {
      headers.Authorization = `Bearer ${this.api_token}`;
    }

    this.client = axios.create({
      baseURL: this.api_url,
      timeout: 31000,
      headers: headers,
      withCredentials: true,
    });

    return this.client;
  };

  //get users list
  getUserList = (params) => {
    return this.init().get('/users', { params: params });
  };

  //add new user
  addNewUser = (data) => {
    return this.init().post('/users', data);
  };
  //user sign In
  signIn = (data) => {
    return this.init().post('/users/login', data);
  };
  //user sign In
  signUp = (data) => {
    return this.init().post('/signup', data);
  };
  //user update
  update = (data) => {
    return this.init().post('/updateuser', data);
  };
  //user password
  updatepassword = (data) => {
    return this.init().post('/updatepassword', data);
  };
  // fetch all meals
  fetchmeals = () => {
    return this.init().get('/products');
  };
  // add order
  addorder = (data) => {
    return this.init().post('/orders', data);
  };
  // get user orders
  getuserorders = () => {
    return this.init().get('/orders/myorders');
  };
  getLoginDetails = () => {
    return this.init().get('/users/me');
  }
  createSociety = (data) => {
    return this.init().post('/societies', data);
  }
  getSocieties = () => {
    return this.init().get('/societies');
  }
  getSocietyById = (id) => {
    return this.init().get(`/societies/${id}`);
  }
  editSociety = (id, data) =>{
    return this.init().patch(`/societies/${id}`, data);
  }
  getHomeChefById = (id) => {
    return this.init().get(`/homechefs/${id}`);
  }
  createHomeChef = (data) => {
    console.log("Inside API File: ",data)
    return this.init().post('/homechefs', data);
  }
  getHomeChef = () => {
    return this.init().get('/homechefs');
  }
}

export default new Api();
