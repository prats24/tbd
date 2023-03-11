import { useForm } from "react-hook-form";
import Api from "../../../helpers/api";
import React from "react";
import '../styles/inputFormStyle.css';
import Box from '@mui/material/Box';
import { useState, useEffect } from "react";
import Grid from '@mui/material/Grid';
import { Typography } from "@mui/material";
import Switch from '@mui/material/Switch';


function CuisineForm({cuisine}) {
  const [initialValues,setInitialValues] = useState(cuisine);
  const { register, handleSubmit, formState: { errors }, watch } = useForm(cuisine.length === 0 ? '' : initialValues);
  let [photo,setPhoto] = useState('/default/cuisine.gif')
  const [kitchens, setKitchens] = useState([]);
  const [kitchenNames,setKitchenNames] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const label = { inputProps: { 'aria-label': 'Size switch demo' } };
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 200,
      },
    },
  };

  const [editable,setEditable] = useState('') 
  const [isObjectNew,setIsNewObject] = useState('');
  const [statusDefaultValue, setStatusDefaultValue] = useState(false);

  React.useEffect(async()=>{
    setEditable(cuisine.length === 0 ? true : false)
    console.log("Editable set as: ",editable)
    setIsNewObject(cuisine.length === 0 ? true : false)
    setPhoto(cuisine.length === 0 ? photo : cuisine.cuisineIcon)
    console.log(cuisine.length,editable,isObjectNew)
    if (cuisine.length !== 0 && cuisine.status === "active") {
      setStatusDefaultValue(true);
    } else {
      setStatusDefaultValue(false);
    }
  },[cuisine])
  
  const onSubmit = async (data) => {
    console.log(data);
    
    try{
      const formData = new FormData();
      Object.keys(data).forEach((key) => {if(key!='cuisineIcon')formData.append(key, data[key])});
      formData.append('cuisineIcon', data.cuisineIcon[0]);
      console.log("Going to create cuisine")
      const res = await Api.createCuisine(formData);
      console.log('response', res.data.data);
      if(res.data.status === 'success'){
        window.alert("Cuisine Created Successfully")
        setEditable(false);
        setIsNewObject(false);
        setPhoto(res.data.data.cuisineIcon)
      }
      
    }catch(e){
      console.log(e);
    }
  };

  return (
    <>
    {isObjectNew && <Box sx={{marginTop:2}}>
        <Typography sx={{backgroundColor:"#e8e8e8",color:"black",fontWeight:400,padding:1, marginBottom:2, borderRadius:1}}>
          Create a Cuisine
        </Typography>
    </Box>}
    {!isObjectNew && <Box sx={{marginTop:2}}>
        <Typography sx={{backgroundColor:"#e8e8e8",color:"black",fontWeight:400,padding:1, marginBottom:2, borderRadius:1}}>
          Cuisine Details
        </Typography>
    </Box>}
      <Box sx={{marginTop:2,display:"flex"}}>
    <Box sx={{marginRight:3}}>
    <form onSubmit={handleSubmit(onSubmit)}>
    <Grid container spacing={1}>

    <Grid item xs={12} md={6} lg={12}>
      <label className="form-label">Cuisine Name*</label>
      <input disabled={!editable} defaultValue={cuisine.cuisineName} className="form-control" {...register("cuisineName", { required: true })} />
      {errors.cuisineName && <span className="form-error">This field is required</span>}
    </Grid>

    <Grid item xs={12} md={6} lg={12}>
      <label className="form-label">Cuisine Description*</label>
      <input disabled={!editable} defaultValue={cuisine.description} className="form-control" {...register("description", { required: true })} />
      {errors.description && <span className="form-error">This field is required</span>}
    </Grid>

    <Grid item xs={12} md={6} lg={6}>
      <label className="form-label">Status*</label>
      <label className="form-label">
        <input 
        onClick={()=>{setStatusDefaultValue(!statusDefaultValue)}}
        checked={statusDefaultValue} 
        disabled={!editable} 
        type="radio"
        {...register("status", { required: true })} value="active" />
        Active
      </label>
      <label className="form-label">
        <input 
        onClick={()=>{setStatusDefaultValue(!statusDefaultValue)}} 
        checked={!statusDefaultValue} 
        disabled={!editable} 
        defaultChecked
        type="radio" 
        {...register("status", { required: true })} value="inactive" />
        Inactive
      </label >
      {errors.status && <span className="form-error">This field is required</span>}
    </Grid>

    {/* <Grid item xs={12} md={6} lg={6}>
      <label className="form-label">Status*</label>
      <Switch {...label} defaultChecked size="small" {...register("status", { required: true })} />
      {errors.status && <span className="form-error">This field is required</span>}
    </Grid> */}

    

    <Grid item xs={12} md={6} lg={12}>
      <label className="form-label">Cuisine Icon*</label>
      <input disabled={!editable} type="file" className="form-control" {...register("cuisineIcon", { required: true })} />
      {errors.cuisineIcon && <span className="form-error">This field is required</span>}
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
     <img src={photo} height="60px" width="60px" style={{marginTop:"25px",marginRight:"5px", borderRadius:"5px", border:"1px #ced4da solid"}}></img>
    </Grid>
    </Grid>
    </Box>

    </Box>

    </>
  );
}
export default CuisineForm;

