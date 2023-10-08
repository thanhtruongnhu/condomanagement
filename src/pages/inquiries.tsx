import React from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { Typography } from "@mui/material";
import EngineeringIcon from "@mui/icons-material/Engineering";

function Inquiries() {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Box sx={{ width: "100%" }}>
      <LinearProgress color="error" variant="determinate" value={progress} />
      <Box m="20px" display="flex">
        <Typography fontSize={25} fontWeight={700} color="#11142D">
          {"  "} Under Construction...
        </Typography>
        <EngineeringIcon sx={{ fontSize: 30 }} />
      </Box>
    </Box>
  );
}

export default Inquiries;
