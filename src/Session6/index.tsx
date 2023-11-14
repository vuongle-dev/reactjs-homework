import React from "react";
import styles from "./Networking.module.css";
// import Login, { Button } from "./Login";
// import Category from "./Category";
// import ButtonTabs from "../Session3/Tabs/ButtonTabs";
import { ConfigProvider, Layout, Menu, theme } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import Loginant from "./Login/Loginant";
import locale from "antd/locale/vi_VN";
import "dayjs/locale/vi";

import { Outlet, Link } from "react-router-dom";
import Sider from "antd/es/layout/Sider";
import {
  MdOutlineCategory,
  MdOutlineInbox,
  MdOutlineLocalShipping,
  MdOutlinePeopleOutline,
  MdOutlinePerson3,
  MdOutlineShoppingCart,
} from "react-icons/md";
import Logout from "./Login/Logout";
import useAuth from "./hooks/useAuth";

const HeaderContent = () => {
  const loggedInUser = useAuth((state) => state.loggedInUser);
  return (
    <div style={{ marginLeft: "auto" }}>
      {!loggedInUser ? <Loginant /> : <Logout />}
    </div>
  );
};

export default function Networking() {
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
          <HeaderContent />
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
