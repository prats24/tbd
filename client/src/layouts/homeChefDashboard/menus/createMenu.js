import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { AiOutlineEdit } from 'react-icons/ai';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import Api from '../../../helpers/api';
import { userContext } from '../../../context/AuthContext';
import { v4 as uuidv4 } from 'uuid';
import Switch from '@mui/material/Switch';

const renderDetailsButton = (params) => {
  return (
    <button
      style={{
        backgroundColor: 'none',
        borderColor: 'none',
        border: 'none',
        maxWidth: 0,
        cursor: 'auto',
      }}
      onClick={() => {
        parseName(params.row.edit);
      }}
    >
      <AiOutlineEdit />
    </button>
  );
};
const getRowId = (row) => row._id;
const columns = [
  // { field: '_id', headerName: 'Id' },
  {
    field: 'dishPhoto',
    headerName: 'Item Image',
    width: 110,
    editable: true,
    renderCell: (params) => <img width={50} height={50} src={params.value} />,
  },
  {
    field: 'menuItemName',
    headerName: 'Item Name',
    width: 300,
    editable: false,
  },
  {
    field: 'type',
    headerName: 'Type',
    width: 120,
    editable: false,
  },
  {
    field: 'category',
    headerName: 'Category',
    width: 100,
    editable: false,
  },
  {
    field: 'price',
    headerName: 'Price',
    width: 120,
    editable: false,
  },
  // {
  //   field: 'availability',
  //   headerName: 'Available',
  //   width: 100,
  //   editable: false,
  // },
  {
    field: 'availability',
    headerName: 'Available',
    width: 120,
    // editable: true,
    renderCell: (params) => (
      <Switch
        checked={params.value}
        size="small"
        inputProps={{ 'aria-label': 'controlled' }}
        color="primary"
      />
    ),
  },
  {
    field: 'description',
    headerName: 'Description',
    width: 280,
    editable: false,
  },
  // Add more columns here as needed
];

export default function DataGridMenu() {
  const { userDetail } = React.useContext(userContext);
  const [menuItems, setMenuItems] = React.useState([]);

  React.useEffect(async () => {
    let res = await Api.getMenuItemByKitchenId(userDetail.kitchen);
    console.log(res.data.data);
    setMenuItems(res.data.data);
  }, []);
  console.log('Menu Items: ', menuItems);
  console.log('Columns: ', columns);
  return (
    <>
      <Box
        sx={{
          marginTop: -7,
          marginBottom: 1,
          borderRadius: 1,
          padding: 1,
          backgroundColor: '#e8e8e8',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography sx={{ color: 'black', marginLeft: 2, fontWeight: 400 }}>
          Menu Items
        </Typography>
        <Button
          sx={{ cursor: 'pointer', fontSize: 10, marginRight: 3 }}
          font="small"
          variant="contained"
          component={Link}
          to={'/createmenuitem'}
        >
          Create Menu Item
        </Button>
      </Box>

      {menuItems.length > 0 ? (
        <Box sx={{ height: 500, width: '100%' }}>
          <DataGrid
            rows={menuItems}
            columns={columns}
            getRowId={getRowId}
            pageSize={10}
            checkboxSelection
            disableRowSelectionOnClick
          />
        </Box>
      ) : (
        <Box sx={{ height: '100%', width: '100%' }}>
          <Typography sx={{ color: 'black', marginLeft: 2, fontWeight: 400 }}>
            No menu items found
          </Typography>
        </Box>
      )}
    </>
  );
}
