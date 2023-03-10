import { useForm,Controller } from "react-hook-form";
import api from "../../../helpers/api";
import '../styles/inputFormStyle.css';
import Box from '@mui/material/Box';
import { useState, useEffect } from "react";
import Grid from '@mui/material/Grid';
import {Link} from 'react-router-dom'
import { Typography } from "@mui/material";
import { object } from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

function HomeChefForm({homeChef}) {
  const [initialValues,setInitialValues] = useState(homeChef);
  const { register, handleSubmit, formState: { errors }, watch, control } = useForm(homeChef.length === 0 ? "" : initialValues);
  let [photo,setPhoto] = useState('/default/chef.gif')
  const [editable,setEditable] = useState('') 
  const [societies,setSocieties] = useState([]);
  const [isObjectNew,setIsNewObject] = useState('');
  const [statusDefaultValue, setStatusDefaultValue] = useState(false);
  const [genderValue, setGenderValue] = useState();
  const [society,setSociety] = useState([]);

  useEffect(async()=>{
    setEditable(homeChef.length === 0 ? true : false)
    // console.log("Editable set as: ",editable)
    setIsNewObject(homeChef.length === 0 ? true : false)
    // console.log(homeChef.length,editable,isObjectNew)
    setPhoto(homeChef.length === 0 ? photo : homeChef.displayPhoto)
    if (homeChef.length !== 0 && homeChef.gender === "male") {
      setGenderValue(true);
    } else {
      setGenderValue(false);
    }
  },[homeChef])

  useEffect(async()=>{
    let res = await api.getSocieties()
    console.log(res.data.data)
    setSocieties(res.data.data);
    },[])

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

  const onSubmit = async (data) => {
    console.log(data);
    
    try{
      const formData = new FormData();
      Object.keys(data).forEach((key) => {if(key!='displayPhoto')formData.append(key, data[key])});
    //   Object.keys(data).forEach((key) => {if(key!='photo')console.log(key, data[key])});
      console.log(data.displayPhoto[0])
      formData.append('displayPhoto', data.displayPhoto[0]);
      const res = await api.createHomeChef(formData);
      console.log('response', res.data.data);
      setPhoto(res.data.data.displayPhoto)
      setEditable(false);
      setIsNewObject(false);
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
        {isObjectNew && <Typography sx={{backgroundColor:"#e8e8e8",color:"black",fontWeight:400,padding:1, marginBottom:2, borderRadius:1}}>
          Onboard a HomeChef
        </Typography>}
        {!isObjectNew && <Typography sx={{backgroundColor:"#e8e8e8",color:"black",fontWeight:400,padding:1, marginBottom:2, borderRadius:1}}>
          HomeChef Details
        </Typography>}
        </Box>
      <Box sx={{marginTop:2,display:"flex"}}>
    <Box sx={{marginRight:3}}>
    <form onSubmit={handleSubmit(onSubmit)}>
    <Grid container spacing={1}>

    <Grid item xs={12} md={6} lg={12}>
      <label className="form-label">First Name*</label>
      <input disabled={!editable} defaultValue={homeChef.firstName} className="form-control" {...register("firstName", { required: true })} />
      {errors.firstName && <span className="form-error">This field is required</span>}
    </Grid>

    <Grid item xs={12} md={6} lg={12}>
      <label className="form-label">Last Name*</label>
      <input disabled={!editable} defaultValue={homeChef.lastName} className="form-control" {...register("lastName", { required: true })} />
      {errors.lastName && <span className="form-error">This field is required</span>}
    </Grid>

    <Grid item xs={12} md={6} lg={4}>
      <label className="form-label">Email*</label>
      <input disabled={!editable} defaultValue={homeChef.email} className="form-control" {...register("email")} />
      {errors.email && <span className="form-error">This field is required</span>}
    </Grid>

    <Grid item xs={12} md={6} lg={4}>
      <label className="form-label">Mobile No.*</label>
      <input disabled={!editable} defaultValue={homeChef.phone} type="number" className="form-control" {...register("phone", { required: true })} />
      {errors.phone && <span className="form-error">This field is required</span>}
    </Grid>

    <Grid item xs={12} md={6} lg={4}>
      <label className="form-label">Date Of Birth*</label>
      <input disabled={!editable} defaultValue={getFormattedDate(homeChef.dateOfBirth)} type="date" className="form-control" {...register("dateOfBirth", { required: true })} />
      {errors.dateOfBirth && <span className="form-error">This field is required</span>}
    </Grid>

    <Grid item xs={12} md={6} lg={4}>
      <label className="form-label">Password*</label>
      <input disabled={!editable} defaultValue={homeChef.password} type="text" className="form-control" {...register("password", { required: true })} />
      {errors.password && <span className="form-error">This field is required</span>}
    </Grid>

    <Grid item xs={12} md={6} lg={4}>
      <label className="form-label">City*</label>
      <input disabled={!editable} defaultValue={homeChef.city} type="text" className="form-control" {...register("city", { required: true })} />
      {errors.city && <span className="form-error">This field is required</span>}
    </Grid>

    <Grid item xs={12} md={6} lg={4}>
    <label disabled={!editable} className="form-label">Society Name*</label>
    <Controller
        name="society"
        control={control}
        render={({ field }) => (
          <NoPaddingAutocomplete
            disabled={!editable}
            options=
            { homeChef ? societies?.map((elem) => ({
              societyName: elem.societyName,
              societyId: elem._id,
            })) : []}
            value={society}
            getOptionLabel={(option) => option.societyName || homeChef?.society?.societyName || ""}
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
      <label className="form-label">Gender*</label>
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
      {errors.gender && <span className="form-error">This field is required</span>}
    </Grid>

    <Grid item xs={12} md={6} lg={6}>
      <label className="form-label">Status*</label>
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
        defaultChecked
        type="radio" {...register("status", { required: true })} value="inactive" />
        Inactive
      </label >
      {errors.status && <span className="form-error">This field is required</span>}
    </Grid>

    <Grid item xs={12} md={6} lg={12}>
      <label className="form-label">HomeChef Image* (250px * 250px)</label>
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