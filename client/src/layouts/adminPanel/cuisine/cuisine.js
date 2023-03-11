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
import Avatar from '@mui/material/Avatar';

export default function ComplexGrid () {

  const [cuisines,setCuisines] = React.useState([])

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  const StyledPaper = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    maxWidth: 300,
    minWidth: 200,
    color: theme.palette.text.primary,
  }));

  React.useEffect(async()=>{
  let res = await Api.getCuisines()
  console.log(res.data.data)
  setCuisines(res.data.data)
  },[])
  

  return (
    <>
    <Box sx={{marginTop:2,borderRadius:1, padding:1, backgroundColor:"#e8e8e8", display:"flex",alignItems:"center",justifyContent:"space-between"}}>
      <Typography sx={{color:"black", marginLeft:2, fontWeight:400}}>Cuisine List</Typography>
      <Button sx={{ cursor: 'pointer', fontSize: 10, marginRight:3 }} font="small" variant="contained" component={Link} to={'/createcuisine'}>
        Create Cuisine
      </Button>
    </Box>

    <Box sx={{marginTop:1,marginLeft:1,marginRight:1}}>
      <Grid container spacing={10} item xs={12} md={6} lg={12}>
    { cuisines.map((e)=>{

      return(
              <Grid item xs={12} md={6} lg={2} sx={{ padding: 2 }} key={e._id}>
                {/* <Item>
                <Avatar src={e.cuisineIcon} />
                  {e.cuisineName}
                </Item> */}
              <StyledPaper
              sx={{
                my: 0,
                mx: 'auto',
                p: 2,
              }}
            >
              <Link style={{textDecoration:"none", color:"inherit"}} to='/createcuisine' state={{id:e._id}}>
              <Grid container spacing={1} display="flex" justifyContent="space-between">
                <Grid item>
                  <Avatar><img width="40" height="40" src={e.cuisineIcon}/></Avatar>
                </Grid>
                <Grid item xs zeroMinWidth>
                  <Typography paddingTop={1} noWrap>{e.cuisineName}</Typography>
                </Grid>
                {e.status === 'inactive' && <Grid item>
                  <Typography paddingTop={1}>&#128308;</Typography>
                </Grid>}
                {e.status === 'active' && <Grid item>
                  <Typography paddingTop={1}>&#128994;</Typography>
                </Grid>}
                
              </Grid>
              </Link>
            </StyledPaper>
        </Grid>)
    })}
    </Grid>

</Box>
    </>
  );
}