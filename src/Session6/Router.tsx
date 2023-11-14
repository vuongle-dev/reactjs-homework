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
          element: <Categoryant isLoggedIn={isLoggedIn} />,
        },
        {
          path: "/supplier",
          element: (
            <Supplierant isLoggedIn={isLoggedIn} messageApi={messageApi} />
          ),
        },
        {
          path: "/employee",
          element: (
            <Employeeant isLoggedIn={isLoggedIn} messageApi={messageApi} />
          ),
        },
        {
          path: "/customer",
          element: <Customerant isLoggedIn={isLoggedIn} />,
        },
        {
          path: "/product",
          element: (
            <Productant isLoggedIn={isLoggedIn} messageApi={messageApi} />
          ),
        },
        {
          path: "/order",
          element: <Orderant isLoggedIn={isLoggedIn} messageApi={messageApi} />,
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
