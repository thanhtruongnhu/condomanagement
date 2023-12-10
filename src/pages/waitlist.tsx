import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import {
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
  Skeleton,
  Switch,
  Typography,
} from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridValueGetterParams,
  GridRowParams,
  GridSortModel,
} from "@mui/x-data-grid";
import {
  Filter,
  CurrentFilterValues,
  WaitlistData,
  InquiryDataMapped,
} from "../interfaces/property";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate, useParams } from "react-router-dom";
import Chip from "../components/common/Chip";
import { useDispatch } from "react-redux";
import ChipNew from "../components/common/ChipNew";
import { updateWaitlistData } from "../store/waitlistSlice";
import { ApplicationData } from "../interfaces/application";
import { selectInquiryData } from "../store/inquirySlice";
import { roomTypeToIdMap } from "../components/common/IdMapping";

function findTimeDifferenceFromNow(dateString: string): string {
  const currentDate = new Date();
  const givenDate = new Date(dateString);

  // Calculate the time difference in milliseconds
  const timeDifference = currentDate.getTime() - givenDate.getTime();

  // Convert milliseconds to days
  const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

  if (daysDifference < 30) {
    // If the duration is less than 30 days, display in days
    const roundedDays = Math.floor(daysDifference);
    return `${roundedDays} day${roundedDays !== 1 ? "s" : ""}`;
  } else {
    // If the duration is more than 30 days, convert to months
    const monthsDifference = Math.floor(daysDifference / 30);
    const remainingDays = daysDifference % 30;

    if (remainingDays < 16) {
      return `${monthsDifference} month${monthsDifference !== 1 ? "s" : ""}`;
    } else {
      return `${monthsDifference + 1} month${
        monthsDifference !== 1 ? "s" : ""
      }`;
    }
  }
}

const columns: GridColDef[] = [
  { field: "waitlistApplicant", headerName: "Waitlist applicant", width: 250 },
  {
    field: "type",
    headerName: "Type",
    width: 250,
    renderCell: (params) => {
      return <ChipNew typeId={params.row.typeId} marginLeft={"0"} />;
    },
  },
  {
    field: "contactDate",
    headerName: "Contact Date",
    width: 250,
    editable: false,
  },
  {
    field: "waittime",
    headerName: "Wait time",
    width: 200,
    editable: false,
  },
];

function Waitlist() {
  const [waitlistData, setWaitlistData] = useState<InquiryDataMapped[]>([]);
  const [originalWaitlistData, setOriginalWaitlistData] = useState<
    InquiryDataMapped[]
  >([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [shouldRefetch, setShouldRefetch] = useState(false);
  const [sortModel, setSortModel] = useState<GridSortModel>([
    {
      field: "submissionDate", // Specify the field to sort by
      sort: "asc", // Specify the sort direction ('asc' or 'desc')
    },
  ]);

  useEffect(() => {
    const fetchWaitlistData = async () => {
      try {
        // Retrieve the token from localStorage
        const token = localStorage.getItem("token");

        // Check if the token is available
        if (!token) {
          console.error("Token not available. Please authenticate first.");
          return;
        }

        // Fetch waitlist data using your domain, including the token in the headers
        const response = await fetch("https://globalsolusap.com/waitlist/", {
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
        dispatch(updateWaitlistData(data));

        // Map the data from the endpoint to the 'rows' array format
        const mappedData = data.map((item: WaitlistData, index: number) => ({
          id: index + 1,
          waitlistApplicant: `${item.firstName} ${item.lastName}`,
          typeId: item.aptTypeId,
          contactDate: new Date(item.waitlistedDate).toLocaleString("en-US", {
            timeZone: "UTC",
          }),
          waittime: findTimeDifferenceFromNow(item.waitlistedDate),
          _id: item._id,
        }));

        setOriginalWaitlistData(mappedData);
        setWaitlistData(mappedData);
      } catch (error) {
        console.error("Error fetching waitlist data:", error);
      }
    };

    fetchWaitlistData();
  }, [shouldRefetch]);
  const handleDeleteWaitlist = async (aptTypeID: string, waitlistIds: any) => {
    try {
      const idsArray = Array.isArray(waitlistIds) ? waitlistIds : [waitlistIds];
      // Construct the URL with the aptTypeId parameter
      const token = localStorage.getItem("token");
      const url = `https://globalsolusap.com/waitlist/remove/${aptTypeID}`;

      // Send a DELETE request with the stored token in the headers
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json", // Set Content-Type to indicate JSON
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ waitlistIds: idsArray }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      setShouldRefetch((prev) => !prev);
      console.log("Waitlist item removed successfully");
      // Optionally, you can handle the response data here if needed
    } catch (error) {
      console.error("Error removing waitlist item:", error);
    }
  };
  const handleRowClick = (params: GridRowParams) => {
    // console.log(params)
    const pathName = window.location.pathname;
    // Redirect the user to a different page with the row ID as a parameter
    navigate(`${pathName}${params.row._id}`);
  };

  const setFilters = (selectedType: string) => {
    if (selectedType === "") {
      setWaitlistData(originalWaitlistData);
    } else {
      const roomId = roomTypeToIdMap[selectedType];
      const filteredData = originalWaitlistData.filter(
        (room) => room.typeId === roomId
      );
      setWaitlistData(filteredData);
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

  const actionColumn: GridColDef = {
    field: "delete",
    headerName: "Delete",
    width: 200,
    renderCell: (params) => {
      const handleClick = (event: React.MouseEvent) => {
        event.stopPropagation(); // Prevent the event from propagating to row selection
        handleDeleteWaitlist(params?.row?.typeId, params?.row?._id);
      };
      return (
        <IconButton aria-label="delete" onClick={(e) => handleClick(e)}>
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
            Wait List
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
            rows={waitlistData}
            columns={[...columns, actionColumn]}
            onRowClick={handleRowClick}
            initialState={{
              // pagination: {
              //   paginationModel: {
              //     pageSize: 5,
              //   },
              // },
              columns: {
                columnVisibilityModel: {
                  // Hidden columns
                  _id: false,
                },
              },
            }}
            pageSizeOptions={[1000000]}
            checkboxSelection
            disableRowSelectionOnClick
            sortModel={sortModel}
          />
        </form>
      </Box>
    </Box>
  );
}

export default Waitlist;
