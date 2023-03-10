import { useForm, Controller} from "react-hook-form";
import React from "react"; 
import '../styles/inputFormStyle.css';
import Box from '@mui/material/Box';
import { useState, useEffect } from "react";
import Grid from '@mui/material/Grid';
import {Link} from 'react-router-dom'
import { Typography } from "@mui/material";
import OutlinedInput from '@mui/material/OutlinedInput';
import { object } from "prop-types";
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import Api from '../../../helpers/api'
import { withStyles } from "@material-ui/core/styles";
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';

function KitchenForm({kitchen}) {
  console.log("Kitchen Value: ",kitchen)
  const [initialValues,setInitialValues] = useState(kitchen);
  const { register, handleSubmit,formState: { errors }, watch, control } = useForm(kitchen.length === 0 ? "" : initialValues);
  let [photo,setPhoto] = useState('/default/chef.gif')
  let [cphoto,setCPhoto] = useState('/default/kitchencoverphoto.jpg')
  const [editable,setEditable] = useState('') 
  const [isObjectNew,setIsNewObject] = useState('');
  const [societies,setSocieties] = useState([]);
  const [cuisines, setCuisines] = useState([]);
  const [homeChefs,setHomeChefs] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [homeChef,setHomeChef] = useState([]);
  const [society,setSociety] = useState([]);
  const [societyName, setSocietyName] = useState([]);
  const [deliveryChargeType, setDeliveryChargeType] = useState([]);
  const [statusDefaultValue, setStatusDefaultValue] = useState(false);
  const [statusKitchenType, setStatusKitchenType] = useState(); 
  const [gstApplicable, setGSTApplicable] = useState();
  const [selectedIds, setSelectedIds] = useState([]);


    useEffect(() => {
      if (kitchen.length !== 0 && kitchen.status === "active") {
        setStatusDefaultValue(true);
      } else {
        setStatusDefaultValue(false);
      }
      if (kitchen.length !== 0 && kitchen.kitchenType === "veg") {
        setStatusKitchenType(true);
      } else {
        setStatusKitchenType(false);
      }
      if (kitchen.length !== 0 && kitchen.gstApplicable === "Yes") {
        setGSTApplicable(true);
      } else {
        setGSTApplicable(false);
      }
      if (kitchen.length !== 0) {
        setPhoto(kitchen.displayPhoto);
      }
      if (kitchen.length !== 0) {
        setCPhoto(kitchen.coverPhoto);
      }
    }, [kitchen]);


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

  useEffect(async()=>{
    setEditable(kitchen.length === 0 ? true : false)
    console.log("Editable set as: ",editable)
    setIsNewObject(kitchen.length === 0 ? true : false)
    console.log(kitchen.length,editable,isObjectNew)
  },[kitchen])
  
  useEffect(async()=>{
    let res = await Api.getSocieties()
    console.log(res.data.data)
    setSocieties(res.data.data);
    },[])

  useEffect(async()=>{
      let res = await Api.getCuisines()
      console.log(res.data.data)
      setCuisines(res.data.data);
      },[])
  
  useEffect(async()=>{
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
      if(data.foodLicensePhoto[0])formData.append('foodLicensePhoto', data?.foodLicensePhoto[0]);
      selectedIds.forEach((id, index) => {
        formData.append(`cuisines[${index}]`, id);
      });
      const res = await Api.createKitchen(formData);
      console.log('response', res.data.data);
      if(res.data.status === 'success'){
        window.alert('kitchen created successfully');
        setEditable(false);
        setIsNewObject(false);
        setPhoto(res.data.data.displayPhoto)
      }
      else{
        window.alert(res.data);
      }
    }catch(e){
      console.log(e);
      window.alert(e.toString());
    }
  };

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

  const handleSelect = (event, key) => {
    console.log('handleselect');
    console.log(key.key.substring(2));
    if(!selectedIds?.includes(key.key.substring(2))){
      setSelectedIds((prev)=> [...prev, key.key.substring(2)]);
    }else{
      let ids = selectedIds?.filter((e)=>e!=key.key.substring(2));
      setSelectedIds(ids);
    }
    setSelectedOptions(event.target.value);
  };

  console.log(kitchen?.status,(kitchen?.status === 'active'),(kitchen?.status === 'inactive'))
  console.log(kitchen?.kitchenType)
  console.log('selected',selectedOptions);
  console.log('first',kitchen?.cuisine?.map((cuisine)=>{return cuisine.cuisineName}))
  let chefName = kitchen.length != 0 ? (kitchen?.homeChef?.firstName + " " + kitchen?.homeChef?.lastName) : undefined
  console.log(chefName)
  
  console.log(statusDefaultValue,kitchen?.status,kitchen.length != 0,kitchen?.status === "active")

  return (
    <>
    {isObjectNew && <Box sx={{marginTop:2}}>
        <Typography sx={{backgroundColor:"#e8e8e8",color:"black",fontWeight:400,padding:1, borderRadius:1}}>
          Create a Kitchen
        </Typography>
    </Box>}

    {!isObjectNew && <Box sx={{marginTop:2}}>
        <Typography sx={{backgroundColor:"#e8e8e8",color:"black",fontWeight:400,padding:1, borderRadius:1}}>
          Kitchen Details
        </Typography>
    </Box>}

    <Box>
    <img src={cphoto} height="300px" width="100%" style={{marginTop:"10px",marginRight:"5px", borderRadius:"5px", border:"1px #ced4da solid"}}></img>
    </Box>
      <Box sx={{marginTop:2,display:"flex"}}>
    <Box sx={{marginRight:3}}>
    <form onSubmit={handleSubmit(onSubmit)}>
    <Grid container spacing={1}>

    <Grid item xs={12} md={6} lg={6}>
      <label className="form-label">Kitchen Name</label>
      <input disabled={!editable} defaultValue={kitchen.kitchenName} className="form-control" {...register("kitchenName", { required: true })} />
      {/* {errors.kitchenName && <span className="form-error">This field is required</span>} */}
    </Grid>

    <Grid item xs={12} md={6} lg={6}>
    <label disabled={!editable} className="form-label">Society Name</label>
    <Controller
        name="society"
        control={control}
        render={({ field }) => (
          <NoPaddingAutocomplete
            disabled={!editable}
            options=
            { kitchen ? societies?.map((elem) => ({
              societyName: elem.societyName,
              societyId: elem._id,
            })) : []}
            value={society}
            getOptionLabel={(option) => option.societyName || kitchen?.society?.societyName || ""}
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

    <Grid item xs={12} md={6} lg={4}>
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
            getOptionLabel={(option) => option.homeChefName || chefName || ""}
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
      <input 
      disabled={!editable} 
      defaultValue={kitchen.email} 
      className="form-control" {...register("email")} />
      {errors.email && <span className="form-error">This field is required</span>}
    </Grid>

    <Grid item xs={12} md={6} lg={4}>
      <label className="form-label">Mobile No.</label>
      <input 
      disabled={!editable} 
      defaultValue={kitchen.phone} 
      type="number" className="form-control" {...register("phone", { required: true })} />
      {errors.phone && <span className="form-error">This field is required</span>}
    </Grid>

    <Grid item xs={12} md={6} lg={1}>
      <label className="form-label">Flat No.</label>
      <input disabled={!editable} 
      defaultValue={kitchen.flatNo} 
      type="text" className="form-control" {...register("flatNo", { required: true })} />
      {errors.flatNo && <span className="form-error">This field is required</span>}
    </Grid>

    <Grid item xs={12} md={6} lg={1}>
      <label className="form-label">Floor</label>
      <input disabled={!editable} 
      defaultValue={kitchen.floor} 
      type="number" className="form-control" {...register("floor", { required: true })} />
      {errors.floor && <span className="form-error">This field is required</span>}
    </Grid>

    <Grid item xs={12} md={6} lg={1}>
      <label className="form-label">Tower</label>
      <input disabled={!editable} 
      defaultValue={kitchen.tower} 
      type="text" className="form-control" {...register("tower", { required: true })} />
      {errors.tower && <span className="form-error">This field is required</span>}
    </Grid>

    <Grid item xs={12} md={6} lg={2}>
      <label className="form-label">Live Date</label>
      <input disabled={!editable} 
      defaultValue={getFormattedDate(kitchen.liveDate)}
      type="date" className="form-control" {...register("liveDate")} />
      {errors.liveDate && <span className="form-error">This field is required</span>}
    </Grid>

    <Grid item xs={12} md={6} lg={2}>
      <label className="form-label">Cost for One(in ₹)</label>
      <input disabled={!editable} 
      defaultValue={kitchen.costForOne} 
      type="number" className="form-control" {...register("costForOne", { required: true })} />
      {errors.costForOne && <span className="form-error">This field is required</span>}
    </Grid>

    <Grid item xs={12} md={6} lg={3}>
    <label className="form-label">Del. Chg. Type</label>
     <Controller
        name="deliveryChargeType"
        control={control}
        render={({ field }) => (
          <NoPaddingAutocomplete
            value={deliveryChargeType ? deliveryChargeType : ""}
            disabled={!editable}
            options={deliveryChargeTypes ? deliveryChargeTypes?.map((elem) => ({
              label: elem,
            })) : ""}
            getOptionLabel={(option) => option.label || kitchen?.deliveryChargeType || ""}
            getOptionSelected={(option, value) => option.label === value.value}
            
            onChange={(event, newValue) => {
              setDeliveryChargeType(newValue);
              field.onChange(newValue ? newValue.label : "");
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
      <input 
      disabled={!editable} 
      defaultValue={kitchen.deliveryCharges} 
      type="number" className="form-control" {...register("deliveryCharges", { required: true })} />
      {errors.deliveryCharges && <span className="form-error">This field is required</span>}
    </Grid>

    <Grid item xs={12} md={6} lg={12}>
      <label className="form-label">Description</label>
      <input disabled={!editable} 
      defaultValue={kitchen.description} 
      className="form-control" {...register("description", { required: true })} />
      {errors.description && <span className="form-error">This field is required</span>}
    </Grid>

    <Grid item xs={12} md={6} lg={6} sx={{minWidth:600}}>
      <label className="form-label">Select Kitchen Cuisines</label>
      <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={isObjectNew ? selectedOptions: kitchen.length!=0 ? kitchen?.cuisines?.map((cuisine)=>{ return cuisine.cuisineName}):[]}
          onChange={handleSelect}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
          disabled={!editable}
          style={{ minWidth: '400px', maxWidth:"100%" }}
        >
          {cuisines.map((cuisine) => (
            <MenuItem key={cuisine._id} value={cuisine.cuisineName}>
              <Checkbox 
              checked={selectedIds.includes(cuisine._id)}
               />
              <ListItemText primary={cuisine.cuisineName} />
            </MenuItem>
          ))}
        </Select>
      {errors.cuisines && <span className="form-error">This field is required</span>}
    </Grid>

    <Grid item xs={12} md={6} lg={2}>
      <label className="form-label" style={{margin:1}}>Kitchen Type</label>
        <input disabled={!editable}
        checked={statusKitchenType} 
        onClick={()=>{setStatusKitchenType(!statusKitchenType)}} 
        type="radio"{...register("kitchenType", { required: true })} value="veg" />
        Veg
        <input 
        onClick={()=>{setStatusKitchenType(!statusKitchenType)}}
        checked={!statusKitchenType} disabled={!editable} style={{marginLeft:5,marginTop:20}} type="radio" {...register("kitchenType", { required: true })} value="non-veg" />
        Non-Veg
      {errors.status && <span className="form-error">This field is required</span>}
    </Grid>

    <Grid item xs={12} md={6} lg={2}>
      <label className="form-label" style={{margin:1}}>Status</label>
        <input 
        onClick={()=>{setStatusDefaultValue(!statusDefaultValue)}}
        // onSelect={setStatusDefaultValue(!statusDefaultValue)}
        checked={statusDefaultValue} 
        disabled={!editable} 
        style={{marginLeft:5, marginTop:20}} type="radio"{...register("status", { required: true })} value="active" />
        Active
        <input onClick={()=>{setStatusDefaultValue(!statusDefaultValue)}} checked={!statusDefaultValue} disabled={!editable} style={{marginLeft:5, marginTop:20}} type="radio" {...register("status", { required: true })} value="inactive" />
        Inactive
      {errors.status && <span className="form-error">This field is required</span>}
    </Grid>
    
    <Grid item xs={12} md={6} lg={2}>
      <label className="form-label" style={{margin:1}}>GST Applicable</label>
        <input 
        onClick={()=>{setGSTApplicable(!gstApplicable)}}
        // onSelect={setStatusDefaultValue(!statusDefaultValue)}
        checked={gstApplicable} 
        disabled={!editable} 
        style={{marginLeft:5, marginTop:20}} type="radio"{...register("gstApplicable", { required: true })} value="true" />
        Yes
        <input onClick={()=>{setGSTApplicable(!gstApplicable)}} checked={!gstApplicable} disabled={!editable} style={{marginLeft:5, marginTop:20}} type="radio" {...register("gstApplicable", { required: true })} value="false" />
        No
      {errors.gstApplicable && <span className="form-error">This field is required</span>}
    </Grid>

    <Grid item xs={12} md={6} lg={7}>
    </Grid>

    <Grid item xs={12} md={6} lg={6}>
      <label className="form-label">Kitchen Display Image</label>
      <input 
      disabled={!editable} 
      // defaultValue={kitchen.kitchenDisplayImage} 
      type="file" className="form-control" {...register("displayPhoto")} />
      {errors.displayPhoto && <span className="form-error">This field is required</span>}
    </Grid>

    <Grid item xs={12} md={6} lg={6}>
      <label className="form-label">Kitchen Cover Image</label>
      <input 
      disabled={!editable} 
      type="file" 
      className="form-control" {...register("coverPhoto")}
      />
      {errors.coverPhoto && <span className="form-error">This field is required</span>}
    </Grid>

    <Grid item xs={12} md={6} lg={6}>
      <label className="form-label">Food License Image</label>
      <input 
      disabled={!editable} 
      type="file" 
      className="form-control" {...register("foodLicensePhoto")} />
      {/* {errors.foodLicensePhoto && <span className="form-error">This field is required</span>} */}
    </Grid>

    <Grid item xs={12} md={6} lg={6}>
      <label className="form-label">Food License Number</label>
      <input disabled={!editable} 
      defaultValue={kitchen.foodLicenseNumber} 
      className="form-control" {...register("foodLicenseNumber", { required: false })} />
      {/* {errors.foodLicenseNumber && <span className="form-error">This field is required</span>} */}
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
      setSelectedOptions(kitchen?.cuisines?.map((cuisine)=>{return cuisine.cuisineName}))
      setSelectedIds((kitchen?.cuisines?.map((cuisine)=>{return cuisine.cuisineName})))
      }}
    >Edit</button>
    </Grid>
    }

    {!editable &&
    <Grid item xs={12} md={6} lg={2}>
    <button type="button" className="form-submit" component={Link} to={'/kitchen'}>Back</button>
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