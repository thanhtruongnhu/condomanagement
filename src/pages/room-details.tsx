import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useParams, useNavigate } from "react-router-dom";
import Edit from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CustomButton from "../components/common/CustomButton";
import SingleSuitA from "../assets/SingleSuite.jpg";
import {
  ApartmentData,
  ApartmentType,
  Occupant,
  Property,
  Room,
} from "../interfaces/property";
import { Button, Container, Grid } from "@mui/material";
import InfoCard from "../components/common/InfoCard";
import { useEffect, useState } from "react";
import { DataItem } from "../interfaces/common";
import formatDate from "../components/common/DateFormatter";
import DescriptionCard from "../components/common/DescriptionCard";
import ChipNew from "../components/common/ChipNew";

const RoomDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [apartmentData, setApartmentData] = useState<ApartmentData | null>(
    null
  );
  const [apartmentTypeData, setApartmentTypeData] =
    useState<ApartmentType | null>(null);
  const [documentName, setDocumentName] = useState();
  const [mockTenantInfo, setMockTenantInfo] = useState<DataItem[]>([]);
  const [mockOtherOccupants, setMockOtherOccupants] = useState<DataItem[]>([]);
  const [mockVehicleInfo, setMockVehicleInfo] = useState<DataItem[]>([]);
  const [mockContractInfo, setmockContractInfo] = useState<DataItem[]>([]);
  const [notes, setNotes] = useState<DataItem[]>([]);

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
        const response = await fetch(
          `https://globalsolusap.com/apartment/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setApartmentData(data);
        // if (data.creditReport) {
        //   setDocumentName(data.creditReport.documentName);
        // }
      } catch (error) {
        console.error("Error fetching apartment data:", error);
      }
    };

    fetchApartmentData();
  }, [id]);

  const fetchDocumentPreview = async (creditReportName: string) => {
    try {
      const token = localStorage.getItem("token");
      // Construct the document preview URL
      const documentPreviewURL = `https://globalsolusap.com/application/document-preview/${creditReportName}`;

      // Fetch document preview using the stored token in the headers
      const response = await fetch(documentPreviewURL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Assuming the response is a URL string
      const responseData = await response.json();
      const documentPreviewURLString = responseData.previewURL;

      // Open the URL in a new tab
      window.open(documentPreviewURLString, "_blank");
    } catch (error) {
      console.error("Error fetching and opening document preview:", error);
    }
  };

  // Create a separate function to process the apartment data and set state
  const processApartmentData = (data: ApartmentData) => {
    if (data.tenants && data.tenants.length > 0) {
      const mainTenant = data.tenants[0];
      const occupants = mainTenant.occupants || []; // Excluding the main tenant
      const carModels = mainTenant.carModel || [];
      const notes = [{ "Notes for this tenant": data.notes }];

      const mockTenantInfo = [
        {
          "Main Tenant (Contract holder)": `${mainTenant.firstName} ${mainTenant.lastName}`,
          "Date of birth": formatDate(mainTenant.dob),
          "Phone number": mainTenant.phoneNumber,
          "Email Address": mainTenant.email,
        },
      ];

      const mockContractInfo = [
        {
          "Move-in date": formatDate(data.contractStartDate),
          "End-of-contract date": formatDate(data.contractEndDate),
          Rental: `$${data.currentRent}`,
          Deposit: `$${data.depositAmount}`,
          "60-day end-of-contract reminder": data.reminder60days,
          "45-day end-of-contract reminder": data.reminder45days,
        },
      ];

      const mockOtherOccupants = occupants.map((occupant) => {
        const occupantData = occupant as Occupant; // Explicitly cast to the Occupant type
        return {
          "Tenant name": occupantData.name,
          "Date of birth": formatDate(occupantData.dob),
          "Relation to main tenant": occupantData.relationToApplicant,
        };
      });

      console.log("mockOtherOccupants::", mockOtherOccupants);

      const mockVehicleInfo = carModels.map((carModel) => ({
        Make: carModel.make,
        Model: carModel.model,
        Color: carModel.color,
        "License plate #": carModel.licensePlate,
      }));

      setMockTenantInfo(mockTenantInfo);
      setMockOtherOccupants(mockOtherOccupants);
      setMockVehicleInfo(mockVehicleInfo);
      setmockContractInfo(mockContractInfo);
      setNotes(notes);
    } else {
      // Handle the case where there are no tenants
      console.log("No tenants for this apartment");
    }
  };

  // Call the processing function when apartmentData changes
  useEffect(() => {
    if (apartmentData) {
      processApartmentData(apartmentData);
    }
  }, [apartmentData]);

  // Mock function for useDelete (deleting property)
  const mutate = async ({ resource, id }: { resource: string; id: string }) => {
    // Mock success, you can add your own logic here
    console.log(`Deleted property with ID: ${id}`);
  };

  return (
    <Container
      maxWidth="lg"
      sx={{ my: 4, bgcolor: "#FFFFFF", borderRadius: 3 }}
    >
      <Box pt="20px">
        <Typography fontSize={25} fontWeight={700}>
          Details
        </Typography>
      </Box>

      {/* Room Header */}
      <Box
        mt="20px"
        display="flex"
        bgcolor="#F6F6F6"
        borderRadius={3} // Adjust the value to control the roundness of the corners
        p={1} // Optional: Add padding to the box content
      >
        <Grid container alignItems="center">
          <Typography
            ml={"20px"}
            fontSize={20}
            fontWeight={700}
            color="#11142D"
          >
            {apartmentData
              ? `Room ${apartmentData.apartmentNumber}`
              : "Loading..."}
          </Typography>

          {apartmentData ? (
            <ChipNew
              typeId={apartmentData.apartmentType._id}
              marginLeft={"20px"}
            />
          ) : (
            <div>Loading...</div>
          )}
        </Grid>
        <Box mr={"10px"}>
          {apartmentData ? (
            <CustomButton
              title={"Edit"}
              backgroundColor="#475BE8"
              color="#FCFCFC"
              fullWidth
              icon={<Edit />}
              handleClick={() => {
                navigate(`/rooms/edit/${apartmentData._id}`);
              }}
            />
          ) : (
            // Render something else when apartmentData is null
            <div>Loading...</div>
          )}
        </Box>
      </Box>
      <InfoCard title={"1. Tenant Info"} data={mockTenantInfo} />
      <InfoCard title={"2. Contract Info"} data={mockContractInfo} />
      <InfoCard title={"3. Other Occupants"} data={mockOtherOccupants} />
      <InfoCard title={"4. Vehicle Info"} data={mockVehicleInfo} />

      {/* CreditReportCard */}
      {/* {apartmentData ? (
        <Box mt={"30px"} ml={"5px"}>
          <Typography fontSize={20} fontWeight={700}>
            {"5. Credit Report"}
          </Typography>

          <Box mt={"20px"}>
            <CustomButton
              title={"View"}
              backgroundColor="#475BE8"
              color="#FCFCFC"
              icon={<VisibilityIcon />}
              handleClick={() =>
                fetchDocumentPreview(
                  apartmentData?.tenants[0].creditReport?.documentName
                )
              }
            />
          </Box>
        </Box>
      ) : (
        ""
      )} */}

      {/* Notes */}
      <Box mt={"30px"} ml={"5px"}>
        <Typography fontSize={20} fontWeight={700}>
          {"5. Notes"}
        </Typography>
        <Box pb={"60px"}>
          <DescriptionCard data={notes} />
        </Box>
      </Box>
    </Container>
  );
};

export default RoomDetails;
