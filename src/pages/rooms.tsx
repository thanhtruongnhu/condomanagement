import React, { useState } from "react";
import Add from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import CustomButton from "../components/common/CustomButton";
import PropertyCard from "../components/common/PropertyCard";
import { Filter, CurrentFilterValues } from "../interfaces/property";

// Dummy data for allProperties
const dummyProperties = [
  {
    _id: "1",
    title: "101",
    tenant: "John Doe",
    type: "Single A",
    photo:
      "https://i0.wp.com/blog.bestinamericanliving.com/wp-content/uploads/2017/01/P9617_Cat21_FirstImpressionExterior_20160831100108_38409.jpg",
    expiry: "01/28/2024",
  },
  {
    _id: "2",
    title: "202",
    tenant: "Jane Doe",
    type: "Single B",
    photo:
      "https://i0.wp.com/blog.bestinamericanliving.com/wp-content/uploads/2017/01/P9617_Cat21_FirstImpressionExterior_20160831100108_38409.jpg",
    expiry: "09/04/2024",
  },
  // Add more properties as needed
];

function Rooms() {
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10); // Default page size
  const [currentFilterValues, setCurrentFilterValues] =
    useState<CurrentFilterValues>({});

  const allProperties = dummyProperties; // Replace with actual data
  const pageCount = Math.ceil(allProperties.length / pageSize);
  const setFilters = (newFilter: Filter) => {
    setCurrentFilterValues(newFilter);
  };
  const navigate = useNavigate();

  return (
    <Box ml="40px">
      <Box mt="20px" sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
        <Stack direction="column" width="100%">
          <Typography fontSize={25} fontWeight={700} color="#11142d">
            {!allProperties.length
              ? "There are no properties"
              : "All Properties"}
          </Typography>
          <Box
            mb={2}
            mt={3}
            display="flex"
            width="84%"
            justifyContent="space-between"
            flexWrap="wrap"
          >
            <Box
              display="flex"
              gap={2}
              flexWrap="wrap"
              mb={{ xs: "20px", sm: 0 }}
            >
              <TextField
                variant="outlined"
                color="info"
                placeholder="Search by title"
                // value={currentFilterValues.title}
                // onChange={(e) => {
                //     setFilters([
                //         {
                //             field: "title",
                //             operator: "contains",
                //             value: e.currentTarget.value
                //                 ? e.currentTarget.value
                //                 : undefined,
                //         },
                //     ]);
                // }}
              />
              <Select
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
            </Box>
          </Box>
        </Stack>
      </Box>

      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <CustomButton
          title="Add Property"
          handleClick={() => {
            // Navigate to /rooms/create when the button is clicked
            navigate("/rooms/create");
          }}
          backgroundColor="#475be8"
          color="#fcfcfc"
          icon={<Add />}
        />
      </Stack>

      <Box mt="20px" sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
        {allProperties?.map((property) => (
          <PropertyCard
            key={property._id}
            id={property.title}
            title={property.title}
            tenant={property.tenant}
            type={property.type}
            photo={property.photo}
            expiry={property.expiry}
          />
        ))}
      </Box>

      {allProperties.length > 0 && (
        <Box display="flex" gap={2} mt={3} flexWrap="wrap">
          <CustomButton
            title="Previous"
            handleClick={() => setCurrent((prev) => prev - 1)}
            backgroundColor="#475be8"
            color="#fcfcfc"
            disabled={!(current > 1)}
          />
          <Box
            display={{ xs: "hidden", sm: "flex" }}
            alignItems="center"
            gap="5px"
          >
            Page{" "}
            <strong>
              {current} of {pageCount}
            </strong>
          </Box>
          <CustomButton
            title="Next"
            handleClick={() => setCurrent((prev) => prev + 1)}
            backgroundColor="#475be8"
            color="#fcfcfc"
            disabled={current === pageCount}
          />
          <Select
            variant="outlined"
            color="info"
            displayEmpty
            required
            inputProps={{ "aria-label": "Without label" }}
            defaultValue={10}
            onChange={(e) =>
              setPageSize(e.target.value ? Number(e.target.value) : 10)
            }
          >
            {[10, 20, 30, 40, 50].map((size) => (
              <MenuItem key={size} value={size}>
                Show {size}
              </MenuItem>
            ))}
          </Select>
        </Box>
      )}
    </Box>
  );
}

export default Rooms;
