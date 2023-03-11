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
import Divider from '@mui/material/Divider';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

export default function MediaControlCard() {
  
  const orders = [{orderid : '202303110001',customerName : 'Prateek Pawan', orderTime: '2023-03-11 13:04:40',totalAmount : 240, address: 'Flat No. 121, Tower: 10, Palm Olympia, Gaur City 2, Gautam Buddha Nagar, Noida', 
  menuItems:[{itemName : 'Chicken Butter Masala', quantity : 2, variant: 'Large', type: 'Non-Veg', amount : 240},
            {itemName : 'Butter Naan', quantity : 4, variant: '', type: 'Veg', amount : 160},
            {itemName : 'Gulab Jamun', quantity : 1, variant: '2 pcs', type: 'Veg', amount : 100},
            {itemName : 'Jalebi', quantity : 1, variant: '200 gms', type: 'Veg', amount : 80}
            ]}]
  return (
    <>
 <Box>
      
      <Grid container spacing={2} mt={-8}>

        <Grid item xs={12} md={6} lg={2.4}>
          <Paper
            sx={{
              p: 2,
              margin: 0,
              // maxWidth: 500,
              flexGrow: 1,
              backgroundColor:'#fff',
            }}
          >
            <Grid container xs={12} md={6} lg={12} spacing={2}>
              <Grid item xs={12} md={6} lg={12} container>
                <Grid item container xs={12} md={6} lg={8} spacing={0} padding={1} flexDirection="column" fontSize={18}>
                  <Typography fontSize={16} fontWeight={700}>0</Typography>
                  <Typography fontSize={15} marginBottom={-2}>Accepted</Typography>
                </Grid>
                <Grid item xs={12} md={3} lg={4} container spacing={0} padding={2}>
                  <img width={40} height={40} style={{float:"right"}} src="default/accepted.gif" />
                </Grid>
                
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6} lg={2.4}>
          <Paper
            sx={{
              p: 2,
              margin: 0,
              // maxWidth: 500,
              flexGrow: 1,
              backgroundColor:'#fff',
            }}
          >
            <Grid container xs={12} md={6} lg={12} spacing={2}>
              <Grid item xs={12} md={6} lg={12} container>
                <Grid item container xs={12} md={6} lg={8} spacing={0} padding={1} flexDirection="column" fontSize={18}>
                  <Typography fontSize={16} fontWeight={700}>0</Typography>
                  <Typography fontSize={15} marginBottom={-2}>Prepared</Typography>
                </Grid>
                <Grid item xs={12} md={3} lg={4} container spacing={0} padding={2}>
                  <img width={40} height={40} style={{float:"right"}} src="default/prepared.gif" />
                </Grid>
                
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6} lg={2.4}>
          <Paper
            sx={{
              p: 2,
              margin: 0,
              // maxWidth: 500,
              flexGrow: 1,
              backgroundColor:'#fff',
            }}
          >
            <Grid container xs={12} md={6} lg={12} spacing={2}>
              <Grid item xs={12} md={6} lg={12} container>
                <Grid item container xs={12} md={6} lg={8} spacing={0} padding={1} flexDirection="column" fontSize={18}>
                  <Typography fontSize={16} fontWeight={700}>0</Typography>
                  <Typography fontSize={15} marginBottom={-2}>Dispatched</Typography>
                </Grid>
                <Grid item xs={12} md={3} lg={4} container spacing={0} padding={2}>
                  <img width={40} height={40} style={{float:"right"}} src="default/dispatched.gif" />
                </Grid>
                
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6} lg={2.4}>
          <Paper
            sx={{
              p: 2,
              margin: 0,
              // maxWidth: 500,
              flexGrow: 1,
              backgroundColor:'#fff',
            }}
          >
            <Grid container xs={12} md={6} lg={12} spacing={2}>
              <Grid item xs={12} md={6} lg={12} container>
                <Grid item container xs={12} md={6} lg={8} spacing={0} padding={1} flexDirection="column" fontSize={18}>
                  <Typography fontSize={16} fontWeight={700}>0</Typography>
                  <Typography fontSize={15} marginBottom={-2}>Delivered</Typography>
                </Grid>
                <Grid item xs={12} md={3} lg={4} container spacing={0} padding={2}>
                  <img width={40} height={40} style={{float:"right"}} src="default/delivered.gif" />
                </Grid>
                
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6} lg={2.4}>
          <Paper
            sx={{
              p: 2,
              margin: 0,
              // maxWidth: 500,
              flexGrow: 1,
              backgroundColor:'#fff',
            }}
          >
            <Grid container xs={12} md={6} lg={12} spacing={2}>
              <Grid item xs={12} md={6} lg={12} container>
                <Grid item container xs={12} md={6} lg={8} spacing={0} padding={1.5} flexDirection="column" fontSize={18}>
                  <Typography fontSize={16} fontWeight={700}>0</Typography>
                  <Typography fontSize={15} marginBottom={-2}>Rejected</Typography>
                </Grid>
                <Grid item xs={12} md={3} lg={4} container spacing={0} padding={2}>
                  <img width={40} height={40} style={{float:"right"}} src="default/rejected.gif" />
                </Grid>
                
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12} md={12} lg={12}>
          <Paper
            sx={{
              p: 2,
              margin: 0,
              flexGrow: 1,
              backgroundColor:'#fff',
            }}
          >
            <Grid container xs={12} md={6} lg={12} spacing={2}>
            <Grid item container xs={12} md={6} lg={8} spacing={0} padding={0} fontSize={18}>
                  <Typography fontSize={16} fontWeight={700}>Active Order(s)</Typography>
                </Grid>
            </Grid>
          </Paper>
        </Grid>

        { orders.map((e)=>{

          return(
            <Grid item xs={12} md={12} lg={12}>
            <Paper
              sx={{
                p: 2,
                margin: 0,
                flexGrow: 1,
                backgroundColor:'#f5f5f5',
              }}
            >
              <Grid container xs={12} md={6} lg={12} spacing={2}>
              <Grid item container xs={12} md={6} lg={12} spacing={1} padding={0} fontSize={18} display="flex" justifyContent="space-around">
                <Grid item xs={12} md={12} lg={2.4}>
                    <Typography fontSize={12} fontWeight={500}>Order ID: {e.orderid}</Typography>
                </Grid>
                <Grid item xs={12} md={12} lg={2.4}>
                    <Typography fontSize={12} fontWeight={500}>Customer Name: {e.customerName}</Typography>
                </Grid>
                <Grid item xs={12} md={12} lg={2.4}>
                    <Typography fontSize={12} fontWeight={500}>Order Time: {e.orderTime}</Typography>
                </Grid>
                <Grid item xs={12} md={12} lg={2.4}>
                    <Typography fontSize={12} fontWeight={500}>Total Amount:{e.totalAmount}</Typography>
                </Grid>
                {/* <Grid item xs={12} md={12} lg={2.4}>
                    <button>Prepared</button>
                </Grid> */}
                <Grid item xs={12} md={12} lg={10}>
                    <Typography fontSize={12} fontWeight={500}>Address: {e.address}</Typography>
                    <Divider light style={{marginTop:10}}/>
                </Grid>
                <div style={{ textAlign:'end'}}>
                <Grid item xs={12} md={12} lg={2}>
                <button style={{backgroundColor: '#4CAF50', color: 'white', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer',textDecoration: 'none'}}>Prepared</button>
                </Grid>
                </div>
                
                <Grid item container xs={12} md={6} lg={12} spacing={1} padding={0} fontSize={18}>
                <Grid item xs={12} md={12} lg={1}>
                    <Typography fontSize={12} fontWeight={400}>#</Typography>
                </Grid>
                <Grid item xs={12} md={12} lg={3}>
                    <Typography fontSize={12} fontWeight={400}>Item Name</Typography>
                </Grid>
                <Grid item xs={12} md={12} lg={2}>
                    <Typography fontSize={12} fontWeight={400}>Quantity</Typography>
                </Grid>
                <Grid item xs={12} md={12} lg={2}>
                    <Typography fontSize={12} fontWeight={400}>Variant</Typography>
                </Grid>
                <Grid item xs={12} md={12} lg={2}>
                    <Typography fontSize={12} fontWeight={400}>Type</Typography>
                </Grid>
                <Grid item xs={12} md={12} lg={2}>
                    <Typography fontSize={12} fontWeight={400}>Amount</Typography>
                </Grid>
                </Grid>
                {e.menuItems.map((elem,index)=>{

                  return(
                    <Grid item container xs={12} md={6} lg={12} spacing={1} padding={0} fontSize={18} display="flex" justifyContent="space-around">
                    <Grid item xs={12} md={12} lg={1}>
                        <Typography fontSize={12} fontWeight={400}>{index + 1}</Typography>
                    </Grid>
                    <Grid item xs={12} md={12} lg={3}>
                        <Typography fontSize={12} fontWeight={400}>{elem.itemName}</Typography>
                    </Grid>
                    <Grid item xs={12} md={12} lg={2}>
                        <Typography fontSize={12} fontWeight={400}>{elem.quantity}</Typography>
                    </Grid>
                    <Grid item xs={12} md={12} lg={2}>
                        <Typography fontSize={12} fontWeight={400}>{elem.variant}</Typography>
                    </Grid>
                    <Grid item xs={12} md={12} lg={2}>
                        <Typography fontSize={12} fontWeight={400}>{elem.type}</Typography>
                    </Grid>
                    <Grid item xs={12} md={12} lg={2}>
                        <Typography fontSize={12} fontWeight={400}>{elem.amount}</Typography>
                    </Grid>
                      </Grid>

                  )
                })
                }

                  </Grid>
              </Grid>
            </Paper>
          </Grid>

          )
        })
      }

        

      </Grid>
    </Box>
  
  </>
  );
}