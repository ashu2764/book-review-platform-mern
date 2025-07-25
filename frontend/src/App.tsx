import { Box } from "@mui/material";
import Navbar from "./components/Navbar";
import AppRoutes from "./routes/AppRoutes";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Navbar />
      <Box
        sx={{
          pt: "70px", // Height of fixed Navbar
          pb: "64px", // Height of fixed Footer
          minHeight: "calc(100vh - 70px - 64px)",
          overflow: "hidden",
        }}
      >
        <AppRoutes />
      </Box>
      <Footer />
    </>
  );
}

export default App;
