import React from "react";
import useAuth from "../hooks/useAuth";
import { Button, Flex, Space } from "antd";

type Props = {};

export default function Logout({}: Props) {
  const email = useAuth((state) => state.loggedInUser?.email);
  const role = useAuth((state) => state.loggedInUser?.roles[0].name);
  const logout = useAuth((state) => state.logout);
  return (
    <Space size={20} style={{ height: "100%" }}>
      <Flex vertical style={{ lineHeight: "initial", color: "#fff" }}>
        <strong style={{ fontWeight: 600 }}>{email}</strong> <span>{role}</span>
      </Flex>
      <Button onClick={() => logout()}>Logout</Button>
    </Space>
  );
}
