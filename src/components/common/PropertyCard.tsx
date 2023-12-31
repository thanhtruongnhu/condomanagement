import Place from "@mui/icons-material/Place";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import { PropertyCardProps } from "../../interfaces/property";
import Chip from "./Chip";

const PropertyCard = ({
  id,
  title,
  tenant,
  type,
  photo,
  expiry,
}: PropertyCardProps) => {
  return (
    <Card
      component={Link}
      to={`/rooms/show/${id}`}
      sx={{
        maxWidth: "330px",
        padding: "10px",
        "&:hover": {
          boxShadow: "0 22px 45px 2px rgba(176, 176, 176, 0.1)",
        },
        cursor: "pointer",
        textDecoration: "none",
      }}
      elevation={0}
    >
      <CardMedia
        component="img"
        width="100%"
        height={210}
        image={photo}
        alt="card image"
        sx={{ borderRadius: "10px" }}
      />
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          gap: "10px",
          paddingX: "5px",
        }}
      >
        <Stack direction="column" gap={1}>
          <Typography fontSize={16} fontWeight={500} color="#11142d">
            Room {title}
          </Typography>
          <Stack direction="row" gap={0.5} alignItems="flex-start">
            <PersonPinIcon
              sx={{
                fontSize: 18,
                color: "#11142d",
                // marginTop: 0.1,
              }}
            />
            <Typography fontSize={14} color="#808191">
              {tenant}
            </Typography>
          </Stack>
          <Stack direction="row" gap={0.5} alignItems="flex-start">
            <CalendarMonthIcon
              sx={{
                fontSize: 18,
                color: "#11142d",
                // marginTop: 0.1,
              }}
            />
            <Typography fontSize={14} color="#808191">
              End of contract: {expiry}
            </Typography>
          </Stack>
        </Stack>

        <Chip type={type} marginLeft={"0"} />
      </CardContent>
    </Card>
  );
};

export default PropertyCard;
