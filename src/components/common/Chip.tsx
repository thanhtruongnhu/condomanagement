import { Box, Typography } from "@mui/material";
import { Type } from "../../interfaces/common";

function Chip({ type, marginLeft }: Type) {
  const selectBackgroundColor = (type: string) => {
    switch (type) {
      case "Single A":
        return "#dadefa";
      case "Single B":
        return "#E8DBF8";
      case "Double A":
        return "#F8EBDB";
      case "Double B":
        return "#DBF8EA";
      case "Double C":
        return "#F6F8DB";
      default:
        return "#f50000"; // Red color to detect missing room type
    }
  };

  const selectTextColor = (type: string) => {
    switch (type) {
      case "Single A":
        return "#5563E2";
      case "Single B":
        return "#B555E2";
      case "Double A":
        return "#E2B255";
      case "Double B":
        return "#2AAF60";
      case "Double C":
        return "#CDC505";
      default:
        return "#f50000"; // Red color to detect missing room type
    }
  };

  const chipBackgroundColor = selectBackgroundColor(type);
  const chipTextColor = selectTextColor(type);
  return (
    <Box
      ml={marginLeft}
      px={1.5}
      py={0.5}
      borderRadius={1}
      bgcolor={chipBackgroundColor}
      height="fit-content"
    >
      <Typography fontSize={12} fontWeight={600} color={chipTextColor}>
        {type}
      </Typography>
    </Box>
  );
}

export default Chip;
