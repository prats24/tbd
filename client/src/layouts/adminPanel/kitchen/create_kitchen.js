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

function KitchenForm() {
  const { register, handleSubmit, formState: { errors }, watch, control } = useForm();
  let [photo,setPhoto] = useState('/default/chef.gif')
  const [societies,setSocieties] = useState([]);
  const [homeChefs,setHomeChefs] = useState([]);
  const [homeChef,setHomeChef] = useState([]);
  const [society,setSociety] = useState([]);
  
  React.useEffect(async()=>{
    let res = await Api.getSocieties()
    console.log(res.data.data)
    setSocieties(res.data.data);
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
      }
      else{
        window.alert(res.data);
      }
    }catch(e){
      console.log(e);
      window.alert(e.toString());
    }
  };

  const filter = createFilterOptions();
  const [value, setValue] = useState(null);
  const societyNames = []
  societies?.map((e)=>{
    societyNames.push({title: `${e.societyName}`, societyId: `${e._id}`})
  })
  // const inputValue = watch("photo");
  console.log(societyNames)

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
      <input className="form-control" {...register("kitchenName", { required: true })} />
      {errors.kitchenName && <span className="form-error">This field is required</span>}
    </Grid>

    <Grid item xs={12} md={6} lg={12}>
      <label className="form-label">HomeChef Name</label>
      <input className="form-control" {...register("homeChefName", { required: true })} />
      {errors.homeChef && <span className="form-error">This field is required</span>}
    </Grid>

    <Grid item xs={12} md={6} lg={6}>
      <label className="form-label">Email</label>
      <input className="form-control" {...register("email")} />
      {errors.email && <span className="form-error">This field is required</span>}
    </Grid>

    <Grid item xs={12} md={6} lg={6}>
      <label className="form-label">Mobile No.</label>
      <input type="number" className="form-control" {...register("phone", { required: true })} />
      {errors.phone && <span className="form-error">This field is required</span>}
    </Grid>

    <Grid item xs={12} md={6} lg={4}>
      <label className="form-label">Flat No.</label>
      <input type="text" className="form-control" {...register("flatno", { required: true })} />
      {errors.flatno && <span className="form-error">This field is required</span>}
    </Grid>

    <Grid item xs={12} md={6} lg={4}>
      <label className="form-label">Floor</label>
      <input type="number" className="form-control" {...register("floor", { required: true })} />
      {errors.floor && <span className="form-error">This field is required</span>}
    </Grid>

    <Grid item xs={12} md={6} lg={4}>
      <label className="form-label">Tower</label>
      <input type="text" className="form-control" {...register("tower", { required: true })} />
      {errors.tower && <span className="form-error">This field is required</span>}
    </Grid>

    <Grid item xs={12} md={6} lg={12}>
      <label className="form-label">Society Name</label>
                <Autocomplete
                    freeSolo
                    id="free-solo-2-demo"
                    disableClearable
                    options={societyNames.map((option) => ({title:option.title,id:option.societyId}))}
                    getOptionLabel={(option) => option.title}
                    renderInput={(params) => (
                    <TextField 
                        // ref={params.InputProps.ref}
                        {...params}
                        // label="Search input"
                        InputProps={{
                        ...params.InputProps,
                        type: 'search',
                        }}
                        {...register("societyId", { required: true })}
                    />
                    )}
                />
      {errors.society && <span className="form-error">This field is required</span>}
    </Grid>
    <Grid item xs={12} md={6} lg={12}>
    <Controller
        name="society"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Autocomplete
            // options={[{ societyId: 1, societyName: "Society A" }, { societyId: 2, societyName: "Society B" }]}
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
              <TextField {...params} label="Society" variant="outlined" />
            )}
          />
        )}
      />
    </Grid>
    <Grid item xs={12} md={6} lg={12}>
    <Controller
        name="homeChef"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Autocomplete
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
              <TextField {...params} label="HomeChef" variant="outlined" />
            )}
          />
        )}
      />
    </Grid>


    <Grid item xs={12} md={6} lg={4}>
      <label className="form-label">Live Date</label>
      <input type="date" className="form-control" {...register("liveDate")} />
      {errors.liveDate && <span className="form-error">This field is required</span>}
    </Grid>

    <Grid item xs={12} md={6} lg={4}>
      <label className="form-label" style={{margin:1}}>Kitchen Type</label>
        <input style={{marginLeft:5,marginTop:20}} type="radio"{...register("kitchenType", { required: true })} value="veg" />
        Veg
        <input style={{marginLeft:5,marginTop:20}} type="radio" {...register("kitchenType", { required: true })} value="non-veg" />
        Non-Veg
      {errors.status && <span className="form-error">This field is required</span>}
    </Grid>

    <Grid item xs={12} md={6} lg={4}>
      <label className="form-label" style={{margin:1}}>Status</label>
        <input style={{marginLeft:5, marginTop:20}} type="radio"{...register("status", { required: true })} value="active" />
        Active
        <input style={{marginLeft:5, marginTop:20}} type="radio" {...register("status", { required: true })} value="inactive" />
        Inactive
      {errors.status && <span className="form-error">This field is required</span>}
    </Grid>

    {/* <Grid item xs={12} md={6} lg={6}>
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
    </Grid> */}

    <Grid item xs={12} md={6} lg={6}>
      <label className="form-label">Kitchen Display Image</label>
      <input type="file" className="form-control" {...register("displayPhoto")} />
      {errors.displayPhoto && <span className="form-error">This field is required</span>}
    </Grid>

    <Grid item xs={12} md={6} lg={6}>
      <label className="form-label">Kitchen Cover Image</label>
      <input type="file" className="form-control" {...register("coverPhoto")}/>
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
export default KitchenForm;