import React, { useState } from "react";
import Box from "@mui/material/Box";
import { MenuItem, Select, Switch, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { Delete } from "@mui/icons-material";
import { Filter, CurrentFilterValues } from "../interfaces/property";
import { width } from "@mui/system";


type Type = {
  type: string;
};

function Chip({ type }: Type) {
  const selectBackgroundColor = (type: string) => {
    switch (type) {
      case "Single A":
        return "#dadefa";
      case "Single B":
        return "#E8DBF8";
      case "Double A":
        return "#F8EBDB";
      case "Double B":
        return "#DBF8EA";
      case "Double C":
        return "#F6F8DB";
      default:
        return "#f50000"; // Red color to detect missing room type
    }
  };

  const selectTextColor = (type: string) => {
    switch (type) {
      case "Single A":
        return "#5563E2";
      case "Single B":
        return "#B555E2";
      case "Double A":
        return "#E2B255";
      case "Double B":
        return "#2AAF60";
      case "Double C":
        return "#CDC505";
      default:
        return "#f50000"; // Red color to detect missing room type
    }
  };

  const chipBackgroundColor = selectBackgroundColor(type);
  const chipTextColor = selectTextColor(type);



  return (
    <Box
      px={1.5}
      py={0.5}
      borderRadius={1}
      bgcolor={chipBackgroundColor}
      height="fit-content"
    >
      <Typography fontSize={12} fontWeight={600} color={chipTextColor}>
        {type}
      </Typography>
    </Box>
  );
}

const columns: GridColDef[] = [
  { field: "title", headerName: "Room", width: 200 },
  {
    field: "type",
    headerName: "Type",
    width: 250,
    renderCell: (params) => {
      return <Chip type={params.row.type} />;
    },
  },
  {
    field: "availableDate",
    headerName: "Available Date",
    width: 250,
    editable: false,
  },
];

const rows = [
  { id: 1, title: 101, type: "Single A", availableDate: "10/28/2024" },
  { id: 2, title: 202, type: "Single B", availableDate: "10/28/2024" },
  { id: 3, title: 205, type: "Double A", availableDate: "10/28/2024" },
  { id: 4, title: 206, type: "Double B", availableDate: "10/28/2024" },
  { id: 5, title: 211, type: "Double C", availableDate: "10/28/2024" },
  { id: 6, title: 211, type: "Single A", availableDate: "10/28/2024" },
  { id: 7, title: 212, type: "Single A", availableDate: "10/28/2024" },
  { id: 8, title: 213, type: "Single B", availableDate: "10/28/2024" },
  { id: 9, title: 214, type: "Double C", availableDate: "10/28/2024" },
];

function Inventory() {
  // Define a state variable to control the Switch for each row
  const [switchStates, setSwitchStates] = useState<{ [key: number]: boolean }>(
    {}
  );

  const setFilters = (newFilter: Filter) => {
    setCurrentFilterValues(newFilter);
  };

  const [currentFilterValues, setCurrentFilterValues] =
  useState<CurrentFilterValues>({});

  // Function to handle Switch state changes for a specific row
  const handleSwitchChange = (rowId: number) => {
    setSwitchStates((prevStates) => ({
      ...prevStates,
      [rowId]: !prevStates[rowId],
    }));
  };

  const actionColumn: GridColDef = {
    field: "availableforrent",
    headerName: "Available for rent",
    width: 200,
    renderCell: (params) => {
      const isChecked = switchStates[params.row.id] || false;
      return (
        <Switch
          checked={isChecked}
          onChange={() => handleSwitchChange(params.row.id)}
        />
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
            // width: "100%",
            // width:"200px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
          // onSubmit={handleSubmit(onFinishHandler)}
        >

          {/* HEADER */}
          <Typography fontSize={25} fontWeight={700} color="#11142d">
            Inventory Control
          </Typography>


          {/* FILTER */}
          <Select
            // fullWidth
            sx={{width:"200px"}}
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
