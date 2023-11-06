import React, { useEffect, useState } from "react";
import styles from "./Supplier.module.css";
import axiosClient from "../config/axiosClient";
import {
  Alert,
  Button,
  Flex,
  Form,
  Input,
  InputNumber,
  Modal,
  Popconfirm,
  Space,
  Table,
  message,
} from "antd";
import Title from "antd/es/typography/Title";
import type { ColumnsType } from "antd/es/table";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import TextArea from "antd/es/input/TextArea";
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

const AddSupplier = ({
  refresh,
  setRefresh,
  messageApi,
}: {
  refresh: boolean;
  setRefresh: (data: any) => void;
  messageApi: any;
}) => {
  const [addsupplier] = Form.useForm();

  const submitAddSupplier = async (data: addschemaInput) => {
    try {
      messageApi.open({
        key: "addsupplier",
        type: "loading",
        content: "Loading",
      });
      const response = await axiosClient.post("/online-shop/suppliers/", data, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      });
      addsupplier.resetFields();
      messageApi.open({
        key: "addsupplier",
        type: "success",
        content:
          "Add " +
          response.data.name +
          " supplier with ID: " +
          response.data.id,
        duration: 2,
      });
      setRefresh(!refresh);
    } catch (error: any) {
      messageApi.open({
        key: "addsupplier",
        type: "error",
        content:
          error.response.data.message + ", try another email / phone number",
        duration: 2,
      });
    }
  };
  return (
    <Flex vertical>
      <Title level={3}>Add Supplier</Title>
      <SupplierForm form={addsupplier} onFinish={submitAddSupplier} />

      <Form.Item wrapperCol={{ offset: 6 }}>
        <Space>
          <Button type="primary" onClick={() => addsupplier.submit()}>
            Add this Supplier
          </Button>
          <Button onClick={() => addsupplier.resetFields()}>Reset</Button>
        </Space>
      </Form.Item>
    </Flex>
  );
};

const PatchSupplier = ({
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
  const [patchsupplier] = Form.useForm();
  const [initialData, setInitialData] = useState<addschemaInput | null>();
  useEffect(() => {
    const GetSupplier = async () => {
      try {
        const response = await axiosClient.get(
          "/online-shop/suppliers/" + currentId
        );
        setInitialData(response.data);
        console.log(initialData);
      } catch (error: any) {
        message.error(error.response.data.message, 2);
        setRefresh(!refresh);
        setPatchPopup(false);
      }
    };
    currentId && GetSupplier();
  }, [currentId]);
  const submitPatchSupplier = async (data: addschemaInput) => {
    try {
      messageApi.open({
        key: "addsupplier",
        type: "loading",
        content: "Loading",
      });
      const response = await axiosClient.patch(
        "/online-shop/suppliers/" + currentId,
        data,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        }
      );
      messageApi.open({
        key: "addsupplier",
        type: "success",
        content: "Supplier modified successfully",
      });
      setError(null);
      setRefresh(!refresh);
      setPatchPopup(false);
    } catch (error: any) {
      setError(error.response.data.message);
      messageApi.destroy("addsupplier");
    }
  };
  return (
    <Modal
      title="Modify Supplier"
      open={patchPopup}
      onCancel={() => {
        setPatchPopup(false);
        setCurrentId(null);
      }}
      onOk={() => patchsupplier.submit()}
      okText="Change this Supplier"
    >
      {initialData && (
        <SupplierForm
          form={patchsupplier}
          onFinish={submitPatchSupplier}
          initialValues={initialData}
        />
      )}
      {error && <Alert message={error} type="error" showIcon closable />}
    </Modal>
  );
};

const DeleteSupplier = (
  id: number,
  refresh: boolean,
  setRefresh: (data: any) => void,
  messageApi: any
) => {
  const ConfirmDeleteSupplier = async () => {
    try {
      messageApi.open({
        key: "deletesupplier",
        type: "loading",
        content: "Loading",
      });
      const response = await axiosClient.delete(
        "/online-shop/suppliers/" + id,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        }
      );
      messageApi.open({
        key: "deletesupplier",
        type: "success",
        content: "Supplier deleted",
      });
      setRefresh(!refresh);
    } catch (error: any) {
      messageApi.open({
        key: "deletesupplier",
        type: "error",
        content: error.response.data.message,
      });
    }
  };
  ConfirmDeleteSupplier();
};

interface SupplierType {
  key: React.Key;
  id: number;
  name: string;
  description: string;
}

