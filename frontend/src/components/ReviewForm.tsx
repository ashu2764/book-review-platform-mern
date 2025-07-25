// src/components/ReviewForm.tsx

import {
  Box,
  Button,
  Rating,
  TextField,
  Typography,
  Paper,
  Snackbar,
  Alert,
} from "@mui/material";
import { useState } from "react";
import { createReview } from "../services/reviewService";

interface Props {
  bookId: string;
  onReviewSuccess: (review: any) => void; // callback to update parent
}

const ReviewForm = ({ bookId, onReviewSuccess }: Props) => {
  const [rating, setRating] = useState<number | null>(0);
  const [comment, setComment] = useState("");
  const [snack, setSnack] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({ open: false, message: "", severity: "success" });

  const token = localStorage.getItem("token");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!rating || !comment.trim()) {
      setSnack({
        open: true,
        message: "Please provide a rating and comment.",
        severity: "error",
      });
      return;
    }

    try {
      const payload = {
        rating,
        review_text: comment,
      };

      const response = await createReview(bookId, payload, token || "");
      onReviewSuccess(response.review); // 🚀 Live inject
      setSnack({
        open: true,
        message: "Review submitted successfully!",
        severity: "success",
      });
      setRating(0);
      setComment("");
    } catch (err: any) {
      const message = err.response?.data?.message || "Failed to submit review.";
      setSnack({ open: true, message, severity: "error" });
    }
  };

  const handleCloseSnack = () => setSnack({ ...snack, open: false });

  if (!token) {
    return (
      <Typography variant="h6" color="warning.main">
        Please log in to write a review.
      </Typography>
    );
  }

  return (
    <>
      <Paper
        elevation={8}
        sx={{
          p: 4,
          borderRadius: 2,
          backgroundColor: "rgba(255,255,255,0.9)",
          mb: 4,
          color: "#000",
        }}
      >
        <Typography variant="h5" mb={2}>
          ✍️ Write a Review
        </Typography>
        <form onSubmit={handleSubmit}>
          <Rating
            name="rating"
            value={rating}
            onChange={(_, newValue) => setRating(newValue)}
          />
          <TextField
            fullWidth
            multiline
            rows={4}
            placeholder="Share your thoughts..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            sx={{ my: 2 }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!rating || !comment.trim()}
          >
            Submit Review
          </Button>
        </form>
      </Paper>

      <Snackbar
        open={snack.open}
        autoHideDuration={4000}
        onClose={handleCloseSnack}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity={snack.severity}
          variant="filled"
          onClose={handleCloseSnack}
        >
          {snack.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ReviewForm;
