import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Card,
  CardContent,
  Container,
  Typography,
  Divider,
  CircularProgress,
  useTheme,
  useMediaQuery,
  Pagination,
  Tooltip,
  styled,
  Button,
} from "@mui/material";
import BookIcon from "@mui/icons-material/MenuBook";
import PersonIcon from "@mui/icons-material/Person";
import CategoryIcon from "@mui/icons-material/Category";
import StarRateIcon from "@mui/icons-material/StarRate";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";


const token = localStorage.getItem("token");
const isAuthenticated = !!token;

const Home = () => {
  const [books, setBooks] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 3;

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

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(books.length / booksPerPage);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  const AnimatedCard = styled(Card)(({ theme }) => ({
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    borderRadius: "16px",
    backgroundColor: "#ffffffcc",
    boxShadow: "0 6px 25px rgba(0,0,0,0.15)",
    cursor: "pointer",
    "&:hover": {
      transform: "translateY(-8px)",
      boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
    },
  }));

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #1e3c72, #2a5298, #4a90e2)",
        backgroundSize: "400% 400%",
        animation: "gradientShift 15s ease infinite",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header (Old Style) */}
      <Box
        sx={{
          padding: "30px 0 10px",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: "#fff",
            fontWeight: 800,
            textShadow: "2px 2px 6px rgba(0,0,0,0.3)",
            letterSpacing: 2,
          }}
        >
          Available Books
        </Typography>
      </Box>

      {/* Main Content */}
      <Container
        maxWidth="lg"
        sx={{
          flexGrow: 1,
          py: 4,
        }}
      >
        {isLoading ? (
          <Box display="flex" justifyContent="center" mt={4}>
            <CircularProgress color="inherit" size={60} />
          </Box>
        ) : error ? (
          <Typography variant="h6" color="error" align="center">
            {error}
          </Typography>
        ) : books.length === 0 ? (
          <Typography variant="h6" align="center" sx={{ color: "#fff" }}>
            No books available.
          </Typography>
        ) : (
          <>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: isMobile
                  ? "repeat(1, 1fr)"
                  : "repeat(auto-fit, minmax(300px, 1fr))",
                gap: 4,
              }}
            >
              {currentBooks.map((book) => (
                <AnimatedCard
                  key={book._id}
                  onClick={() => navigate(`/books/${book._id}`)}
                >
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                      padding: "24px",
                    }}
                  >
                    {/* Title with Icon */}
                    <Box display="flex" alignItems="center" gap={1}>
                      <BookIcon sx={{ color: "#1e3c72" }} />
                      <Tooltip title={book.title} placement="top">
                        <Typography
                          variant="h6"
                          noWrap
                          sx={{ fontWeight: 700, color: "#1e3c72", flex: 1 }}
                        >
                          {book.title || "Untitled"}
                        </Typography>
                      </Tooltip>
                    </Box>

                    <Divider sx={{ my: 1.5 }} />

                    {/* Author */}
                    <Box display="flex" alignItems="center" gap={1}>
                      <PersonIcon sx={{ fontSize: 20, color: "#666" }} />
                      <Typography variant="body2" sx={{ color: "#666" }}>
                        Author:
                      </Typography>
                      <Typography variant="body1">
                        {book.author || "Unknown"}
                      </Typography>
                    </Box>

                    {/* Genre */}
                    <Box display="flex" alignItems="center" gap={1}>
                      <CategoryIcon sx={{ fontSize: 20, color: "#666" }} />
                      <Typography variant="body2" sx={{ color: "#666" }}>
                        Genre:
                      </Typography>
                      <Typography variant="body1">
                        {book.genre || "N/A"}
                      </Typography>
                    </Box>

                    {/* Rating */}
                    <Box display="flex" alignItems="center" gap={1}>
                      <StarRateIcon sx={{ fontSize: 20, color: "#f39c12" }} />
                      <Typography variant="body2" sx={{ color: "#666" }}>
                        Rating:
                      </Typography>
                      <Typography variant="body1">
                        {book.averageRating
                          ? book.averageRating.toFixed(1)
                          : "N/A"}
                      </Typography>
                    </Box>
                  </CardContent>
                </AnimatedCard>
              ))}
            </Box>

            {/* Pagination */}
            <Box mt={4} display="flex" justifyContent="center">
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
                sx={{
                  "& .MuiPaginationItem-root": {
                    color: "#fff",
                    fontWeight: "bold",
                  },
                  "& .Mui-selected": {
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                  },
                }}
              />
            </Box>

            {isAuthenticated && (
              <Box mt={3} display="flex" justifyContent="center">
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#fdd835",
                    color: "#1e3c72",
                    fontWeight: "bold",
                    borderRadius: "50px",
                    px: 4,
                    py: 1.5,
                    "&:hover": {
                      backgroundColor: "#fbc02d",
                    },
                  }}
                  onClick={() => navigate("/add-book")}
                >
                  + Add Book
                </Button>
              </Box>
            )}
          </>
        )}
      </Container>

      <style>
        {`
    html, body {
      margin: 0;
      padding: 0;
      height: 100%;
      overflow: hidden; /* ✅ prevent vertical scroll */
    }

    #root {
      height: 100%;
    }

    @keyframes gradientShift {
      0% { background-position: 0% 0%; }
      50% { background-position: 100% 100%; }
      100% { background-position: 0% 0%; }
    }
  `}
      </style>
    </Box>
  );
};

export default Home;