const GetAllSuppliers = ({
  refresh,
  setRefresh,
  isLoggedIn,
  messageApi,
}: {
  refresh: boolean;
  setRefresh: (data: any) => void;
  isLoggedIn: boolean;
  messageApi: any;
}) => {
  const [data, setData] = useState([]);
  const [currentId, setCurrentId] = useState<number | null>(null);
  const [patchPopup, setPatchPopup] = useState(false);
  const supplierColumn: ColumnsType<SupplierType> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      align: "right",
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
    {
      title: "",
      dataIndex: "actions",
      key: "actions",
      fixed: "right",
      width: 200,
      render: (text: any, record: SupplierType, index: number) => {
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
              title="Delete Supplier"
              description="Are you sure to delete this supplier?"
              onConfirm={() =>
                DeleteSupplier(record.id, refresh, setRefresh, messageApi)
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
    },
  ];

  useEffect(() => {
    let getData = async () => {
      try {
        const response = await axiosClient.get("/online-shop/suppliers");
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
      <Title level={3}>All Suppliers</Title>
      {data.length == 0 ? (
        "Loading"
      ) : (
        <Table
          rowKey="id"
          columns={supplierColumn}
          dataSource={data}
          scroll={{ x: 400, y: 700 }}
        />
      )}
      {isLoggedIn && (
        <>
          {currentId && (
            <PatchSupplier
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

interface getschemaInput {
  supplierid: number;
}

const GetSupplier = ({
  refresh,
  setRefresh,
  isLoggedIn,
  messageApi,
}: {
  refresh: boolean;
  setRefresh: (data: any) => void;
  isLoggedIn: boolean;
  messageApi: any;
}) => {
  const [data, setData] = useState<SupplierType[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [getsupplier] = Form.useForm();
  const [currentId, setCurrentId] = useState<number | null>(null);
  const [patchPopup, setPatchPopup] = useState(false);
  const supplierColumn: ColumnsType<SupplierType> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      align: "right",
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
    {
      title: "",
      dataIndex: "actions",
      key: "actions",
      fixed: "right",
      width: 220,
      render: (text: any, record: SupplierType, index: number) => {
        return (
          <Flex>
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
              title="Delete Supplier"
              description="Are you sure to delete this supplier?"
              onConfirm={() =>
                DeleteSupplier(record.id, refresh, setRefresh, messageApi)
              }
              okText="Yes"
              cancelText="No"
            >
              <Button icon={<AiOutlineDelete />} danger>
                Delete
              </Button>
            </Popconfirm>
          </Flex>
        );
      },
    },
  ];
  const submitGetSupplier = async (data: getschemaInput) => {
    try {
      setLoading(true);
      const response = await axiosClient.get(
        "/online-shop/suppliers/" + data.supplierid
      );
      setData([response.data]);
      setLoading(false);
      getsupplier.resetFields();
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
      <Title level={3}>Get Supplier by ID</Title>
      <Form
        form={getsupplier}
        onFinish={submitGetSupplier}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
      >
        <Form.Item
          name="supplierid"
          rules={[
            { required: true, message: "ID must be required" },
            { type: "number", message: "ID must be a number" },
            { type: "integer", message: "ID must be interger" },
          ]}
        >
          <InputNumber
            type="number"
            name="supplierid"
            min={1}
            step={1}
          ></InputNumber>
        </Form.Item>
        <Button loading={loading} onClick={() => getsupplier.submit()}>
          Get this Supplier ID
        </Button>
      </Form>
      {data && (
        <>
          <Table
            columns={supplierColumn}
            dataSource={data}
            pagination={false}
            rowKey="id"
            scroll={{ x: 400 }}
          />

          {isLoggedIn && (
            <>
              {currentId && (
                <PatchSupplier
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
        </>
      )}
    </Flex>
  );
};

const Supplierant = ({
  isLoggedIn,
  messageApi,
}: {
  isLoggedIn: boolean;
  messageApi: any;
}) => {
  const [refresh, setRefresh] = useState(false);

  return (
    <Flex vertical gap={15}>
      <GetSupplier
        refresh={refresh}
        setRefresh={setRefresh}
        isLoggedIn={isLoggedIn}
        messageApi={messageApi}
      />
      {isLoggedIn && (
        <AddSupplier
          messageApi={messageApi}
          refresh={refresh}
          setRefresh={setRefresh}
        />
      )}
      <GetAllSuppliers
        refresh={refresh}
        setRefresh={setRefresh}
        isLoggedIn={isLoggedIn}
        messageApi={messageApi}
      />
    </Flex>
  );
};
export default Supplierant;
