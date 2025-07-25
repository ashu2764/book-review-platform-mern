import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
  Divider,
  CircularProgress,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import BookIcon from "@mui/icons-material/MenuBook";
import PersonIcon from "@mui/icons-material/Person";
import CategoryIcon from "@mui/icons-material/Category";
import StarRateIcon from "@mui/icons-material/StarRate";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom"; // <-- Import navigate

const Home = () => {
  const [books, setBooks] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate(); // <-- Initialize navigate

  useEffect(() => {
    const fetchBooks = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get("http://localhost:5000/api/books");
        if (!res.data.books || !Array.isArray(res.data.books)) {
          throw new Error("Invalid data format from server");
        }
        setBooks(res.data.books);
      } catch (err: any) {
        const errorMessage =
          err.response?.data?.message || "Failed to fetch books";
        setError(errorMessage);
        enqueueSnackbar(errorMessage, { variant: "error" });
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, [enqueueSnackbar]);

  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          width: "100vw",
          background: "linear-gradient(135deg, #1e3c72, #2a5298, #4a90e2)",
          backgroundSize: "400% 400%",
          animation: "gradientShift 15s ease infinite",
          py: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          overflowX: "hidden",
          position: "relative",
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            align="center"
            gutterBottom
            sx={{
              color: "#fff",
              fontWeight: 700,
              mb: 8,
              textShadow: "1px 1px 6px rgba(0, 0, 0, 0.4)",
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              background: "linear-gradient(135deg, #1e3c72, #2a5298, #4a90e2)",
              zIndex: 1000,
              padding: "25px 0",
              textTransform: "uppercase",
              letterSpacing: 2,
              fontFamily: "'Roboto', sans-serif",
            }}
          >
            📚 Available Books
          </Typography>

          <Box sx={{ mt: "120px" }}>
            {isLoading ? (
              <Box sx={{ display: "flex", justifyContent: "center", my: 8 }}>
                <CircularProgress color="inherit" size={60} />
              </Box>
            ) : error ? (
              <Typography
                variant="h5"
                color="error"
                align="center"
                mb={8}
                sx={{ fontWeight: 600 }}
              >
                {error}
              </Typography>
            ) : books.length === 0 ? (
              <Typography
                variant="h5"
                align="center"
                color="text.secondary"
                mb={8}
                sx={{ fontWeight: 600 }}
              >
                No books available.
              </Typography>
            ) : (
              <Grid
                container
                spacing={isMobile ? 3 : 5}
                justifyContent="center"
              >
                {books.map((book) => (
                  <Grid item xs={12} sm={6} md={4} key={book._id}>
                    <Card
                      onClick={() => navigate(`/books/${book._id}`)} // <-- navigate on click
                      sx={{
                        height: "100%",
                        cursor: "pointer", // <-- Add cursor
                        borderRadius: 2,
                        backgroundColor: "rgba(255, 255, 255, 0.95)",
                        boxShadow: "0px 12px 40px rgba(0, 0, 0, 0.3)",
                        transition: "transform 0.3s ease, scale 0.3s ease",
                        "&:hover": {
                          transform: "translateY(-8px) scale(1.08)",
                        },
                        backdropFilter: "blur(8px)",
                      }}
                    >
                      <CardContent sx={{ px: 6, py: 5, textAlign: "center" }}>
                        <Typography
                          variant="h4"
                          sx={{
                            fontWeight: 700,
                            color: "#1e3c72",
                            mb: 5,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 3,
                            fontSize: { xs: "1.6rem", md: "2.2rem" },
                            textTransform: "capitalize",
                          }}
                        >
                          <BookIcon sx={{ fontSize: 45, color: "#FF6F61" }} />
                          {book.title || "Untitled"}
                        </Typography>

                        <Divider sx={{ mb: 5, borderColor: "#4a90e2" }} />

                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            mb: 4,
                            gap: 3,
                          }}
                        >
                          <PersonIcon sx={{ fontSize: 35, color: "#6B7280" }} />
                          <Typography
                            variant="h6"
                            sx={{ fontWeight: 600, color: "#333" }}
                          >
                            <strong>Author:</strong> {book.author || "Unknown"}
                          </Typography>
                        </Box>

                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            mb: 4,
                            gap: 3,
                          }}
                        >
                          <CategoryIcon
                            sx={{ fontSize: 35, color: "#4CAF50" }}
                          />
                          <Typography
                            variant="h6"
                            sx={{ fontWeight: 600, color: "#333" }}
                          >
                            <strong>Genre:</strong> {book.genre || "N/A"}
                          </Typography>
                        </Box>

                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 3,
                          }}
                        >
                          <StarRateIcon
                            sx={{ fontSize: 35, color: "#FFD700" }}
                          />
                          <Typography
                            variant="h6"
                            sx={{ fontWeight: 600, color: "#333" }}
                          >
                            <strong>Avg. Rating:</strong>{" "}
                            {book.averageRating
                              ? book.averageRating.toFixed(1)
                              : "N/A"}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        </Container>
      </Box>

      {/* Animation for gradient */}
      <style>
        {`
          @keyframes gradientShift {
            0% { background-position: 0% 0%; }
            50% { background-position: 100% 100%; }
            100% { background-position: 0% 0%; }
        `}
      </style>
    </>
  );
};

export default Home;
