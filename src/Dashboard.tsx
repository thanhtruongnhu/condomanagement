import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Box from "@mui/material/Box";
import { mainListItems } from "./components/dashboard/listItems";
import Rooms from "./pages/rooms";
import Applications from "./pages/applications";
import Inventory from "./pages/inventory";
import CreateRoom from "./pages/create-room";
import RoomDetails from "./pages/room-details";
import EditRoom from "./pages/edit-room";
import Inquiries from "./pages/inquiries";
import Waitlist from "./pages/waitlist";
import ApplicationDetails from "./pages/application-details";
import InquiryDetails from "./pages/inquiry-details";
import WaitlistDetails from "./pages/waitlist-details";
import { useDispatch, useSelector } from "react-redux";
import { updateToken, clearToken } from "./store/tokenSlice"; // Adjust the path accordingly
import { selectAptTypeData, updateAptTypeData } from "./store/aptTypeSlice";
import { Navigation } from "./components/layout/Navigation";
import Welcome from "./pages/welcome";

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Dashboard() {
  const [open, setOpen] = React.useState(true);
  const aptTypeData = useSelector(selectAptTypeData);
  const token = localStorage.getItem("token"); // Adjust the state structure accordingly

  const toggleDrawer = () => {
    setOpen(!open);
  };
  const dispatch = useDispatch();

  React.useEffect(() => {
    const fetchApartmentTypeData = async () => {
      try {
        const response = await fetch(
          "https://globalsolusap.com/apartment/getAllAptType",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Include the token in the Authorization header
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        // Set the mapped data to 'rows'
        dispatch(updateAptTypeData(data));
      } catch (error) {
        console.error("Error fetching apartment Type data:", error);
        // Handle errors, possibly clear token if unauthorized, etc.
        dispatch(clearToken());
      }
    };

    if (token) {
      fetchApartmentTypeData();
    }
  }, []);

  return (
    aptTypeData && (
      <ThemeProvider theme={defaultTheme}>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <Navigation />
          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === "light"
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              height: "100vh",
              overflow: "auto",
            }}
          >
            {/* Toolbar component is a gap */}
            <Toolbar />
            <Routes>
              {/* <Route path="/dashboard" element={<Dash />} /> */}
              <Route path="/" element={<Welcome />} />
              <Route path="/rooms" element={<Rooms />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/applications" element={<Applications />} />
              <Route path="/inquiries" element={<Inquiries />} />
              <Route path="/waitlist" element={<Waitlist />} />
              <Route path="/rooms/create" element={<CreateRoom />} />
              <Route path="/rooms/show/:id" element={<RoomDetails />} />
              <Route path="/rooms/edit/:id" element={<EditRoom />} />
              <Route
                path="/applications/:id"
                element={<ApplicationDetails />}
              />
              <Route path="/inquiries/:id" element={<InquiryDetails />} />
              <Route path="/waitlist/:id" element={<WaitlistDetails />} />
            </Routes>
          </Box>
        </Box>
      </ThemeProvider>
    )
  );
}
