import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { DescriptionCardProps } from "../../interfaces/common";

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

function DescriptionCard({ data }: DescriptionCardProps) {
  return (
    <div>
      {data.map((item, index) => {
        // Extract the key and value from each object in the array
        const key = Object.keys(item)[0]; // Assuming each object has only one key
        const value = item[key];

        return (
          <StyledTableContainer>
            <Table>
              <TableBody>
                {/* Title Row */}
                <StyledTableRow>
                  <TableCell
                    sx={{ fontSize: 13, fontWeight: 700 }}
                    component="th"
                    scope="row"
                  >
                    {key}
                  </TableCell>
                </StyledTableRow>

                {/* Description Row */}
                <StyledTableRow>
                  <TableCell height="40px" align="left" sx={{ fontSize: 16 }}>
                    {value}
                  </TableCell>
                </StyledTableRow>
              </TableBody>
            </Table>
          </StyledTableContainer>
        );
      })}
    </div>
  );
}

export default DescriptionCard;
