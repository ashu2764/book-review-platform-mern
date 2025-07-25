import { useState } from "react";
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
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [rating, setRating] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:5000/api/books",
        {
          title,
          author,
          genre,
          averageRating: rating ? parseFloat(rating) : undefined,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate("/");
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to add book");
    }
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
              Add New Book
            </Typography>

            <form onSubmit={handleSubmit}>
              <TextField
                label="Title"
                fullWidth
                margin="normal"
                variant="outlined"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                sx={{
                  "& .MuiInputBase-root": {
                    fontSize: "1.1rem",
                    height: "56px",
                  },
                  "& .MuiInputLabel-root": { fontSize: "1.05rem" },
                }}
              />
              <TextField
                label="Author"
                fullWidth
                margin="normal"
                variant="outlined"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
                sx={{
                  "& .MuiInputBase-root": {
                    fontSize: "1.1rem",
                    height: "56px",
                  },
                  "& .MuiInputLabel-root": { fontSize: "1.05rem" },
                }}
              />
              <TextField
                label="Genre"
                fullWidth
                margin="normal"
                variant="outlined"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                required
                sx={{
                  "& .MuiInputBase-root": {
                    fontSize: "1.1rem",
                    height: "56px",
                  },
                  "& .MuiInputLabel-root": { fontSize: "1.05rem" },
                }}
              />
              <TextField
                label="Rating (1–5)"
                type="number"
                fullWidth
                margin="normal"
                variant="outlined"
                inputProps={{ step: "0.1", min: "1", max: "5" }}
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                sx={{
                  "& .MuiInputBase-root": {
                    fontSize: "1.1rem",
                    height: "56px",
                  },
                  "& .MuiInputLabel-root": { fontSize: "1.05rem" },
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
                  "&:hover": { backgroundColor: "#2a5298" },
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                  borderRadius: 2,
                }}
              >
                Submit Book
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

export default AddBook;
