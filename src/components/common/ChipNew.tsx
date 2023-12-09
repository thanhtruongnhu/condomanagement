import { Box, Typography } from "@mui/material";
import { Type, TypeNew } from "../../interfaces/common";
import getAptType from "./getAptType";

function ChipNew({ typeId, marginLeft }: TypeNew) {
  const selectBackgroundColor = (type: string) => {
    switch (typeId) {
      case "652423bb11b2d3123e9e93e7":
        return "#dadefa";
      case "652423bb11b2d3123e9e93e8":
        return "#E8DBF8";
      case "652423bb11b2d3123e9e93e9":
        return "#F8EBDB";
      case "652423bb11b2d3123e9e93ea":
        return "#DBF8EA";
      case "652423bb11b2d3123e9e93eb":
        return "#F6F8DB";
      default:
        return "#f50000"; // Red color to detect missing room type
    }
  };

  const selectTextColor = (type: string) => {
    switch (typeId) {
      case "652423bb11b2d3123e9e93e7":
        return "#5563E2";
      case "652423bb11b2d3123e9e93e8":
        return "#B555E2";
      case "652423bb11b2d3123e9e93e9":
        return "#E2B255";
      case "652423bb11b2d3123e9e93ea":
        return "#2AAF60";
      case "652423bb11b2d3123e9e93eb":
        return "#CDC505";
      default:
        return "#fffff"; // black color to detect missing room type
    }
  };

  const type = getAptType(typeId);
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

export default ChipNew;
