import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import {
  Button,
  FormControl,
  FormHelperText,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  Skeleton,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import {
  Filter,
  CurrentFilterValues,
  ApartmentData,
  putData,
  InventoryDataMapped,
  InquiryDataMapped,
} from "../interfaces/property";
import Chip from "../components/common/Chip";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import ChipNew from "../components/common/ChipNew";
import { roomTypeToIdMap } from "../components/common/IdMapping";

const columns: GridColDef[] = [
  { field: "title", headerName: "Room", width: 200 },
  {
    field: "type",
    headerName: "Type",
    width: 250,
    renderCell: (params) => {
      return <ChipNew typeId={params.row.type} marginLeft={"0"} />;
    },
  },
  {
    field: "availableDate",
    headerName: "Available Date",
    width: 250,
    editable: false,
  },
  {
    field: "_id",
    headerName: "MongoDB ID",
    width: 250,
    editable: false,
  },
  {
    field: "aptAvailability",
    headerName: "Available Date (mongo DB)",
    width: 250,
    editable: false,
  },
];

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

function Inventory() {
  const [apartmentData, setApartmentData] = useState<InventoryDataMapped[]>([]);
  const [originalInventoryData, setOriginalInventoryData] = useState<
    InventoryDataMapped[]
  >([]);

  useEffect(() => {
    const fetchApartmentData = async () => {
      try {
        // Retrieve the token from localStorage
        const token = localStorage.getItem("token");

        // Check if the token is available
        if (!token) {
          console.error("Token not available. Please authenticate first.");
          return;
        }

        // Fetch apartment data using your domain, including the token in the headers
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

        // Map the data from the endpoint to the 'rows' array format
        const mappedData: InventoryDataMapped[] = data.map(
          (item: ApartmentData, index: number) => ({
            id: index + 1,
            title: item.apartmentNumber,
            type: item.apartmentType._id,
            availableDate: item.aptAvailableFrom
              ? new Date(item.aptAvailableFrom).toLocaleDateString()
              : "Not Available",
            _id: item._id,
            aptAvailability: item.aptAvailability,
          })
        );

        setOriginalInventoryData(mappedData);
        setApartmentData(mappedData);
      } catch (error) {
        console.error("Error fetching apartment data:", error);
      }
    };
    fetchApartmentData();
  }, []);

  const setFilters = (selectedType: string) => {
    if (selectedType === "") {
      setApartmentData(originalInventoryData);
    } else {
      const roomId = roomTypeToIdMap[selectedType];
      console.log("roomId::", roomId);
      const filteredData = originalInventoryData.filter(
        (room) => room.type === roomId
      );
      console.log("originalInventoryData::", originalInventoryData);
      console.log("filteredData::", filteredData);

      setApartmentData(filteredData);
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
  // Function to handle the PUT request
  const handleUpdateRoom = async (putData: putData, roomId: string) => {
    try {
      // Retrieve the token from localStorage
      const token = localStorage.getItem("token");

      // Check if the token is available
      if (!token) {
        console.error("Token not available. Please authenticate first.");
        return;
      }

      // Fetch room update using your domain, including the token in the headers
      const response = await fetch(
        `https://globalsolusap.com/apartment/update-availability/${roomId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(putData),
        }
      );
      if (response.ok) {
        // Update the state to reflect the changes
        setApartmentData((currentData) =>
          currentData.map((item) => {
            if (item._id === roomId) {
              return { ...item, ...putData };
            }
            return item;
          })
        );
      }

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error updating room data:", error);
    }
  };

  const actionColumn: GridColDef = {
    field: "availableforrent",
    headerName: "Available for rent",
    width: 200,
    renderCell: (params) => {
      const apartment = apartmentData.find((a) => a._id === params.row._id);
      const isChecked = apartment ? apartment.aptAvailability : false;
      const [openModal, setOpenModal] = useState(false);
      const [chosenDate, setChosenDate] = useState(new Date());
      const [dateValid, setDateValid] = useState(false);

      const toggleSwitch = () => {
        setApartmentData((currentData) =>
          currentData.map((item) => {
            if (item._id === params.row._id) {
              return { ...item, aptAvailability: !isChecked };
            }
            return item;
          })
        );

        if (!isChecked) {
          // If turning on availability, open the modal
          setOpenModal(true);
        } else {
          // If turning off availability, confirm and update
          const confirmation = window.confirm("Mark this room as UNAVAILABLE?");
          if (confirmation) {
            handleUpdateRoom(
              { aptAvailability: false, aptAvailableFrom: "" },
              params.row._id
            );
          }
        }
      };

      const handleConfirmDate = () => {
        const currentDate = new Date();
        if (chosenDate <= currentDate) {
          alert("Please choose a date in the future.");
          return;
        }

        handleUpdateRoom(
          { aptAvailability: true, aptAvailableFrom: chosenDate.toISOString() },
          params.row._id
        );
        setOpenModal(false);
      };

      const handleClose = () => {
        setOpenModal(false);
      };

      return (
        <React.Fragment>
          <Switch
            checked={isChecked}
            onChange={toggleSwitch}
            inputProps={{ "aria-label": "Toggle switch" }}
          />
          <Modal open={openModal} onClose={handleClose}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Box sx={{ ...style, width: 250 }}>
                <h3>Available Date</h3>
                <DatePicker
                  value={dayjs(chosenDate)}
                  onChange={(newValue) => {
                    if (newValue) {
                      setChosenDate(newValue.toDate());
                      setDateValid(newValue.isAfter(dayjs()));
                    } else {
                      setDateValid(false);
                    }
                  }}
                />
                <Button onClick={handleConfirmDate} sx={{ mt: "15px" }}>
                  Confirm
                </Button>
              </Box>
            </LocalizationProvider>
          </Modal>
        </React.Fragment>
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
            rows={apartmentData}
            columns={[...columns, actionColumn]}
            initialState={{
              columns: {
                columnVisibilityModel: {
                  // Hide column availableDate, the other columns will remain visible
                  _id: false,
                  aptAvailability: false,
                },
              },
            }}
            pageSizeOptions={[100]}
            // checkboxSelection
            disableRowSelectionOnClick
          />
        </form>
      </Box>
    </Box>
  );
}

export default Inventory;
