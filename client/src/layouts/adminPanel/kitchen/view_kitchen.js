import { useForm } from "react-hook-form";
import api from "../../../helpers/api";
import '../styles/inputFormStyle.css';
import Box from '@mui/material/Box';
import { useState } from "react";
import Grid from '@mui/material/Grid';
import {Link} from 'react-router-dom'

function HomeChefForm({homeChef}) {
console.log("Kitchen ID in View: ",homeChef)
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [initialValues,setInitialValues] = useState(homeChef)
  const [editable,setEditable] = useState(false);
  const onSubmit = async (data) => {
    console.log(data);
    try{
      const formData = new FormData();
      Object.keys(data).forEach((key) => {if(key!='photo')formData.append(key, data[key])});
      formData.append('photo', data.photo[0]);
      const res = await api.createKitchen(formData);
      console.log('response', res.data.data);
    }catch(e){
      console.log(e);
    }
  };

  return (
    <>
    <Box sx={{marginTop:2,display:"flex"}}>
    <Box sx={{marginRight:3}}>
    <form onSubmit={handleSubmit(onSubmit)}>
    <Grid container spacing={1}>
    <Grid item xs={12} md={6} lg={12}>
      <label className="form-label">First Name</label>
      <input disabled={!editable} defaultValue={homeChef.firstName} className="form-control"{...register("societyName", { required: true })} />
      {errors.firstName && <span className="form-error">This field is required</span>}
    </Grid>

    <Grid item xs={12} md={6} lg={12}>
      <label className="form-label">Last Name</label>
      <input disabled={!editable} defaultValue={homeChef.lastName} className="form-control" {...register("societyAddress", { required: true })} />
      {errors.lastName && <span className="form-error">This field is required</span>}
    </Grid>

    <Grid item xs={12} md={6} lg={12}>
      <label className="form-label">Email</label>
      <input disabled={!editable} defaultValue={homeChef.email} className="form-control" {...register("societyGeoLocation")} />
      {errors.email && <span className="form-error">This field is required</span>}
    </Grid>

    <Grid item xs={12} md={6} lg={12}>
      <label className="form-label">Mobile No.</label>
      <input disabled={!editable} defaultValue={homeChef.phone} type="number" className="form-control" {...register("societyTowers", { required: true })} />
      {errors.phone && <span className="form-error">This field is required</span>}
    </Grid>

    <Grid item xs={12} md={6} lg={12}>
      <label className="form-label">Password</label>
      <input disabled={!editable} defaultValue={homeChef.password} className="form-control" {...register("societyPinCode", { required: true })} />
      {errors.password && <span className="form-error">This field is required</span>}
    </Grid>

    <Grid item xs={12} md={6} lg={6}>
      <label className="form-label">Gender</label>
      <label className="form-label">
        <input disabled={!editable} defaultValue={homeChef.societyName} type="radio"{...register("status", { required: true })} value="male" />
        Male
      </label>
      <label className="form-label">
        <input disabled={!editable} defaultValue={homeChef.societyName} type="radio" {...register("status", { required: true })} value="female" />
        Female
      </label >
      {errors.status && <span className="form-error">This field is required</span>}
    </Grid>

    <Grid item xs={12} md={6} lg={6}>
      <label className="form-label">Status</label>
      <label className="form-label">
        <input disabled={!editable} defaultValue={homeChef.status} type="radio"{...register("status", { required: true })} value="active" />
        Active
      </label>
      <label className="form-label">
        <input disabled={!editable} defaultValue={homeChef.status} type="radio" {...register("status", { required: true })} value="inactive" />
        Inactive
      </label >
      {errors.status && <span className="form-error">This field is required</span>}
    </Grid>

    <Grid item xs={12} md={6} lg={12}>
      <label className="form-label">Chef Image</label>
      <input disabled={!editable} type="file" className="form-control" {...register("displayPhoto", { required: true })} />
      {errors.displayPhoto && <span className="form-error">This field is required</span>}
    </Grid>

    {!editable && <Grid item xs={12} md={6} lg={4}>
        <button type="edit" className="form-submit" onClick={()=>{setEditable(true)}}>Edit</button>
    </Grid>}

    {editable && <Grid item xs={12} md={6} lg={4}>
       <button type="reset" className="form-submit" onClick={()=>{setEditable(false)}}>Save</button>
    </Grid>}

    {editable && <Grid item xs={12} md={6} lg={4}>
       <button type="reset" className="form-submit">Cancel</button>
    </Grid>}

    {!editable && <Grid item xs={12} md={6} lg={4}>
      <Link style={{textDecoration:'none',color:'inherit'}} to='/adminpanel'><button type="reset" className="form-submit">Back</button></Link>
    </Grid>}

    </Grid>
    </form>

    </Box>

    <Box>
    <Grid container spacing={1}>
    <Grid item xs={12} md={6} lg={4}>
     <img src={homeChef.displayPhoto} height="300px" width="300px" style={{marginTop:"30px",marginRight:"5px", borderRadius:"5px"}}></img>
    </Grid>
    </Grid>
    </Box>

    </Box>
    </>
  );
}
export default HomeChefForm;