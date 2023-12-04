import React from "react";
import "./App.css";
import { ConfigProvider, Layout, Menu, MenuProps, theme } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import locale from "antd/locale/vi_VN";
import { Outlet, Link } from "react-router-dom";
import Loginant from "./Session6/Login/Loginant";
import useAuth from "./Session6/hooks/useAuth";
import Logout from "./Session6/Login/Logout";

const HeaderContent = () => {
  const loggedInUser = useAuth((state) => state.loggedInUser);
  return (
    <div style={{ marginLeft: "auto" }}>
      {!loggedInUser ? <Loginant /> : <Logout />}
    </div>
  );
};

export default function App() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [current, setCurrent] = React.useState("mail");

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
  };
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
            style={{ width: "100%" }}
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            items={[
              {
                key: "home",
                label: <Link to="/onlineshop">Online Shop</Link>,
              },
              {
                key: "session2",
                label: "Session 2",
                children: [
                  {
                    key: "basicui",
                    label: "Basic UI",
                    children: [
                      {
                        key: "basicui1",
                        label: (
                          <Link to="/homework/session2/BasicUI/BasicUI1">
                            Basic UI 1
                          </Link>
                        ),
                      },
                      {
                        key: "basicui2",
                        label: (
                          <Link to="/homework/session2/BasicUI/BasicUI2">
                            Basic UI 2
                          </Link>
                        ),
                      },
                      {
                        key: "basicui3",
                        label: (
                          <Link to="/homework/session2/BasicUI/BasicUI3">
                            Basic UI 3
                          </Link>
                        ),
                      },
                    ],
                  },
                  {
                    key: "blockui",
                    label: "Block UI",
                    children: [
                      {
                        key: "blockui1",
                        label: (
                          <Link to="/homework/session2/BlockUI/BlockUI1">
                            Block UI 1
                          </Link>
                        ),
                      },
                      {
                        key: "blockui2",
                        label: (
                          <Link to="/homework/session2/BlockUI/BlockUI2">
                            Block UI 2
                          </Link>
                        ),
                      },
                      {
                        key: "blockui3",
                        label: (
                          <Link to="/homework/session2/BlockUI/BlockUI3">
                            Block UI 3
                          </Link>
                        ),
                      },
                      {
                        key: "blockui4",
                        label: (
                          <Link to="/homework/session2/BlockUI/BlockUI4">
                            Block UI 4
                          </Link>
                        ),
                      },
                      {
                        key: "blockui5",
                        label: (
                          <Link to="/homework/session2/BlockUI/BlockUI5">
                            Block UI 5
                          </Link>
                        ),
                      },
                      {
                        key: "blockui6",
                        label: (
                          <Link to="/homework/session2/BlockUI/BlockUI6">
                            Block UI 6
                          </Link>
                        ),
                      },
                      {
                        key: "blockui7",
                        label: (
                          <Link to="/homework/session2/BlockUI/BlockUI7">
                            Block UI 7
                          </Link>
                        ),
                      },
                    ],
                  },
                  {
                    key: "cv",
                    label: <Link to="/homework/session2/CV">CV</Link>,
                  },
                ],
              },
              {
                key: "session3",
                label: "Session 3",
                children: [
                  {
                    key: "likebutton",
                    label: (
                      <Link to="/homework/session3/likebutton">
                        Like Button
                      </Link>
                    ),
                  },
                  {
                    key: "ratebutton",
                    label: (
                      <Link to="/homework/session3/ratebutton">
                        Rate Button
                      </Link>
                    ),
                  },
                  {
                    key: "imageviewer",
                    label: (
                      <Link to="/homework/session3/imageviewer">
                        Image Viewer
                      </Link>
                    ),
                  },
                  {
                    key: "tabs",
                    label: <Link to="/homework/session3/tabs">Tabs</Link>,
                  },
                  {
                    key: "accordions",
                    label: (
                      <Link to="/homework/session3/accordions">Accordions</Link>
                    ),
                  },
                  {
                    key: "galleries",
                    label: (
                      <Link to="/homework/session3/galleries">Galleries</Link>
                    ),
                  },
                  {
                    key: "lovebutton",
                    label: (
                      <Link to="/homework/session3/lovebutton">
                        Love Button
                      </Link>
                    ),
                  },
                  {
                    key: "figma",
                    label: <Link to="/homework/session3/figma">Figma</Link>,
                  },
                ],
              },
              {
                key: "Quiz",
                label: <Link to="/homework/Quiz">Quiz</Link>,
              },
            ]}
          />
          <HeaderContent />
        </Header>
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </ConfigProvider>
  );
}
