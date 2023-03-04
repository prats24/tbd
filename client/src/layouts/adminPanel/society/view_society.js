import { useForm } from "react-hook-form";
import api from "../../../helpers/api";
import '../styles/inputFormStyle.css';
import Box from '@mui/material/Box';
import { useState } from "react";
import Grid from '@mui/material/Grid';
import {Link} from 'react-router-dom'

function SocietyForm({society}) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [initialValues,setInitialValues] = useState(society)
  const [editable,setEditable] = useState(false);
  const onSubmit = async (data) => {
    console.log(data);
    try{
      const formData = new FormData();
      Object.keys(data).forEach((key) => {if(key!='photo')formData.append(key, data[key])});
      formData.append('photo', data.photo[0]);
      const res = await api.createSociety(formData);
      console.log('response', res.data.data);
    }catch(e){
      console.log(e);
    }
  };

  return (
    <>
    <Box sx={{marginTop:2}}>
    <form onSubmit={handleSubmit(onSubmit)}>
    <Grid container spacing={1}>
    <Grid item xs={12} md={6} lg={12}>
      <label className="form-label">Society Name</label>
      <input disabled={!editable} defaultValue={society.societyName} className="form-control"{...register("societyName", { required: true })} />
      {errors.societyName && <span className="form-error">This field is required</span>}
    </Grid>
    <Grid item xs={12} md={6} lg={12}>
      <label className="form-label">Society Address</label>
      <input disabled={!editable} defaultValue={society.societyAddress} className="form-control" {...register("societyAddress", { required: true })} />
      {errors.societyAddress && <span className="form-error">This field is required</span>}
    </Grid>
    <Grid item xs={12} md={6} lg={12}>
      <label className="form-label">Society Pin Code</label>
      <input disabled={!editable} defaultValue={society.societyPinCode} className="form-control" {...register("societyPinCode", { required: true })} />
      {errors.societyPinCode && <span className="form-error">This field is required</span>}
    </Grid>
    <Grid item xs={12} md={6} lg={12}>
      <label className="form-label">Society Geolocation</label>
      <input disabled={!editable} defaultValue={society?.societyGeoLocation?.coordinates} className="form-control" {...register("societyGeoLocation")} />
    </Grid>
    <Grid item xs={12} md={6} lg={12}>
      <label className="form-label">Society Towers</label>
      <input disabled={!editable} defaultValue={society.societyTowers} type="number" className="form-control" {...register("societyTowers", { required: true })} />
      {errors.societyTowers && <span className="form-error">This field is required</span>}
    </Grid>
    <Grid item xs={12} md={6} lg={12}>
      <label className="form-label">Status</label>
      <label className="form-label">
        <input disabled={!editable} defaultValue={society.societyName} type="radio"{...register("status", { required: true })} value="active" />
        Active
      </label>
      <label className="form-label">
        <input disabled={!editable} defaultValue={society.societyName} type="radio" {...register("status", { required: true })} value="inactive" />
        Inactive
      </label >
      {errors.status && <span className="form-error">This field is required</span>}
    </Grid>
    <Grid item xs={12} md={6} lg={12}>
      <label className="form-label">Society Image</label>
      <input disabled={!editable} type="file" className="form-control" {...register("photo", { required: true })} />
      {errors.photo && <span className="form-error">This field is required</span>}
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
    </>
  );
}
export default SocietyForm;