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
import Api from '../../../helpers/api'

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

export default function ComplexGrid () {
  const [kitchens,setKitchens] = React.useState([])

  React.useEffect(async()=>{
  let res = await Api.getKitchen()
  console.log(res.data.data)
  setKitchens(res.data.data)
  },[])

  return (
    <>
    <Box sx={{marginTop:2,borderRadius:1, padding:1, backgroundColor:"#e8e8e8", display:"flex",alignItems:"center",justifyContent:"space-between"}}>
      <Typography sx={{color:"black", marginLeft:2, fontWeight:400}}>Kitchen List</Typography>
      <Button sx={{ cursor: 'pointer', fontSize: 10, marginRight:3 }} font="small" variant="contained" component={Link} to={'/createkitchen'}>
        Create Kitchen
      </Button>
    </Box>
    <Box>
      
      <Grid container spacing={2} mt={0.1}>
      {
      kitchens?.map((e)=>{
        console.log(e._id)
      return(
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
            <Img borderRadius="100px" alt="po" src={e.displayPhoto ? e.displayPhoto : "PalmOlympia.jpeg"} />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div">
                {e.kitchenName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {e.email}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Mobile No.: {e.phone}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                HC ID: {e.costForOne}
              </Typography>
            </Grid>
            <Grid item>
              <Button
                sx={{ cursor: 'pointer', fontSize: 10 }}
                font="small"
                variant="outlined"
                component={Link}
              >
                <Link style={{textDecoration:'none',color:'inherit'}} to='/viewhomechef' state={{id:e._id}}> View Details </Link>
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
        </Grid>

      )})
      }

      </Grid>
    </Box>
    </>
  );
}
