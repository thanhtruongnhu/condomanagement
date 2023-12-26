import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useParams, useNavigate } from "react-router-dom";
import Delete from "@mui/icons-material/Delete";
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";
import CustomButton from "../components/common/CustomButton";
import { InquiryData, Room } from "../interfaces/property";
import {
  Button,
  Container,
  Grid,
  Modal,
  TextField,
  TextareaAutosize,
} from "@mui/material";
import InfoCard from "../components/common/InfoCard";
import React, { useEffect, useState } from "react";
import DescriptionCard from "../components/common/DescriptionCard";
import { useSelector } from "react-redux";
import { selectInquiryData } from "../store/inquirySlice";
import formatDate from "../components/common/DateFormatter";
import { DataItem } from "../interfaces/common";
import ChipNew from "../components/common/ChipNew";
import { Toaster, toast } from "sonner";
import {
  initialInquiryMessage,
  initialInquirySubject,
  modalStyle,
} from "../components/common/PredefinedMessagesandThemes";

const initialSubject = initialInquirySubject;
const initialMessage = initialInquiryMessage;
const style = modalStyle;

const InquiryDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const inquiryData = useSelector(selectInquiryData);
  const [inquiryInfo, setInquiryInfo] = useState<DataItem[]>([]);
  const [inquiryMessage, setInquiryMessage] = useState<DataItem[]>([]);

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
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ inquiryIds: idsArray }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      navigate("/inquires");
      console.log("Inquiry item removed successfully");
      toast.success("Your inquiry has been successfully removed!", {
        position: "top-center",
      });
    } catch (error) {
      console.error("Error removing inquiry item:", error);
      toast.error(
        "Oops! There's some error happen while we're removing the inquiry. Please try again later! Thank you 😊",
        {
          position: "top-center",
        }
      );
    }
  };

  // State to manage the modal open/close and input fields
  const [isEmailModalOpen, setEmailModalOpen] = useState(false);
  const [emailMessage, setEmailMessage] = useState(initialMessage);
  const [emailSubject, setEmailSubject] = useState(initialSubject);

  // Function to handle opening the modal
  const handleOpenEmailModal = () => {
    if (inquiryDetails) {
      const personalizedMessage = initialMessage.replace(
        "<First Name>",
        `${inquiryDetails.firstName} ${inquiryDetails.lastName}`
      );
      setEmailMessage(personalizedMessage);
    }
    setEmailModalOpen(true);
  };
  // Function to handle closing the modal
  const handleCloseEmailModal = () => setEmailModalOpen(false);

  // Function to handle sending the email
  const handleSendEmail = async () => {
    const payload = {
      emails: [inquiryDetails.email],
      subject: emailSubject,
      message: emailMessage,
    };

    const token = localStorage.getItem("token");

    // Replace with your API endpoint
    const response = await fetch(
      "https://globalsolusap.com/email/sendEmails/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      }
    );

    if (response.ok) {
      console.log("Email sent successfully");
      toast.success("Email sent successfully!", {
        position: "top-center",
      });
    } else {
      console.error("Failed to send email");
      toast.error(
        "Oops! There's some error happen while we're sending your email. Please try again later! Thank you 😊",
        {
          position: "top-center",
        }
      );
    }

    handleCloseEmailModal();
  };

  return (
    <Container
      maxWidth="lg"
      sx={{ my: 4, bgcolor: "#FFFFFF", borderRadius: 3 }}
    >
      <Toaster
        richColors
        toastOptions={{
          style: {
            marginTop: 400,
          },
          className: "class",
        }}
      />
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
            handleClick={handleOpenEmailModal}
          />
        </Box>
      </Box>

      <InfoCard title={""} data={inquiryInfo} />
      <Box pb={"60px"}>
        <DescriptionCard data={inquiryMessage} />
      </Box>

      {/* Email Modal */}
      <Modal
        open={isEmailModalOpen}
        onClose={handleCloseEmailModal}
        aria-labelledby="email-modal-title"
      >
        <Box
          sx={{
            ...style,
            width: "60%",
            height: "auto",
            overflowY: "auto", // This ensures the modal content is scrollable
          }}
        >
          <Typography id="email-modal-title" variant="h6" component="h2">
            Compose Email
          </Typography>
          <TextField
            label="Subject"
            fullWidth
            margin="normal"
            variant="outlined"
            value={emailSubject}
            onChange={(e) => setEmailSubject(e.target.value)}
          />
          <TextareaAutosize
            aria-label="email text"
            // minRows={10}
            style={{
              width: "100%",
              height: "480px", // Maximum height before scrollbar appears
              overflow: "auto",
              marginTop: "8px",
              marginBottom: "8px",
              padding: "10px",
              borderColor: "lightgray",
              borderRadius: "4px",
              resize: "vertical", // Allows the user to resize vertically
            }}
            value={emailMessage}
            onChange={(e) => setEmailMessage(e.target.value)}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              paddingTop: "8px",
              marginBottom: "0px",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={handleSendEmail}
              sx={{ marginRight: "8px" }}
            >
              Send
            </Button>
            <Button variant="outlined" onClick={handleCloseEmailModal}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
};

export default InquiryDetails;
