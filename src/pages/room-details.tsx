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
import { Room } from "../interfaces/property";
import { Button, Container, Grid } from "@mui/material";
import InfoCard from "../components/common/InfoCard";
import { CloudDownloadRounded } from "@mui/icons-material";

function checkImage(url: any) {
  const img = new Image();
  img.src = url;
  return img.width !== 0 && img.height !== 0;
}

const mockRooms = [
  {
    _id: "101",
    title: "Room 101",
    propertyType: "Single A",
    price: 100,
    location: "Sample Location 1",
    description:
      "Classic comforts meets contemporary luxury overlooking the courtyard. Explore the best single household unit. Suitable for individual professional and student.",
    photo: SingleSuitA,
    creator: {
      name: "John Doe",
      avatar: "https://example.com/avatar1.jpg",
      allProperties: [1, 2, 3],
    },
  },
  {
    _id: "202",
    title: "Room 202",
    propertyType: "Single Suite B",
    price: 150,
    location: "Sample Location 2",
    description:
      "Classic comforts meets contemporary luxury overlooking the courtyard. Explore the best single household unit. Suitable for individual professional and student.",
    photo: SingleSuitA,
    creator: {
      name: "Jane Smith",
      avatar: "https://example.com/avatar2.jpg",
      allProperties: [4, 5, 6],
    },
  },
];

const mockTenantInfo = [
  {
    "Main Tenant (Contract holder)": "John Doe",
    "Date of birth": "September 12th, 1988",
    "Phone number": "9029019xxx",
    "Email Address": "john.doe@example.com",
  },
];

const mockContractInfo = [
  {
    "Move-in date": "September 12th, 2019",
    "End-of-contract date": "September 12th, 2024",
    "60-day end-of-contract reminder": "Sent",
    "45-day end-of-contract reminder": "Scheduled",
  },
];

const mockOtherOccupants = [
  {
    "Tenant name": "Jane Doe",
    "Date of birth": "September 12th, 1988",
    "Relation to main tenant": "Spouse",
  },
  {
    "Tenant name": "Jinx Doe",
    "Date of birth": "September 12th, 1988",
    "Relation to main tenant": "Daughter",
  },
  {
    "Tenant name": "Jack Doe",
    "Date of birth": "September 12th, 1988",
    "Relation to main tenant": "Son",
  },
];

const mockVehicleInfo = [
  {
    Make: "Honda",
    Model: "Civic Sedan 4 door",
    Color: "Blue",
    "License plate #": "DOLY-389",
  },
  {
    Make: "Toyota",
    Model: "Camry Hatchback",
    Color: "Black",
    "License plate #": "COLY-389",
  },
];

const RoomDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Mock function for useShow (fetching property details)
  const queryResult = {
    data: mockRooms,
    isLoading: false,
    isError: false,
  };

  const { data, isLoading, isError } = queryResult;

  // Mock function for useDelete (deleting property)
  const mutate = async ({ resource, id }: { resource: string; id: string }) => {
    // Mock success, you can add your own logic here
    console.log(`Deleted property with ID: ${id}`);
  };

  //   const propertyDetails = queryResult.data;

  // Find the room details by matching the ID
  const propertyDetails = queryResult.data.find(
    (room: Room) => room._id === id
  );

  if (!propertyDetails) {
    // Handle the case where the room with the specified ID is not found
    return <div>Room not found</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Something went wrong!</div>;
  }

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
            {propertyDetails.title}
          </Typography>
          <Box
            ml={"20px"}
            px={1.5}
            py={0.5}
            borderRadius={1}
            bgcolor="#dadefa"
            height="fit-content"
          >
            <Typography fontSize={12} fontWeight={600} color="#475be8">
              {propertyDetails.propertyType}
            </Typography>
          </Box>
        </Grid>
        <Box mr={"10px"}>
          <CustomButton
            title={"Edit"}
            backgroundColor="#475BE8"
            color="#FCFCFC"
            fullWidth
            icon={<Edit />}
            handleClick={() => {
              navigate(`/rooms/edit/${propertyDetails._id}`);
            }}
          />
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
