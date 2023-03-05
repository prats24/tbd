import { useForm, Controller} from "react-hook-form";
import React from "react"; 
import '../styles/inputFormStyle.css';
import Box from '@mui/material/Box';
import { useState } from "react";
import Grid from '@mui/material/Grid';
import {Link} from 'react-router-dom'
import { Typography } from "@mui/material";
import { object } from "prop-types";
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import Api from '../../../helpers/api'
import { withStyles } from "@material-ui/core/styles";

function KitchenForm({kitchen}) {
  console.log(kitchen)
  const [initialValues,setInitialValues] = useState(kitchen);
  const { register, handleSubmit,formState: { errors }, watch, control } = useForm(initialValues);
  let [photo,setPhoto] = useState('/default/chef.gif')
  const [editable,setEditable] = useState() 
  const [isObjectNew,setIsNewObject] = useState();
  const [societies,setSocieties] = useState([]);
  const [homeChefs,setHomeChefs] = useState([]);
  const [homeChef,setHomeChef] = useState([]);
  const [society,setSociety] = useState([]);
  const [deliveryChargeType, setDeliveryChargeType] = useState([]);

  // setEditable(!kitchen ? true : false)
  // setIsNewObject(!kitchen ? true : false)
  photo = isObjectNew ? photo : kitchen.displayPhoto
  const deliveryChargeTypes = ['Flat','Percentage']

  const NoPaddingAutocomplete = withStyles({
    inputRoot: {
      '&&[class*="MuiOutlinedInput-root"] $input': {
        padding: 0
      },
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "1px solid #ced4da"
      },
      "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: "red"
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "purple"
      }
    },
    input: {}
  })(Autocomplete);
  
  React.useEffect(async()=>{
    let res = await Api.getSocieties()
    console.log(res.data.data)
    setSocieties(res.data.data);
    setEditable(kitchen ? true : false)
    setIsNewObject(kitchen ? true : false)
    console.log(kitchen,editable,isObjectNew)
    },[])
  
    React.useEffect(async()=>{
      let res = await Api.getHomeChef()
      console.log(res.data.data)
      setHomeChefs(res.data.data);
      },[])

    
  const onSubmit = async (data) => {
    console.log('onsubmit');
    console.log(data);
    try{
      const formData = new FormData();
      Object.keys(data).forEach((key) => {if(key!='displayPhoto' && data[key] && key!='coverPhoto')formData.append(key, data[key])});
      if(data.displayPhoto[0])formData.append('displayPhoto', data?.displayPhoto[0]);
      if(data.coverPhoto[0])formData.append('coverPhoto', data?.coverPhoto[0]);
      const res = await Api.createKitchen(formData);
      console.log('response', res.data.data);
      if(res.data.status == 'success'){
        window.alert('kitchen created successfully');
        setEditable(false);
        setIsNewObject(false);
      }
      else{
        window.alert(res.data);
      }
    }catch(e){
      console.log(e);
      window.alert(e.toString());
    }
  };

  return (
    <>
    <Box sx={{marginTop:2}}>
        <Typography sx={{backgroundColor:"#e8e8e8",color:"black",fontWeight:400,padding:1, marginBottom:2, borderRadius:1}}>
          Create a Kitchen
        </Typography>
        </Box>
      <Box sx={{marginTop:2,display:"flex"}}>
    <Box sx={{marginRight:3}}>
    <form onSubmit={handleSubmit(onSubmit)}>
    <Grid container spacing={1}>

    <Grid item xs={12} md={6} lg={12}>
      <label className="form-label">Kitchen Name</label>
      <input disabled={!editable} defaultValue={kitchen.kitchenName} className="form-control" {...register("kitchenName", { required: true })} />
      {/* {errors.kitchenName && <span className="form-error">This field is required</span>} */}
    </Grid>

    <Grid item xs={12} md={6} lg={6}>
    <label disabled={!editable} className="form-label">Society Name</label>
    <Controller
        name="society"
        control={control}
        defaultValue={kitchen.society}
        render={({ field }) => (
          <NoPaddingAutocomplete
            disabled={!editable}
            options={societies?.map((elem) => ({
              societyName: elem.societyName,
              societyId: elem._id,
            }))}
            getOptionLabel={(option) => option.societyName}
            value={society}
            onChange={(event, newValue) => {
              setSociety(newValue);
              field.onChange(newValue ? newValue.societyId : "");
            }}
            renderInput={(params) => (
              <TextField {...params} variant="outlined" />
            )}
          />
        )}
      />
    </Grid>

    <Grid item xs={12} md={6} lg={6}>
    <label className="form-label">HomeChef Name</label>
    <Controller
        name="homeChef"
        control={control}
        defaultValue={kitchen.homeChef}
        render={({ field }) => (
          <NoPaddingAutocomplete
            disabled={!editable}
            // options={[{ societyId: 1, societyName: "Society A" }, { societyId: 2, societyName: "Society B" }]}
            options={homeChefs?.map((elem) => ({
              homeChefName: elem.firstName +' '+ elem.lastName,
              homeChefId: elem._id,
            }))}
            getOptionLabel={(option) => option.homeChefName}
            value={homeChef}
            onChange={(event, newValue) => {
              setHomeChef(newValue);
              field.onChange(newValue ? newValue.homeChefId : "");
            }}
            renderInput={(params) => (
              <TextField {...params} variant="outlined" />
            )}
          />
        )}
      />
    </Grid>

    <Grid item xs={12} md={6} lg={4}>
      <label className="form-label">Email</label>
      <input disabled={!editable} defaultValue={kitchen.email} className="form-control" {...register("email")} />
      {/* {errors.email && <span className="form-error">This field is required</span>} */}
    </Grid>

    <Grid item xs={12} md={6} lg={4}>
      <label className="form-label">Mobile No.</label>
      <input disabled={!editable} defaultValue={kitchen.phone} type="number" className="form-control" {...register("phone", { required: true })} />
      {/* {errors.phone && <span className="form-error">This field is required</span>} */}
    </Grid>

    <Grid item xs={12} md={6} lg={4}>
      <label className="form-label">Flat No.</label>
      <input disabled={!editable} defaultValue={kitchen.flatNo} type="text" className="form-control" {...register("flatno", { required: true })} />
      {/* {errors.flatno && <span className="form-error">This field is required</span>} */}
    </Grid>

    <Grid item xs={12} md={6} lg={4}>
      <label className="form-label">Floor</label>
      <input disabled={!editable} defaultValue={kitchen.floor} type="number" className="form-control" {...register("floor", { required: true })} />
      {/* {errors.floor && <span className="form-error">This field is required</span>} */}
    </Grid>

    <Grid item xs={12} md={6} lg={4}>
      <label className="form-label">Tower</label>
      <input disabled={!editable} defaultValue={kitchen.tower} type="text" className="form-control" {...register("tower", { required: true })} />
      {/* {errors.tower && <span className="form-error">This field is required</span>} */}
    </Grid>

    <Grid item xs={12} md={6} lg={4}>
      <label className="form-label">Live Date</label>
      <input disabled={!editable} defaultValue={kitchen.liveDate} type="date" className="form-control" {...register("liveDate")} />
      {/* {errors.liveDate && <span className="form-error">This field is required</span>} */}
    </Grid>

    <Grid item xs={12} md={6} lg={12}>
      <label className="form-label">Description</label>
      <input disabled={!editable} defaultValue={kitchen.description} className="form-control" {...register("description", { required: true })} />
      {/* {errors.description && <span className="form-error">This field is required</span>} */}
    </Grid>

    <Grid item xs={12} md={6} lg={2}>
      <label className="form-label">Cost for One(in ₹)</label>
      <input disabled={!editable} defaultValue={kitchen.costForOne} type="number" className="form-control" {...register("costForOne", { required: true })} />
      {/* {errors.costForOne && <span className="form-error">This field is required</span>} */}
    </Grid>

    <Grid item xs={12} md={6} lg={2}>
    <label className="form-label">Del. Chg. Type</label>
    <Controller
        name="deliveryChargeType"
        control={control}
        defaultValue={kitchen.deliveryChargeType}
        render={({ field }) => (
          <NoPaddingAutocomplete
            disabled={!editable}
            options={deliveryChargeTypes?.map((elem) => ({
              delChargeType: elem,
            }))}
            getOptionLabel={(option) => option.delChargeType}
            value={deliveryChargeType}
            onChange={(event, newValue) => {
              setDeliveryChargeType(newValue);
              field.onChange(newValue ? newValue.delChargeType : "");
            }}
            renderInput={(params) => (
              <TextField {...params} variant="outlined" />
            )}
          />
        )}
      />
    </Grid>

    <Grid item xs={12} md={6} lg={2}>
      <label className="form-label">Del. Charges(in ₹/%)</label>
      <input disabled={!editable} defaultValue={kitchen.deliveryCharges} type="number" className="form-control" {...register("deliveryCharges", { required: true })} />
      {/* {errors.deliveryCharges && <span className="form-error">This field is required</span>} */}
    </Grid>

    <Grid item xs={12} md={6} lg={3}>
      <label className="form-label" style={{margin:1}}>Kitchen Type</label>
        <input disabled={!editable} defaultValue={kitchen.kitchenType} style={{marginLeft:5,marginTop:20}} type="radio"{...register("kitchenType", { required: true })} value="veg" />
        Veg
        <input disabled={!editable} style={{marginLeft:5,marginTop:20}} type="radio" {...register("kitchenType", { required: true })} value="non-veg" />
        Non-Veg
      {/* {errors.status && <span className="form-error">This field is required</span>} */}
    </Grid>

    <Grid item xs={12} md={6} lg={3}>
      <label className="form-label" style={{margin:1}}>Status</label>
        <input disabled={!editable} style={{marginLeft:5, marginTop:20}} type="radio"{...register("status", { required: true })} value="active" />
        Active
        <input disabled={!editable} style={{marginLeft:5, marginTop:20}} type="radio" {...register("status", { required: true })} value="inactive" />
        Inactive
      {/* {errors.status && <span className="form-error">This field is required</span>} */}
    </Grid>

    <Grid item xs={12} md={6} lg={6}>
      <label className="form-label">Kitchen Display Image</label>
      <input disabled={!editable} defaultValue={kitchen.kitchenDisplayImage} type="file" className="form-control" {...register("displayPhoto")} />
      {/* {errors.displayPhoto && <span className="form-error">This field is required</span>} */}
    </Grid>

    <Grid item xs={12} md={6} lg={6}>
      <label className="form-label">Kitchen Cover Image</label>
      <input disabled={!editable} type="file" className="form-control" {...register("coverPhoto")} />
      {/* {errors.coverPhoto && <span className="form-error">This field is required</span>} */}
    </Grid>
    
    {editable && isObjectNew &&
    <Grid item xs={12} md={6} lg={2}>
    <button type="submit" className="form-submit" >Submit</button>
    </Grid>
    }

    {editable && !isObjectNew &&
    <Grid item xs={12} md={6} lg={2}>
    <button type="submit" className="form-submit" onClick={()=>{setEditable(false),setIsNewObject(false)}}>Save</button>
    </Grid>
    }

    {editable &&
    <Grid item xs={12} md={6} lg={2}>
    <button type="submit" className="form-submit" onClick={()=>{setEditable(false),setIsNewObject(false)}}>Cancel</button>
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
export default KitchenForm;