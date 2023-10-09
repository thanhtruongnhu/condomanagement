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

const mockTenantInfo = [
  {
    "First Name": "John",
    "Last Name": "Doe",
    "Date of birth": "12/09/1998",
    "Driver license #": "PE2930400343",
    Province: "PEI",
    "Phone number": "9029019xxx",
    "Email Address": "john.doe@example.com",
    "Desired move-in date": "12/09/2024",
  },
];

const mockRentalHistoryInfo = [
  {
    "CURRENT ADDRESS": "",
    "No.": "11",
    "Street Name": "University Avenue",
    Citi: "Charlottetown",
    Province: "PEI",
    "Postal code": "C1A 3R5",
    "Since (MM/DD/YYYY)": "11/30/2021",
    "To (MM/DD/YYYY)": "11/30/2023",
  },
  {
    "CURRENT LANDLORD": "",
    "First Name": "Moores",
    "Last Name": "(902) 312 1234",
    Phone: "Charlottetown",
    Email: "john.doe@example.com",
  },
  {
    ANSWERS: "",
    "Have you given notice?": "Yes",
    "Have you been asked to leave?": "No",
    "Reason for leaving this property":
      "I'm leaving my current property as I'm relocating for work. I assure you it's well-maintained, and I've been a responsible tenant. Feel free to contact my current landlord for reference.",
    "Have you been evicted from a rental residence?": "No",
    "Have you missed rental payments in the past 12 months?": "Yes",
    "Have you ever refused to pay rent when due?": "No",
    "If you have answered YES to any of the above, please state your reasons and/or circumstances":
      "I'm leaving my current property as I'm relocating for work. I assure you it's well-maintained, and I've been a responsible tenant. Feel free to contact my current landlord for reference.",
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

const mockEmploymentInfo = [
  {
    "Employment status": "Full-time",
    Employer: "Moores",
    "Since (MM/DD/YY)": "12/30/2014",
    "Street/City": "University Avenue",
    Province: "PEI",
    "Postion/Title": "Technician",
    "Work Supervisor": "Jack Smith",
    Phone: "(902)-556-9909",
    "Other source of income": "No",
  },
];

const mockReferenceInfo = [
  {
    "Full Name": "Azuki Doe",
    "Relation to applicant": "Co-worker",
    Phone: "(902)-556-9909",
    "Email address": "azuki.doe@example.com",
  },
];

const mockEmergencyContactInfo = [
  {
    "Next of kin": "Amanda Doe",
    Phone: "(902)-556-9909",
    Address: "11 Windsor st, Charlottetown, PEI",
  },
];

const ApplicationDetails = () => {
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
          Application Details
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

      <ApplicationInfoCard
        submissionDate={"11/20/2023"}
        openhouseVisit={openhouseVisit}
        setOpenhouseVisit={setOpenhouseVisit}
      />

      <InfoCard title={"1. Personal Info"} data={mockTenantInfo} />
      <InfoCard title={"2. Rental History"} data={mockRentalHistoryInfo} />
      <InfoCard title={"3. Other Occupants"} data={mockOtherOccupants} />
      <InfoCard title={"4. Vehicle Info"} data={mockVehicleInfo} />
      <InfoCard title={"5. Employment"} data={mockEmploymentInfo} />
      <InfoCard title={"6. Additional Reference"} data={mockReferenceInfo} />
      <InfoCard
        title={"7. Emergency Contact"}
        data={mockEmergencyContactInfo}
      />

      {/* CreditReportCard */}
      <Box mt={"30px"} ml={"5px"} pb={"60px"}>
        <Typography fontSize={20} fontWeight={700}>
          {"8. Credit Report"}
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

export default ApplicationDetails;
