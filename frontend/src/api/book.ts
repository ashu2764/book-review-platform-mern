// src/api/bookApi.ts
import axiosInstance from "./axiosInstance";

export const getBooks = (params = {}) =>
  axiosInstance.get("/books", { params });

export const getBookById = (id: string) => axiosInstance.get(`/books/${id}`);

export const createBook = (data: any) => axiosInstance.post("/books", data);
