import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import {Button} from '@mui/material'
import {AiOutlineEdit} from 'react-icons/ai'
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import Api from '../../../helpers/api'


const renderDetailsButton = (params) => {
  return (
          <button
          style={{backgroundColor:"none",borderColor:"none", border:"none",maxWidth:0,cursor:"auto"}}
              onClick={() => {
                  parseName(params.row.edit)
              }}
          >
              <AiOutlineEdit/>
          </button>
  )
}

const columns = [
  { field: 'id', headerName: '#', width:50 },
  {
    field: 'edit',
    headerName: '',
    width: 20,
    renderCell: renderDetailsButton,
    disableClickEventBubbling: false,
},
  {
    field: 'image',
    headerName: 'Image',
    width: 110,
    editable: true,
    renderCell: (params) => <img width={50} height={50} src={params.value} />,
  },
  {
    field: 'itemName',
    headerName: 'Item Name',
    width: 260,
    editable: true,
  },
  {
    field: 'category',
    headerName: 'Category',
    width: 160,
    editable: true,
  },
  {
    field: 'type',
    headerName: 'Type',
    width: 150,
    editable: true,
  },
  {
    field: 'price',
    headerName: 'Price',
    width: 150,
    editable: true
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 150,
    editable: true
  },

];

const rows = [
  { id: 1,image: 'default/kitchen.gif' , itemName: 'Butter Chicken',category : 'Curry', type: 'Non-Veg', price: '35', status: 'Available' },
  { id: 2,image: 'default/rejected.gif' , itemName: 'Butter Naan',category : 'Curry', type: 'Veg', price: '35', status: 'Available' },
];

export default function DataGridMenu() {
 
  return (
    <>
    <Box sx={{marginTop:-7,marginBottom:1,borderRadius:1, padding:1, backgroundColor:"#e8e8e8", display:"flex",alignItems:"center",justifyContent:"space-between"}}>
      <Typography sx={{color:"black", marginLeft:2, fontWeight:400}}>Menu Items</Typography>
      <Button sx={{ cursor: 'pointer', fontSize: 10, marginRight:3 }} font="small" variant="contained" component={Link} to={'/createmenuitem'}>
        Create Menu Item
      </Button>
    </Box>

    <Box sx={{ height: `${rows.length}`*107, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: rows.length,
            },
          },
        }}
        pageSizeOptions={[2]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
    </>
  );
}
