import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
} from "@mui/material";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (token && user) {
      setIsAuthenticated(true);
      setUsername(JSON.parse(user).username);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        background: "linear-gradient(to right, #1e3c72, #2a5298)",
        height: 70,
        zIndex: 1100,
        boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box display="flex" alignItems="center">
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => navigate("/")}
            sx={{ mr: 1 }}
          >
            <MenuBookIcon fontSize="large" />
          </IconButton>
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              cursor: "pointer",
              fontSize: "1.4rem",
              color: "#fff",
            }}
            onClick={() => navigate("/")}
          >
            Book Review Platform
          </Typography>
        </Box>

        {isAuthenticated ? (
          <Box display="flex" alignItems="center" gap={2}>
            <Typography sx={{ color: "#fff", fontWeight: 500 }}>
              👤 {username}
            </Typography>
            <Button
              variant="outlined"
              color="inherit"
              onClick={handleLogout}
              sx={{
                color: "#fff",
                borderColor: "#fff",
                borderRadius: "20px",
                px: 2,
                "&:hover": {
                  backgroundColor: "#fff",
                  color: "#1e3c72",
                },
              }}
            >
              Logout
            </Button>
          </Box>
        ) : (
          <Box display="flex" gap={2}>
            <Button
              variant="outlined"
              color="inherit"
              onClick={() => navigate("/login")}
              sx={{
                color: "#fff",
                borderColor: "#fff",
                borderRadius: "20px",
                px: 2,
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "#fff",
                  color: "#1e3c72",
                },
              }}
            >
              Login
            </Button>
            <Button
              variant="contained"
              onClick={() => navigate("/signup")}
              sx={{
                backgroundColor: "#FFD700",
                color: "#1e3c72",
                borderRadius: "20px",
                px: 3,
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "#ffcc00",
                },
              }}
            >
              Signup
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
