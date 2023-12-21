import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import {
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
  Switch,
  Typography,
} from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridRowParams,
  GridSortModel,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import {
  Filter,
  CurrentFilterValues,
  ApartmentData,
  ApartmentDataMapped,
} from "../interfaces/property";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { DataItem, Type } from "../interfaces/common";
import Chip from "../components/common/Chip";
import { useDispatch } from "react-redux";
import ChipNew from "../components/common/ChipNew";
import { updateRoomData } from "../store/roomSlice";
import { roomTypeToIdMap } from "../components/common/IdMapping";

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
    headerName: "End-of-contract Date",
    width: 250,
    editable: false,
  },
];

function Rooms() {
  const [roomData, setRoomData] = useState<ApartmentDataMapped[]>([]);
  const [originalRoomData, setOriginalRoomData] = useState<
    ApartmentDataMapped[]
  >([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [sortModel, setSortModel] = useState<GridSortModel>([
    {
      field: "type", // Specify the field to sort by
      sort: "asc", // Specify the sort direction ('asc' or 'desc')
    },
  ]);

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
        const mappedData: ApartmentDataMapped[] = data.map(
          (item: ApartmentData, index: number) => ({
            id: index + 1,
            roomNumber: item.apartmentNumber,
            type: item.apartmentType._id,
            mainTenantName:
              item.tenants.length > 0
                ? `${item.tenants[0].firstName} ${item.tenants[0].lastName}`
                : "N/A",
            startDate: new Date(item.contractStartDate).toLocaleDateString(
              "en-US"
            ),
            endDate: new Date(item.contractEndDate).toLocaleDateString("en-US"),
            _id: item._id,
          })
        );

        setOriginalRoomData(mappedData);
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

  const setFilters = (selectedType: string) => {
    if (selectedType === "") {
      setRoomData(originalRoomData);
    } else {
      const roomId = roomTypeToIdMap[selectedType];
      const filteredData = originalRoomData.filter(
        (room) => room.type === roomId
      );
      setRoomData(filteredData);
    }
  };

  const [currentFilterValues, setCurrentFilterValues] =
    useState<CurrentFilterValues>({ propertyType: "" });

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const selectedType = event.target.value;
    setCurrentFilterValues({
      ...currentFilterValues,
      propertyType: selectedType,
    });
    setFilters(selectedType);
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
            defaultValue="All"
            value={currentFilterValues.propertyType}
            onChange={handleSelectChange}
          >
            <MenuItem value="">All</MenuItem>
            {Object.keys(roomTypeToIdMap).map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>

          {/* DATA TABLE */}
          <DataGrid
            sortModel={sortModel}
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
