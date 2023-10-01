import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import { Box, Chip, Typography } from "@mui/material";
import { InfoCardProps } from "../../interfaces/common";
import { styled } from "@mui/material/styles";

const StyledTableRow = styled(TableRow)(({}) => ({
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const StyledTableContainer = styled(TableContainer)(({}) => ({
  border: "1px solid #DDDDDD" /* Border style and color */,
  borderRadius: "12px",
  marginTop: "20px",
}));

export default function InfoCard({ title, data }: InfoCardProps) {
  const renderTableCell = (value: string) => {
    if (value === "Scheduled") {
      return <Chip color="warning" label={value} size="small" />;
    }
    if (value === "Sent") {
      return <Chip color="success" label={value} size="small" />;
    }
    if (value === "Error") {
      return <Chip color="error" label={value} size="small" />;
    }
    // For other values, display the plain text
    return value;
  };

  return (
    <Box mt={"30px"}>
      <Box ml={"5px"}>
        <Typography fontSize={20} fontWeight={700}>
          {title}
        </Typography>
      </Box>
      {data.map((person, index) => (
        <StyledTableContainer key={index}>
          <Table
            size="small"
            aria-label={`a dense table for item ${index + 1}`}
          >
            <TableBody>
              {Object.entries(person).map(([key, value]) => (
                <StyledTableRow key={key}>
                  <TableCell
                    sx={{ fontSize: 13, fontWeight: 700 }}
                    component="th"
                    scope="row"
                  >
                    {key}
                  </TableCell>
                  <TableCell
                    height={"40px"}
                    align="right"
                    sx={{ fontSize: 16 }}
                  >
                    {renderTableCell(value)}
                  </TableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </StyledTableContainer>
      ))}
    </Box>
  );
}
