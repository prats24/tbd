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
  const [socities,setSocities] = React.useState([])

  React.useEffect(async()=>{
  let res = await Api.getSocieties()
  console.log(res.data.data)
  setSocities(res.data.data)
  },[])

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
      {
      socities?.map((e)=>{
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
            <Img alt="po" src={e.societyPhoto ? e.societyPhoto : "PalmOlympia.jpeg"} />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div">
                {e.societyName}
              </Typography>
              <Typography variant="body2"  gutterBottom>
                <p style={{wrap:"ellipsis"}}>{e.societyAddress}</p>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {e.societyId}
              </Typography>
            </Grid>
            <Grid item>
              {/* <Button sx={{ cursor: 'pointer', fontSize: 10 }} font="small" variant="outlined" component={Link} to={'/viewsociety'} props={{ id: e._id }}>
                View Details
              </Button> */}
              <Button
                sx={{ cursor: 'pointer', fontSize: 10 }}
                font="small"
                variant="outlined"
                component={Link}
                // to={{ 
                //   pathname: '/viewsociety', 
                //   state: { _id: e._id }
                // }}
              >
                <Link style={{textDecoration:'none',color:'inherit'}} to='/viewsociety' state={{id:e._id}}> View Details </Link>
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
