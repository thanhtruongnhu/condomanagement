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
import { Filter, CurrentFilterValues } from "../interfaces/property";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { Type } from "../interfaces/common";
import Chip from "../components/common/Chip";
import { useDispatch } from "react-redux";
import { updateApplicationData } from "../store/applicationSlice";
import { ApplicationData } from "../interfaces/application";
import ChipNew from "../components/common/ChipNew";

const columns: GridColDef[] = [
  { field: "applicantName", headerName: "Applicant name", width: 150 },
  {
    field: "type",
    headerName: "Type",
    width: 150,
    renderCell: (params) => {
      return <ChipNew typeId={params.row.typeId} marginLeft={"0"} />;
    },
  },
  {
    field: "submissionDate",
    headerName: "Submission Date",
    width: 150,
    editable: false,
  },
  {
    field: "moveinDate",
    headerName: "Desired move-in",
    width: 150,
    editable: false,
  },
  {
    field: "openhouseVisit",
    headerName: "Openhouse visit",
    width: 150,
    type: "boolean",
  },
];

const applicationData = [
  {
    id: 1,
    applicantName: "John Doe",
    type: "Single A",
    submissionDate: "10/28/2024",
    moveinDate: "12/01/2024",
    openhouseVisit: true,
  },
  {
    id: 2,
    applicantName: "Jane Doe",
    type: "Single B",
    submissionDate: "10/28/2024",
    moveinDate: "12/01/2024",
    openhouseVisit: true,
  },
  {
    id: 3,
    applicantName: "Jake Doe",
    type: "Double A",
    submissionDate: "10/28/2024",
    moveinDate: "12/01/2024",
    openhouseVisit: false,
  },
  {
    id: 4,
    applicantName: "Jix Doe",
    type: "Double B",
    submissionDate: "10/28/2024",
    moveinDate: "12/01/2024",
    openhouseVisit: false,
  },
  {
    id: 5,
    applicantName: "Joe Doe",
    type: "Double C",
    submissionDate: "10/28/2024",
    moveinDate: "12/01/2024",
    openhouseVisit: true,
  },
  {
    id: 6,
    applicantName: "Mary Moores",
    type: "Single A",
    submissionDate: "10/28/2024",
    moveinDate: "12/01/2024",
    openhouseVisit: false,
  },
  {
    id: 7,
    applicantName: "Anne Moores",
    type: "Single A",
    submissionDate: "10/28/2024",
    moveinDate: "12/01/2024",
    openhouseVisit: true,
  },
  {
    id: 8,
    applicantName: "Anne Doe",
    type: "Single B",
    submissionDate: "10/28/2024",
    moveinDate: "12/01/2024",
    openhouseVisit: false,
  },
  {
    id: 9,
    applicantName: "John Moores",
    type: "Double C",
    submissionDate: "10/28/2024",
    moveinDate: "12/01/2024",
    openhouseVisit: true,
  },
];

function Applications() {
  const [applicationData, setApplicationData] = useState<ApplicationData[]>([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 1. Fetch all applications
  useEffect(() => {
    const fetchApplicationData = async () => {
      try {
        // Retrieve the token from localStorage
        const token = localStorage.getItem("token");

        // Check if the token is available
        if (!token) {
          console.error("Token not available. Please authenticate first.");
          return;
        }

        // Fetch application data using your domain, including the token in the headers
        const response = await fetch("https://globalsolusap.com/application/", {
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
        dispatch(updateApplicationData(data));

        // Map the data from the endpoint to the 'applicationData' array format
        const mappedData = data.map((item: ApplicationData, index: number) => ({
          id: index + 1,
          applicantName: `${item.firstName} ${item.lastName}`,
          typeId: item.aptTypeId,
          submissionDate: new Date(item.applicationDate).toLocaleDateString(),
          moveinDate: new Date(item.moveInDate).toLocaleDateString(),
          openhouseVisit: item.shownApt,
          _id: item._id,
        }));

        // Set the mapped data to 'applicationData'
        setApplicationData(mappedData);
      } catch (error) {
        console.error("Error fetching application data:", error);
      }
    };

    fetchApplicationData();
  }, []);

  const handleRowClick = (params: GridRowParams) => {
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
            All Applications
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
            rows={applicationData}
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

export default Applications;
