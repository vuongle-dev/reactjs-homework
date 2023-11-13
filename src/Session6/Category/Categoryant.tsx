import React, { useEffect, useState } from "react";
import styles from "./Categoryant.module.css";
import axiosClient from "../config/axiosClient";
import {
  Alert,
  Button,
  Divider,
  Flex,
  Form,
  Input,
  InputNumber,
  Modal,
  Popconfirm,
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
  form: any;
  onFinish: (data: any) => void;
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

const AddCategory = ({
  refresh,
  setRefresh,
  messageApi,
}: {
  refresh: boolean;
  setRefresh: (data: any) => void;
  messageApi: any;
}) => {
  const [addcategory] = Form.useForm();

  const submitAddCategory = async (data: addschemaInput) => {
    try {
      messageApi.open({
        key: "addcategory",
        type: "loading",
        content: "Loading",
      });
      const response = await axiosClient.post(
        "/online-shop/categories/",
        data,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        }
      );
      addcategory.resetFields();
      messageApi.open({
        key: "addcategory",
        type: "success",
        content:
          "Add " +
          response.data.name +
          " category with ID: " +
          response.data.id,
        duration: 2,
      });
      setRefresh(!refresh);
    } catch (error: any) {
      messageApi.open({
        key: "addcategory",
        type: "error",
        content: error.response.data.message,
        duration: 2,
      });
    }
  };
  return (
    <Flex vertical>
      <Title level={3}>Add Category</Title>
      <CategoryForm form={addcategory} onFinish={submitAddCategory} />
      <Form.Item wrapperCol={{ offset: 6 }}>
        <Space>
          <Button type="primary" onClick={() => addcategory.submit()}>
            Add this Category
          </Button>
          <Button onClick={() => addcategory.resetFields()}>Reset</Button>
        </Space>
      </Form.Item>
    </Flex>
  );
};

const PatchCategory = ({
  currentId,
  setCurrentId,
  refresh,
  setRefresh,
  patchPopup,
  setPatchPopup,
  messageApi,
}: {
  currentId: number;
  setCurrentId: (data: any) => void;
  refresh: boolean;
  setRefresh: (data: any) => void;
  patchPopup: boolean;
  setPatchPopup: (data: any) => void;
  messageApi: any;
}) => {
  const [error, setError] = useState<string | null>(null);
  const [patchcategory] = Form.useForm();
  const [initialData, setInitialData] = useState<addschemaInput | null>();
  useEffect(() => {
    const GetCategory = async () => {
      try {
        const response = await axiosClient.get(
          "/online-shop/categories/" + currentId
        );
        setInitialData(response.data);
        console.log(initialData);
      } catch (error: any) {
        message.error(error.response.data.message, 2);
        setRefresh(!refresh);
        setPatchPopup(false);
      }
    };
    currentId && GetCategory();
  }, [currentId]);
  const submitPatchCategory = async (data: addschemaInput) => {
    try {
      messageApi.open({
        key: "addcategory",
        type: "loading",
        content: "Loading",
      });
      const response = await axiosClient.patch(
        "/online-shop/categories/" + currentId,
        data,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        }
      );
      messageApi.open({
        key: "addcategory",
        type: "success",
        content: "Category modified successfully",
      });
      setError(null);
      setRefresh(!refresh);
      setPatchPopup(false);
    } catch (error: any) {
      setError(error.response.data.message);
      messageApi.destroy("addcategory");
    }
  };
  return (
    <Modal
      title="Modify Category"
      open={patchPopup}
      onCancel={() => {
        setPatchPopup(false);
        setCurrentId(null);
      }}
      onOk={() => patchcategory.submit()}
      okText="Change this Category"
    >
      {initialData && (
        <CategoryForm
          form={patchcategory}
          onFinish={submitPatchCategory}
          initialValues={initialData}
        />
      )}
      {error && <Alert message={error} type="error" showIcon closable />}
    </Modal>
  );
};

const DeleteCategory = (
  id: number,
  refresh: boolean,
  setRefresh: (data: any) => void,
  messageApi: any
) => {
  const ConfirmDeleteCategory = async () => {
    try {
      messageApi.open({
        key: "deletecategory",
        type: "loading",
        content: "Loading",
      });
      const response = await axiosClient.delete(
        "/online-shop/categories/" + id,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        }
      );
      messageApi.open({
        key: "deletecategory",
        type: "success",
        content: "Category deleted",
      });
      setRefresh(!refresh);
    } catch (error: any) {
      messageApi.open({
        key: "deletecategory",
        type: "error",
        content: error.response.data.message,
      });
    }
  };
  ConfirmDeleteCategory();
};

