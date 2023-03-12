import React from 'react';
import { Typography, makeStyles } from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import DPA from '../partials/allfoods/DPA';
import Grid from '@mui/material/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '42vh',
    background: '#F4F6F8',
    padding: '40px 50px',
    display: 'flex',
    borderBottom: '1px solid #ebebeb',
    '@media (max-width: 910px)': {
      '& $resturant_name': {
        fontSize: '1.5rem',
      },
      '& $opening_time': {
        fontSize: '.8rem',
      },
      '& $location_container': {
        '& $location_icon': {
          fontSize: '1rem',
        },
        '& $resturant_location': {
          fontSize: '0.9rem',
        },
      },
    },
    '@media (max-width: 850px)': {
      padding: '20px',
      '& $root_img': {
        maxHeight: '110px',
        maxWidth: '210px',
        marginRight: '20px',
      },
      '& $dpa_section': {
        gap: '10px',
        marginTop: '20px',
      },
    },
    '@media (max-width: 574px)': {
      padding: '17px',
      flexDirection: 'column',
      height: '48vh',
      alignItems: 'center',
      '& $root_img': {
        marginBottom: '7px',
      },
      '& $resturant_name': {
        fontSize: '1.3rem',
      },
      '& $location_container': {
        alignItems: 'flex-start',
        marginTop: '3px',
        '& $location_icon': {
          fontSize: '1.3rem',
          marginRight: '2px',
        },
        '& $resturant_location': {
          fontSize: '0.9rem',
        },
      },
    },
  },
  root_img: {
    maxHeight: '190px',
    maxWidth: '320px',
    marginRight: '30px',
  },
  resturant_name: {
    fontFamily: 'Mulish',
    fontSize: '1.6rem !important',
    color: '#333333',
    fontWeight: '500',
    transition: 'all 1s ease',
  },
  resturant_description: {
    color: '#666666',
    fontSize: '0.8rem',
    visibility: 'hidden',
    //fontFamily: 'Montserrat',
  },
  location_container: {
    display: 'flex',
    alignItems: 'center',
    fontFamily: 'Mulish',
  },
  resturant_location: {
    color: '#666666',
    lineHeight: '15px',
    fontSize: '.9rem',
  },
  location_icon: {
    color: '#666666',
    fontSize: '1.2rem',
    marginLeft: '-5px',
    marginRight: '3px',
  },
  opening_time: {
    color: '#666666',
    fontSize: '0.8rem',
    marginTop: '30px',
  },
  dpa_section: {
    display: 'flex',
    marginTop: '40px',
  },
}));

export default function KitchenDetail({kitchen}) {
  console.log("Kitchen ID: ",kitchen)
  const {
    root,
    root_img,
    resturant_name,
    resturant_description,
    resturant_location,
    opening_time,
    location_container,
    location_icon,
    dpa_section,
  } = useStyles();
  return (
    <>
    <div className={root}>
      <img className={root_img} src={kitchen?.displayPhoto}></img>
      <div>
        <Typography className={resturant_name} variant="h2" component="h1">
          {kitchen?.kitchenName}
        </Typography>
        <Typography className={resturant_description} component="p">
          nigerian &nbsp; ghanian &nbsp; south-african &nbsp; delicacies
        </Typography>
        <div className={location_container}>
          <LocationOnOutlinedIcon className={location_icon} />
          <Typography className={resturant_location} component="p">
            Flat No. {kitchen?.flatNo},{kitchen?.floor} Floor, Tower No. {kitchen?.tower}, {kitchen?.society?.societyName}
          </Typography>
        </div>
        <Typography className={opening_time} component="p">
          RESTAURANT TIMING - {kitchen[0]}
        </Typography>

        <div className={dpa_section}>
          {[
            { time: '30 MINS', min: 'DELIVERY TIME' },
            { time: 'PAYMENT', min: 'ONLINE PAYMENT' },
            { time: '#,4000', min: 'AVG COST' },
          ].map((data, index) => (
            <DPA key={index} {...data} />
          ))}
        </div>
      </div>
    </div>
    <div style={{display:"flex",justifyContent:"space-around"}}>
    <div style={{width: "20%", border: "1px solid #ccc", borderRadius: "5px", padding: "10px"}}>
        <h2 style={{textAlign: "center"}}>Breakfast</h2>
        <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
          <Grid>Breakfast Item 1</Grid>
          <Grid>Breakfast Item 2</Grid>
          <Grid>Breakfast Item 3</Grid>
        </div>
      </div>
        <div style={{width:"60%"}}>2</div>
        <div style={{width:"20%"}}>3</div>
      </div>
    </>
    
  );
}