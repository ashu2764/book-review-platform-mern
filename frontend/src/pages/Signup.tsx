import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  CssBaseline,
  IconButton,
} from "@mui/material";
import axios from "axios";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post("http://localhost:5000/api/auth/signup", {
        username,
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err: any) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          height: "100vh",
          width: "100vw",
          background: "linear-gradient(135deg, #1e3c72, #2a5298, #4a90e2)",
          backgroundSize: "400% 400%",
          animation: "gradientShift 15s ease infinite",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
          position: "fixed",
          top: 0,
          left: 0,
          padding: 3,
          boxSizing: "border-box",
        }}
      >
        <IconButton
          onClick={() => navigate(-1)}
          sx={{
            position: "absolute",
            top: 24,
            left: 24,
            color: "#fff",
            fontSize: "2rem",
            "&:hover": { color: "#4a90e2" },
          }}
        >
          <ArrowBackIcon fontSize="large" />
        </IconButton>

        <Container maxWidth="sm">
          <Paper
            elevation={12}
            sx={{
              p: 5,
              borderRadius: 3,
              backgroundColor: "rgba(255, 255, 255, 0.97)",
              boxShadow: "0px 12px 30px rgba(0, 0, 0, 0.35)",
              backdropFilter: "blur(10px)",
              maxHeight: "calc(100vh - 80px)",
              overflowY: "auto",
            }}
          >
            <Typography
              variant="h4"
              align="center"
              gutterBottom
              sx={{
                color: "#1e3c72",
                fontWeight: 700,
                textTransform: "uppercase",
                mb: 4,
                letterSpacing: "0.05em",
              }}
            >
              Create an Account
            </Typography>

            <form onSubmit={handleSubmit}>
              <TextField
                label="Username"
                fullWidth
                margin="normal"
                variant="outlined"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                sx={{
                  "& .MuiInputBase-root": {
                    fontSize: "1.2rem",
                    height: "56px",
                  },
                  "& .MuiInputLabel-root": { fontSize: "1.1rem" },
                }}
              />
              <TextField
                label="Email"
                type="email"
                fullWidth
                margin="normal"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                sx={{
                  "& .MuiInputBase-root": {
                    fontSize: "1.2rem",
                    height: "56px",
                  },
                  "& .MuiInputLabel-root": { fontSize: "1.1rem" },
                }}
              />
              <TextField
                label="Password"
                type="password"
                fullWidth
                margin="normal"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                sx={{
                  "& .MuiInputBase-root": {
                    fontSize: "1.2rem",
                    height: "56px",
                  },
                  "& .MuiInputLabel-root": { fontSize: "1.1rem" },
                }}
              />
              {error && (
                <Typography
                  color="error"
                  align="center"
                  sx={{ mt: 2, fontSize: "1rem", fontWeight: 500 }}
                >
                  {error}
                </Typography>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 4,
                  py: 1.5,
                  backgroundColor: "#1e3c72",
                  "&:hover": {
                    backgroundColor: "#2a5298",
                  },
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                  borderRadius: 2,
                }}
              >
                Sign Up
              </Button>
              <Button
                fullWidth
                variant="outlined"
                sx={{
                  mt: 3,
                  py: 1.5,
                  color: "#4a90e2",
                  borderColor: "#4a90e2",
                  "&:hover": {
                    borderColor: "#2a5298",
                    color: "#2a5298",
                    backgroundColor: "rgba(74, 144, 226, 0.1)",
                  },
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                  borderRadius: 2,
                }}
                onClick={handleLoginRedirect}
              >
                Login Instead
              </Button>
            </form>
          </Paper>
        </Container>
      </Box>

      <style>
        {`
          html, body {
            margin: 0;
            padding: 0;
            height: 100%;
            overflow: hidden;
          }
          @keyframes gradientShift {
            0% { background-position: 0% 0%; }
            50% { background-position: 100% 100%; }
            100% { background-position: 0% 0%; }
          }
        `}
      </style>
    </>
  );
};

export default Signup;
