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

const mockOtherOccupants = [
  {
    "Tenant name": "Jane Doe",
    "Date of birth": "2023-10-02T04:00:00.000Z",
    "Relation to main tenant": "Spouse",
  },
  {
    "Tenant name": "Jinx Doe",
    "Date of birth": "2023-10-03T04:00:00.000Z",
    "Relation to main tenant": "Daughter",
  },
  {
    "Tenant name": "Jack Doe",
    "Date of birth": "2023-10-04T04:00:00.000Z",
    "Relation to main tenant": "Son",
  },
];

const FormEditRoom = ({
  type,
  // register,
  // handleSubmit,
  // handleImageChange,
  // formLoading,
  // onFinishHandler,
  propertyDetails,
}: FormProps) => {
  //   const isSmallScreen = useMediaQuery("(max-width:600px)");
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery(Theme.breakpoints.down("sm"));
  const [dobMain, setDobMain] = React.useState<Dayjs | null>(null);
  const textColor = "#919191";

  return (
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
                  {propertyDetails.title}
                </Typography>

                <Chip type={propertyDetails.propertyType} marginLeft={"20px"} />
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
                  // {...register("title", { required: true })}
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
                  // {...register("title", { required: true })}
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
                  value={dobMain}
                  onChange={(newValue) => setDobMain(newValue)}
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
                  // {...register("title", { required: true })}
                />
              </FormControl>
            </Stack>

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
                    Move-in date
                  </FormHelperText>
                </FormControl>
                <DatePicker
                  value={dobMain}
                  onChange={(newValue) => setDobMain(newValue)}
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
                  value={dobMain}
                  onChange={(newValue) => setDobMain(newValue)}
                />
              </Stack>
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
                // {...register("title", { required: true })}
              />
            </FormControl>

            {/* 3. Other Occupants */}
            <Box mt={"20px"}>
              <Typography fontSize={20} fontWeight={700}>
                {"3. Other Occupants"}
              </Typography>
            </Box>

            <div>
              {mockOtherOccupants.length > 0 ? (
                mockOtherOccupants.map((occupant, index) => (
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
                          value={occupant["Tenant name"]}
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
                          onChange={(newValue) => console.log(newValue)}
                          defaultValue={dayjs(occupant["Date of birth"])}
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
                          Relation to main tenant
                        </FormHelperText>
                        <TextField
                          fullWidth
                          required
                          id={`relation-to-main-tenant-${index}`}
                          color="info"
                          variant="outlined"
                          value={occupant["Relation to main tenant"]}
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
                  Make
                </FormHelperText>
                <TextField
                  fullWidth
                  required
                  id="outlined-basic"
                  color="info"
                  variant="outlined"
                  // {...register("title", { required: true })}
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
                  // {...register("title", { required: true })}
                />
              </FormControl>
            </Stack>

            <Stack direction={isSmallScreen ? "column" : "row"} gap={4}>
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
                  // {...register("title", { required: true })}
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
                  // {...register("title", { required: true })}
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
              justifyContent={isSmallScreen ? "flex-start" : "space-between"} // Adjust alignment based on screen size
            >
              <CustomButton
                type="submit"
                title={"Submit"}
                backgroundColor="#475be8"
                color="#fcfcfc"
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
  );
};

export default FormEditRoom;
