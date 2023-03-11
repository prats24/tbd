import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: '#', width:110 },
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
    field: 'type',
    headerName: 'Type',
    width: 200,
    editable: true,
  },
  {
    field: 'price',
    headerName: 'Price',
    width: 250,
    editable: true
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 200,
    editable: true
  },

];

const rows = [
  { id: 1,image: 'default/kitchen.gif' , itemName: 'Butter Chicken', type: 'Non-Veg', price: '35', status: 'Available' },
  { id: 2,image: 'default/rejected.gif' , itemName: 'Butter Naan', type: 'Veg', price: '35', status: 'Available' },
];

export default function DataGridMenu() {
  return (
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
  );
}
