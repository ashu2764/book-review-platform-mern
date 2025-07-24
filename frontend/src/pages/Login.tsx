import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  Paper,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";
import axios from "axios";
import ArrowBackIcon from "@mui/icons-material/ArrowBack"; // For back navigation (optional)

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  const handleSignUpRedirect = () => {
    navigate("/signup");
  };

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          height: "100vh",
          width: "100vw",
          background: "linear-gradient(135deg, #1e3c72, #2a5298, #4a90e2)", // Enhanced gradient
          backgroundSize: "400% 400%",
          animation: "gradientShift 15s ease infinite", // Subtle animation
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          overflow: "hidden", // Prevent overflow
        }}
      >
        {/* Optional back button */}
        <IconButton
          onClick={() => navigate(-1)}
          sx={{
            position: "absolute",
            top: 20,
            left: 20,
            color: "#fff",
            "&:hover": { color: "#4a90e2" },
          }}
        >
          <ArrowBackIcon />
        </IconButton>

        <Container maxWidth="sm">
          <Paper
            elevation={12} // Increased elevation for a more pronounced shadow
            sx={{
              padding: 6, // Increased padding for a roomier feel
              borderRadius: 2, // Slightly reduced radius for a modern look
              backgroundColor: "rgba(255, 255, 255, 0.95)", // Slight transparency
              boxShadow: "0px 15px 40px rgba(0, 0, 0, 0.4)", // Deeper shadow
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              backdropFilter: "blur(10px)", // Subtle glassmorphism effect
            }}
          >
            <Typography
              variant="h3" // Larger heading
              align="center"
              gutterBottom
              sx={{
                color: "#1e3c72",
                fontWeight: 700,
                mb: 4,
                textTransform: "uppercase",
                letterSpacing: 1.5,
                fontFamily: "'Roboto', sans-serif",
              }}
            >
              Welcome Back
            </Typography>
            <form onSubmit={handleSubmit} style={{ width: "100%" }}>
              <TextField
                label="Email"
                type="email"
                fullWidth
                margin="normal"
                variant="outlined" // Outlined for a modern look
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#4a90e2" },
                    "&:hover fieldset": { borderColor: "#2a5298" },
                    "&.Mui-focused fieldset": { borderColor: "#1e3c72" },
                  },
                  "& .MuiInputLabel-root": { color: "#1e3c72" },
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
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#4a90e2" },
                    "&:hover fieldset": { borderColor: "#2a5298" },
                    "&.Mui-focused fieldset": { borderColor: "#1e3c72" },
                  },
                  "& .MuiInputLabel-root": { color: "#1e3c72" },
                }}
              />
              {error && (
                <Typography
                  color="error"
                  align="center"
                  sx={{ mt: 2, fontWeight: 500 }}
                >
                  {error}
                </Typography>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{
                  mt: 4,
                  py: 2, // Increased padding for a larger button
                  fontWeight: 700,
                  fontSize: "1.1rem",
                  backgroundColor: "#1e3c72",
                  "&:hover": {
                    backgroundColor: "#2a5298",
                    transform: "scale(1.05)", // Subtle scale on hover
                  },
                  borderRadius: 1,
                  textTransform: "uppercase",
                }}
              >
                LOGIN
              </Button>
              <Button
                fullWidth
                variant="outlined"
                color="secondary"
                sx={{
                  mt: 2,
                  py: 2, // Increased padding for consistency
                  fontWeight: 700,
                  fontSize: "1.1rem",
                  color: "#4a90e2",
                  borderColor: "#4a90e2",
                  "&:hover": {
                    borderColor: "#2a5298",
                    color: "#2a5298",
                    backgroundColor: "rgba(74, 144, 226, 0.1)",
                  },
                  borderRadius: 1,
                  textTransform: "uppercase",
                }}
                onClick={handleSignUpRedirect}
              >
                SIGN UP
              </Button>
            </form>
          </Paper>
        </Container>
      </Box>
      {/* Animation for gradient */}
      <style>
        {`
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

export default Login;
