import axios from "axios";

const BASE_URL = "http://localhost:5000/api/books";

// Get all reviews for a book with pagination & sorting
export const fetchReviewsByBook = async (
  bookId: string,
  page: number = 1,
  limit: number = 5,
  sort: "rating" | "date" = "date"
) => {
  const response = await axios.get(`${BASE_URL}/${bookId}/reviews`, {
    params: { page, limit, sort },
  });
  console.log("Reviews fetched:", response.data);
  return response.data;
};

// Create a review for a book
export const createReview = async (
  bookId: string,
  review: { rating: number; review_text: string },
  token: string
) => {
  const response = await axios.post(`${BASE_URL}/${bookId}/review`, review, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log("Review created:", response.data);
  return response.data;
};
