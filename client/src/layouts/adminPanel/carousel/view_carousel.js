import { useForm } from "react-hook-form";
import api from "../../../helpers/api";
import '../styles/inputFormStyle.css';
import Box from '@mui/material/Box';
import { useState } from "react";
import Grid from '@mui/material/Grid';
import {Link} from 'react-router-dom';
import { MultiSelect } from "react-multi-select-component";

function CarouselForm({carousel}) {
console.log("HomeChef ID in View: ",carousel)
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [initialValues,setInitialValues] = useState(carousel);
  const [editable,setEditable] = useState(false);
  const [selected, setSelected] = useState([]);
  const onSubmit = async (data) => {
    console.log(data);
    try{
      const formData = new FormData();
      Object.keys(data).forEach((key) => {if(key!='photo')formData.append(key, data[key])});
      formData.append('carouselPhoto', data.carouselPhoto[0]);
      const res = await api.editCarousel(carousel._id, formData);
      console.log('response', res.data.data);
      setEditable(false);
      window.alert('Edit successful');
    }catch(e){
      console.log(e);
      window.alert('something went wrong', e);
    }
  };
  const options = [
    { label: "Anamika's Kitchen", value: "Anamika's Kitchen" },
    { label: "Kavita's Kitchen", value: "Kavita's Kitchen" },
    { label: "Mummy's Kitchen", value: "Mummy's Kitchen", disabled: true },
  ];
  let startDate;
  let endDate;
  if(carousel?.endDate && carousel?.startDate){
    endDate = new Date(carousel?.endDate).toISOString().substring(0, 10);
    console.log(endDate, typeof endDate);
    startDate = new Date(carousel?.startDate).toISOString().substring(0, 10);
  }

  const handleDelete = async() =>{
    try{
      const res = await api.deleteCarousel(carousel._id);
      if(res.data.status == 'success'){
        window.alert('Deleted');
      }
    }catch(e){
      console.log(e);
      window.alert(e);
    }
  }


  return (
    <>
    <Box sx={{marginTop:2,display:"flex"}}>
    <Box sx={{marginRight:3}}>
    <form onSubmit={handleSubmit(onSubmit)}>
    <Grid container spacing={1}>
    <Grid item xs={12} md={6} lg={12}>
      <label className="form-label">First Name</label>
      <input disabled={!editable} defaultValue={carousel.carouselName} className="form-control"{...register("carouselName", { required: true })} />
      {errors.firstName && <span className="form-error">This field is required</span>}
    </Grid>

    <Grid item xs={12} md={6} lg={12}>
      <label className="form-label">Last Name</label>
      <input disabled={!editable} defaultValue={carousel.description} className="form-control" {...register("description", { required: true })} />
      {errors.lastName && <span className="form-error">This field is required</span>}
    </Grid>

    <Grid item xs={12} md={6} lg={12}>
      <label className="form-label">Start Date</label>
      <input disabled={!editable} type = 'date' defaultValue={startDate} className="form-control" 
      {...register("startDate")} />
      {errors.email && <span className="form-error">This field is required</span>}
    </Grid>

    <Grid item xs={12} md={6} lg={12}>
      <label className="form-label">End Date</label>
      <input disabled={!editable} type = 'date' defaultValue={endDate} className="form-control" 
      {...register("startDate")} />
      {errors.email && <span className="form-error">This field is required</span>}
    </Grid>

    <Grid item xs={12} md={6} lg={12}>
      <label className="form-label">Select Kitchens which will show up in the Carousel</label>
      {/* <input type="text" className="form-control" {...register("password", { required: true })} /> */}
      <MultiSelect
        defaultValue = {carousel.kitchens}
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
        <input disabled={!editable} defaultValue={carousel.status} type="radio"{...register("status", { required: true })} value="active" />
        Active
      </label>
      <label className="form-label">
        <input disabled={!editable} defaultValue={carousel.status} type="radio" {...register("status", { required: true })} value="inactive" />
        Inactive
      </label >
      {errors.status && <span className="form-error">This field is required</span>}
    </Grid>

    <Grid item xs={12} md={6} lg={12}>
      <label className="form-label">Carousel Image</label>
      <input disabled={!editable} type="file" className="form-control" {...register("carouselPhoto", { required: true })} />
      {errors.displayPhoto && <span className="form-error">This field is required</span>}
    </Grid>

    {!editable && <Grid item xs={12} md={6} lg={4}>
        <button type="edit" className="form-submit" onClick={()=>{setEditable(true)}}>Edit</button>
    </Grid>}

    {editable && <Grid item xs={12} md={6} lg={4}>
       <button type="submit" className="form-submit">Save</button>
    </Grid>}

    {editable && <Grid item xs={12} md={6} lg={4}>
       <button type="reset" className="form-submit">Cancel</button>
    </Grid>}

    {!editable && <Grid item xs={12} md={6} lg={4}>
      <Link style={{textDecoration:'none',color:'inherit'}} to='/adminpanel'><button type="reset" className="form-submit">Back</button></Link>
    </Grid>}
    
    {!editable && <Grid item xs={12} md={6} lg={4}>
      <Link style={{textDecoration:'none',color:'inherit'}} to='/adminpanel'><button className="form-submit" onClick={handleDelete}>Delete</button></Link>
    </Grid>}

    </Grid>
    </form>

    </Box>

    <Box>
    <Grid container spacing={1}>
    <Grid item xs={12} md={6} lg={4}>
     <img src={carousel.carouselPhoto} height="300px" width="300px" style={{marginTop:"30px",marginRight:"5px", borderRadius:"5px"}}></img>
    </Grid>
    </Grid>
    </Box>

    </Box>
    </>
  );
}
export default CarouselForm;