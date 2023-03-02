import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import Box from "@mui/material/Box";
import { Button, CardActionArea, CardActions } from '@mui/material';
import { fontWeight } from '@mui/system';
import { Link } from 'react-router-dom';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

export default function ComplexGrid() {
  return (
    <>
    <Box sx={{marginTop:3, fontSize:20,borderRadius:1, padding:"8px", backgroundColor:"grey", display:"flex",alignItems:"center",justifyContent:"space-between"}}>
      <Typography sx={{color:"white", marginLeft:2, fontWeight:500}}>Society List</Typography>
      <Button sx={{ cursor: 'pointer', fontSize: 10, marginRight:3 }} font="small" variant="contained" component={Link} to={'/createsociety'}>
        Create Society
      </Button>
    </Box>
    <Box>
      
      <Grid container spacing={2} mt={0.1}>
        <Grid item xs={12} md={6} lg={4}>
    <Paper
      sx={{
        p: 2,
        margin: 'auto',
        maxWidth: 500,
        flexGrow: 1,
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
      }}
    >
      <Grid container spacing={2}>
        <Grid item>
          <ButtonBase sx={{ width: 128, height: 128 }}>
            <Img alt="po" src="PalmOlympia.jpeg" />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div">
                Palm Olympia
              </Typography>
              <Typography variant="body2" gutterBottom>
                Gaur City 2
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Society ID: 103020
              </Typography>
            </Grid>
            <Grid item>
              <Button sx={{ cursor: 'pointer', fontSize: 10 }} font="small" variant="outlined" component={Link} to={'/createsociety'}>
                View Details
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
        </Grid>
        {/* <Grid item xs={12} md={6} lg={4}>
        <Paper
      sx={{
        p: 2,
        margin: 'auto',
        maxWidth: 500,
        flexGrow: 1,
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
      }}
    >
      <Grid container spacing={2}>
        <Grid item>
          <ButtonBase sx={{ width: 128, height: 128 }}>
            <Img alt="mummy" src="2.jpeg" />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div">
                Kavita Kumari
              </Typography>
              <Typography variant="body2" gutterBottom>
                Palm Olympia Apartment
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Homechef ID: 1030113
              </Typography>
            </Grid>
            <Grid item>
              <Button sx={{ cursor: 'pointer', fontSize: 10 }} font="small" variant="outlined">
                View Details
              </Button>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" component="div">
            <Box sx={{backgroundColor:"#48C479",color:"white", padding:"3px 7px 4px 5px", borderRadius:"4px", marginLeft:"2px", marginRight:"2px", display:"flex",alignItems:"center"}} size="small" color="success" variant="contained">
            &#x2605; 4.3
            </Box>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
        <Paper
      sx={{
        p: 2,
        margin: 'auto',
        maxWidth: 500,
        flexGrow: 1,
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
      }}
    >
      <Grid container spacing={2}>
        <Grid item>
          <ButtonBase sx={{ width: 128, height: 128 }}>
            <Img alt="mummy" src="3.jpeg" />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div">
                Radhika Apte
              </Typography>
              <Typography variant="body2" gutterBottom>
                Palm Olympia Apartment
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Homechef ID: 1030111
              </Typography>
            </Grid>
            <Grid item>
              <Button sx={{ cursor: 'pointer', fontSize: 10 }} font="small" variant="outlined">
                View Details
              </Button>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" component="div">
            <Box sx={{backgroundColor:"#48C479",color:"white", padding:"3px 7px 4px 5px", borderRadius:"4px", marginLeft:"2px", marginRight:"2px", display:"flex",alignItems:"center"}} size="small" color="success" variant="contained">
            &#x2605; 4.3
            </Box>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
        </Grid> */}
      </Grid>
    </Box>
    </>
  );
}
