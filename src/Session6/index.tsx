import React, { useEffect, useState } from "react";
import styles from "./Networking.module.css";
// import Login, { Button } from "./Login";
// import Category from "./Category";
// import ButtonTabs from "../Session3/Tabs/ButtonTabs";
import {
  Button,
  ConfigProvider,
  Flex,
  Layout,
  Menu,
  Space,
  Tabs,
  message,
  notification,
  theme,
} from "antd";
import { Content, Header } from "antd/es/layout/layout";
import Loginant from "./Login/Loginant";
import Categoryant from "./Category/Categoryant";
import Supplierant from "./Supplier";
import Employeeant from "./Employee";
import locale from "antd/locale/vi_VN";

import "dayjs/locale/vi";
import Customerant from "./Customer";
import Productant from "./Product";
import Orderant from "./Order";

import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Link,
  BrowserRouter,
} from "react-router-dom";
import Sider from "antd/es/layout/Sider";
import {
  MdOutlineCategory,
  MdOutlineInbox,
  MdOutlineLocalShipping,
  MdOutlinePeopleOutline,
  MdOutlinePerson3,
  MdOutlineShoppingCart,
} from "react-icons/md";

type Props = {
  isLoggedIn: boolean;
  messageApi: any;
  setIsLoggedIn: (data: any) => void;
};

const Logout = ({
  setIsLoggedIn,
  messageApi,
}: {
  setIsLoggedIn: (data: any) => void;
  messageApi: any;
}) => {
  let email = localStorage.getItem("email");
  let role = localStorage.getItem("role");

  const logoutHandle = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    localStorage.removeItem("access_token");
    setIsLoggedIn(false);
    messageApi.open({
      type: "success",
      content: "Successfully Logged Out",
      duration: 2,
    });
  };
  return (
    <Space size={20} style={{ height: "100%" }}>
      <Flex vertical style={{ lineHeight: "initial", color: "#fff" }}>
        <strong style={{ fontWeight: 600 }}>{email}</strong> <span>{role}</span>
      </Flex>
      <Button onClick={() => logoutHandle()}>Logout</Button>
    </Space>
  );
};

const HeaderContent = ({ ...props }) => {
  const [loginPopup, setLoginPopup] = useState(false);
  return (
    <div style={{ marginLeft: "auto" }}>
      {props.isLoggedIn === false ? (
        <Loginant
          setIsLoggedIn={props.setIsLoggedIn}
          messageApi={props.messageApi}
        />
      ) : (
        <Logout
          setIsLoggedIn={props.setIsLoggedIn}
          messageApi={props.messageApi}
        />
      )}
    </div>
  );
};

export default function Networking({
  isLoggedIn,
  messageApi,
  setIsLoggedIn,
}: Props) {
  const [collapseSidebar, setCollapseSidebar] = React.useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <ConfigProvider locale={locale}>
      <Layout>
        <Header
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 10,
          }}
        >
          <Menu
            theme="dark"
            items={[
              {
                key: "home",
                label: <Link to="/">Trang chủ</Link>,
              },
            ]}
          />
          <HeaderContent
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            messageApi={messageApi}
          />
        </Header>
        <Content>
          <Layout
          // style={{background: colorBgContainer}}
          >
            <Sider
              // style={{ background: colorBgContainer }}
              collapsible
              theme="light"
            >
              <Menu
                // theme="dark"
                items={[
                  {
                    key: "category",
                    label: <Link to="category">Category</Link>,
                    icon: <MdOutlineCategory />,
                  },
                  {
                    key: "supplier",
                    label: <Link to={"supplier"}>Supplier</Link>,
                    icon: <MdOutlineLocalShipping />,
                  },
                  {
                    key: "employee",
                    label: <Link to={"employee"}>Employee</Link>,
                    icon: <MdOutlinePerson3 />,
                  },
                  {
                    key: "customer",
                    label: <Link to={"customer"}>Customer</Link>,
                    icon: <MdOutlinePeopleOutline />,
                  },
                  {
                    key: "product",
                    label: <Link to={"product"}>Product</Link>,
                    icon: <MdOutlineInbox />,
                  },
                  {
                    key: "order",
                    label: <Link to={"order"}>Order</Link>,
                    icon: <MdOutlineShoppingCart />,
                  },
                ]}
              />
            </Sider>
            <div style={{ padding: 10 }}>
              <Outlet />
            </div>
          </Layout>
        </Content>
      </Layout>
    </ConfigProvider>
  );
}
