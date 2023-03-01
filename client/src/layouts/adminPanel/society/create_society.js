import React from 'react';
import ReactDOM from 'react-dom';
import { Form, Field } from 'react-final-form';
import { TextField } from 'final-form-material-ui';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import Box from "@mui/material/Box";
import { Button, CardActionArea, CardActions } from '@mui/material';
import { fontWeight } from '@mui/system';
import { Link } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const onSubmit = async (values) => {
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  await sleep(300);
  console.log(values.societyName);
  window.alert(JSON.stringify(values, 0, 2));
};

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

const validate = (values) => {
  const errors = {};
  if (!values.societyName) {
    errors.societyName = 'Required';
  }
  if (!values.societyId) {
    errors.societyId = 'Required';
  }
  if (!values.societyType) {
    errors.societyType = 'Required';
  }
  if (!values.societyAddress) {
    errors.societyAddress = 'Required';
  }
  if (!values.societyPincode) {
    errors.societyPincode = 'Required';
  }
  if (!values.societyNoOfTower) {
    errors.societyNoOfTower = '';
  }
  if (!values.societyGeoLocation) {
    errors.societyGeoLocation = 'Required';
  }
  if (!values.societyImage) {
    errors.societyImage = 'Required';
  }
  return errors;
};

function Create_Society() {

  const [societyType, setSocietyType] = React.useState('');
  const handleChange = (event) => {
  setSocietyType(event.target.value)
}

  return (
    <>
    {/* <div style={{ padding: 16, margin: 'auto', maxWidth: 600 }}> */}
    <Box sx={{marginTop:10,marginLeft:2,marginRight:1,marginBottom:2,fontSize:20}}>
    <Typography sx={{marginTop:2,marginBotton:2, color:"white",fontWeight:600, backgroundColor:"grey", padding:1, borderTopLeftRadius:5,borderTopRightRadius:5}}>Create Society</Typography>
    <Typography>
      <Form
        onSubmit={onSubmit}
        initialValues={{ employed: true, stooge: 'Prateek' }}
        validate={validate}
        render={({ handleSubmit, submitting, values }) => (
          <form onSubmit={handleSubmit} noValidate>
            <Paper style={{ padding: 16 }}>
              <Grid container alignItems="flex-start" spacing={2}>
                <Grid item xs={4}>
                  <Field
                    fullWidth
                    required
                    name="societyName"
                    component={TextField}
                    type="text"
                    label="Society Name"
                  />
                </Grid>
                <Grid item xs={2}>
                  <Field
                    fullWidth
                    required
                    name="societyId"
                    component={TextField}
                    type="text"
                    label="Society ID"
                  />
                </Grid>
                <Grid item xs={2}>
                <FormControl variant="standard" sx={{ m: 0, minWidth: 210 }}>
                  <InputLabel id="demo-simple-select-standard-label">Society Type</InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    required
                    name="societyType"
                    component={TextField}
                    value={societyType}
                    onChange={handleChange}
                    label="Society Type"
                    
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>High</MenuItem>
                    <MenuItem value={20}>Medium</MenuItem>
                    <MenuItem value={30}>Low</MenuItem>
                  </Select>
                </FormControl>
                </Grid>
                <Grid item xs={2}>
                  <Field
                    fullWidth
                    required
                    name="societyGeoLocation"
                    component={TextField}
                    type="Point"
                    label="Society GeoLocation"
                  />
                </Grid>
                <Grid item xs={8}>
                  <Field
                    name="societyAddress"
                    fullWidth
                    required
                    component={TextField}
                    multiline
                    label="Society Address"
                  />
                </Grid>

                <Grid item xs={2}>
                  <Field
                    fullWidth
                    name="societyPincode"
                    component={TextField}
                    type="text"
                    label="Society Pincode"
                  />
                </Grid>
                <Grid item xs={2}>
                  <Field
                    fullWidth
                    name="societyNoOfTowers"
                    component={TextField}
                    type="number"
                    label="# of Towers"
                  />
                </Grid>
                <Grid item xs={4}>
                  <Button item style={{ marginTop: 16 }}
                    variant="contained"
                    component="label"
                    >
                    Upload Society Image
                    <input
                      type="file"
                      hidden
                    />
                  </Button>
                </Grid>
                <Grid item xs={4}>
                  
                </Grid>
                <Grid item xs={4} style={{ marginTop: 16, textAlign:"right" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={submitting}
                  >
                    Create
                  </Button>
                </Grid>
              </Grid>
            </Paper>
            <pre>{JSON.stringify(values, 0, 2)}</pre>
          </form>
        )}
      />
      </Typography>
      </Box>
    </>
  );
}

export default Create_Society;
