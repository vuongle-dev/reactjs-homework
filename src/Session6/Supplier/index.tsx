import React, { useEffect, useState } from "react";
import styles from "./Supplier.module.css";

import { Form, Input } from "antd";
import type { ColumnsType } from "antd/es/table";
import TextArea from "antd/es/input/TextArea";
import SubjectTemplate from "../Components/SubjectTemplate";
type Props = {};

interface addschemaInput {
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
}

const SupplierForm = ({
  form,
  onFinish,
  initialValues,
}: {
  form?: any;
  onFinish?: (data: any) => void;
  initialValues?: addschemaInput;
}) => {
  return (
    <Form
      form={form}
      onFinish={onFinish}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 8 }}
      initialValues={initialValues}
    >
      <Form.Item
        name="name"
        label="Supplier Name"
        rules={[
          { type: "string" },
          { required: true, message: "Supplier Name is required" },
          { max: 100, message: "Supplier Name should not be too long" },
        ]}
      >
        <Input name="name" type="text"></Input>
      </Form.Item>
      <Form.Item
        name="email"
        label="Email"
        rules={[
          { type: "email", message: "Email is not valid" },
          { required: true, message: "Email is required" },
          { max: 300, message: "Email should not be too long" },
        ]}
      >
        <Input name="email" type="text"></Input>
      </Form.Item>
      <Form.Item
        name="address"
        label="Address"
        rules={[
          { type: "string" },
          { required: true, message: "Address is required" },
          { max: 300, message: "Address should not be too long" },
        ]}
      >
        <TextArea name="email" autoSize></TextArea>
      </Form.Item>
      <Form.Item
        name="phoneNumber"
        label="Phone Number"
        rules={[
          { type: "string", message: "Phone Number is not valid" },
          { required: true, message: "Phone Number is required" },
          { max: 12, message: "Phone Number is not valid" },
        ]}
      >
        <Input addonBefore="+84" name="phoneNumber" type="number"></Input>
      </Form.Item>
    </Form>
  );
};
interface SupplierType {
  key: React.Key;
  id: number;
  name: string;
  description: string;
}

const Supplierant = () => {
  const [refresh, setRefresh] = useState(false);
  const [currentId, setCurrentId] = useState<number | null>(null);
  const [patchPopup, setPatchPopup] = useState(false);
  const defaultColumns: ColumnsType<SupplierType> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      align: "right",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.id - b.id,
      width: 80,
    },
    {
      title: "Supplier Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
  ];
  return (
    <SubjectTemplate
      subject="order"
      subjects="orders"
      currentform={<SupplierForm />}
      defaultColumns={defaultColumns}
    />
  );
};
export default Supplierant;
