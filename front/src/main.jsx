import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root";
import "./index.css";
import ErrorPage from "./error-page";
import Auth from "./routes/auth";
import { Orders } from "./routes/orders";
import Profile from "./routes/profile";
import Job from "./routes/job";
import Staff from "./routes/staff";
import AbsenceType from "./routes/absence_type";
import DeliveryType from "./routes/delivery_type";
import Table from "./routes/table";
import Supplier from "./routes/supplier";
import Client from "./routes/client";
import Concert from "./routes/concert";
import Delivery from "./routes/delivery";
import Payout from "./routes/payout";
import Timesheet from "./routes/timesheet";
import Reservation from "./routes/reservation";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "auth",
        element: <Auth />,
      },
      {
        path: "orders",
        element: <Orders />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "job",
        element: <Job />,
      },
      {
        path: "staff",
        element: <Staff />,
      },
      {
        path: "absence_type",
        element: <AbsenceType />,
      },
      {
        path: "delivery_type",
        element: <DeliveryType />,
      },
      {
        path: "table",
        element: <Table />,
      },
      {
        path: "supplier",
        element: <Supplier />,
      },
      {
        path: "client",
        element: <Client />,
      },
      {
        path: "concert",
        element: <Concert />,
      },
      {
        path: "delivery",
        element: <Delivery />,
      },
      {
        path: "payout",
        element: <Payout />,
      },
      {
        path: "timesheet",
        element: <Timesheet />,
      },
      {
        path: "reservation",
        element: <Reservation />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
