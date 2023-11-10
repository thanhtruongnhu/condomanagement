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
  GridValueGetterParams,
  GridRowParams,
} from "@mui/x-data-grid";
import {
  Filter,
  CurrentFilterValues,
  WaitlistData,
} from "../interfaces/property";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate, useParams } from "react-router-dom";
import Chip from "../components/common/Chip";
import { useDispatch } from "react-redux";
import ChipNew from "../components/common/ChipNew";
import { updateWaitlistData } from "../store/waitlistSlice";
import { ApplicationData } from "../interfaces/application";

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
  { field: "waitlistApplicant", headerName: "Waitlist applicant", width: 200 },
  {
    field: "type",
    headerName: "Type",
    width: 200,
    renderCell: (params) => {
      return <ChipNew typeId={params.row.typeId} marginLeft={"0"} />;
    },
  },
  {
    field: "contactDate",
    headerName: "Contact Date",
    width: 200,
    editable: false,
  },
  {
    field: "waittime",
    headerName: "Wait time",
    width: 200,
    editable: false,
  },
];

const rows = [
  {
    id: 1,
    waitlistApplicant: "John Doe",
    type: "Single A",
    contactDate: "10/28/2024",
    waittime: "2 months",
  },
  {
    id: 2,
    waitlistApplicant: "Jane Doe",
    type: "Single B",
    contactDate: "10/28/2024",
    waittime: "2 months",
  },
  {
    id: 3,
    waitlistApplicant: "Jake Doe",
    type: "Double A",
    contactDate: "10/28/2024",
    waittime: "3 months",
  },
  {
    id: 4,
    waitlistApplicant: "Jix Doe",
    type: "Double B",
    contactDate: "10/28/2024",
    waittime: "1 year",
  },
  {
    id: 5,
    waitlistApplicant: "Joe Doe",
    type: "Double C",
    contactDate: "10/28/2024",
    waittime: "1 month",
  },
  {
    id: 6,
    waitlistApplicant: "Mary Moores",
    type: "Single A",
    contactDate: "10/28/2024",
    waittime: "5 months",
  },
  {
    id: 7,
    waitlistApplicant: "Anne Moores",
    type: "Single A",
    contactDate: "10/28/2024",
    waittime: "6 months",
  },
  {
    id: 8,
    waitlistApplicant: "Anne Doe",
    type: "Single B",
    contactDate: "10/28/2024",
    waittime: "2 months",
  },
  {
    id: 9,
    waitlistApplicant: "John Moores",
    type: "Double C",
    contactDate: "10/28/2024",
    waittime: "2 months",
  },
];

function Waitlist() {
  const [applicationData, setApplicationData] = useState<ApplicationData[]>([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchWaitlistData = async () => {
      try {
        const response = await fetch("http://localhost:3000/waitlist/", {
          method: "POST",
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
          contactDate: new Date(item.waitlistedDate).toLocaleDateString(),
          waittime: findTimeDifferenceFromNow(item.waitlistedDate),
          _id: item._id,
        }));

        // Set the mapped data to 'rows'
        setApplicationData(mappedData);
      } catch (error) {
        console.error("Error fetching wait list data:", error);
      }
    };

    fetchWaitlistData();
  }, []);

  const handleRowClick = (params: GridRowParams) => {
    // console.log(params)
    const pathName = window.location.pathname;
    // Redirect the user to a different page with the row ID as a parameter
    navigate(`${pathName}${params.row._id}`);
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
            Wait List
          </Typography>
          {!applicationData.length ? (
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
                rows={applicationData}
                columns={[...columns, actionColumn]}
                onRowClick={handleRowClick}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 5,
                    },
                  },
                  columns: {
                    columnVisibilityModel: {
                      // Hidden columns
                      _id: false,
                    },
                  },
                }}
                pageSizeOptions={[5]}
                checkboxSelection
                disableRowSelectionOnClick
              />
            </>
          )}
        </form>
      </Box>
    </Box>
  );
}

export default Waitlist;
