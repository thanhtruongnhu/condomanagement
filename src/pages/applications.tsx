import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import {
  IconButton,
  MenuItem,
  Select,
  Skeleton,
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
  { field: "applicantName", headerName: "Applicant name", width: 250 },
  {
    field: "type",
    headerName: "Type",
    width: 250,
    renderCell: (params) => {
      return <ChipNew typeId={params.row.typeId} marginLeft={"0"} />;
    },
  },
  {
    field: "submissionDate",
    headerName: "Submission Date",
    width: 250,
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
    width: 250,
    type: "boolean",
  },
];

function Applications() {
  const [applicationData, setApplicationData] = useState<ApplicationData[]>([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [shouldRefetch, setShouldRefetch] = useState(false);

  const [sortModel, setSortModel] = useState<GridSortModel>([
    {
      field: 'submissionDate', // Specify the field to sort by
      sort: 'asc', // Specify the sort direction ('asc' or 'desc')
    },
  ]);

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
          submissionDate: new Date(item.applicationDate).toLocaleString(
            "en-US",
            { timeZone: "UTC" }
          ),
          moveinDate: new Date(item.moveInDate).toLocaleDateString("en-US", {
            timeZone: "UTC",
          }),
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
  }, [shouldRefetch]);
  const handleDeleteApplication = async (aptTypeID: string, appIds: any) => {
    try {
      const idsArray = Array.isArray(appIds) ? appIds : [appIds];
      // Construct the URL with the aptTypeId parameter
      const token = localStorage.getItem("token");
      const url = `https://globalsolusap.com/application/remove/${aptTypeID}`;
      console.log(token, aptTypeID, idsArray);
      // Send a DELETE request with the stored token in the headers
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json", // Set Content-Type to indicate JSON
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ applicationIds: idsArray }),
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
      const handleClick = (event: React.MouseEvent) => {
        event.stopPropagation(); // Prevent the event from propagating to row selection
        handleDeleteApplication(params?.row?.typeId, params?.row?._id);
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
          {!applicationData.length ? (
            <Box sx={{ width: 300 }}>
              <Skeleton />
              <Skeleton animation="wave" />
              <Skeleton animation={false} />
            </Box>
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
                pageSizeOptions={[1000000]}
                checkboxSelection
                disableRowSelectionOnClick
                sortModel={sortModel}
              />
            </>
          )}
        </form>
      </Box>
    </Box>
  );
}

export default Applications;
