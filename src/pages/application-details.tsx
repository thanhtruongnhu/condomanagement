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
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectApplicationData } from "../store/applicationSlice";
import ChipNew from "../components/common/ChipNew";
import {
  Address,
  ApplicationData,
} from "../interfaces/application";
import formatDate from "../components/common/DateFormatter";
import { DataItem } from "../interfaces/common";

function booleanToYesNo(value: boolean): string {
  return value ? "Yes" : "No";
}

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
  const [emergencyContactInfo, setEmergencyContactInfo] = useState<DataItem[]>([]);

  // Mock function for useDelete (deleting property)
  const mutate = async ({ resource, id }: { resource: string; id: string }) => {
    // Mock success, you can add your own logic here
    console.log(`Deleted property with ID: ${id}`);
  };

  // Find the room details by matching the ID
  const applicationDetails = !applicationData
    ? null
    : applicationData.find((room: Room) => room._id === id);

  if (!applicationDetails) {
    // Handle the case where the room with the specified ID is not found
    return <div>Application not found</div>;
  }

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
            {`${applicationDetails.firstName} ${applicationDetails.lastName}`}
          </Typography>
          <ChipNew typeId={applicationDetails.aptTypeId} marginLeft={"20px"} />
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

      <InfoCard title={"1. Personal Info"} data={tenantInfo} />
      <InfoCard title={"2. Rental History"} data={rentalHistoryInfo} />
      <InfoCard title={""} data={questions} />

      <InfoCard title={"3. Other Occupants"} data={otherOccupants} />
      <InfoCard title={"4. Vehicle Info"} data={vehicleInfo} />
      <InfoCard title={"5. Employment"} data={employmentInfo} />
      <InfoCard title={"6. Additional Reference"} data={referenceInfo} />
      <InfoCard
        title={"7. Emergency Contact"}
        data={emergencyContactInfo}
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
