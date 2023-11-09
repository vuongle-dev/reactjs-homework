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

type Props = {};

export default function Router({}: Props) {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  React.useEffect(() => {
    localStorage.getItem("access_token")
      ? setIsLoggedIn(true)
      : setIsLoggedIn(false);
  }, []);
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Networking
          isLoggedIn={isLoggedIn}
          messageApi={messageApi}
          setIsLoggedIn={setIsLoggedIn}
        />
      ),
      children: [
        {
          path: "/category",
          element: (
            <Categoryant isLoggedIn={isLoggedIn} messageApi={messageApi} />
          ),
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
          element: (
            <Customerant isLoggedIn={isLoggedIn} messageApi={messageApi} />
          ),
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
