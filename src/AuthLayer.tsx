import React, { useEffect } from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useNavigate,
} from "react-router-dom";
import Dashboard from "./Dashboard";
import Login from "./pages/login"; // Assuming you have a Login component

interface ProtectedRouteProps {
  element: React.ComponentType<any>;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  element: Element,
}) => {
  const navigate = useNavigate();
  const storedToken = localStorage.getItem("token");
  useEffect(() => {
    const checkAuthentication = async () => {
      if (storedToken) {
        try {
          // Send a request to verify authentication using fetch
          const response = await fetch("https://globalsolusap.com/protected", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          });

          // Check the status code
          if (response.ok) {
            // User is authenticated
            return;
          }
        } catch (error) {
          localStorage.removeItem("token"); // Clear token from localStorage
          // Handle errors, e.g., token expired or request failed
          console.error("Authentication failed:", error);
          // Clear the token in case of authentication failure
        }
      }
      navigate("/login");

      // No token or authentication failed, redirect to login
    };

    checkAuthentication();
  }, [navigate, storedToken]);

  // Render the component only if the token is valid
  return <>{Element && <Element />}</>;
};

const AuthLayer = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<ProtectedRoute element={Dashboard} />} />
      </Routes>
    </Router>
  );
};

export default AuthLayer;
