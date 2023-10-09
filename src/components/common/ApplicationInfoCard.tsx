import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import {
  Box,
  FormControlLabel,
  FormGroup,
  Switch,
  Typography,
} from "@mui/material";
import { ApplicationInfoCardProps } from "../../interfaces/common";
import { styled } from "@mui/material/styles";

const StyledTableRow = styled(TableRow)(({}) => ({
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const StyledTableContainer = styled(TableContainer)(({}) => ({
  border: "1px solid #DDDDDD",
  borderRadius: "12px",
  marginTop: "20px",
}));

export default function ApplicationInfoCard({
  submissionDate,
  openhouseVisit,
  setOpenhouseVisit, // Function to set the state
}: ApplicationInfoCardProps) {
  const handleSwitchChange = () => {
    const currentOpenHouseVisit = !openhouseVisit;
    setOpenhouseVisit(currentOpenHouseVisit);
  };

  return (
    <Box>
      <StyledTableContainer>
        <Table size="small" aria-label={`a dense table for application info`}>
          <TableBody>
            {/* Submission Date */}
            <StyledTableRow key={1}>
              <TableCell
                sx={{ fontSize: 13, fontWeight: 700 }}
                component="th"
                scope="row"
              >
                {"Submission Date"}
              </TableCell>
              <TableCell height={"40px"} align="right" sx={{ fontSize: 16 }}>
                {submissionDate}
              </TableCell>
            </StyledTableRow>

            {/* Open-house visit switch */}
            <StyledTableRow key={2}>
              <TableCell
                sx={{ fontSize: 13, fontWeight: 700 }}
                component="th"
                scope="row"
              >
                {"Open-house visit"}
              </TableCell>
              <TableCell height={"40px"} align="right" sx={{ fontSize: 16 }}>
                <Box
                  display="flex"
                  justifyContent="flex-end"
                  alignItems="center"
                  height="100%"
                >
                  <FormControlLabel
                    control={
                      <Switch
                        checked={openhouseVisit} // Reflect the current value
                        onChange={handleSwitchChange} // Control the state
                      />
                    }
                    label={openhouseVisit ? "Visited" : "Not yet"} // Label reflects the state
                  />
                </Box>
              </TableCell>
            </StyledTableRow>
          </TableBody>
        </Table>
      </StyledTableContainer>
    </Box>
  );
}
