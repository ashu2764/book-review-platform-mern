// src/pages/BookDetails.tsx

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  CircularProgress,
  Grid,
  Divider,
  Paper,
  Pagination,
  MenuItem,
  Select,
  CssBaseline,
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material/Select";
import { fetchBookById } from "../services/bookService";
import { fetchReviewsByBook } from "../services/reviewService";
import StarIcon from "@mui/icons-material/Star";
import PersonIcon from "@mui/icons-material/Person";
import CommentIcon from "@mui/icons-material/Comment";
import ReviewForm from "../components/ReviewForm";

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState<any>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<"rating" | "date">("date");
  const limit = 5;
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!id) return;
        setLoading(true);

        const [bookRes, reviewRes] = await Promise.all([
          fetchBookById(id),
          fetchReviewsByBook(id, page, limit, sort),
        ]);

        setBook(bookRes.book || {});
        setReviews(reviewRes.reviews || []);
        setTotalPages(Math.ceil(reviewRes.total / limit));
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to load book details");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, page, sort]);

  const handlePageChange = (_: any, value: number) => setPage(value);

  const handleSortChange = (e: SelectChangeEvent<"rating" | "date">) => {
    setSort(e.target.value as "rating" | "date");
    setPage(1);
  };

  // 💥 Add review instantly to top
  const handleNewReview = async () => {
    const [bookRes, reviewRes] = await Promise.all([
      fetchBookById(id!),
      fetchReviewsByBook(id!, page, limit, sort),
    ]);
    setBook(bookRes.book || {});
    setReviews(reviewRes.reviews || []);
    setTotalPages(Math.ceil(reviewRes.total / limit));
  };

  if (loading) {
    return (
      <>
        <CssBaseline />
        <Box
          height="100vh"
          width="100vw"
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{
            background: "linear-gradient(135deg, #1e3c72, #2a5298, #4a90e2)",
            backgroundSize: "400% 400%",
            animation: "gradientShift 15s ease infinite",
          }}
        >
          <CircularProgress size={60} />
        </Box>
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
  }

  if (error) {
    return (
      <>
        <CssBaseline />
        <Box
          height="100vh"
          width="100vw"
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{
            background: "linear-gradient(135deg, #1e3c72, #2a5298, #4a90e2)",
            backgroundSize: "400% 400%",
            animation: "gradientShift 15s ease infinite",
          }}
        >
          <Typography variant="h5" color="error">
            {error}
          </Typography>
        </Box>
      </>
    );
  }

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          width: "100vw",
          background: "linear-gradient(135deg, #1e3c72, #2a5298, #4a90e2)",
          backgroundSize: "400% 400%",
          animation: "gradientShift 15s ease infinite",
          p: 4,
          color: "#fff",
        }}
      >
        <Typography variant="h3" align="center" gutterBottom sx={{ mb: 5 }}>
          📘 {book.title}
        </Typography>

        <Box sx={{ mb: 5 }}>
          <Typography variant="h5" gutterBottom>
            <PersonIcon /> Author: {book.author}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Genre: {book.genre}
          </Typography>
          <Typography variant="h6" gutterBottom>
            <StarIcon sx={{ color: "#FFD700", mr: 1 }} />
            Avg. Rating:{" "}
            {book.averageRating ? book.averageRating.toFixed(1) : "N/A"}
          </Typography>
        </Box>

        <Divider sx={{ borderColor: "#fff", mb: 4 }} />

        <ReviewForm bookId={id!} onReviewSuccess={handleNewReview} />

        <Box>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={3}
          >
            <Typography variant="h4">Reviews</Typography>
            <Select
              value={sort}
              onChange={handleSortChange}
              sx={{ color: "#fff", borderColor: "#fff" }}
            >
              <MenuItem value="date">Sort by Date</MenuItem>
              <MenuItem value="rating">Sort by Rating</MenuItem>
            </Select>
          </Box>

          {reviews.length === 0 ? (
            <Typography>No reviews yet.</Typography>
          ) : (
            <Grid container spacing={3}>
              {reviews.map((review) => (
                <Grid item xs={12} key={review._id}>
                  <Paper
                    elevation={6}
                    sx={{
                      p: 3,
                      borderRadius: 2,
                      backgroundColor: "rgba(255, 255, 255, 0.95)",
                      color: "#333",
                    }}
                  >
                    <Typography variant="h6" gutterBottom>
                      <CommentIcon sx={{ verticalAlign: "middle", mr: 1 }} />
                      {review.user?.username || "Anonymous"}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      {review.review_text || review.comment}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Rating: {review.rating}/5 ⭐
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          )}

          {totalPages > 1 && (
            <Box display="flex" justifyContent="center" mt={5}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
              />
            </Box>
          )}
        </Box>
      </Box>
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

export default BookDetails;
