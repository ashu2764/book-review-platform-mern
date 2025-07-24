// src/api/reviewApi.ts
import axiosInstance from "./axiosInstance";

export const postReview = (bookId: string, data: any) =>
  axiosInstance.post(`/books/${bookId}/reviews`, data);

export const getReviews = (bookId: string, params = {}) =>
  axiosInstance.get(`/books/${bookId}/reviews`, { params });
