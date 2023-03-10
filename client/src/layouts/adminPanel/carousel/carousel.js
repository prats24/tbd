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
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

export default function ComplexGrid () {

  const [carousels,setCarousels] = React.useState([])

  React.useEffect(async()=>{
  let res = await Api.getCarousels()
  console.log(res.data.data)
  setCarousels(res.data.data)
  },[])

  function getFormattedDate(dateStr) {
    if (!dateStr) return '';
    const dateParts = dateStr.split('-');
    if (dateParts.length !== 3) return '';
    const year = parseInt(dateParts[0]);
    const month = parseInt(dateParts[1]) - 1;
    const day = parseInt(dateParts[2]);
    if (isNaN(year) || isNaN(month) || isNaN(day)) return '';
    const dateObj = new Date(year, month, day);
    const dateObjnew = new Date(dateObj.getTime() - (dateObj.getTimezoneOffset() * 60000))
    return dateObjnew.toISOString().split('T')[0];
  }

  function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0'); // getMonth() returns 0-based month index
    const day = today.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  

  return (
    <>
    <Box sx={{marginTop:2,borderRadius:1, padding:1, backgroundColor:"#e8e8e8", display:"flex",alignItems:"center",justifyContent:"space-between"}}>
      <Typography sx={{color:"black", marginLeft:2, fontWeight:400}}>Carousel List</Typography>
      <Button sx={{ cursor: 'pointer', fontSize: 10, marginRight:3 }} font="small" variant="contained" component={Link} to={'/createcarousel'}>
        Create Carousel
      </Button>
    </Box>

    <Box sx={{marginTop:2,marginLeft:1,marginRight:1}}>
      <Grid container spacing={1} item xs={12} md={6} lg={12}>
    { carousels.map((e)=>{
      console.log(getFormattedDate(e.endDate),getTodayDate())
      let livecolor = (getFormattedDate(e.endDate) >= getTodayDate()) ? "#48C479" : "#d32f2f"
      console.log(livecolor)
      return(
        <Grid item xs={12} md={6} lg={2} sx={{ padding: 1 }}>
        <Card>
      <CardActionArea>
        <CardMedia
          component="img"
          height="100"
          width="100"
          image={e.carouselPhoto ? e.carouselPhoto : "carousel.gif"}
          alt="green iguana"
        />
        <CardContent>
          <Grid item xs container direction="column" spacing={1}>
            <Grid item xs>
              <Typography sx={{fontWeight:500, fontSize:14}} gutterBottom variant="subtitle1" component="div">
                {e.carouselName}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{fontWeight:500, fontSize:10}}>
                Start Dates: {getFormattedDate(e.startDate)}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{fontWeight:500, fontSize:10}}>
                End Dates: {getFormattedDate(e.endDate)}
              </Typography>
            </Grid>
          </Grid>
          </CardContent>
      </CardActionArea>
      <CardActions sx={{display:"flex",justifyContent:"space-between"}}>
        <Button sx={{color:"error",fontSize:8}} size="small" color="error" variant="outlined">
        <Link style={{textDecoration:'none',color:'inherit'}} to='/createcarousel' state={{id:e._id}}> View Details </Link>
        </Button>
        <Box sx={{backgroundColor:`${livecolor}`,fontSize:8,fontWeight:700,color:"white", padding:0.5, borderRadius:1, minWidth:80, textAlign:"center"}} size="small" variant="contained">
          {(getFormattedDate(e.endDate) >= getTodayDate() && getFormattedDate(e.startDate) <= getTodayDate() ) ? "Live" : "Not Live"}
        </Box>
      </CardActions>
    </Card>
        </Grid>)
    })}
    </Grid>

</Box>
    </>
  );
}