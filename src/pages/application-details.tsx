import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useParams, useNavigate } from "react-router-dom";
import Delete from "@mui/icons-material/Delete";
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";
import CustomButton from "../components/common/CustomButton";
import SingleSuitA from "../assets/SingleSuite.jpg";
import { Room } from "../interfaces/property";
import {
  Button,
  Container,
  Grid,
  Modal,
  TextField,
  TextareaAutosize,
} from "@mui/material";
import InfoCard from "../components/common/InfoCard";
import ApplicationInfoCard from "../components/common/ApplicationInfoCard";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectApplicationData } from "../store/applicationSlice";
import ChipNew from "../components/common/ChipNew";
import { Address, ApplicationData } from "../interfaces/application";
import formatDate from "../components/common/DateFormatter";
import { DataItem } from "../interfaces/common";
import { Toaster, toast } from "sonner";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  initialApplicationMessage,
  initialApplicationSubject,
  modalStyle,
} from "../components/common/PredefinedMessagesandThemes";

function booleanToYesNo(value: boolean): string {
  return value ? "Yes" : "No";
}

const initialSubject = initialApplicationSubject;
const initialMessage = initialApplicationMessage;
const style = modalStyle;

const ApplicationDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const applicationData = useSelector(selectApplicationData);
  const [openhouseVisit, setOpenhouseVisit] = useState<boolean>(false);
  const [tenantInfo, setTenantInfo] = useState<DataItem[]>([]);
  const [rentalHistoryInfo, setRentalHistoryInfo] = useState<DataItem[]>([]);
  const [otherOccupants, setOtherOccupants] = useState<DataItem[]>([]);
  const [questions, setQuestions] = useState<DataItem[]>([]);
  const [vehicleInfo, setVehicleInfo] = useState<DataItem[]>([]);
  const [employmentInfo, setEmploymentInfo] = useState<DataItem[]>([]);
  const [referenceInfo, setReferenceInfo] = useState<DataItem[]>([]);
  const [applicationDetails, setApplicationDetails] = useState<any>();
  const [emergencyContactInfo, setEmergencyContactInfo] = useState<DataItem[]>(
    []
  );

  useEffect(() => {
    const appDetails = applicationData.find((room: Room) => room._id === id);
    setApplicationDetails(appDetails);
  }, []);
  // Find the room details by matching the ID
  // const applicationDetails = !applicationData
  //   ? null
  //   : applicationData.find((room: Room) => room._id === id);

  // if (!applicationDetails) {
  //   // Handle the case where the room with the specified ID is not found
  //   return <div>Application not found</div>;
  // }
  const handleDeleteApplication = async (aptTypeID: string, appIds: any) => {
    try {
      const idsArray = Array.isArray(appIds) ? appIds : [appIds];
      // Construct the URL with the aptTypeId parameter
      const token = localStorage.getItem("token");
      const url = `https://globalsolusap.com/application/remove/${aptTypeID}`;
      console.log(token, aptTypeID, idsArray);
      // Send a DELETE request with the stored token in the headers
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json", // Set Content-Type to indicate JSON
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ applicationIds: idsArray }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      console.log("Application removed successfully");
      toast.success("Your application has been successfully removed!", {
        position: "top-center",
      });
      navigate("/applications/");
    } catch (error) {
      console.error("Error removing application:", error);
      toast.error(
        "Oops! There's some error happen while we're removing the application. Please try again later! Thank you 😊",
        {
          position: "top-center",
        }
      );
    }
  };
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
  // Create a separate function to process the application data and set state
  const processApplicationData = (data: ApplicationData) => {
    // Tenant Info processing
    const tenantInfo = [
      {
        "First Name": data.firstName,
        "Last Name": data.lastName,
        "Date of birth": formatDate(data.dob),
        "Driver license #": data.driverLicense, //@Todo: remember to add in
        Province: data.province, //@Todo: remember to add in
        "Phone number": data.phoneNumber,
        "Email Address": data.email,
        "Desired move-in date": formatDate(data.moveInDate),
      },
    ];

    // Rental History processing
    const rentalHistory = data.addresses;
    const rentalHistoryInfo = rentalHistory.map((address) => {
      return {
        ADDRESS: "",
        "No.": address.streetNo,
        "Street Name": address.streetName,
        Citi: address.city,
        Province: address.province,
        "Postal code": address.postalCode,
        "Since (MM/DD/YYYY)": formatDate(address.since),
        "To (MM/DD/YYYY)": formatDate(address.to),
        LANDLORD: "",
        "First Name": address.landlord.firstName,
        "Last Name": address.landlord.lastName,
        Phone: address.landlord.phone,
        Email: address.landlord.email,
        ANSWERS: "",
        "Have you given notice?": booleanToYesNo(address.hasGivenNotice),
        "Have you been asked to leave?": booleanToYesNo(
          address.hasBeenAskedToLeave
        ),
        "Are you the person who pay the rental for this property?":
          booleanToYesNo(address.paysRent),
        "Reason for leaving this property": address.reasonForLeaving,
      };
    });

    // Occupant processing
    const occupants = data.occupants;
    const otherOccupants = occupants.map((occupant) => {
      return {
        "Tenant name": occupant.name,
        "Date of birth": formatDate(occupant.dob),
        "Relation to main tenant": occupant.relationToApplicant,
      };
    });

    const questions = [
      {
        "ADDITIONAL QUESTIONS": "",
        "Have you been evicted from a rental residence?": booleanToYesNo(
          data.beenEvicted
        ),
        "Have you missed rental payments in the past 12 months?":
          booleanToYesNo(data.missedPayment),
        "Have you ever refused to pay rent when due?": booleanToYesNo(
          data.refusedToPay
        ),
        "If you have answered YES to any of the above, please state your reasons and/or circumstances":
          data.reason,
      },
    ];

    // vehicle info
    const vehicle = data.carModel;
    const vehicleInfo = [
      {
        Make: vehicle.make,
        Model: vehicle.model,
        Color: vehicle.color,
        "License plate #": vehicle.licensePlate,
      },
    ];

    //Employment info
    const employment = data.employmentDetails;
    const employmentInfo = [
      {
        "Employment status": employment.employmentStatus,
        Employer: employment.employer,
        "Since (MM/DD/YY)": formatDate(employment.since),
        "Street/City": employment.streetCity,
        Province: employment.province,
        "Postion/Title": employment.positionTitle,
        "Work Supervisor": employment.workSupervisor,
        Phone: employment.workSupervisorPhone,
        "Other source of income": employment.otherSourcesOfIncome,
      },
    ];

    const reference = data.additionalReference;
    const referenceInfo = [
      {
        "Full Name": reference.name,
        "Relation to applicant": reference.relationship,
        Phone: reference.phoneNumber,
        "Email address": reference.email,
      },
    ];

    const emergencyContact = data.emergencyContact;
    const emergencyContactInfo = [
      {
        "Full Name": emergencyContact.name,
        "Relation to applicant": emergencyContact.relationship,
        Phone: emergencyContact.phoneNumber,
        "Email address": emergencyContact.email,
      },
    ];

    setOpenhouseVisit(data.shownApt);
    setTenantInfo(tenantInfo);
    setRentalHistoryInfo(rentalHistoryInfo);
    setQuestions(questions);
    setOtherOccupants(otherOccupants);
    setVehicleInfo(vehicleInfo);
    setEmploymentInfo(employmentInfo);
    setReferenceInfo(referenceInfo);
    setEmergencyContactInfo(emergencyContactInfo);
  };

  // Call the processing function when apartmentData changes
  useEffect(() => {
    if (applicationDetails) {
      processApplicationData(applicationDetails);
    }
  }, [applicationDetails]);

  // State to manage the modal open/close and input fields
  const [isEmailModalOpen, setEmailModalOpen] = useState(false);
  const [emailMessage, setEmailMessage] = useState(initialMessage);
  const [emailSubject, setEmailSubject] = useState(initialSubject);

  // Function to handle opening the modal
  const handleOpenEmailModal = () => {
    if (applicationDetails) {
      const personalizedMessage = initialMessage.replace(
        "<First Name>",
        `${applicationDetails.firstName} ${applicationDetails.lastName}`
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
      emails: [applicationDetails.email],
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
    applicationDetails && (
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
              {`${applicationDetails.firstName} ${applicationDetails.lastName}`}
            </Typography>
            <ChipNew
              typeId={applicationDetails.aptTypeId}
              marginLeft={"20px"}
            />
          </Grid>
          <Box mr={"10px"}>
            <CustomButton
              title={"Delete"}
              backgroundColor="red"
              color="#FCFCFC"
              fullWidth
              icon={<Delete />}
              handleClick={() => {
                handleDeleteApplication(
                  applicationDetails?.aptTypeId,
                  applicationDetails?._id
                );
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
              handleClick={handleOpenEmailModal}
            />
          </Box>
        </Box>

        <ApplicationInfoCard
          submissionDate={new Date(
            applicationDetails.applicationDate
          ).toLocaleDateString("en-US")}
          openhouseVisit={openhouseVisit}
          setOpenhouseVisit={setOpenhouseVisit}
          aptTypeId={applicationDetails.aptTypeId}
          roomId={applicationDetails._id}
        />

        <InfoCard title={"1. Personal Info"} data={tenantInfo} />
        <InfoCard title={"2. Rental History"} data={rentalHistoryInfo} />
        <InfoCard title={""} data={questions} />

        <InfoCard title={"3. Other Occupants"} data={otherOccupants} />
        <InfoCard title={"4. Vehicle Info"} data={vehicleInfo} />
        <InfoCard title={"5. Employment"} data={employmentInfo} />
        <InfoCard title={"6. Additional Reference"} data={referenceInfo} />
        <InfoCard title={"7. Emergency Contact"} data={emergencyContactInfo} />

        {/* CreditReportCard */}
        <Box mt={"30px"} ml={"5px"} pb={"60px"}>
          <Typography fontSize={20} fontWeight={700}>
            {"8. Credit Report"}
          </Typography>

          <Box mt={"20px"}>
            <CustomButton
              title={"View"}
              backgroundColor="#475BE8"
              color="#FCFCFC"
              icon={<VisibilityIcon />}
              handleClick={() =>
                fetchDocumentPreview(
                  applicationDetails.creditReport.documentName
                )
              }
            />
          </Box>
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
    )
  );
};

export default ApplicationDetails;
