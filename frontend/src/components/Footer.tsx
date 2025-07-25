import { Box, Typography, Link } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        height: "64px",
        backgroundColor: "#1e3c72",
        color: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "0.9rem",
        zIndex: 1000,
      }}
    >
      <Typography>
        © {new Date().getFullYear()} Book Review Platform |{" "}
        <Link href="#" color="inherit" underline="hover">
          GitHub
        </Link>{" "}
        |{" "}
        <Link href="#" color="inherit" underline="hover">
          Contact
        </Link>
      </Typography>
    </Box>
  );
};

export default Footer;
