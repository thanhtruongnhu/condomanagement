import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import { Box, Chip, Typography } from "@mui/material";
import { InfoCardProps } from "../../interfaces/common";
import { styled } from "@mui/material/styles";

const StyledTableContainer = styled(TableContainer)(({}) => ({
  border: "1px solid #DDDDDD" /* Border style and color */,
  borderRadius: "12px",
  marginTop: "20px",
}));

const StyledTableRow = styled(TableRow)(({}) => ({
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function InfoCard({ title, data }: InfoCardProps) {
  const renderTableCell = (value: string | undefined) => {
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

  function isTitleRow(
    value: string | undefined,
    key: string,
    innerIndex: number
  ) {
    if (!value && innerIndex === 0) {
      return true;
    }
    if (key === "LANDLORD") {
      return true;
    }
    if (key === "ANSWERS") {
      return true;
    }
  }

  return (
    <Box mt={"30px"}>
      <Box ml={"5px"}>
        <Typography fontSize={20} fontWeight={700}>
          {title}
        </Typography>
      </Box>
      {(data.length === 0) ? (
        <Typography fontSize={15} fontWeight={500} ml={"15px"} mt={"10px"}>
          {"There is no information for this section!"}
        </Typography>
      ) : (
        <>
          {data.map((item, index) => (
            <StyledTableContainer key={index}>
              <Table
                size="small"
                aria-label={`a dense table for item ${index + 1}`}
              >
                <TableBody>
                  {Object.entries(item).map(([key, value], innerIndex) =>
                    isTitleRow(value, key, innerIndex) ? (
                      // Header row
                      <StyledTableRow
                        key={key}
                        sx={{ backgroundColor: "#F6F6F6" }}
                      >
                        <TableCell
                          height="40px"
                          sx={{ fontSize: 11, fontWeight: 700 }}
                        >
                          {key}
                        </TableCell>
                        <TableCell />
                      </StyledTableRow>
                    ) : (
                      <StyledTableRow key={key}>
                        <TableCell
                          sx={{ fontSize: 13, fontWeight: 700 }}
                          component="th"
                          scope="row"
                        >
                          {key}
                        </TableCell>
                        <TableCell
                          height="40px"
                          align="right"
                          // width={"750px"}
                          sx={{ fontSize: 16 }}
                        >
                          {renderTableCell(value)}
                        </TableCell>
                      </StyledTableRow>
                    )
                  )}
                </TableBody>
              </Table>
            </StyledTableContainer>
          ))}
        </>
      )}
    </Box>
  );
}
