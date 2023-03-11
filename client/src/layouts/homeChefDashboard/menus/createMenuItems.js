import { useForm } from "react-hook-form";
import api from "../../../helpers/api";
import '../styles/inputFormStyle.css';
import Box from '@mui/material/Box';
import { useState, useEffect } from "react";
import Grid from '@mui/material/Grid';
import {Link} from 'react-router-dom'
import { Typography } from "@mui/material";
import { object } from "prop-types";
import { useAlert } from 'react-alert'

function MenuItemsForm({menuItem}) {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const [initialValues,setInitialValues] = useState(menuItem);
  let [dishPhoto,setdishPhoto] = useState('/default/chef.gif')
  const [editable,setEditable] = useState('') 
  const [isObjectNew,setIsNewObject] = useState('');
  const [statusDefaultValue, setStatusDefaultValue] = useState(false);
  const [availability, setAvailability] = useState();
//   const alert = useAlert()

  useEffect(async()=>{
    setEditable(menuItem.length === 0 ? true : false)
    console.log("Editable set as: ",editable)
    setIsNewObject(menuItem.length === 0 ? true : false)
    console.log(menuItem.length,editable,isObjectNew)
    if (menuItem.length !== 0 && menuItem.availability === true) {
        setAvailability(true);
    } else {
        setAvailability(false);
    }
  },[menuItem])

  const onSubmit = async (data) => {
    console.log(data);
    
    try{
      const formData = new FormData();
      Object.keys(data).forEach((key) => {if(key!='dishPhoto')formData.append(key, data[key])});
    //   Object.keys(data).forEach((key) => {if(key!='photo')console.log(key, data[key])});
      formData.append('dishPhoto', data.dishPhoto[0]);
      const res = await api.createMenuItem(formData);
      console.log('response', res.data.data);
      setPhoto(res.data.data.dishPhoto)
      window.alert("Item Created Successfully")
    //   alert.show('Menu Item Created!')
    }catch(e){
      console.log(e);
    }
  };


  return (
    <>
    <Box sx={{marginTop:-7}}>
        <Typography sx={{backgroundColor:"#e8e8e8",color:"black",fontWeight:400,padding:1, marginBottom:2, borderRadius:1}}>
          Create a Menu Item
        </Typography>
        </Box>
      <Box sx={{marginTop:2,display:"flex"}}>
    <Box sx={{marginRight:3}}>
    <form onSubmit={handleSubmit(onSubmit)}>
    <Grid container spacing={1}>

    <Grid item xs={12} md={6} lg={12}>
      <label className="form-label">Item Name*</label>
      <input disabled={!editable} defaultValue={menuItem.menuItemName} className="form-control" {...register("menuItemName", { required: true })} />
      {errors.menuItemName && <span className="form-error">This field is required</span>}
    </Grid>

    <Grid item xs={12} md={6} lg={12}>
      <label className="form-label">Type*</label>
      <input disabled={!editable} defaultValue={menuItem.type} className="form-control" {...register("type", { required: true })} />
      {errors.type && <span className="form-error">This field is required</span>}
    </Grid>

    <Grid item xs={12} md={6} lg={12}>
      <label className="form-label">Category*</label>
      <input disabled={!editable} defaultValue={menuItem.category} className="form-control" {...register("category")} />
      {errors.category && <span className="form-error">This field is required</span>}
    </Grid>

    <Grid item xs={12} md={6} lg={12}>
      <label className="form-label">Price*</label>
      <input disabled={!editable} defaultValue={menuItem.price} type="number" className="form-control" {...register("price", { required: true })} />
      {errors.price && <span className="form-error">This field is required</span>}
    </Grid>

    <Grid item xs={12} md={6} lg={12}>
      <label className="form-label">Description*</label>
      <input disabled={!editable} defaultValue={menuItem.description} className="form-control" {...register("description")} />
      {errors.description && <span className="form-error">This field is required</span>}
    </Grid>

    <Grid item xs={12} md={6} lg={12}>
      <label className="form-label">Dish Image*</label>
      <input disabled={!editable} type="file" className="form-control" {...register("dishPhoto", { required: true })} />
      {errors.dishPhoto && <span className="form-error">This field is required</span>}
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
     <img src={dishPhoto} height="300px" width="300px" style={{marginTop:"30px",marginRight:"5px", borderRadius:"5px", border:"1px #ced4da solid"}}></img>
    </Grid>
    </Grid>
    </Box>
    </Box>

    </>
  );
}
export default MenuItemsForm;