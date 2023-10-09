import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
// import { useDelete, useShow } from "@refinedev/core";
import { useParams, useNavigate } from "react-router-dom";
import Delete from "@mui/icons-material/Delete";
import Edit from "@mui/icons-material/Edit";
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";

import CustomButton from "../components/common/CustomButton";
import SingleSuitA from "../assets/SingleSuite.jpg";
import { Room } from "../interfaces/property";
import { Button, Container, Grid } from "@mui/material";
import InfoCard from "../components/common/InfoCard";
import { CloudDownloadRounded } from "@mui/icons-material";
import Chip from "../components/common/Chip";
import ApplicationInfoCard from "../components/common/ApplicationInfoCard";
import { useState } from "react";
import DescriptionCard from "../components/common/DescriptionCard";

const mockRooms = [
  {
    _id: "1",
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
    _id: "2",
    title: "Room 202",
    propertyType: "Single B",
    price: 150,
    location: "Sample Location 2",
    description:
      "Classic comforts meets contemporary luxury overlooking the courtyard. Explore the best single household unit. Suitable for individual professional and student.",
    photo: SingleSuitA,
    creator: {
      name: "Jane Doe",
      avatar: "https://example.com/avatar2.jpg",
      allProperties: [4, 5, 6],
    },
  },
  {
    _id: "3",
    title: "Room 203",
    propertyType: "Double A",
    price: 150,
    location: "Sample Location 2",
    description:
      "Classic comforts meets contemporary luxury overlooking the courtyard. Explore the best single household unit. Suitable for individual professional and student.",
    photo: SingleSuitA,
    creator: {
      name: "Jack Doe",
      avatar: "https://example.com/avatar2.jpg",
      allProperties: [4, 5, 6],
    },
  },
  {
    _id: "4",
    title: "Room 204",
    propertyType: "Double B",
    price: 150,
    location: "Sample Location 2",
    description:
      "Classic comforts meets contemporary luxury overlooking the courtyard. Explore the best single household unit. Suitable for individual professional and student.",
    photo: SingleSuitA,
    creator: {
      name: "Jix Doe",
      avatar: "https://example.com/avatar2.jpg",
      allProperties: [4, 5, 6],
    },
  },
  {
    _id: "5",
    title: "Room 205",
    propertyType: "Double C",
    price: 150,
    location: "Sample Location 2",
    description:
      "Classic comforts meets contemporary luxury overlooking the courtyard. Explore the best single household unit. Suitable for individual professional and student.",
    photo: SingleSuitA,
    creator: {
      name: "Joe Doe",
      avatar: "https://example.com/avatar2.jpg",
      allProperties: [4, 5, 6],
    },
  },
];

const mockInquiryInfo = [
  {
    "Inquiry submission date": "12/09/2023",
    "First Name": "John",
    "Last Name": "Doe",
    "Email Address": "john.doe@example.com",
  },
];

const mockInquiryQuestionInfo = [
  {
    Question:
      "Could you please clarify which utilities are included in the rental, such as cable TV, wifi, electricity, and any other services? Understanding the utility coverage will help me plan and budget accordingly for my stay in the property. Your clarification on this matter would be greatly appreciated. Thank you.",
  },
];

const InquiryDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [openhouseVisit, setOpenhouseVisit] = useState<boolean>(true);

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
    return <div>Application not found</div>;
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
          Inquiry Details
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
            {propertyDetails.creator.name}
          </Typography>
          <Chip type={propertyDetails.propertyType} marginLeft={"20px"} />
        </Grid>
        <Box mr={"10px"}>
          <CustomButton
            title={"Delete"}
            backgroundColor="red"
            color="#FCFCFC"
            fullWidth
            icon={<Delete />}
            handleClick={() => {
              // navigate(`/rooms/edit/${propertyDetails._id}`);
            }}
          />
        </Box>
        <Box mr={"10px"}>
          <CustomButton
            title={"Email"}
            backgroundColor="#475BE8"
            color="#FCFCFC"
            fullWidth
            icon={<ForwardToInboxIcon />}
            handleClick={() => {
              // navigate(`/rooms/edit/${propertyDetails._id}`);
            }}
          />
        </Box>
      </Box>

      <InfoCard title={""} data={mockInquiryInfo} />
      <Box pb={"60px"}>
        <DescriptionCard data={mockInquiryQuestionInfo} />
      </Box>
    </Container>
  );
};

export default InquiryDetails;