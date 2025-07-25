import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Home from "../pages/Home";
import BookDetails from "../pages/BookDetails";
import PrivateRoute from "../components/PrivateRoute";
import AddBook from "../pages/AddBook";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
      <Route
        path="/books/:id"
        element={
          <PrivateRoute>
            <BookDetails />
          </PrivateRoute>
        }
      />
      <Route path="/add-book" element={<AddBook />} />
    </Routes>
  );
};

export default AppRoutes;
