import { Space, Button } from "antd";
import React from "react";
import { AiFillAlert } from "react-icons/ai";

type Props = {};

export default function ({}: Props) {
  return (
    <Space wrap>
      <Button icon={<AiFillAlert />} shape="circle">
        Button
      </Button>
    </Space>
  );
}
