import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import {
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
  Switch,
  Typography,
} from "@mui/material";

function Welcome() {
  return (
    <Box mx={"20px"} mb={"40px"}>
      <Box
        mt={2.5}
        borderRadius="15px"
        pt={"30px"}
        pb={"30px"}
        px={"40px"}
        bgcolor="#fcfcfc"
      >
        <Typography fontSize={25} fontWeight={700} color="#11142d">
          Welcome to Management Dashboard! 👋
        </Typography>
        <Typography fontSize={18}>Version 1.0.1</Typography>
        <Typography fontSize={16} mt={2}>
          <strong>New Features:</strong>
          <ul>
            <li>
              Button to instantly convert application to existing tenant data
              (in Rooms tab){" "}
            </li>
            <li>
              Real-time analytics dashboard for monitoring applications,
              inquiries and wait list
            </li>

            <li>Real-time control for inventory availability</li>
          </ul>
        </Typography>
        <Typography fontSize={16} mt={2}>
          <strong>Improvements:</strong>
          <ul>
            <li>Hosted on Firebase with faster loading speed</li>
            <li>
              Enhanced security features with username and password
              authentication
            </li>
            <li>Improved navigation with a redesigned user interface</li>
            <li>
              Fixed minor bugs to make Cancel button in Room Edit page working
            </li>
          </ul>
        </Typography>
        <Typography fontSize={16} mt={2}>
          Developed by Solusap with ❤️
        </Typography>
      </Box>
    </Box>
  );
}

export default Welcome;
