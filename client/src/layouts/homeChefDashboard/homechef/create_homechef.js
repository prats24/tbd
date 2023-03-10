import { useForm } from "react-hook-form";
import api from "../../../helpers/api";
import '../styles/inputFormStyle.css';
import Box from '@mui/material/Box';
import { useState, useEffect } from "react";
import Grid from '@mui/material/Grid';
import {Link} from 'react-router-dom'
import { Typography } from "@mui/material";
import { object } from "prop-types";

function HomeChefForm({homeChef}) {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const [initialValues,setInitialValues] = useState(homeChef);
  let [photo,setPhoto] = useState('/default/chef.gif')
  const [editable,setEditable] = useState('') 
  const [isObjectNew,setIsNewObject] = useState('');
  const [statusDefaultValue, setStatusDefaultValue] = useState(false);
  const [genderValue, setGenderValue] = useState();

  useEffect(async()=>{
    setEditable(homeChef.length === 0 ? true : false)
    console.log("Editable set as: ",editable)
    setIsNewObject(homeChef.length === 0 ? true : false)
    console.log(homeChef.length,editable,isObjectNew)
    if (homeChef.length !== 0 && homeChef.gender === "male") {
      setGenderValue(true);
    } else {
      setGenderValue(false);
    }
  },[homeChef])

  const onSubmit = async (data) => {
    console.log(data);
    
    try{
      const formData = new FormData();
      Object.keys(data).forEach((key) => {if(key!='photo')formData.append(key, data[key])});
    //   Object.keys(data).forEach((key) => {if(key!='photo')console.log(key, data[key])});
      formData.append('photo', data.photo[0]);
      const res = await api.createHomeChef(formData);
      console.log('response', res.data.data);
      setPhoto(res.data.data.displayPhoto)
      window.alert("HomeChef Created Successfully")
    }catch(e){
      console.log(e);
    }
  };
  // const inputValue = watch("photo");
  // console.log(inputValue)

  function getFormattedDate(dateStr) {
    if (!dateStr) return '';
    const dateParts = dateStr.split('-');
    if (dateParts.length !== 3) return '';
    const year = parseInt(dateParts[0]);
    const month = parseInt(dateParts[1]) - 1;
    const day = parseInt(dateParts[2]);
    if (isNaN(year) || isNaN(month) || isNaN(day)) return '';
    const dateObj = new Date(year, month, day);
    return dateObj.toISOString().split('T')[0];
  }

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
      <input disabled={!editable} defaultValue={homeChef.firstName} className="form-control" {...register("firstName", { required: true })} />
      {errors.firstName && <span className="form-error">This field is required</span>}
    </Grid>

    <Grid item xs={12} md={6} lg={12}>
      <label className="form-label">Last Name</label>
      <input disabled={!editable} defaultValue={homeChef.lastName} className="form-control" {...register("lastName", { required: true })} />
      {errors.lastName && <span className="form-error">This field is required</span>}
    </Grid>

    <Grid item xs={12} md={6} lg={12}>
      <label className="form-label">Email</label>
      <input disabled={!editable} defaultValue={homeChef.email} className="form-control" {...register("email")} />
      {errors.email && <span className="form-error">This field is required</span>}
    </Grid>

    <Grid item xs={12} md={6} lg={12}>
      <label className="form-label">Mobile No.</label>
      <input disabled={!editable} defaultValue={homeChef.phone} type="number" className="form-control" {...register("phone", { required: true })} />
      {errors.phone && <span className="form-error">This field is required</span>}
    </Grid>

    <Grid item xs={12} md={6} lg={12}>
      <label className="form-label">Password</label>
      <input disabled={!editable} defaultValue={homeChef.password} type="text" className="form-control" {...register("password", { required: true })} />
      {errors.password && <span className="form-error">This field is required</span>}
    </Grid>

    <Grid item xs={12} md={6} lg={12}>
      <label className="form-label">Date Of Birth</label>
      <input disabled={!editable} defaultValue={getFormattedDate(homeChef.dateOfBirth)} type="date" className="form-control" {...register("dateOfBirth", { required: true })} />
      {errors.dateOfBirth && <span className="form-error">This field is required</span>}
    </Grid>

    <Grid item xs={12} md={6} lg={6}>
      <label className="form-label">Gender</label>
      <label className="form-label">
        <input 
        onClick={()=>{setGenderValue(!genderValue)}}
        checked={genderValue} 
        disabled={!editable}
        type="radio"{...register("gender", { required: true })} value="male" />
        Male
      </label>
      <label className="form-label">
        <input 
        onClick={()=>{setGenderValue(!genderValue)}}
        checked={!genderValue} 
        disabled={!editable} 
        type="radio" {...register("gender", { required: true })} value="female" />
        Female
      </label >
      {errors.status && <span className="form-error">This field is required</span>}
    </Grid>

    <Grid item xs={12} md={6} lg={6}>
      <label className="form-label">Status</label>
      <label className="form-label">
        <input 
        onClick={()=>{setStatusDefaultValue(!statusDefaultValue)}}
        checked={statusDefaultValue} 
        disabled={!editable} 
        type="radio"{...register("status", { required: true })} value="active" />
        Active
      </label>
      <label className="form-label">
        <input 
        onClick={()=>{setStatusDefaultValue(!statusDefaultValue)}}
        checked={!statusDefaultValue} 
        disabled={!editable} 
        type="radio" {...register("status", { required: true })} value="inactive" />
        Inactive
      </label >
      {errors.status && <span className="form-error">This field is required</span>}
    </Grid>

    <Grid item xs={12} md={6} lg={12}>
      <label className="form-label">HomeChef Image</label>
      <input disabled={!editable} type="file" className="form-control" {...register("displayPhoto", { required: true })} />
      {errors.displayPhoto && <span className="form-error">This field is required</span>}
    </Grid>

    {editable && isObjectNew &&
    <Grid item xs={12} md={6} lg={2}>
    <button type="submit" className="form-submit" onClick={()=>handleSubmit(onSubmit)}>Submit</button>
    </Grid>
    }

    {editable && !isObjectNew &&
    <Grid item xs={12} md={6} lg={2}>
    <button type="save" className="form-submit" onClick={()=>{setEditable(false),setIsNewObject(false)}}>Save</button>
    </Grid>
    }

    {editable &&
    <Grid item xs={12} md={6} lg={2}>
    <button type="cancel" className="form-submit" onClick={()=>{setEditable(false),setIsNewObject(false)}}>Cancel</button>
    </Grid>
    }

    {!editable &&
    <Grid item xs={12} md={6} lg={2}>
    <button type="edit" className="form-submit" onClick={()=>{setEditable(true),setIsNewObject(false)}}>Edit</button>
    </Grid>
    }

    {!editable &&
    <Grid item xs={12} md={6} lg={2}>
    <button type="back" className="form-submit">Back</button>
    </Grid>
    }

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