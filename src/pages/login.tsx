import { styled } from "@mui/system";
import {
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { FormEvent, useState } from "react";

const Paper = styled("div")(({ theme }) => ({
  marginTop: theme.spacing(8),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

const Form = styled("form")(({ theme }) => ({
  width: "100%",
  marginTop: theme.spacing(1),
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2),
}));

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    try {
      // Fetch the token from the server
      const response = await fetch("https://globalsolusap.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
  
      if (!response.ok) {
        // Handle authentication failure
        console.error("Authentication failed:", response.statusText);
        localStorage.removeItem('token'); // Clear token from localStorage
        return;
      }
  
      // Assuming the server responds with a JSON object containing the token
      const data = await response.json();
      const token = data.token;
  
      // Set the token in localStorage
      localStorage.setItem('token', token);
  
      // Redirect to '/'
      // You should replace this with the actual path you want to redirect to
      // e.g., using the useNavigate hook from React Router
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      localStorage.removeItem('token'); // Clear token from localStorage
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Paper>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Form onSubmit={handleLogin}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <SubmitButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Sign In
          </SubmitButton>
        </Form>
      </Paper>
    </Container>
  );
};

export default Login;
