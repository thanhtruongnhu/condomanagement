import React, { useState } from "react";
import Box from "@mui/material/Box";
import {
  IconButton,
  MenuItem,
  Select,
  Switch,
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams, GridRowParams } from "@mui/x-data-grid";
import { Filter, CurrentFilterValues } from "../interfaces/property";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import Chip from "../components/common/Chip";


const columns: GridColDef[] = [
  { field: "inquirer", headerName: "Inquirer", width: 200 },
  {
    field: "type",
    headerName: "Type",
    width: 200,
    renderCell: (params) => {
      return <Chip type={params.row.type} marginLeft={"0"} />;
    },
  },
  {
    field: "inquiryDate",
    headerName: "Inquiry Date",
    width: 200,
    editable: false,
  },
];

const rows = [
  { id: 1, inquirer: "John Doe", type: "Single A", inquiryDate: "10/28/2024" },
  { id: 2, inquirer: "Jane Doe", type: "Single B", inquiryDate: "10/28/2024" },
  { id: 3, inquirer: "Jake Doe", type: "Double A", inquiryDate: "10/28/2024" },
  { id: 4, inquirer: "Jix Doe", type: "Double B", inquiryDate: "10/28/2024" },
  { id: 5, inquirer: "Joe Doe", type: "Double C", inquiryDate: "10/28/2024" },
  {
    id: 6,
    inquirer: "Mary Moores",
    type: "Single A",
    inquiryDate: "10/28/2024",
  },
  {
    id: 7,
    inquirer: "Anne Moores",
    type: "Single A",
    inquiryDate: "10/28/2024",
  },
  { id: 8, inquirer: "Anne Doe", type: "Single B", inquiryDate: "10/28/2024" },
  {
    id: 9,
    inquirer: "John Moores",
    type: "Double C",
    inquiryDate: "10/28/2024",
  },
];

function Inquiries() {

  const navigate = useNavigate();

  const handleRowClick = (params: GridRowParams) => {
    // console.log(params)
    const pathName = window.location.pathname;
    // Redirect the user to a different page with the row ID as a parameter
    navigate(`${pathName}${params.row.id}`);
  };

  const setFilters = (newFilter: Filter) => {
    setCurrentFilterValues(newFilter);
  };

  const [currentFilterValues, setCurrentFilterValues] =
    useState<CurrentFilterValues>({});


  const actionColumn: GridColDef = {
    field: "delete",
    headerName: "Delete",
    width: 200,
    renderCell: (params) => {
      return (
        <IconButton aria-label="delete">
          <DeleteIcon sx={{ color: "red" }} />
        </IconButton>
      );
    },
  };

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
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
          // onSubmit={handleSubmit(onFinishHandler)}
        >
          {/* HEADER */}
          <Typography fontSize={25} fontWeight={700} color="#11142d">
            All Inquiries
          </Typography>

          {/* FILTER */}
          <Select
            // fullWidth
            sx={{ width: "200px" }}
            variant="outlined"
            color="info"
            displayEmpty
            required
            inputProps={{ "aria-label": "Without label" }}
            defaultValue=""
            value={currentFilterValues.propertyType || ""}
            onChange={(e) => {
              const newFilter = {
                propertyType: e.target.value,
              };
              setFilters(newFilter);
            }}
          >
            <MenuItem value="">All</MenuItem>
            {[
              "Single Suite A",
              "Single Suite B ♿",
              "Double Suite A",
              "Double Suite B",
              "Double Suite C",
            ].map((type) => (
              <MenuItem key={type} value={type.toLowerCase()}>
                {type}
              </MenuItem>
            ))}
          </Select>

          {/* DATA TABLE */}
          <DataGrid
            rows={rows}
            columns={[...columns, actionColumn]}
            onRowClick={handleRowClick}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
            checkboxSelection
            disableRowSelectionOnClick
          />
        </form>
      </Box>
    </Box>
  );
}

export default Inquiries;
