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
  InquiryData,
} from "../interfaces/property";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import ChipNew from "../components/common/ChipNew";
import { useDispatch } from "react-redux";
import { updateInquiryData } from "../store/inquirySlice";

const columns: GridColDef[] = [
  { field: "inquirer", headerName: "Inquirer", width: 200 },
  {
    field: "type",
    headerName: "Type",
    width: 200,
    renderCell: (params) => {
      return <ChipNew typeId={params.row.typeId} marginLeft={"0"} />;
    },
  },
  {
    field: "inquiryDate",
    headerName: "Inquiry Date",
    width: 200,
    editable: false,
  },
  {
    field: "_id",
    headerName: "MongoDB ID",
    width: 50,
    editable: false,
  },
];

function Inquiries() {
  const [inquiryData, setInquiryData] = useState<InquiryData[]>([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchInquiryData = async () => {
      try {
        // Retrieve the token from localStorage
        const token = localStorage.getItem("token");

        // Check if the token is available
        if (!token) {
          console.error("Token not available. Please authenticate first.");
          return;
        }

        // Fetch inquiry data using your domain, including the token in the headers
        const response = await fetch("https://globalsolusap.com/inquiry/", {
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
        dispatch(updateInquiryData(data));

        // Map the data from the endpoint to the 'rows' array format
        const mappedData = data.map((item: InquiryData, index: number) => ({
          id: index + 1,
          inquirer: `${item.firstName} ${item.lastName}`,
          typeId: item.aptTypeId,
          inquiryDate: new Date(item.inquiryDate).toLocaleDateString(),
          _id: item._id,
        }));

        // Set the mapped data to 'rows'
        setInquiryData(mappedData);
      } catch (error) {
        console.error("Error fetching inquiry data:", error);
      }
    };

    fetchInquiryData();
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
            All Inquiries
          </Typography>

          {!inquiryData.length ? (
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
                rows={inquiryData}
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

export default Inquiries;
