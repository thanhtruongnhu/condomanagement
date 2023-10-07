import React from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { Typography } from "@mui/material";
import EngineeringIcon from "@mui/icons-material/Engineering";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  { field: "title", headerName: "Room", width: 150,
},
  {
    field: "type",
    headerName: "Type",
    width: 150,
    editable: true,
  },
  {
    field: "description",
    headerName: "Description",
    width: 150,
    editable: true,
  },
  {
    field: "available",
    headerName: "Available for rent",
    width: 250,
    editable: true,
  },
];

const rows = [
  { id: 1, title: 101, type: "Snow", description: "Jon", available: 35 },
  { id: 2, title: 202, type: "Lannister", description: "Cersei", available: 42 },
  { id: 3, title: 205, type: "Lannister", description: "Jaime", available: 45 },
  { id: 4, title: 206, type: "Stark", description: "Arya", ageavailable: 16 },
  {
    id: 5,
    title: 211,
    type: "Targaryen",
    description: "Daenerys",
    available: null,
  },
  { id: 6, title: 211, type: "Melisandre", description: null, available: 150 },
  { id: 7, title: 212, type: "Clifford", description: "Ferrara", available: 44 },
  { id: 8, title: 213, type: "Frances", description: "Rossini", available: 36 },
  { id: 9, title: 214, type: "Roxie", description: "Harvey", available: 65 },
];

function Inventory() {
  return (
    <Box mx={"20px"} mb={"40px"}>
      <Box
        mt={2.5}
        borderRadius="15px"
        pt={"0.5px"}
        pb={"30px"}
        px={"40px"}
        bgcolor="#fcfcfc"
      >
        <form
          style={{
            marginTop: "20px",
            // width: "100%",
            // width:"200px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
          // onSubmit={handleSubmit(onFinishHandler)}
        >
          <Typography fontSize={25} fontWeight={700} color="#11142d">
            Inventory Control
          </Typography>

          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
            // checkboxSelection
            disableRowSelectionOnClick
          />
        </form>
      </Box>
    </Box>
  );
}

export default Inventory;
