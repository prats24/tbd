import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import Box from "@mui/material/Box";
import { Button, CardActionArea, CardActions } from '@mui/material';
import { fontWeight } from '@mui/system';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

export default function ComplexGrid() {
  return (
    <>
    <Box sx={{marginTop:10,marginLeft:2,marginRight:1,marginBottom:2,fontSize:20,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
      <Typography>HomeChefs</Typography>
      <Button sx={{ cursor: 'pointer', fontSize: 10, marginRight:3 }} font="small" variant="outlined">
        Create HomeChef
      </Button>
    </Box>
    <Box>
      
      <Grid container spacing={2}>
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
            <Img alt="mummy" src="1.jpeg" />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div">
                Anamika Verma
              </Typography>
              <Typography variant="body2" gutterBottom>
                Palm Olympia Apartment
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Homechef ID: 1030114
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
        </Grid>
      </Grid>
    </Box>
    </>
  );
}
