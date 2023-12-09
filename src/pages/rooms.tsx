import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import {
  IconButton,
  MenuItem,
  Select,
  Switch,
  Typography,
} from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridRowParams,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import {
  Filter,
  CurrentFilterValues,
  ApartmentData,
} from "../interfaces/property";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { Type } from "../interfaces/common";
import Chip from "../components/common/Chip";
import { useDispatch } from "react-redux";
import { updateApplicationData } from "../store/applicationSlice";
import { ApplicationData } from "../interfaces/application";
import ChipNew from "../components/common/ChipNew";
import { updateRoomData } from "../store/roomSlice";

const columns: GridColDef[] = [
  { field: "roomNumber", headerName: "Room number", width: 150 },
  {
    field: "type",
    headerName: "Type",
    width: 250,
    renderCell: (params) => {
      return <ChipNew typeId={params.row.type} marginLeft={"0"} />;
    },
  },
  {
    field: "mainTenantName",
    headerName: "Main tenant name",
    width: 250,
    editable: false,
  },
  {
    field: "startDate",
    headerName: "Start-of-contract Date",
    width: 250,
    editable: false,
  },
  {
    field: "endDate",
    headerName: "Start-of-contract Date",
    width: 250,
    editable: false,
  },
];

function Rooms() {
  const [roomData, setRoomData] = useState<ApplicationData[]>([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 1. Fetch all applications
  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        // Retrieve the token from localStorage
        const token = localStorage.getItem("token");

        // Check if the token is available
        if (!token) {
          console.error("Token not available. Please authenticate first.");
          return;
        }

        // Fetch application data using your domain, including the token in the headers
        const response = await fetch("https://globalsolusap.com/apartment/", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        dispatch(updateRoomData(data));
        // Map the data from the endpoint to the 'roomData' array format
        const mappedData = data.map((item: ApartmentData, index: number) => ({
          id: index + 1,
          roomNumber: item.apartmentNumber,
          type: item.apartmentType._id,
          mainTenantName: `${item.tenants[0].firstName} ${item.tenants[0].lastName}`,
          startDate: new Date(item.contractStartDate).toLocaleDateString(
            "en-US",
            {
              timeZone: "UTC",
            }
          ),
          endDate: new Date(item.contractEndDate).toLocaleDateString("en-US", {
            timeZone: "UTC",
          }),
          _id: item._id,
        }));

        // Set the mapped data to 'roomData'
        setRoomData(mappedData);
      } catch (error) {
        console.error("Error fetching room data:", error);
      }
    };

    fetchRoomData();
  }, []);

  const handleRowClick = (params: GridRowParams) => {
    const pathName = window.location.pathname;
    // Redirect the user to a different page with the row ID as a parameter
    navigate(`${pathName}show/${params.row._id}`);
  };

  const setFilters = (newFilter: Filter) => {
    setCurrentFilterValues(newFilter);
  };

  const [currentFilterValues, setCurrentFilterValues] =
    useState<CurrentFilterValues>({});

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
            All Rooms
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
            rows={roomData}
            columns={[...columns]}
            onRowClick={handleRowClick}
            pageSizeOptions={[100]}
            // checkboxSelection
            disableRowSelectionOnClick
          />
        </form>
      </Box>
    </Box>
  );
}

export default Rooms;
