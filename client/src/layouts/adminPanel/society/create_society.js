import { useForm } from "react-hook-form";
import api from "../../../helpers/api";
import '../styles/inputFormStyle.css';
import Box from '@mui/material/Box';
import { useState } from "react";
import Grid from '@mui/material/Grid';
import {Link} from 'react-router-dom'
import { Typography } from "@mui/material";

function SocietyForm() {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  let [photo,setPhoto] = useState('/default/building.gif')
  const onSubmit = async (data) => {
    console.log(data);
    try{
      const formData = new FormData();
      Object.keys(data).forEach((key) => {if(key!='photo')formData.append(key, data[key])});
      formData.append('photo', data.photo[0]);
      const res = await api.createSociety(formData);
      console.log('response', res.data.data);
      setPhoto(res.data.data.societyPhoto)
      window.alert("Society Created Successfully")
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
          Create a Society
        </Typography>
        </Box>
      <Box sx={{marginTop:2,display:"flex"}}>
    <Box sx={{marginRight:3}}>
    <form onSubmit={handleSubmit(onSubmit)}>
    <Grid container spacing={1}>
    <Grid item xs={12} md={6} lg={12}>
      <label className="form-label">Society Name</label>
      <input className="form-control"{...register("societyName", { required: true })} />
      {errors.societyName && <span className="form-error">This field is required</span>}
    </Grid>

    <Grid item xs={12} md={6} lg={12}>
      <label className="form-label">Society Address</label>
      <input className="form-control" {...register("societyAddress", { required: true })} />
      {errors.societyAddress && <span className="form-error">This field is required</span>}
    </Grid>

    <Grid item xs={12} md={6} lg={12}>
      <label className="form-label">Society Pin Code</label>
      <input className="form-control" {...register("societyPinCode", { required: true })} />
      {errors.societyPinCode && <span className="form-error">This field is required</span>}
    </Grid>

    <Grid item xs={12} md={6} lg={12}>
      <label className="form-label">Society Geolocation</label>
      <input className="form-control" {...register("societyGeoLocation")} />
    </Grid>

    <Grid item xs={12} md={6} lg={12}>
      <label className="form-label">Society Towers</label>
      <input type="number" className="form-control" {...register("societyTowers", { required: true })} />
      {errors.societyTowers && <span className="form-error">This field is required</span>}
    </Grid>

    <Grid item xs={12} md={6} lg={12}>
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
      <label className="form-label">Society Image</label>
      <input type="file" className="form-control" {...register("photo", { required: true })} />
      {errors.photo && <span className="form-error">This field is required</span>}
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
export default SocietyForm;


// import React from 'react';
// import ReactDOM from 'react-dom';
// import { Form, Field } from 'react-final-form';
// import { TextField } from 'final-form-material-ui';
// import { styled } from '@mui/material/styles';
// import Grid from '@mui/material/Grid';
// import Paper from '@mui/material/Paper';
// import Typography from '@mui/material/Typography';
// import ButtonBase from '@mui/material/ButtonBase';
// import Box from "@mui/material/Box";
// import { Button, CardActionArea, CardActions } from '@mui/material';
// import { fontWeight } from '@mui/system';
// import { Link } from 'react-router-dom';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import Radio from '@mui/material/Radio';
// import RadioGroup from '@mui/material/RadioGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import FormControl from '@mui/material/FormControl';
// import FormLabel from '@mui/material/FormLabel';

// const onSubmit = async (values) => {
//   const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
//   await sleep(300);
//   console.log(values.societyName);
//   window.alert(JSON.stringify(values, 0, 2));
// };

// const Img = styled('img')({
//   margin: 'auto',
//   display: 'block',
//   maxWidth: '100%',
//   maxHeight: '100%',
// });

// const validate = (values) => {
//   const errors = {};
//   if (!values.societyName) {
//     errors.societyName = 'Required';
//   }
//   if (!values.societyId) {
//     errors.societyId = 'Required';
//   }
//   if (!values.societyType) {
//     errors.societyType = 'Required';
//   }
//   if (!values.societyAddress) {
//     errors.societyAddress = 'Required';
//   }
//   if (!values.societyPincode) {
//     errors.societyPincode = 'Required';
//   }
//   if (!values.societyNoOfTower) {
//     errors.societyNoOfTower = 'Required';
//   }
//   if (!values.societyGeoLocation) {
//     errors.societyGeoLocation = 'Required';
//   }
//   if (!values.societyImage) {
//     errors.societyImage = 'Required';
//   }
//   if (!values.status) {
//     errors.status = 'Required';
//   }
//   return errors;
// };

// function Create_Society() {

//   const [societyType, setSocietyType] = React.useState('');
//   const handleChange = (event) => {
//   setSocietyType(event.target.value)
// }

//   return (
//     <>
//     {/* <div style={{ padding: 16, margin: 'auto', maxWidth: 600 }}> */}
//     <Box>
//     <Typography sx={{marginTop:2,marginBotton:2, color:"white",fontWeight:600, backgroundColor:"grey", padding:1, borderTopLeftRadius:5,borderTopRightRadius:5}}>Create Society</Typography>
//     <Typography>
//       <Form
//         onSubmit={onSubmit}
//         initialValues={{ employed: true, stooge: 'Prateek' }}
//         validate={validate}
//         render={({ handleSubmit, submitting, values }) => (
//           <form onSubmit={handleSubmit} noValidate>
//             <Paper style={{ padding: 16 }}>
//               <Grid container alignItems="flex-start" spacing={2}>
//                 <Grid item xs={12} lg={12}>
//                   <Field
//                     fullWidth
//                     required
//                     name="societyName"
//                     component={TextField}
//                     type="text"
//                     label="Society Name"
//                   />
//                 </Grid>
//                 <Grid item xs={12} lg={12}>
//                   <Field
//                     name="societyAddress"
//                     fullWidth
//                     required
//                     component={TextField}
//                     multiline
//                     label="Society Address"
//                   />
//                 </Grid>

                
//                 <Grid item xs={12} lg={4}>
//                   <Field
//                     fullWidth
//                     required
//                     name="societyGeoLocation"
//                     component={TextField}
//                     type="point"
//                     label="Society GeoLocation"
//                   />
//                 </Grid>

//                 <Grid item xs={12} lg={4} >
//                   <Field
//                     fullWidth
//                     required
//                     name="societyPincode"
//                     component={TextField}
//                     type="text"
//                     label="Society Pincode"
//                   />
//                 </Grid>
//                 <Grid item xs={12} lg={4}>
//                   <Field
//                     fullWidth
//                     name="societyNoOfTowers"
//                     component={TextField}
//                     type="number"
//                     label="# of Towers"
//                   />
//                 </Grid>
//                 {/* <Grid item xs={4}>
//                 <FormControl variant="standard" sx={{ m: 0, minWidth: 210 }}>
//                   <InputLabel id="demo-simple-select-standard-label">Society Type</InputLabel>
//                   <Select
//                     labelId="demo-simple-select-standard-label"
//                     id="demo-simple-select-standard"
//                     required
//                     // fullWidth
//                     name="societyType"
//                     component={TextField}
//                     value={societyType}
//                     onChange={handleChange}
//                     label="Society Type"
                    
//                   >
//                     <MenuItem value="">
//                       <em>None</em>
//                     </MenuItem>
//                     <MenuItem value={10}>High</MenuItem>
//                     <MenuItem value={20}>Medium</MenuItem>
//                     <MenuItem value={30}>Low</MenuItem>
//                   </Select>
//                 </FormControl>
//                 </Grid> */}
                
//                 {/* <Grid item xs={12} lg={0}>
//                   <TextField></TextField>
//                 </Grid> */}
//                 <Grid item xs={12} lg={4} marginTop="5px" >
//                   <Typography display="flex" alignItems="center">
//                 <FormLabel id="demo-row-radio-buttons-group-label">Status</FormLabel>
//                   <RadioGroup
//                     row
//                     aria-labelledby="demo-row-radio-buttons-group-label"
//                     name="row-radio-buttons-group"
//                   >
//                     <FormControlLabel value="Active" control={<Radio />} label="Active" />
//                     <FormControlLabel value="Inactive" control={<Radio />} label="Inactive" />
//                   </RadioGroup>
//                   </Typography>
//                 </Grid>
//                 <Grid item xs={12} lg={4} display="flex" alignContent="center" marginTop="17px">
//                   {/* <Button item 
//                     variant="outlined"
//                     component="label"
//                     > */}
//                     <Typography sx={{fontWeight:400, color:"grey"}} xs={12} lg={4.5}>
//                     Society Image*
//                     </Typography>
//                     <Typography xs={12} lg={4}>
//                     <input
//                       type="file"
//                       visible
//                       required
//                     />
//                     </Typography>
//                   {/* </Button> */}
//                 </Grid>
//                 {/* <Grid item xs={12} lg={2.75}>
                  
//                 </Grid> */}
//                 <Grid item xs={12} lg={4} display="flex" alignContent="flex-end" justifyContent="space-around" marginTop="15px">
//                   <Button
//                     variant="contained"
//                     color="primary"
//                     type="submit"
//                     width="45%"
//                     disabled={submitting}
//                   >
//                     Create
//                   </Button>
//                   <Button
//                     variant="contained"
//                     color="error"
//                     type="reset"
//                     width="45%"
//                     disabled={submitting}
//                   >
//                     Cancel
//                   </Button>
//                 </Grid>
//               </Grid>
//             </Paper>
//             {/* <pre>{JSON.stringify(values, 0, 2)}</pre> */}
//           </form>
//         )}
//       />
//       </Typography>
//       </Box>
//     </>
//   );
// }

// export default Create_Society;