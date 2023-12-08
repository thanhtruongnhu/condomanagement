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
import { Room, WaitlistData } from "../interfaces/property";
import { Button, Container, Grid } from "@mui/material";
import InfoCard from "../components/common/InfoCard";
import { CloudDownloadRounded } from "@mui/icons-material";
import Chip from "../components/common/Chip";
import ApplicationInfoCard from "../components/common/ApplicationInfoCard";
import { useEffect, useState } from "react";
import DescriptionCard from "../components/common/DescriptionCard";
import { useSelector } from "react-redux";
import { selectWaitlistData } from "../store/waitlistSlice";
import { DataItem } from "../interfaces/common";
import formatDate from "../components/common/DateFormatter";
import ChipNew from "../components/common/ChipNew";

const WaitlistDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const waitlistData = useSelector(selectWaitlistData);
  const [waitlistInfo, setWaitlistInfo] = useState<DataItem[]>([]);
  const [waitlistMessage, setWaitlistMessage] = useState<DataItem[]>([]);

  // Mock function for useDelete (deleting property)
  const mutate = async ({ resource, id }: { resource: string; id: string }) => {
    // Mock success, you can add your own logic here
    console.log(`Deleted property with ID: ${id}`);
  };

  // Find the room details by matching the ID
  const waitlistDetails = !waitlistData
    ? null
    : waitlistData.find((room: Room) => room._id === id);

  if (!waitlistDetails) {
    // Handle the case where the room with the specified ID is not found
    return <div>Wait list info not found</div>;
  }

  const processWaitlistData = (data: WaitlistData) => {
    const waitlistInfo = [
      {
        "Inquiry submission date": formatDate(data.waitlistedDate),
        "First Name": data.firstName,
        "Last Name": data.lastName,
        "Email Address": data.email,
        "Phone Number": data.phoneNumber,
      },
    ];

    const waitlistMessage = [{ "Additional Information": data.message }];

    setWaitlistInfo(waitlistInfo);
    setWaitlistMessage(waitlistMessage);
  };

  useEffect(() => {
    if (waitlistDetails) {
      processWaitlistData(waitlistDetails);
    }
  }, [waitlistDetails]);

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
  const handleDeleteWaitlist = async (aptTypeID: string, waitlistIds: any) => {
    try {
      const idsArray = Array.isArray(waitlistIds) ? waitlistIds : [waitlistIds];
      // Construct the URL with the aptTypeId parameter
      const token = localStorage.getItem("token");
      const url = `https://globalsolusap.com/waitlist/remove/${aptTypeID}`;
      console.log(token, aptTypeID, idsArray);
      // Send a DELETE request with the stored token in the headers
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json", // Set Content-Type to indicate JSON
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ waitlistIds: idsArray }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      navigate("/waitlist/");
      console.log("Waitlist item removed successfully");
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
          Wait List Details
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
            {`${waitlistDetails.firstName} ${waitlistDetails.lastName}`}
          </Typography>
          <ChipNew typeId={waitlistDetails.aptTypeId} marginLeft={"20px"} />
        </Grid>
        <Box mr={"10px"}>
          <CustomButton
            title={"Delete"}
            backgroundColor="red"
            color="#FCFCFC"
            fullWidth
            icon={<Delete />}
            handleClick={() => {
              handleDeleteWaitlist(
                waitlistDetails?.aptTypeId,
                waitlistDetails?._id
              );
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
              // navigate(`/rooms/edit/${waitlistDetails._id}`);
            }}
          />
        </Box>
      </Box>

      <InfoCard title={""} data={waitlistInfo} />
      <Box pb={"60px"}>
        <DescriptionCard data={waitlistMessage} />
      </Box>
    </Container>
  );
};

export default WaitlistDetails;
