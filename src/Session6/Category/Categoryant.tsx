import React, { useEffect, useState } from "react";
import styles from "./Categoryant.module.css";
import axiosClient from "../config/axiosClient";
import {
  Alert,
  Button,
  Col,
  Divider,
  Flex,
  Form,
  Input,
  InputNumber,
  Modal,
  Popconfirm,
  Row,
  Space,
  Spin,
  Table,
  message,
} from "antd";
import Title from "antd/es/typography/Title";
import type { ColumnType, ColumnsType } from "antd/es/table";
import {
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineLoading3Quarters,
} from "react-icons/ai";
import TextArea from "antd/es/input/TextArea";
import GetSubjects from "../Components/GetSubjects";
import GetSubject from "../Components/GetSubject";
import AddSubject from "../Components/AddSubject";
import PatchSubject from "../Components/PatchSubject";
import { useCurrentId, usePatchPopup } from "../hooks/usePatch";
import { useRefresh } from "../hooks/useGet";
import DeleteSubject from "../Components/DeleteSubject";
import useTableColumn from "../hooks/useTableColumns";
type Props = {};

interface addschemaInput {
  name: string;
  description?: string;
}

const CategoryForm = ({
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
        label="Category Name"
        rules={[
          { type: "string" },
          { required: true, message: "Category Name is required" },
          { max: 50, message: "Category Name should not be too long" },
        ]}
      >
        <Input name="name" type="text"></Input>
      </Form.Item>
      <Form.Item
        name="description"
        label="Description"
        rules={[
          { type: "string" },
          { required: true, message: "Description is required" },
          { max: 500, message: "Description should not be too long" },
        ]}
      >
        <TextArea name="description" autoSize></TextArea>
      </Form.Item>
    </Form>
  );
};

interface CategoryType {
  key: React.Key;
  id: number;
  name: string;
  description: string;
}

const Categoryant = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  const setRefresh = useRefresh((state) => state.setRefresh);
  const refresh = useRefresh((state) => state.refresh);
  const setPatchPopup = usePatchPopup((state) => state.setPatchPopup);
  const patchPopup = usePatchPopup((state) => state.patchPopup);
  const currentId = useCurrentId((state) => state.currentId);
  const setCurrentId = useCurrentId((state) => state.setCurrentId);
  const defaultColumns: ColumnsType<CategoryType> = [
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
      title: "Category Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
  ];
  const [categoryColumn] = useTableColumn("categories", defaultColumns);

  return (
    <Flex vertical gap={15}>
      <GetSubject
        subject="categories"
        subjectColumn={categoryColumn}
        title="Get Category by ID"
      />
      {isLoggedIn && (
        <AddSubject
          currentform={<CategoryForm />}
          subject="categories"
          title="Add Category"
        />
      )}
      <GetSubjects
        subject="categories"
        subjectColumn={categoryColumn}
        title="All Categories"
      />
      {isLoggedIn && (
        <>
          {currentId && (
            <PatchSubject
              currentform={<CategoryForm />}
              subject="categories"
              title="Patch Category"
            />
          )}
        </>
      )}
    </Flex>
  );
};
export default Categoryant;
