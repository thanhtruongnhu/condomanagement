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
import { InquiryData, Room } from "../interfaces/property";
import { Button, Container, Grid } from "@mui/material";
import InfoCard from "../components/common/InfoCard";
import { CloudDownloadRounded } from "@mui/icons-material";
import Chip from "../components/common/Chip";
import ApplicationInfoCard from "../components/common/ApplicationInfoCard";
import { useEffect, useState } from "react";
import DescriptionCard from "../components/common/DescriptionCard";
import { useSelector } from "react-redux";
import { selectInquiryData } from "../store/inquirySlice";
import formatDate from "../components/common/DateFormatter";
import { DataItem } from "../interfaces/common";
import ChipNew from "../components/common/ChipNew";

const InquiryDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const inquiryData = useSelector(selectInquiryData);
  const [inquiryInfo, setInquiryInfo] = useState<DataItem[]>([]);
  const [inquiryMessage, setInquiryMessage] = useState<DataItem[]>([]);

  // Mock function for useDelete (deleting property)
  const mutate = async ({ resource, id }: { resource: string; id: string }) => {
    // Mock success, you can add your own logic here
    console.log(`Deleted property with ID: ${id}`);
  };

  // Find the room details by matching the ID
  const inquiryDetails = !inquiryData
    ? null
    : inquiryData.find((room: Room) => room._id === id);

  if (!inquiryDetails) {
    // Handle the case where the room with the specified ID is not found
    return <div>Inquiry not found</div>;
  }

  const processInquiryData = (data: InquiryData) => {
    const inquiryInfo = [
      {
        "Inquiry submission date": formatDate(data.inquiryDate),
        "First Name": data.firstName,
        "Last Name": data.lastName,
        "Email Address": data.email,
        "Phone Number": data.phoneNumber,
      },
    ];

    const inquiryMessage = [{ Question: data.inquiryMessage }];

    setInquiryInfo(inquiryInfo);
    setInquiryMessage(inquiryMessage);
  };

  useEffect(() => {
    if (inquiryDetails) {
      processInquiryData(inquiryDetails);
    }
  }, [inquiryDetails]);

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
      navigate('/inquires');
      console.log("Inquiry item removed successfully");
      // Optionally, you can handle the response data here if needed
    } catch (error) {
      console.error("Error removing waitlist item:", error);
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
            {`${inquiryDetails.firstName} ${inquiryDetails.lastName}`}
          </Typography>
          <ChipNew typeId={inquiryDetails.aptTypeId} marginLeft={"20px"} />
        </Grid>
        <Box mr={"10px"}>
          <CustomButton
            title={"Delete"}
            backgroundColor="red"
            color="#FCFCFC"
            fullWidth
            icon={<Delete />}
            handleClick={() => {
              handleDeleteInquiries(
                inquiryDetails?.aptTypeId,
                inquiryDetails?._id
              );
              // navigate(`/rooms/edit/${inquiryDetails._id}`);
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
              // navigate(`/rooms/edit/${inquiryDetails._id}`);
            }}
          />
        </Box>
      </Box>

      <InfoCard title={""} data={inquiryInfo} />
      <Box pb={"60px"}>
        <DescriptionCard data={inquiryMessage} />
      </Box>
    </Container>
  );
};

export default InquiryDetails;
