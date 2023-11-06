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
  Space,
  Tabs,
  message,
  notification,
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

type Props = {};

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

// const HeaderContent = ({ ...props }) => {
//   const [loginPopup,setLoginPopup] = useState(false)
//   return (
//     <div className={styles.Header}>
//       {props.isLoggedIn === false ? (
//         <Login setIsLoggedIn={props.setIsLoggedIn} />
//       ) : (
//         <Logout setIsLoggedIn={props.setIsLoggedIn} />
//       )}
//     </div>
//   );
// };

const HeaderContent = ({ ...props }) => {
  const [loginPopup, setLoginPopup] = useState(false);
  return (
    <>
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
    </>
  );
};

export default function Networking({}: Props) {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [collapseSidebar, setCollapseSidebar] = React.useState(false);
  useEffect(() => {
    localStorage.getItem("access_token")
      ? setIsLoggedIn(true)
      : setIsLoggedIn(false);
  }, []);
  return (
    // {<div className={styles.container}>
    //   <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
    //   <ButtonTabs
    //     tablist={[
    //       { name: "Category", content: <Category isLoggedIn={isLoggedIn} /> },
    //     ]}
    //   />
    // </div>}
    <ConfigProvider locale={locale}>
      <Layout>
        {contextHolder}
        <Header
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "end",
          }}
        >
          <HeaderContent
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            messageApi={messageApi}
          />
        </Header>
        <Content>
          <Tabs
            tabPosition="left"
            items={[
              {
                key: "category",
                label: "Category",
                children: (
                  <Categoryant
                    isLoggedIn={isLoggedIn}
                    messageApi={messageApi}
                  />
                ),
              },
              {
                key: "supplier",
                label: "Supplier",
                children: (
                  <Supplierant
                    isLoggedIn={isLoggedIn}
                    messageApi={messageApi}
                  />
                ),
              },
              {
                key: "employee",
                label: "Employee",
                children: (
                  <Employeeant
                    isLoggedIn={isLoggedIn}
                    messageApi={messageApi}
                  />
                ),
              },
              {
                key: "customer",
                label: "Customer",
                children: (
                  <Customerant
                    isLoggedIn={isLoggedIn}
                    messageApi={messageApi}
                  />
                ),
              },
              {
                key: "product",
                label: "Product",
                children: (
                  <Productant isLoggedIn={isLoggedIn} messageApi={messageApi} />
                ),
              },
              {
                key: "order",
                label: "Order",
                children: (
                  <Orderant isLoggedIn={isLoggedIn} messageApi={messageApi} />
                ),
              },
            ]}
          />
        </Content>
      </Layout>
    </ConfigProvider>
  );
}
