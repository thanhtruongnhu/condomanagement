import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
// import { useDelete, useShow } from "@refinedev/core";
import { useParams, useNavigate } from "react-router-dom";
import Delete from "@mui/icons-material/Delete";
import Edit from "@mui/icons-material/Edit";
import Place from "@mui/icons-material/Place";
import Star from "@mui/icons-material/Star";

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
import { CloudDownloadRounded } from "@mui/icons-material";
import Chip from "../components/common/Chip";
import { useEffect, useState } from "react";
import {
  DataItem,
  DescriptionCardProps,
  InfoCardProps,
} from "../interfaces/common";
import formatDate from "../components/common/DateFormatter";

function checkImage(url: any) {
  const img = new Image();
  img.src = url;
  return img.width !== 0 && img.height !== 0;
}

// const mockRooms = [
//   {
//     _id: "101",
//     title: "Room 101",
//     propertyType: "Single A",
//     price: 100,
//     location: "Sample Location 1",
//     description:
//       "Classic comforts meets contemporary luxury overlooking the courtyard. Explore the best single household unit. Suitable for individual professional and student.",
//     photo: SingleSuitA,
//     creator: {
//       name: "John Doe",
//       avatar: "https://example.com/avatar1.jpg",
//       allProperties: [1, 2, 3],
//     },
//   },
//   {
//     _id: "202",
//     title: "Room 202",
//     propertyType: "Single B",
//     price: 150,
//     location: "Sample Location 2",
//     description:
//       "Classic comforts meets contemporary luxury overlooking the courtyard. Explore the best single household unit. Suitable for individual professional and student.",
//     photo: SingleSuitA,
//     creator: {
//       name: "Jane Smith",
//       avatar: "https://example.com/avatar2.jpg",
//       allProperties: [4, 5, 6],
//     },
//   },
// ];

// const mockTenantInfo = [
//   {
//     "Main Tenant (Contract holder)": "John Doe",
//     "Date of birth": "September 12th, 1988",
//     "Phone number": "9029019xxx",
//     "Email Address": "john.doe@example.com",
//   },
// ];

// const mockContractInfo = [
//   {
//     "Move-in date": "September 12th, 2019",
//     "End-of-contract date": "September 12th, 2024",
//     "60-day end-of-contract reminder": "Sent",
//     "45-day end-of-contract reminder": "Scheduled",
//   },
// ];

// const mockOtherOccupants = [
//   {
//     "Tenant name": "Jane Doe",
//     "Date of birth": "September 12th, 1988",
//     "Relation to main tenant": "Spouse",
//   },
//   {
//     "Tenant name": "Jinx Doe",
//     "Date of birth": "September 12th, 1988",
//     "Relation to main tenant": "Daughter",
//   },
//   {
//     "Tenant name": "Jack Doe",
//     "Date of birth": "September 12th, 1988",
//     "Relation to main tenant": "Son",
//   },
// ];

// const mockVehicleInfo = [
//   {
//     Make: "Honda",
//     Model: "Civic Sedan 4 door",
//     Color: "Blue",
//     "License plate #": "DOLY-389",
//   },
//   {
//     Make: "Toyota",
//     Model: "Camry Hatchback",
//     Color: "Black",
//     "License plate #": "COLY-389",
//   },
// ];

const RoomDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [apartmentData, setApartmentData] = useState<ApartmentData | null>(
    null
  );
  const [apartmentTypeData, setApartmentTypeData] =
    useState<ApartmentType | null>(null);
  const [mockTenantInfo, setMockTenantInfo] = useState<DataItem[]>([]);
  const [mockOtherOccupants, setMockOtherOccupants] = useState<DataItem[]>([]);
  const [mockVehicleInfo, setMockVehicleInfo] = useState<DataItem[]>([]);
  const [mockContractInfo, setmockContractInfo] = useState<DataItem[]>([]);

  useEffect(() => {
    const fetchApartmentData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/apartment/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setApartmentData(data);
      } catch (error) {
        console.error("Error fetching apartment data:", error);
      }
    };

    fetchApartmentData();
  }, []);

  // // Fetch apartment type data using apartmentType ID
  // useEffect(() => {
  //   if (apartmentData) {
  //     const apartmentTypeId = apartmentData.apartmentType;

  //     if (apartmentTypeId) {
  //       const fetchApartmentTypeData = async () => {
  //         try {
  //           const response = await fetch(
  //             `http://localhost:3000/apartment/apartment-type/${apartmentTypeId}`
  //           );
  //           if (!response.ok) {
  //             throw new Error(`HTTP error! Status: ${response.status}`);
  //           }
  //           const data = await response.json();
  //           setApartmentTypeData(data);
  //         } catch (error) {
  //           console.error("Error fetching apartment type data:", error);
  //         }
  //       };

  //       fetchApartmentTypeData();
  //     }
  //   }
  // }, [apartmentData]);

  // Create a separate function to process the apartment data and set state
  const processApartmentData = (data: ApartmentData) => {
    const mainTenant = data.tenants[0];
    const occupants = data.tenants[0].occupants; // Excluding the main tenant
    const carModels = data.tenants[0].carModel;

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
  };

  // Call the processing function when apartmentData changes
  useEffect(() => {
    if (apartmentData) {
      processApartmentData(apartmentData);
    }
  }, [apartmentData]);

  // // Mock function for useShow (fetching property details)
  // const queryResult = {
  //   data: mockRooms,
  //   isLoading: false,
  //   isError: false,
  // };

  // const { data, isLoading, isError } = queryResult;

  // Mock function for useDelete (deleting property)
  const mutate = async ({ resource, id }: { resource: string; id: string }) => {
    // Mock success, you can add your own logic here
    console.log(`Deleted property with ID: ${id}`);
  };

  //   const propertyDetails = queryResult.data;

  // // Find the room details by matching the ID
  // const propertyDetails = queryResult.data.find(
  //   (room: Room) => room._id === id
  // );

  // if (!propertyDetails) {
  //   // Handle the case where the room with the specified ID is not found
  //   return <div>Room not found</div>;
  // }

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  // if (isError) {
  //   return <div>Something went wrong!</div>;
  // }

  const handleDeleteProperty = () => {
    if (id) {
      const response = window.confirm(
        "Are you sure you want to delete this property?"
      );
      if (response) {
        mutate({
          resource: "properties",
          id: id,
        }).then(() => {
          navigate("/rooms");
        });
      }
    }
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
            <Chip
              type={apartmentData.apartmentType.aptCode}
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
      <Box mt={"30px"} ml={"5px"} pb={"60px"}>
        <Typography fontSize={20} fontWeight={700}>
          {"5. Credit Report"}
        </Typography>

        <Box mt={"20px"}>
          <CustomButton
            title={"Download"}
            backgroundColor="#475BE8"
            color="#FCFCFC"
            icon={<CloudDownloadRounded />}
            handleClick={() => {}}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default RoomDetails;
