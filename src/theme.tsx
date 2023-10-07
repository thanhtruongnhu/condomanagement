import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
  },
  breakpoints: {
    values: {
      xs: 0, // Mobile devices
      sm: 600, // Tablets
      md: 960, // Small screens, laptops
      lg: 1280, // Desktops
      xl: 1920, // Larger desktops
    },
  },
});

export default theme;
