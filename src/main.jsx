import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import BookingPage from "./pages/BookingPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import PrivateRoute from "./utils/PrivateRoute";
import DetailItemBooking from "./pages/DetailBookingPage.jsx";
import { ToastContainer } from 'react-toastify';
import TimeBooking from "./pages/TimeBookingPage.jsx";
import ConfirmationPage from "./pages/ConfirmationPage.jsx";
import PaymentPage from "./pages/PaymentPage.jsx";
import ProofPayment from "./pages/ProofPaymentPage.jsx";
import ValidationPage from "./pages/ValidationPage.jsx";
import CancelBooking from "./pages/CancelPage.jsx";
import NotFound from "./pages/404NotFound.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />, // Halaman utama
  },
  {
    path: "/booking",
    element: <BookingPage />, // Halaman booking
  },
  {
    path: "/booking/:id/time",
    element: <TimeBooking />, // Halaman booking
  },
  {
    path: "/booking/:id",
    element: <DetailItemBooking />, // Halaman booking
  },
  {
    path: "/booking/:id/confirmation/",
    element: <ConfirmationPage />, // Halaman booking
  },
  {
    path: "/booking/payment/",
    element: <PaymentPage />, // Halaman booking
  },
  {
    path: "/booking/payment/proof/",
    element: <ProofPayment />, // Halaman booking
  },
  {
    path: "/login",
    element: <LoginPage />, // Halaman booking
  },
  {
    path: "/dashboard",
    element: <PrivateRoute element={<DashboardPage />} />, // Halaman dashboard (dilindungi)
  },
  {
    path: "/validation/:id",
    element: <ValidationPage />, // Halaman booking
  },
  {
    path: "/cancelbooking/:id",
    element: <CancelBooking />, // Halaman booking
  },
  {
    path: "*",
    element: <NotFound />, // Halaman booking
  },
]);

// createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <ToastContainer />
//     <RouterProvider router={router} />
//   </React.StrictMode>
// );

createRoot(document.getElementById("root")).render(
  <>
    <ToastContainer />
    <RouterProvider router={router} />
  </>
);
