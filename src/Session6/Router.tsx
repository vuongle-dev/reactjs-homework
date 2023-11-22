import { Spin } from "antd";
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Categoryant from "./Category/Categoryant";
import Supplierant from "./Supplier";
import Employeeant from "./Employee";
import Customerant from "./Customer";
import Productant from "./Product";
import Orderant from "./Order";
import Networking from ".";
import ErrorPage from "./ErrorPage";
import { QueryClientProvider, QueryClient } from "react-query";

type Props = {};

export default function Router({}: Props) {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Networking />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/category",
          element: <Categoryant />,
        },
        {
          path: "/supplier",
          element: <Supplierant />,
        },
        {
          path: "/employee",
          element: <Employeeant />,
        },
        {
          path: "/customer",
          element: <Customerant />,
        },
        {
          path: "/product",
          element: <Productant />,
        },
        {
          path: "/order",
          element: <Orderant />,
        },
      ],
    },
  ]);
  const queryClient = new QueryClient();
  return (
    <React.Suspense fallback={<Spin />}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </React.Suspense>
  );
}
