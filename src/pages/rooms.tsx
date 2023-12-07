import React, { useEffect, useState } from "react";
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
import {
  Filter,
  CurrentFilterValues,
  ApartmentData,
} from "../interfaces/property";
import { Property } from "../interfaces/property";

function Rooms() {
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10); // Default page size
  const [currentFilterValues, setCurrentFilterValues] =
    useState<CurrentFilterValues>({});
  const [allProperties, setAllProperties] = useState<ApartmentData[]>([]);

  const pageCount = Math.ceil(allProperties.length / pageSize);
  const setFilters = (newFilter: Filter) => {
    setCurrentFilterValues(newFilter);
  };

  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      month: "2-digit",
      day: "2-digit",
      year: "numeric", // Use "numeric" instead of a string
    };
    return date.toLocaleDateString(undefined, options) || "";
  }

  const fetchProperties = async () => {
    try {
      // Retrieve the token from localStorage
      const token = localStorage.getItem("token");

      // Check if the token is available
      if (!token) {
        console.error("Token not available. Please authenticate first.");
        return;
      }

      // Fetch properties using your domain and including the token in the headers
      const response = await fetch("https://globalsolusap.com/apartment/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const apiResponse = await response.json();
      setAllProperties(apiResponse);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  return (
    <Box ml="40px">
      <Box mt="20px" sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
        <Stack direction="column" width="100%">
          <Typography fontSize={25} fontWeight={700} color="#11142d">
            {!allProperties.length ? "There are no properties" : "All Rooms"}
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

      <Box mt="20px" sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
        {allProperties?.map((property, index) => (
          <PropertyCard
            key={index} // Change the key to use the index
            id={property._id}
            title={property.apartmentNumber}
            tenant={`${property.tenants[0].firstName} ${property.tenants[0].lastName}`}
            type={property.apartmentType.aptCode}
            photo="https://i0.wp.com/blog.bestinamericanliving.com/wp-content/uploads/2017/01/P9617_Cat21_FirstImpressionExterior_20160831100108_38409.jpg"
            expiry={formatDate(property.contractEndDate)}
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
