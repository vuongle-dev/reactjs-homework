import React from "react";
import styles from "./OnlineShop.module.css";
// import Login, { Button } from "./Login";
// import Category from "./Category";
// import ButtonTabs from "../Session3/Tabs/ButtonTabs";
import { Alert, Layout, Menu, theme } from "antd";

import { Link, Outlet } from "react-router-dom";
import Sider from "antd/es/layout/Sider";
import {
  MdOutlineCategory,
  MdOutlineInbox,
  MdOutlineLocalShipping,
  MdOutlinePeopleOutline,
  MdOutlinePerson3,
  MdOutlineShoppingCart,
} from "react-icons/md";
import { Content } from "antd/es/layout/layout";

export const Notice = () => {
  return (
    <Alert
      message="Informational Notes"
      description={
        <p>
          You can't delete custormers, employees those are currently having
          orders, or categories with products.
          <br />
          Try to delete existing relative orders / products by using "Filter"
          and "Delete selected items" function first
        </p>
      }
      type="info"
      showIcon
    />
  );
};

export default function OnlineShop() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [sideCollapsed, setSideCollapsed] = React.useState(false);

  return (
    <Layout style={{ background: colorBgContainer }}>
      <Sider
        style={{
          background: "none",
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
        collapsible
        collapsed={sideCollapsed}
        onCollapse={(collapsed) => setSideCollapsed(collapsed)}
        theme="light"
        width={170}
        collapsedWidth={50}
        // defaultCollapsed
        breakpoint="lg"
      >
        <Menu
          style={{ marginTop: 64 }}
          // theme="dark"
          mode="inline"
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
      <Content
        className={styles.content}
        style={sideCollapsed ? { marginLeft: 50 } : { marginLeft: 170 }}
      >
        <div style={{ padding: 10 }}>
          <Outlet />
        </div>
      </Content>
    </Layout>
  );
}
