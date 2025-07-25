import axios from "axios";

const BASE_URL = "http://localhost:5000/api/books";

export const fetchAllBooks = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

export const fetchBookById = async (bookId: string) => {
  const response = await axios.get(`${BASE_URL}/${bookId}`);
  console.log("Book fetched:", response.data);
  return response.data;
};
