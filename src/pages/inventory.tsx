import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import {
  Button,
  FormControl,
  FormHelperText,
  MenuItem,
  Modal,
  Select,
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
} from "../interfaces/property";
import Chip from "../components/common/Chip";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const columns: GridColDef[] = [
  { field: "title", headerName: "Room", width: 200 },
  {
    field: "type",
    headerName: "Type",
    width: 250,
    renderCell: (params) => {
      return <Chip type={params.row.type} marginLeft={"0"} />;
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
  const [apartmentData, setApartmentData] = useState<ApartmentData[]>([]);
  const updatedData = [...apartmentData];

  useEffect(() => {
    const fetchApartmentData = async () => {
      try {
        // Retrieve the token from localStorage
        const token = localStorage.getItem('token');
  
        // Check if the token is available
        if (!token) {
          console.error('Token not available. Please authenticate first.');
          return;
        }
  
        // Fetch apartment data using your domain, including the token in the headers
        const response = await fetch('https://globalsolusap.com/apartment/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const data = await response.json();
  
        // Map the data from the endpoint to the 'rows' array format
        const mappedData = data.map((item: ApartmentData, index: number) => ({
          id: index + 1,
          title: item.apartmentNumber,
          type: item.apartmentType.aptCode,
          availableDate: item.aptAvailableFrom
            ? new Date(item.aptAvailableFrom).toLocaleDateString()
            : 'Not Available',
          _id: item._id,
          aptAvailability: item.aptAvailability,
        }));
  
        // Set the mapped data to 'rows'
        setApartmentData(mappedData);
      } catch (error) {
        console.error('Error fetching apartment data:', error);
      }
    };
  
    fetchApartmentData();
  }, [updatedData]);

  const setFilters = (newFilter: Filter) => {
    setCurrentFilterValues(newFilter);
  };

  const [currentFilterValues, setCurrentFilterValues] =
    useState<CurrentFilterValues>({});

  // Function to handle the PUT request
  const handleUpdateRoom = async (putData: putData, roomId: string) => {
    try {
      // Retrieve the token from localStorage
      const token = localStorage.getItem('token');
  
      // Check if the token is available
      if (!token) {
        console.error('Token not available. Please authenticate first.');
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
      const isChecked =
        apartmentData[params.row.id - 1].aptAvailability || false;
      const [openModal, setOpenModal] = useState(false);
      const [chosenDate, setChosenDate] = useState(new Date());
      const [dateValid, setDateValid] = useState(false); // State to track date validity

      const toggleSwitch = () => {
        updatedData[params.row.id - 1].aptAvailability = !isChecked;

        // turning ON
        if (updatedData[params.row.id - 1].aptAvailability) {
          // Open the modal for date selection
          setOpenModal(true);
        }

        // turning OFF
        if (!updatedData[params.row.id - 1].aptAvailability) {
          const confirmation = window.confirm(
            "Mark this room as UNAVAILABLE?"
          );

          if (confirmation) {
            // If the user confirms, proceed with turning off the toggle
            updatedData[params.row.id - 1].aptAvailability = false;
            updatedData[params.row.id - 1].aptAvailableFrom = "";
            // Make a PUT request to update the backend
            const roomId = updatedData[params.row.id - 1]._id; // Get the room ID
            const putData = {
              aptAvailability: false,
              aptAvailableFrom: "",
            };
            handleUpdateRoom(putData, roomId);
          } else {
            // If the user cancels, keep the toggle on
            updatedData[params.row.id - 1].aptAvailability = true;
          }
        }

        setApartmentData(updatedData);
      };

      const handleConfirmDate = () => {
        // Validate that the chosen date is in the future
        const currentDate = new Date();
        if (chosenDate <= currentDate) {
          alert("Please choose a date in the future.");
          return;
        }

        // Make a PUT request to update the backend
        const roomId = updatedData[params.row.id - 1]._id; // Get the room ID
        const putData = {
          aptAvailability: true,
          aptAvailableFrom: chosenDate.toISOString(), // Convert the chosen date to ISO format
        };

        handleUpdateRoom(putData, roomId);

        setOpenModal(false); // Close the modal
      };

      const handleClose = () => {
        if (dateValid) {
          setOpenModal(false); // Close the modal if the date is valid
        }
      };
      return (
        <React.Fragment>
          <Switch
            checked={isChecked}
            onChange={toggleSwitch}
            inputProps={{ "aria-label": "Toggle switch" }}
          />

          <Modal open={openModal} onClose={handleClose}>
            <>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Box sx={{ ...style, width: 250 }}>
                  <h3>Available Date</h3>
                  <DatePicker
                    value={dayjs(chosenDate)} // Use dayjs to wrap chosenDate
                    onChange={(newValue) => {
                      if (newValue) {
                        setChosenDate(newValue.toDate()); // Convert dayjs date to a JavaScript Date object
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
            </>
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

          {!apartmentData.length ? (
            "There are no properties"
          ) : (
            <>
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
                rows={apartmentData}
                columns={[...columns, actionColumn]}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 5,
                    },
                  },
                  columns: {
                    columnVisibilityModel: {
                      // Hide column availableDate, the other columns will remain visible
                      _id: false,
                      aptAvailability: false,
                    },
                  },
                }}
                pageSizeOptions={[5]}
                // checkboxSelection
                disableRowSelectionOnClick
              />
            </>
          )}
        </form>
      </Box>
    </Box>
  );
}

export default Inventory;
