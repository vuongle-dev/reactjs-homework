import { message } from "antd";
import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Link,
  BrowserRouter,
} from "react-router-dom";
import Categoryant from "./Category/Categoryant";
import Supplierant from "./Supplier";
import Employeeant from "./Employee";
import Customerant from "./Customer";
import Productant from "./Product";
import Orderant from "./Order";
import Networking from ".";
import ErrorPage from "./ErrorPage";
import useAuth from "./hooks/useAuth";

type Props = {};

export default function Router({}: Props) {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const loggedInUser = useAuth((state) => state.loggedInUser);
  React.useEffect(() => {
    loggedInUser ? setIsLoggedIn(true) : setIsLoggedIn(false);
  }, [loggedInUser]);
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
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      {contextHolder}
      <RouterProvider router={router} />
    </React.Suspense>
  );
}
