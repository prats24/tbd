import React from 'react'
import { Link } from 'react-router-dom';
import { Typography, makeStyles, Button } from '@material-ui/core';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { fontFamily } from '@mui/system';

const useStyles = makeStyles(() => ({
    header: {
      backgroundColor: '#400CCC',
      paddingRight: '79px',
      paddingLeft: '118px',
      '@media (max-width: 900px)': {
        paddingLeft: 0,
      },
    },
    leaderBoard: {
      display: 'flex',
      paddingRight: '79px',
      paddingLeft: '118px',
      background: "url('home_bg.jpg')",
      backgroundRepeat: 'no-repeat',
      objectFit: 'contain',
      backgroundPosition: '1050px -100px',
      backgroundSize: '700px',
      height: '100vh',
  
      '@media (max-width: 900px)': {
        paddingLeft: '20px',
        paddingRight: '0px',
        backgroundPosition: '500px -260px',
      },
      '@media (max-width: 500px)': {
        height: 'max-content',
        paddingLeft: '20px',
        paddingRight: '0px',
        backgroundPosition: '200px 0px',
      },
    },
    leaderBoard_left: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
    },
    leaderBoard_left_h1: {
      lineHeight: '50px',
      fontFamily: 'Inter, sans-serif',
      fontSize: '2.625rem',
      fontWeight: 'bold',
      '@media (max-width: 500px)': {
        marginTop: '100px',
      },
    },
    leaderBoard_left_p: {
      fontFamily: 'Inter, sans-serif',
      marginTop: '20px',
    },
    button: {
      borderRadius: '0px',
      width: '150px',
      marginTop: '0px',
      padding:"5px",
      height:"55px",
    '@media (max-width: 500px)' : {
    width:'5px',
    marginRight: '15px',
    marginLeft: '15px',
    borderRadius: '5px',
    '& span': {
        display: 'none',
      },
      '&::before': {
        fontFamily: "Material Icons",
        content: "'\\e5cc'",
        fontSize: '30px',
      },
    },
    textTransform: 'lowercase',
},
    quicktip: {
      display: 'flex',
      alignItems: 'center',
      width: 'max-content',
      '@media (max-width: 400px)': {
        marginTop: '20px',
      },
    },
    quicktip_text: {
      fontSize: '0.9rem',
      lineHeight: '17px',
      fontFamily: 'Inter, sans-serif',
      marginLeft: '7px',
    },
    quickTip_container: {
      display: 'flex',
      gap: '20px',
      marginTop: '100px',
      flexWrap: 'wrap',
      '@media (max-width: 400px)': {
        gap: '0px',
      },
    },
  }));

export function SocietySearch() {
    const {
      leaderBoard,
      leaderBoard_left,
      leaderBoard_left_h1,
      leaderBoard_left_p,
      button,
      quicktip,
      quicktip_text,
      left,
      quickTip_container,
    } = useStyles();
    const QuickTip = ({ Icon, quicktip_details1, quicktip_details2 }) => (
      <div className={quicktip}>
        {Icon}
        <Typography className={quicktip_text} component="p">
          {quicktip_details1}
          <br /> {quicktip_details2}
        </Typography>
      </div>
    );

    const filter = createFilterOptions();

    const [value, setValue] = React.useState(null);
    const top100Films = [
        { title: 'Palm Olympia'},
        { title: 'Exotica'},
    ]

  return (
    <div>
      <div className={leaderBoard}>
        <div className={leaderBoard_left} display="flex">
          <Typography
            className={leaderBoard_left_h1}
            variant="h2"
            component="h1"
          >
            Looking for home cooked food?
          </Typography>
          <Typography className={leaderBoard_left_p} component="div" style={{ display: 'flex', alignItems: 'center' }}>
                <Autocomplete
                    value={value}
                    onChange={(event, newValue) => {
                    if (typeof newValue === 'string') {
                        setValue({
                        title: newValue,
                        });
                    } else if (newValue && newValue.inputValue) {
                        // Create a new value from the user input
                        setValue({
                        title: newValue.inputValue,
                        });
                    } else {
                        setValue(newValue);
                    }
                    }}
                    filterOptions={(options, params) => {
                    const filtered = filter(options, params);

                    const { inputValue } = params;
                    // Suggest the creation of a new value
                    const isExisting = options.some((option) => inputValue === option.title);
                    if (inputValue !== '' && !isExisting) {
                        filtered.push({
                        inputValue,
                        title: `Add "${inputValue}"`,
                        });
                    }

                    return filtered;
                    }}
                    selectOnFocus
                    clearOnBlur
                    handleHomeEndKeys
                    id="free-solo-with-text-demo"
                    options={top100Films}
                    getOptionLabel={(option) => {
                    // Value selected with enter, right from the input
                    if (typeof option === 'string') {
                        return option;
                    }
                    // Add "xxx" option created dynamically
                    if (option.inputValue) {
                        return option.inputValue;
                    }
                    // Regular option
                    return option.title;
                    }}
                    renderOption={(props, option) => <li {...props}>{option.title}</li>}
                    sx={{ width: 300 }}
                    freeSolo
                    renderInput={(params) => (
                    <TextField {...params} label="Select your society" />
                    )}
                />
                <Button
                    disableElevation
                    className={button}
                    variant="contained"
                    color="primary"
                    autoCapitalize="none"
                    borderRadius="0px"
                    endIcon={<ArrowRightAltIcon />}
                    component={Link}
                    to={'/allkitchens'}
                    style={{ marginLeft: '0rem' }}
                >
                    Find Kitchens
                </Button>
                </Typography>

          {/* --- */}
          <div className={quickTip_container}>
            <QuickTip
              Icon={<LocalMallIcon />}
              quicktip_details1="select your favourite food"
              quicktip_details2="and order!"
            />
            <QuickTip
              Icon={<LocationOnIcon />}
              quicktip_details1="select your receiving place"
              quicktip_details2="place"
            />
            <QuickTip
              Icon={<LocalShippingIcon />}
              quicktip_details1="Get your food within"
              quicktip_details2="01-02 hours"
            />
          </div>
        </div>
        <div className={left}></div>
      </div>
    </div>
  )
}

export default SocietySearch