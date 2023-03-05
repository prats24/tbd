import { useForm } from "react-hook-form";
import api from "../../../helpers/api";
import '../styles/inputFormStyle.css';
import Box from '@mui/material/Box';
import { useState } from "react";
import Grid from '@mui/material/Grid';
import {Link} from 'react-router-dom'
import { Typography } from "@mui/material";
import { object } from "prop-types";
import { MultiSelect } from "react-multi-select-component";

function CarouselForm() {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  let [photo,setPhoto] = useState('/default/chef.gif')
  const [selected, setSelected] = useState([]);
  const options = [
    { label: "Anamika's Kitchen", value: "Anamika's Kitchen" },
    { label: "Kavita's Kitchen", value: "Kavita's Kitchen" },
    { label: "Mummy's Kitchen", value: "Mummy's Kitchen", disabled: true },
  ];
  
  const onSubmit = async (data) => {
    console.log(data);
    
    try{
      const formData = new FormData();
      Object.keys(data).forEach((key) => {if(key!='carouselPhoto')formData.append(key, data[key])});
    //   Object.keys(data).forEach((key) => {if(key!='photo')console.log(key, data[key])});
      formData.append('carouselPhoto', data.carouselPhoto[0]);
      const res = await api.createCarousel(formData);
      console.log('response', res.data.data);
      setPhoto(res.data.data.carouselPhoto)
      window.alert("Carousel Created Successfully")
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
          Create a Carousel
        </Typography>
        </Box>
      <Box sx={{marginTop:2,display:"flex"}}>
    <Box sx={{marginRight:3}}>
    <form onSubmit={handleSubmit(onSubmit)}>
    <Grid container spacing={1}>

    <Grid item xs={12} md={6} lg={12}>
      <label className="form-label">Carousel Title</label>
      <input className="form-control" {...register("carouselName", { required: true })} />
      {errors.title && <span className="form-error">This field is required</span>}
    </Grid>

    <Grid item xs={12} md={6} lg={12}>
      <label className="form-label">Carousel Description</label>
      <input className="form-control" {...register("description", { required: true })} />
      {errors.description && <span className="form-error">This field is required</span>}
    </Grid>

    <Grid item xs={12} md={6} lg={6}>
      <label className="form-label">Start Date</label>
      <input type="date" className="form-control" {...register("startDate")} />
      {errors.startDate && <span className="form-error">This field is required</span>}
    </Grid>

    <Grid item xs={12} md={6} lg={6}>
      <label className="form-label">End Date</label>
      <input type="date" className="form-control" {...register("endDate", { required: true })} />
      {errors.endDate && <span className="form-error">This field is required</span>}
    </Grid>

    <Grid item xs={12} md={6} lg={12}>
      <label className="form-label">Select Kitchens which will show up in the Carousel</label>
      {/* <input type="text" className="form-control" {...register("password", { required: true })} /> */}
      <MultiSelect
        options={options}
        value={selected}
        onChange={setSelected}
        labelledBy="Select"
      />
      {errors.password && <span className="form-error">This field is required</span>}
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
      <label className="form-label">Carousel Image</label>
      <input type="file" className="form-control" {...register("carouselPhoto", { required: true })} />
      {errors.carouselPhoto && <span className="form-error">This field is required</span>}
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
export default CarouselForm;