interface CategoryType {
  key: React.Key;
  id: number;
  name: string;
  description: string;
}

const GetAllCategories = ({
  refresh,
  categoryColumn,
}: {
  refresh: boolean;

  categoryColumn: ColumnsType<CategoryType>;
}) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    let getData = async () => {
      try {
        const response = await axiosClient.get("/online-shop/categories");
        setData(response.data);
        setData((data) => [...data].reverse());
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [refresh]);

  return (
    <Flex vertical>
      <Title level={3}>All Categories</Title>
      {data.length == 0 ? (
        <Spin />
      ) : (
        <Table
          rowKey="id"
          columns={categoryColumn}
          dataSource={data}
          scroll={{ x: 400, y: 700 }}
        />
      )}
    </Flex>
  );
};

interface getschemaInput {
  categoryid: number;
}

const GetCategory = ({
  refresh,
  categoryColumn,
}: {
  refresh: boolean;
  categoryColumn: ColumnsType<CategoryType>;
}) => {
  const [data, setData] = useState<CategoryType[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [getcategory] = Form.useForm();
  const submitGetCategory = async (data: getschemaInput) => {
    try {
      setLoading(true);
      const response = await axiosClient.get(
        "/online-shop/categories/" + data.categoryid
      );
      setData([response.data]);
      setLoading(false);
      getcategory.resetFields();
    } catch (error: any) {
      setData(null);
      setLoading(false);
      message.error(error.response.data.message, 2);
    }
  };
  useEffect(() => {
    setData(null);
  }, [refresh]);
  return (
    <Flex vertical>
      <Title level={3}>Get Category by ID</Title>
      <Form
        form={getcategory}
        onFinish={submitGetCategory}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
      >
        <Form.Item
          name="categoryid"
          rules={[
            { required: true, message: "ID must be required" },
            { type: "number", message: "ID must be a number" },
            { type: "integer", message: "ID must be interger" },
          ]}
        >
          <InputNumber
            type="number"
            name="categoryid"
            min={1}
            step={1}
          ></InputNumber>
        </Form.Item>
        <Button loading={loading} onClick={() => getcategory.submit()}>
          Get this Category ID
        </Button>
      </Form>
      <Divider plain />
      {data && (
        <>
          <Table
            columns={categoryColumn}
            dataSource={data}
            pagination={false}
            rowKey="id"
            scroll={{ x: 400 }}
          />
        </>
      )}
    </Flex>
  );
};

const Categoryant = ({
  isLoggedIn,
  messageApi,
}: {
  isLoggedIn: boolean;
  messageApi: any;
}) => {
  const [refresh, setRefresh] = useState(false);
  const [currentId, setCurrentId] = useState<number | null>(null);
  const [patchPopup, setPatchPopup] = useState(false);
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
  const actionColumn: ColumnType<CategoryType> = {
    title: "",
    dataIndex: "actions",
    key: "actions",
    fixed: "right",
    width: 200,
    render: (text: any, record: CategoryType, index: number) => {
      return (
        <Space>
          <Button
            icon={<AiOutlineEdit />}
            onClick={() => {
              setCurrentId(record.id);
              setPatchPopup(true);
            }}
          >
            Edit
          </Button>
          <Popconfirm
            placement="topRight"
            title="Delete Category"
            description="Are you sure to delete this category?"
            onConfirm={() =>
              DeleteCategory(record.id, refresh, setRefresh, messageApi)
            }
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<AiOutlineDelete />} danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      );
    },
  };
  const [categoryColumn, setCategoryColumn] =
    useState<ColumnsType<CategoryType>>(defaultColumns);
  useEffect(() => {
    isLoggedIn
      ? setCategoryColumn([...defaultColumns, actionColumn])
      : setCategoryColumn(defaultColumns);
  }, [isLoggedIn]);

  return (
    <Flex vertical gap={15}>
      <GetCategory refresh={refresh} categoryColumn={categoryColumn} />
      {isLoggedIn && (
        <AddCategory
          messageApi={messageApi}
          refresh={refresh}
          setRefresh={setRefresh}
        />
      )}
      <GetAllCategories refresh={refresh} categoryColumn={categoryColumn} />
      {isLoggedIn && (
        <>
          {currentId && (
            <PatchCategory
              currentId={currentId}
              setCurrentId={setCurrentId}
              refresh={refresh}
              setRefresh={setRefresh}
              patchPopup={patchPopup}
              setPatchPopup={setPatchPopup}
              messageApi={messageApi}
            />
          )}
        </>
      )}
    </Flex>
  );
};
export default Categoryant;
