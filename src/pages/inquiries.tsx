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
  InquiryData,
  InquiryDataMapped,
} from "../interfaces/property";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import ChipNew from "../components/common/ChipNew";
import { useDispatch } from "react-redux";
import { updateInquiryData } from "../store/inquirySlice";
import { roomTypeToIdMap } from "../components/common/IdMapping";

const columns: GridColDef[] = [
  { field: "inquirer", headerName: "Inquirer", width: 250 },
  {
    field: "type",
    headerName: "Type",
    width: 250,
    renderCell: (params) => {
      return <ChipNew typeId={params.row.typeId} marginLeft={"0"} />;
    },
  },
  {
    field: "inquiryDate",
    headerName: "Inquiry Date",
    width: 250,
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
  const [inquiryData, setInquiryData] = useState<InquiryDataMapped[]>([]);
  const [originalInquiryData, setOriginalInquiryData] = useState<
    InquiryDataMapped[]
  >([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [shouldRefetch, setShouldRefetch] = useState(false);
  const [sortModel, setSortModel] = useState<GridSortModel>([
    {
      field: "inquiryDate", // Specify the field to sort by
      sort: "asc", // Specify the sort direction ('asc' or 'desc')
    },
  ]);

  const handleDeleteInquiries = async (aptTypeID: string, inquiryIds: any) => {
    try {
      const idsArray = Array.isArray(inquiryIds) ? inquiryIds : [inquiryIds];
      // Construct the URL with the aptTypeId parameter
      const token = localStorage.getItem("token");
      const url = `https://globalsolusap.com/inquiry/remove/${aptTypeID}`;

      // Send a DELETE request with the stored token in the headers
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json", // Set Content-Type to indicate JSON
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ inquiryIds: idsArray }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      setShouldRefetch((prev) => !prev);
      console.log("Inquiry item removed successfully");
      // Optionally, you can handle the response data here if needed
    } catch (error) {
      console.error("Error removing waitlist item:", error);
    }
  };

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
          inquiryDate: new Date(item.inquiryDate).toLocaleDateString("en-US", {
            timeZone: "UTC",
          }),
          _id: item._id,
        }));

        setOriginalInquiryData(mappedData);
        setInquiryData(mappedData);
      } catch (error) {
        console.error("Error fetching inquiry data:", error);
      }
    };

    fetchInquiryData();
  }, [shouldRefetch]);

  const handleRowClick = (params: GridRowParams) => {
    // console.log(params)
    const pathName = window.location.pathname;
    // Redirect the user to a different page with the row ID as a parameter
    navigate(`${pathName}${params.row._id}`);
  };

  const setFilters = (selectedType: string) => {
    if (selectedType === "") {
      setInquiryData(originalInquiryData);
    } else {
      const roomId = roomTypeToIdMap[selectedType];
      const filteredData = originalInquiryData.filter(
        (room) => room.typeId === roomId
      );
      setInquiryData(filteredData);
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
        handleDeleteInquiries(params?.row?.typeId, params?.row?._id);
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
            All Inquiries
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
            rows={inquiryData}
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

export default Inquiries;
