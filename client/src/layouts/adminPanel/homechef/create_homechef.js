import { useForm } from "react-hook-form";
import api from "../../../helpers/api";
import '../styles/inputFormStyle.css';
import Box from '@mui/material/Box';
import { useState } from "react";
import Grid from '@mui/material/Grid';
import {Link} from 'react-router-dom'
import { Typography } from "@mui/material";
import { object } from "prop-types";

function HomeChefForm() {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  let [photo,setPhoto] = useState('/default/building.gif')
  const onSubmit = async (data) => {
    console.log(data);
    
    try{
      const formData = new FormData();
      Object.keys(data).forEach((key) => {if(key!='photo')formData.append(key, data[key])});
    //   Object.keys(data).forEach((key) => {if(key!='photo')console.log(key, data[key])});
      formData.append('photo', data.photo[0]);
      const res = await api.createHomeChef(formData);
      console.log('response', res.data.data);
      setPhoto(res.data.data.homeChefPhoto)
      window.alert("HomeChef Created Successfully")
    }catch(e){
      console.log(e);
    }
  };
  // const inputValue = watch("photo");
  // console.log(inputValue)

  return (
    <>
    <Box sx={{marginTop:2}}>
        <Typography sx={{backgroundColor:"#e8e8e8",color:"black",fontWeight:400,padding:1, marginBottom:2, borderRadius:1}}>
          Create a HomeChef
        </Typography>
        </Box>
      <Box sx={{marginTop:2,display:"flex"}}>
    <Box sx={{marginRight:3}}>
    <form onSubmit={handleSubmit(onSubmit)}>
    <Grid container spacing={1}>

    <Grid item xs={12} md={6} lg={12}>
      <label className="form-label">First Name</label>
      <input className="form-control" {...register("firstName", { required: true })} />
      {errors.firstName && <span className="form-error">This field is required</span>}
    </Grid>

    <Grid item xs={12} md={6} lg={12}>
      <label className="form-label">Last Name</label>
      <input className="form-control" {...register("lastName", { required: true })} />
      {errors.lastName && <span className="form-error">This field is required</span>}
    </Grid>

    <Grid item xs={12} md={6} lg={12}>
      <label className="form-label">Email</label>
      <input className="form-control" {...register("email")} />
      {errors.email && <span className="form-error">This field is required</span>}
    </Grid>

    <Grid item xs={12} md={6} lg={12}>
      <label className="form-label">Mobile No.</label>
      <input type="number" className="form-control" {...register("phone", { required: true })} />
      {errors.phone && <span className="form-error">This field is required</span>}
    </Grid>

    <Grid item xs={12} md={6} lg={12}>
      <label className="form-label">Password</label>
      <input type="text" className="form-control" {...register("password", { required: true })} />
      {errors.password && <span className="form-error">This field is required</span>}
    </Grid>

    <Grid item xs={12} md={6} lg={12}>
      <label className="form-label">Date Of Birth</label>
      <input type="date" className="form-control" {...register("dateOfBirth", { required: true })} />
      {errors.dateOfBirth && <span className="form-error">This field is required</span>}
    </Grid>

    <Grid item xs={12} md={6} lg={6}>
      <label className="form-label">Gender</label>
      <label className="form-label">
        <input type="radio"{...register("gender", { required: true })} value="male" />
        Male
      </label>
      <label className="form-label">
        <input type="radio" {...register("gender", { required: true })} value="female" />
        Female
      </label >
      {errors.status && <span className="form-error">This field is required</span>}
    </Grid>

    <Grid item xs={12} md={6} lg={6}>
      <label className="form-label">Status</label>
      <label className="form-label">
        <input type="radio"{...register("status", { required: true })} value="active" />
        Active
      </label>
      <label className="form-label">
        <input type="radio" {...register("status", { required: true })} value="inactive" />
        Inactive
      </label >
      {errors.status && <span className="form-error">This field is required</span>}
    </Grid>

    <Grid item xs={12} md={6} lg={12}>
      <label className="form-label">HomeChef Image</label>
      <input type="file" className="form-control" {...register("photo", { required: true })} />
      {errors.photo && <span className="form-error">This field is required</span>}
    </Grid>

    <Grid item xs={12} md={6} lg={4}>
    <button type="submit" className="form-submit">Submit</button>
    </Grid>

    </Grid>
    </form>

    </Box>

    <Box>
    <Grid container spacing={1}>
    <Grid item xs={12} md={6} lg={4}>
     <img src={photo} height="300px" width="300px" style={{marginTop:"30px",marginRight:"5px", borderRadius:"5px", border:"1px #ced4da solid"}}></img>
    </Grid>
    </Grid>
    </Box>

    </Box>

    </>
  );
}
export default HomeChefForm;