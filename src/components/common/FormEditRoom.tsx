import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { Grid, useMediaQuery } from "@mui/material";
import * as React from "react";
import { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { FormProps } from "../../interfaces/common";
import CustomButton from "./CustomButton";
import { useNavigate, useParams } from "react-router-dom";
import Theme from "../../theme";
import { Add, Delete, PublishedWithChangesSharp } from "@mui/icons-material";
import PublishIcon from "@mui/icons-material/Publish";
import Chip from "./Chip";
import { ApartmentData } from "../../interfaces/property";

const FormEditRoom = ({ type, propertyDetails }: FormProps) => {
  const navigate = useNavigate();
  // console.log("roomData::", propertyDetails);

  const isSmallScreen = useMediaQuery(Theme.breakpoints.down("sm"));
  const [dobMain, setDobMain] = React.useState<Dayjs | null>(null);

  const [formData, setFormData] = React.useState<ApartmentData | null>(
    propertyDetails
  );

  React.useEffect(() => {
    if (propertyDetails !== null) {
      setFormData(propertyDetails);
    }
  }, [propertyDetails]);

  // const handleFieldChangeBACKUP = (fieldName: string, value: string) => {
  //   if (formData) {
  //     setFormData((prevData) => {
  //       if (prevData) {
  //         return {
  //           ...prevData,
  //           [fieldName]: value,
  //         };
  //       }
  //       return prevData;
  //     });
  //   }
  // };

  // Function to handle form field changes
  const handleFieldChange = (fieldName: string, value: string) => {
    if (formData) {
      setFormData((prevData) => {
        if (prevData) {
          const updatedData = { ...prevData };
          const fieldPath = fieldName.split("."); // Split fieldName into parts
          let currentObj: any = updatedData; // Use the appropriate type instead of 'any' if possible

          for (let i = 0; i < fieldPath.length; i++) {
            const propertyName = fieldPath[i];
            if (i === fieldPath.length - 1) {
              // Update the last property in the fieldPath
              currentObj[propertyName] = value;
            } else {
              // Traverse to the next level
              if (!currentObj[propertyName]) {
                // Create the next level object if it doesn't exist
                currentObj[propertyName] = {};
              }
              currentObj = currentObj[propertyName];
            }
          }
          return updatedData;
        }
        return prevData;
      });
    }
  };

  // Function to handle the PUT request
  const handleUpdateRoom = async () => {
    // event.preventDefault(); // Prevent the default form submission

    console.log("roomData::", formData);
    try {
      const response = await fetch(
        `YOUR_API_ENDPOINT/${formData ? formData._id : 500}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error fetching apartment type data:", error);
    }
  };

  return (
    <React.Fragment>
      {propertyDetails && formData ? (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Box mx={"20px"} mb={"40px"}>
            <Box
              mt={2.5}
              borderRadius="15px"
              pt={"0.5px"}
              pb={"30px"}
              px={"40px"}
              bgcolor="#fcfcfc"
            >
              <form
                style={{
                  marginTop: "20px",
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
                // onSubmit={handleSubmit(onFinishHandler)}
              >
                <Typography fontSize={25} fontWeight={700} color="#11142d">
                  {type} a Room
                </Typography>

                {/* Edit Room Header */}
                <Box
                  mt="-10px"
                  display="flex"
                  bgcolor="#F6F6F6"
                  borderRadius={3} // Adjust the value to control the roundness of the corners
                  p={1} // Optional: Add padding to the box content
                >
                  <Grid container alignItems="center">
                    <Typography
                      ml={"10px"}
                      fontSize={20}
                      fontWeight={700}
                      color="#11142D"
                    >
                      {`Room ${propertyDetails.apartmentNumber}`}
                    </Typography>

                    <Chip
                      type={propertyDetails.apartmentType.aptCode}
                      marginLeft={"20px"}
                    />
                  </Grid>
                </Box>

                {/* 1. Tenant Info */}
                <Box mt={"20px"}>
                  <Typography fontSize={20} fontWeight={700}>
                    {"1. Tenant Info"}
                  </Typography>
                </Box>

                <Stack direction={isSmallScreen ? "column" : "row"} gap={4}>
                  <FormControl sx={{ flex: 1 }} fullWidth>
                    <FormHelperText
                      sx={{
                        fontWeight: 500,
                        margin: "10px 0",
                        fontSize: 16,
                        color: "#11142d",
                      }}
                    >
                      First name
                    </FormHelperText>
                    <TextField
                      fullWidth
                      required
                      id="outlined-basic"
                      color="info"
                      variant="outlined"
                      value={formData.tenants[0].firstName}
                      // onChange={(e) =>
                      //   handleNestedFieldChange("firstName", e.target.value)
                      // }
                      onChange={(e) =>
                        handleFieldChange(`tenants.0.firstName`, e.target.value)
                      }
                    />
                  </FormControl>
                  <FormControl sx={{ flex: 1 }} fullWidth>
                    <FormHelperText
                      sx={{
                        fontWeight: 500,
                        margin: "10px 0",
                        fontSize: 16,
                        color: "#11142d",
                      }}
                    >
                      Last name
                    </FormHelperText>
                    <TextField
                      fullWidth
                      required
                      id="outlined-basic"
                      color="info"
                      variant="outlined"
                      value={formData.tenants[0].lastName}
                      // onChange={(e) =>
                      //   handleNestedFieldChange("lastName", e.target.value)
                      // }
                      onChange={(e) =>
                        handleFieldChange(`tenants.0.lastName`, e.target.value)
                      }
                    />
                  </FormControl>
                </Stack>

                <Stack direction={isSmallScreen ? "column" : "row"} gap={4}>
                  {/* DOB main tenant */}
                  <Stack flex={1} direction={"column"}>
                    <FormControl>
                      <FormHelperText
                        sx={{
                          fontWeight: 500,
                          margin: "10px 0",
                          fontSize: 16,
                          color: "#11142d",
                        }}
                      >
                        Date of birth
                      </FormHelperText>
                    </FormControl>
                    <DatePicker
                      defaultValue={dayjs(formData.tenants[0].dob)}
                      // onChange={(newValue) =>
                      //   handleNestedFieldChange(
                      //     "dob",
                      //     newValue ? newValue.format() : ""
                      //   )
                      // }
                      onChange={(newValue) =>
                        handleFieldChange(
                          `tenants.0.dob`,
                          newValue ? newValue.format() : ""
                        )
                      }
                    />
                  </Stack>
                  <FormControl sx={{ flex: 1 }} fullWidth>
                    <FormHelperText
                      sx={{
                        fontWeight: 500,
                        margin: "10px 0",
                        fontSize: 16,
                        color: "#11142d",
                      }}
                    >
                      Phone number
                    </FormHelperText>
                    <TextField
                      fullWidth
                      required
                      id="outlined-basic"
                      color="info"
                      variant="outlined"
                      value={formData.tenants[0].phoneNumber}
                      // onChange={(e) =>
                      //   handleNestedFieldChange("phoneNumber", e.target.value)
                      // }
                      onChange={(e) =>
                        handleFieldChange(
                          `tenants.0.phoneNumber`,
                          e.target.value
                        )
                      }
                    />
                  </FormControl>
                </Stack>
                <FormControl sx={{ flex: 1 }} fullWidth>
                  <FormHelperText
                    sx={{
                      fontWeight: 500,
                      margin: "10px 0",
                      fontSize: 16,
                      color: "#11142d",
                    }}
                  >
                    Email address
                  </FormHelperText>
                  <TextField
                    fullWidth
                    required
                    id="outlined-basic"
                    color="info"
                    variant="outlined"
                    value={formData.tenants[0].email}
                    // onChange={(e) =>
                    //   handleNestedFieldChange("email", e.target.value)
                    // }
                    onChange={(e) =>
                      handleFieldChange(`tenants.0.email`, e.target.value)
                    }
                  />
                </FormControl>

                {/* 2. Contract Info */}
                <Box mt={"20px"}>
                  <Typography fontSize={20} fontWeight={700}>
                    {"2. Contract Info"}
                  </Typography>
                </Box>
                <Stack direction={isSmallScreen ? "column" : "row"} gap={4}>
                  {/* DOB main tenant */}
                  <Stack flex={1} direction={"column"}>
                    <FormControl>
                      <FormHelperText
                        sx={{
                          fontWeight: 500,
                          margin: "10px 0",
                          fontSize: 16,
                          color: "#11142d",
                        }}
                      >
                        Contract start date
                      </FormHelperText>
                    </FormControl>
                    <DatePicker
                      defaultValue={dayjs(formData.contractStartDate)}
                      // onChange={(newValue) =>
                      //   handleFieldChange(
                      //     "contractStartDate",
                      //     newValue ? newValue.format() : ""
                      //   )
                      // }
                      onChange={(newValue) =>
                        handleFieldChange(
                          `contractStartDate`,
                          newValue ? newValue.format() : ""
                        )
                      }
                    />
                  </Stack>
                  <Stack flex={1} direction={"column"}>
                    <FormControl>
                      <FormHelperText
                        sx={{
                          fontWeight: 500,
                          margin: "10px 0",
                          fontSize: 16,
                          color: "#11142d",
                        }}
                      >
                        End-of-contract date
                      </FormHelperText>
                    </FormControl>
                    <DatePicker
                      defaultValue={dayjs(formData.contractEndDate)}
                      // onChange={(newValue) =>
                      //   handleFieldChange(
                      //     "contractEndDate",
                      //     newValue ? newValue.format() : ""
                      //   )
                      // }

                      onChange={(newValue) =>
                        handleFieldChange(
                          `contractEndDate`,
                          newValue ? newValue.format() : ""
                        )
                      }
                    />
                  </Stack>
                </Stack>

                <Stack direction={isSmallScreen ? "column" : "row"} gap={4}>
                  <FormControl sx={{ flex: 1 }} fullWidth>
                    <FormHelperText
                      sx={{
                        fontWeight: 500,
                        margin: "10px 0",
                        fontSize: 16,
                        color: "#11142d",
                      }}
                    >
                      Rental
                    </FormHelperText>
                    <TextField
                      fullWidth
                      required
                      id="outlined-basic"
                      color="info"
                      variant="outlined"
                      value={formData.currentRent}
                      onChange={(e) =>
                        handleFieldChange(`currentRent`, e.target.value)
                      }
                    />
                  </FormControl>
                  <FormControl sx={{ flex: 1 }} fullWidth>
                    <FormHelperText
                      sx={{
                        fontWeight: 500,
                        margin: "10px 0",
                        fontSize: 16,
                        color: "#11142d",
                      }}
                    >
                      Deposit
                    </FormHelperText>
                    <TextField
                      fullWidth
                      required
                      id="outlined-basic"
                      color="info"
                      variant="outlined"
                      value={formData.depositAmount}
                      onChange={(e) =>
                        handleFieldChange(`depositAmount`, e.target.value)
                      }
                    />
                  </FormControl>
                </Stack>

                {/* 3. Other Occupants */}
                <Box mt={"20px"}>
                  <Typography fontSize={20} fontWeight={700}>
                    {"3. Other Occupants"}
                  </Typography>
                </Box>

                <div>
                  {formData.tenants[0].occupants.length > 0 ? (
                    formData.tenants[0].occupants.map((occupant, index) => (
                      <>
                        <Stack
                          key={index}
                          direction={isSmallScreen ? "column" : "row"}
                          gap={4}
                        >
                          <FormControl sx={{ flex: 1 }} fullWidth>
                            <FormHelperText
                              sx={{
                                fontWeight: 500,
                                margin: "10px 0",
                                fontSize: 16,
                                color: "#11142d",
                              }}
                            >
                              Occupant {index + 1}'s full name
                            </FormHelperText>
                            <TextField
                              fullWidth
                              required
                              id={`tenant-name-${index}`}
                              color="info"
                              variant="outlined"
                              value={occupant.name}
                              onChange={(e) =>
                                handleFieldChange(
                                  `tenants.0.occupants.${index}.name`,
                                  e.target.value
                                )
                              }
                            />
                          </FormControl>
                          <Stack flex={1} direction="column">
                            <FormControl>
                              <FormHelperText
                                sx={{
                                  fontWeight: 500,
                                  margin: "10px 0",
                                  fontSize: 16,
                                  color: "#11142d",
                                }}
                              >
                                Date of birth
                              </FormHelperText>
                            </FormControl>
                            <DatePicker
                              //   value={dobMain} // You may want to set this to the occupant's DOB
                              // onChange={(newValue) => console.log(newValue)}
                              defaultValue={dayjs(occupant.dob)}
                              onChange={(newValue) =>
                                handleFieldChange(
                                  `tenants.0.occupants.${index}.dob`,
                                  newValue ? newValue.format() : ""
                                )
                              }
                            />
                          </Stack>
                        </Stack>

                        <Stack
                          direction={isSmallScreen ? "column" : "row"}
                          gap={4}
                        >
                          <FormControl sx={{ flex: 1 }} fullWidth>
                            <FormHelperText
                              sx={{
                                fontWeight: 500,
                                margin: "10px 0",
                                fontSize: 16,
                                color: "#11142d",
                              }}
                            >
                              Relation to main tenant
                            </FormHelperText>
                            <TextField
                              fullWidth
                              required
                              id={`relation-to-main-tenant-${index}`}
                              color="info"
                              variant="outlined"
                              value={occupant.relationToApplicant}
                              onChange={(e) =>
                                handleFieldChange(
                                  `tenants.0.occupants.${index}.relationToApplicant`,
                                  e.target.value
                                )
                              }
                            />
                          </FormControl>
                          <Box mt={"50px"}>
                            <CustomButton
                              title={"Delete occupant"}
                              backgroundColor="#e84747"
                              color="#FCFCFC"
                              fullWidth
                              icon={<Delete />}
                              handleClick={() => {}}
                            />
                          </Box>
                        </Stack>
                      </>
                    ))
                  ) : (
                    <div>(There is no other occupant)</div>
                  )}
                </div>

                <CustomButton
                  title={"Add occupant"}
                  backgroundColor="#40cf38"
                  color="#FCFCFC"
                  icon={<Add />}
                  handleClick={() => {}}
                />

                {/* 4. Vehicle Info */}
                <Box mt={"20px"}>
                  <Typography fontSize={20} fontWeight={700}>
                    {"4. Vehicle Info"}
                  </Typography>
                </Box>

                <div>
                  {formData.tenants[0].carModel.length > 0 ? (
                    formData.tenants[0].carModel.map((car, index) => (
                      <>
                        <Stack
                          direction={isSmallScreen ? "column" : "row"}
                          gap={4}
                        >
                          <FormControl sx={{ flex: 1 }} fullWidth>
                            <FormHelperText
                              sx={{
                                fontWeight: 500,
                                margin: "10px 0",
                                fontSize: 16,
                                color: "#11142d",
                              }}
                            >
                              Vehicle {index + 1}'s Make
                            </FormHelperText>
                            <TextField
                              fullWidth
                              required
                              id="outlined-basic"
                              color="info"
                              variant="outlined"
                              value={car.make}
                              onChange={(e) =>
                                handleFieldChange(
                                  `tenants.0.carModel.${index}.make`,
                                  e.target.value
                                )
                              }
                            />
                          </FormControl>
                          <FormControl sx={{ flex: 1 }} fullWidth>
                            <FormHelperText
                              sx={{
                                fontWeight: 500,
                                margin: "10px 0",
                                fontSize: 16,
                                color: "#11142d",
                              }}
                            >
                              Model
                            </FormHelperText>
                            <TextField
                              fullWidth
                              required
                              id="outlined-basic"
                              color="info"
                              variant="outlined"
                              value={car.model}
                              onChange={(e) =>
                                handleFieldChange(
                                  `tenants.0.carModel.${index}.model`,
                                  e.target.value
                                )
                              }
                            />
                          </FormControl>
                        </Stack>

                        <Stack
                          direction={isSmallScreen ? "column" : "row"}
                          gap={4}
                        >
                          {/* DOB main tenant */}
                          <FormControl sx={{ flex: 1 }} fullWidth>
                            <FormHelperText
                              sx={{
                                fontWeight: 500,
                                margin: "10px 0",
                                fontSize: 16,
                                color: "#11142d",
                              }}
                            >
                              Color
                            </FormHelperText>
                            <TextField
                              fullWidth
                              required
                              id="outlined-basic"
                              color="info"
                              variant="outlined"
                              value={car.color}
                              onChange={(e) =>
                                handleFieldChange(
                                  `tenants.0.carModel.${index}.color`,
                                  e.target.value
                                )
                              }
                            />
                          </FormControl>
                          <FormControl sx={{ flex: 1 }} fullWidth>
                            <FormHelperText
                              sx={{
                                fontWeight: 500,
                                margin: "10px 0",
                                fontSize: 16,
                                color: "#11142d",
                              }}
                            >
                              License plate#
                            </FormHelperText>
                            <TextField
                              fullWidth
                              required
                              id="outlined-basic"
                              color="info"
                              variant="outlined"
                              value={car.licensePlate}
                              onChange={(e) =>
                                handleFieldChange(
                                  `tenants.0.carModel.${index}.licensePlate`,
                                  e.target.value
                                )
                              }
                            />
                          </FormControl>
                          <Box mt={"50px"}>
                            <CustomButton
                              title={"Delete vehice"}
                              backgroundColor="#e84747"
                              color="#FCFCFC"
                              fullWidth
                              icon={<Delete />}
                              handleClick={() => {}}
                            />
                          </Box>
                        </Stack>
                      </>
                    ))
                  ) : (
                    <div>(There is no vehicle.)</div>
                  )}
                </div>

                {/* 5. Credit Report */}
                <Box mt={"20px"}>
                  <Typography fontSize={20} fontWeight={700}>
                    {"5. Credit Report"}
                  </Typography>
                </Box>
                <Box>
                  <CustomButton
                    title={"Upload"}
                    backgroundColor="#40cf38"
                    color="#FCFCFC"
                    icon={<PublishIcon />}
                    handleClick={() => {}}
                  />
                </Box>

                {/* Submit & Cancel buttons */}
                <Stack
                  mt={"100px"}
                  direction={isSmallScreen ? "column" : "row"}
                  gap={4}
                  justifyContent={
                    isSmallScreen ? "flex-start" : "space-between"
                  } // Adjust alignment based on screen size
                >
                  <CustomButton
                    type="submit"
                    title={"Submit"}
                    backgroundColor="#475be8"
                    color="#fcfcfc"
                    handleClick={handleUpdateRoom}
                  />
                  <CustomButton
                    type="submit"
                    title={"Cancel"}
                    backgroundColor="#e84747"
                    color="#fcfcfc"
                  />
                </Stack>
              </form>
            </Box>
          </Box>
        </LocalizationProvider>
      ) : (
        <div>Loading...</div>
      )}
    </React.Fragment>
  );
};

export default FormEditRoom;
