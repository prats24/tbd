import * as React from 'react';
import Api from '../../helpers/api'
import {Link, useResolvedPath} from 'react-router-dom'
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import {Card,CardActions} from '@mui/material';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import {Button, Grid} from '@mui/material'

export default function KitchensCard() {
  const theme = useTheme();
  const [kitchens,setKitchens] = React.useState([])
  const [countOfKitchens,setCountOfKitchens] = React.useState()

  React.useEffect(async()=>{
  let res = await Api.getKitchen()
  console.log(res.data.data)
  setKitchens(res.data.data)
  setCountOfKitchens(res.data.results)
  },[])

  return (
    <>
    <Box sx={{overflowX: 'hidden',width: '100%' }}>
    <Grid sx={{marginTop:0.5,display:"flex",alignItems:"center", overflowX: 'auto'}} container spacing={2} item xs={12} md={6} lg={12}>
    <Grid item xs={12} md={6} lg={0.5} sx={{ paddingLeft: 2 }}>
    </Grid>
    <Grid item xs={0} md={6} lg={3.5} sx={{ paddingLeft: 2 }}>
    {countOfKitchens} Home Kitchens
    </Grid>
    <Grid item xs={12} md={6} lg={7.5} sx={{ paddingLeft: 2, display:"flex",alignItems:"center",justifyContent: 'flex-end' }}>
    <Button sx={{color:"#696969",":hover":{color:'#c23539'}}} variant='text'>Ratings</Button>
    <Button sx={{color:"#696969",":hover":{color:'#c23539'}}} variant='text'>Delivery Time</Button>
    <Button sx={{color:"#696969",":hover":{color:'#c23539'}}} variant='text'>Cost</Button>
    </Grid>
    <Grid item xs={0} md={6} lg={0.5} sx={{ paddingLeft: 2 }}>
    </Grid>
    </Grid>
    </Box>
    
    
    <Box sx={{marginTop:2, alignContent:"center", marginLeft:7.5, marginRight:7.5}} xs={12} md={6} lg={12}>
    <Grid container spacing={2} sx={{overflowX: 'auto'}}>
    {kitchens?.map((e)=>{
      console.log(e.cuisines)
      return(
        <Grid item xs={12} md={6} lg={3} sx={{marginBottom:0.5}}>
            
            <Card sx={{ display: 'flex', alignItems: 'center' }}>
              
              <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography component="div" fontSize={15} sx={{ 
                  '@media (max-width: 600px)': {
                    fontSize: '13px',
                  }
                }}>
                  {e.kitchenName}
                </Typography>
                <Typography component="div" fontSize={14} sx={{ 
                  '@media (max-width: 600px)': {
                    fontSize: '12px',
                  }
                }}>
                  {e.homeChef.firstName + ' ' + e.homeChef.lastName}
                </Typography>
                <Typography color="text.secondary" fontSize={13} component="div">
                  {e.kitchenType}
                </Typography>
                <Typography color="text.secondary" fontSize={13} component="div">
                  Cost for One: {e.costForOne}
                </Typography>
                <Typography color="text.secondary" component="div">
                  {e.cuisines.map((elem)=>{
                    <Box>{elem.cuisineName}</Box>
                  })}
                </Typography>
                <Typography sx={{display:"flex",alignItems:"center"}}  fontSize={10} color="text.secondary" component="div">
                  <Box sx={{backgroundColor:"#48C479",color:"white", padding:"0px 2px 0px 2px", borderRadius:"4px", marginLeft:"2px", marginRight:"2px"}}>&#x2605; 4.3</Box> - Delivery in 38 mins
                </Typography>
              </CardContent>
              
              <Box sx={{ position: 'relative' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <CardMedia
                    component="img"
                    sx={{ width: 100, height: 100, borderRadius: 8, margin: 1 }}
                    image={e.displayPhoto}
                    alt="Home Kitchen"
                  />
                  <Button sx={{ width: 100, height: 20, color: 'error', fontSize: '10', marginBottom: 1 }} size="small" color="error" variant="outlined" component={Link} to={'/kitchendetails'} state={{id:e._id}}>
                    Order Now
                  </Button>
                </Box>
              </Box>
              

            </Card>
        </Grid>)
  })
}

    

    </Grid>
    </Box>
    
    </>
  );
  
}

