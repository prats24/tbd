import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Divider } from '@material-ui/core';
import { Link } from 'react-router-dom';
// import { DiscountIcon } from '@material-ui/icons/Discount';
// import discounticon from 'react-icons/TbDiscount2'
import { TbDiscount2 } from 'react-icons/tb';

export default function KitchensCard() {
  return (
    <>
    <Box sx={{marginTop:5,marginLeft:10,marginRight:10,fontSize:20,display:"flex",alignItems:"center"}}>
    <Box sx={{display:"flex",justifyContent:"space-between", width: "1248px"}}>
    <Box sx={{display:"flex",alignItems:"center"}}>121 home kitchens in your society</Box>
    <Box sx={{display:"flex",alignItems:"center"}}>
    <Button>Revelance</Button>
    <Button>Ratings</Button>
    <Button>Cost High to Low</Button>
    <Button>Cost Low to High</Button>
    </Box>
    </Box>
    </Box>
    
    <Box sx={{marginTop:2,marginLeft:10,marginRight:10}}>
    <Grid container spacing={5}>

    <Grid item xs={12} md={6} lg={3}>
    <Card sx={{ maxWidth: 300 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="anamika.jpeg"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="text" fontWeight={700} fontSize={20} component="div">
            Anamika's Kitchen
          </Typography>
          <Typography variant="text" color="text.secondary" fontWeight={300} fontSize={12}>
            Anamika is a home chef from Bihar. She is a great cook. She loves making good and tasty food.
          </Typography>
          <Typography sx={{marginBottom:1}}></Typography>
          <Divider></Divider>
          <Typography variant="text" color="#8A584B" fontWeight={300} fontSize={12} marginTop={1} component="div">
            Next Available Slot : Today's Dinner (8:00 PM)
          </Typography>
          <Typography variant="text" color="#DB7C38" fontWeight={300} fontSize={12} marginTop={1.5} display="flex" alignItems="center" component="div">
            <TbDiscount2/>&nbsp; Flat 10% off | USE CODE : MUMMY
          </Typography>
        </CardContent>
      </CardActionArea>
      
      <CardActions sx={{display:"flex",justifyContent:"space-between"}}>
        <Button sx={{color:"error"}} size="small" color="error" variant="outlined" component={Link} to={'/allmeals'}>
        Order Now
        </Button>
        <Box sx={{backgroundColor:"#48C479",color:"white", padding:"3px 7px 4px 5px", borderRadius:"4px", marginLeft:"2px", marginRight:"2px", display:"flex",alignItems:"center"}} size="small" color="success" variant="contained">
        &#x2605; 4.3
        </Box>
      </CardActions>
    </Card>
    </Grid>

    <Grid item xs={12} md={6} lg={3}>
    <Card sx={{ maxWidth: 300 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="Mummy.jpeg"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="text" fontWeight={700} fontSize={20} component="div">
            Mummy's Kitchen
          </Typography>
          <Typography variant="text" color="text.secondary" fontWeight={300} fontSize={12}>
            Anamika is a home chef from Bihar. She is a great cook. She loves making good and tasty food.
          </Typography>
          <Typography sx={{marginBottom:1}}></Typography>
          <Divider></Divider>
          <Typography variant="text" color="#8A584B" fontWeight={300} fontSize={12} marginTop={1} component="div">
            Next Available Slot : Today's Dinner (8:00 PM)
          </Typography>
          <Typography variant="text" color="#DB7C38" fontWeight={300} fontSize={12} marginTop={1.5} display="flex" alignItems="center" component="div">
            <TbDiscount2/>&nbsp; Flat 10% off | USE CODE : MUMMY
          </Typography>
        </CardContent>
      </CardActionArea>
      
      <CardActions sx={{display:"flex",justifyContent:"space-between"}}>
        <Button sx={{color:"error"}} size="small" color="error" variant="outlined" component={Link} to={'/allmeals'}>
        Order Now
        </Button>
        <Box sx={{backgroundColor:"#48C479",color:"white", padding:"3px 7px 4px 5px", borderRadius:"4px", marginLeft:"2px", marginRight:"2px", display:"flex",alignItems:"center"}} size="small" color="success" variant="contained">
        &#x2605; 4.3
        </Box>
      </CardActions>
    </Card>
    </Grid>

    <Grid item xs={12} md={6} lg={3}>
    <Card sx={{ maxWidth: 300 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="Kavita.jpeg"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="text" fontWeight={700} fontSize={20} component="div">
            Kavita's Kitchen
          </Typography>
          <Typography variant="text" color="text.secondary" fontWeight={300} fontSize={12}>
            Anamika is a home chef from Bihar. She is a great cook. She loves making good and tasty food.
          </Typography>
          <Typography sx={{marginBottom:1}}></Typography>
          <Divider></Divider>
          <Typography variant="text" color="#8A584B" fontWeight={300} fontSize={12} marginTop={1} component="div">
            Next Available Slot : Today's Dinner (8:00 PM)
          </Typography>
          <Typography variant="text" color="#DB7C38" fontWeight={300} fontSize={12} marginTop={1.5} display="flex" alignItems="center" component="div">
            <TbDiscount2/>&nbsp; Flat 10% off | USE CODE : MUMMY
          </Typography>
        </CardContent>
      </CardActionArea>
      
      <CardActions sx={{display:"flex",justifyContent:"space-between"}}>
        <Button sx={{color:"error"}} size="small" color="error" variant="outlined" component={Link} to={'/allmeals'}>
        Order Now
        </Button>
        <Box sx={{backgroundColor:"#48C479",color:"white", padding:"3px 7px 4px 5px", borderRadius:"4px", marginLeft:"2px", marginRight:"2px", display:"flex",alignItems:"center"}} size="small" color="success" variant="contained">
        &#x2605; 4.3
        </Box>
      </CardActions>
    </Card>
    </Grid>

    <Grid item xs={12} md={6} lg={3}>
    <Card sx={{ maxWidth: 300 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="anamika.jpeg"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="text" fontWeight={700} fontSize={20} component="div">
            Anamika's Kitchen
          </Typography>
          <Typography variant="text" color="text.secondary" fontWeight={300} fontSize={12}>
            Anamika is a home chef from Bihar. She is a great cook. She loves making good and tasty food.
          </Typography>
          <Typography sx={{marginBottom:1}}></Typography>
          <Divider></Divider>
          <Typography variant="text" color="#8A584B" fontWeight={300} fontSize={12} marginTop={1} component="div">
            Next Available Slot : Today's Dinner (8:00 PM)
          </Typography>
          <Typography variant="text" color="#DB7C38" fontWeight={300} fontSize={12} marginTop={1.5} display="flex" alignItems="center" component="div">
            <TbDiscount2/>&nbsp; Flat 10% off | USE CODE : MUMMY
          </Typography>
        </CardContent>
      </CardActionArea>
      
      <CardActions sx={{display:"flex",justifyContent:"space-between"}}>
        <Button sx={{color:"error"}} size="small" color="error" variant="outlined" component={Link} to={'/allmeals'}>
        Order Now
        </Button>
        <Box sx={{backgroundColor:"#48C479",color:"white", padding:"3px 7px 4px 5px", borderRadius:"4px", marginLeft:"2px", marginRight:"2px", display:"flex",alignItems:"center"}} size="small" color="success" variant="contained">
        &#x2605; 4.3
        </Box>
      </CardActions>
    </Card>
    </Grid>

    

    </Grid>
    </Box>
    </>
  );
}
