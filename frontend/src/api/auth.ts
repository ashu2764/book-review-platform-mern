import axios from "axios";

const BASE_URL = "http://localhost:5000/api/auth";

export const loginUser = (data: { email: string; password: string }) =>
  axios.post(`${BASE_URL}/login`, data);

export const signupUser = (data: {
  username: string;
  email: string;
  password: string;
}) => axios.post(`${BASE_URL}/signup`, data);
