import { useForm } from "react-hook-form";
import Api from "../../../helpers/api";
import React from "react";
import '../styles/inputFormStyle.css';
import Box from '@mui/material/Box';
import { useState, useEffect } from "react";
import Grid from '@mui/material/Grid';
import {Link} from 'react-router-dom'
import { Typography } from "@mui/material";
import { object } from "prop-types";
import TextField from '@mui/material/TextField';
import { MultiSelect } from "react-multi-select-component";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { withStyles } from "@material-ui/core/styles";

function CarouselForm({carousel}) {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const [initialValues,setInitialValues] = useState(carousel);
  let [photo,setPhoto] = useState('/default/chef.gif')
  const [kitchens, setKitchens] = useState([]);
  const [kitchenNames,setKitchenNames] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const options = [
    { label: "Anamika's Kitchen", value: "Anamika's Kitchen" },
    { label: "Kavita's Kitchen", value: "Kavita's Kitchen" },
    { label: "Mummy's Kitchen", value: "Mummy's Kitchen", disabled: true },
  ];
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

  console.log('ck',carousel?.kitchens);
  

  useEffect(async()=>{
    let res = await Api.getKitchen()
    console.log(res.data.data)
    setKitchens(res.data.data);
    },[])

  console.log('selected',selectedOptions);
  console.log('first',carousel?.kitchens?.map((kitchen)=>{return kitchen.kitchenName}))

  // useEffect(async()=>{
  //   let res = await Api.getKitchens()
  //   console.log(res.data.data)
  //   setKitchens(res.data.data);
  //   },[])

  const [editable,setEditable] = useState('') 
  const [isObjectNew,setIsNewObject] = useState('');
  const [statusDefaultValue, setStatusDefaultValue] = useState(false);

  React.useEffect(async()=>{
    setEditable(carousel.length === 0 ? true : false)
    console.log("Editable set as: ",editable)
    setIsNewObject(carousel.length === 0 ? true : false)
    console.log(carousel.length,editable,isObjectNew)
  },[carousel])

  React.useEffect(async()=>{
    let res = await Api.getKitchen()
    console.log(res.data.data)
    setKitchens(res.data.data);
    },[])
  
  const onSubmit = async (data) => {
    console.log(data);
    
    try{
      const formData = new FormData();
      Object.keys(data).forEach((key) => {if(key!='carouselPhoto')formData.append(key, data[key])});
      formData.append('carouselPhoto', data.carouselPhoto[0]);
      selectedIds.forEach((id, index) => {
        formData.append(`kitchens[${index}]`, id);
      });
      // formData.append('kitchens', [selectedIds]);
      const res = await Api.createCarousel(formData);
      console.log('response', res.data.data);
      setPhoto(res.data.data.carouselPhoto)
      window.alert("Carousel Created Successfully")
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

  // const handleSelectedOptions = (selectedOptions) => {
  //   console.log("Inside Handle Selected Option Function")
  //   setKitchens(selectedOptions);
  //   field.onChange(selectedOptions.map(option => option.value));
  // };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleSelect = (event, key) => {
    console.log('handleselect');
    console.log(key.key.substring(2));
    if(!selectedIds?.includes(key.key.substring(2))){
      setSelectedIds((prev)=> [...prev, key.key.substring(2)]);
    }else{
      let ids = selectedIds?.filter((e)=>e!=key.key.substring(2));
      setSelectedIds(ids);
    }

    // const options = event.target.options;
    // console.log('selected', event.target.value);
    // const selectedValues = [];
    setSelectedOptions(event.target.value);
  };

  console.log('selectedIds',selectedIds);
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
      <input disabled={!editable} defaultValue={carousel.carouselName} className="form-control" {...register("carouselName", { required: true })} />
      {errors.carouselName && <span className="form-error">This field is required</span>}
    </Grid>

    <Grid item xs={12} md={6} lg={12}>
      <label className="form-label">Carousel Description</label>
      <input disabled={!editable} defaultValue={carousel.description} className="form-control" {...register("description", { required: true })} />
      {errors.description && <span className="form-error">This field is required</span>}
    </Grid>

    <Grid item xs={12} md={6} lg={6}>
      <label className="form-label">Start Date</label>
      <input disabled={!editable} defaultValue={getFormattedDate(carousel.startDate)} type="date" className="form-control" {...register("startDate")} />
      {errors.startDate && <span className="form-error">This field is required</span>}
    </Grid>

    <Grid item xs={12} md={6} lg={6}>
      <label className="form-label">End Date</label>
      <input disabled={!editable} defaultValue={getFormattedDate(carousel.endDate)} type="date" className="form-control" {...register("endDate", { required: true })} />
      {errors.endDate && <span className="form-error">This field is required</span>}
    </Grid>

    <Grid item xs={12} md={6} lg={12}>
      <label className="form-label">Select Kitchens which will show up in the Carousel</label>
      {/* <MultiSelect
        name="kitchens"
        options=
        { carousel ? kitchens?.map((elem) => ({
          label: elem.kitchenName,
          value: elem._id,
        })) : []}
        value={kitchens}
        getOptionLabel={(option) => option.label || carousel?.kitchen?.kitchenName || ""}
        onSelected={handleSelectedOptions}
        labelledBy="Select"
        disabled={!editable}
        renderInput={(params) => (
          <TextField {...params} variant="outlined" />
        )}
        // {...register("kitchens[0].value")}
      /> */}
      <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={isObjectNew ? selectedOptions: carousel.length!=0 ? carousel?.kitchens?.map((kitchen)=>{return kitchen.kitchenName}):[]}
          // value={selectedOptions}
          onChange={handleSelect}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {kitchens.map((kitchen) => (
            <MenuItem key={kitchen._id} value={kitchen.kitchenName}>
              <Checkbox 
              // checked={kitchenNames.indexOf(kitchen) > -1}
              checked={selectedIds.includes(kitchen._id)}
               />
              <ListItemText primary={kitchen.kitchenName} />
            </MenuItem>
          ))}
        </Select>
      {errors.kitchen && <span className="form-error">This field is required</span>}
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
      <label className="form-label">Carousel Image</label>
      <input disabled={!editable} type="file" className="form-control" {...register("carouselPhoto", { required: true })} />
      {errors.carouselPhoto && <span className="form-error">This field is required</span>}
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
    <button type="edit" className="form-submit" onClick={()=>{setEditable(true),setIsNewObject(false) 
      setSelectedOptions(carousel?.kitchens?.map((kitchen)=>{return kitchen.kitchenName}))
      setSelectedIds((carousel?.kitchens?.map((kitchen)=>{return kitchen.kitchenName})))
      }}>Edit</button>
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
export default CarouselForm;

