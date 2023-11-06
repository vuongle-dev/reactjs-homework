import React, { useEffect, useState } from "react";
import styles from "./Customer.module.css";
import axiosClient from "../config/axiosClient";
import {
  Alert,
  Button,
  DatePicker,
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
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import customParseFormat from "dayjs/plugin/customParseFormat";
import Title from "antd/es/typography/Title";
import type { ColumnsType } from "antd/es/table";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import TextArea from "antd/es/input/TextArea";
type Props = {};

dayjs.extend(customParseFormat);
dayjs.extend(utc);
const dateFormat = "DD/MM/YYYY";

interface addschemaInput {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  birthday?: string;
}

const CustomerForm = ({
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
    >
      <Form.Item
        name="firstName"
        label="First Name"
        rules={[
          { type: "string" },
          { required: true, message: "Customer First Name is required" },
          { max: 100, message: "Customer Name should not be too long" },
        ]}
        initialValue={initialValues && initialValues.firstName}
      >
        <Input name="firstName" type="text"></Input>
      </Form.Item>
      <Form.Item
        name="lastName"
        label="Last Name"
        rules={[
          { type: "string" },
          { required: true, message: "Customer Last Name is required" },
          { max: 100, message: "Customer Name should not be too long" },
        ]}
        initialValue={initialValues && initialValues.lastName}
      >
        <Input name="lastName" type="text"></Input>
      </Form.Item>
      <Form.Item
        name="email"
        label="Email"
        rules={[
          { type: "email", message: "Email is not valid" },
          { required: true, message: "Email is required" },
          { max: 300, message: "Email should not be too long" },
        ]}
        initialValue={initialValues && initialValues.email}
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
        initialValue={initialValues && initialValues.address}
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
        initialValue={initialValues && initialValues.phoneNumber}
      >
        <Input addonBefore="+84" name="phoneNumber" type="number"></Input>
      </Form.Item>
      <Form.Item
        name="birthday"
        label="Birthday"
        rules={[
          { type: "date", message: "Birthday is not valid" },
          // { required: true, message: "Birthday is required" },
        ]}
        initialValue={initialValues && dayjs(initialValues.birthday).utc()}
      >
        <DatePicker format={dateFormat} name="birthday" />
      </Form.Item>
    </Form>
  );
};

const AddCustomer = ({
  refresh,
  setRefresh,
  messageApi,
}: {
  refresh: boolean;
  setRefresh: (data: any) => void;
  messageApi: any;
}) => {
  const [addcustomer] = Form.useForm();

  const submitAddCustomer = async (data: addschemaInput) => {
    try {
      messageApi.open({
        key: "addcustomer",
        type: "loading",
        content: "Loading",
      });
      const response = await axiosClient.post("/online-shop/customers/", data, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      });
      addcustomer.resetFields();
      messageApi.open({
        key: "addcustomer",
        type: "success",
        content:
          "Add " +
          response.data.name +
          " customer with ID: " +
          response.data.id,
        duration: 2,
      });
      setRefresh(!refresh);
    } catch (error: any) {
      messageApi.open({
        key: "addcustomer",
        type: "error",
        content:
          error.response.data.message + ", try another email / phone number",
        duration: 2,
      });
    }
  };
  return (
    <Flex vertical>
      <Title level={3}>Add Customer</Title>
      <CustomerForm form={addcustomer} onFinish={submitAddCustomer} />

      <Form.Item wrapperCol={{ offset: 6 }}>
        <Space>
          <Button type="primary" onClick={() => addcustomer.submit()}>
            Add this Customer
          </Button>
          <Button onClick={() => addcustomer.resetFields()}>Reset</Button>
        </Space>
      </Form.Item>
    </Flex>
  );
};

const PatchCustomer = ({
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
  const [patchcustomer] = Form.useForm();
  const [initialData, setInitialData] = useState<addschemaInput | null>();
  useEffect(() => {
    const GetCustomer = async () => {
      try {
        const response = await axiosClient.get(
          "/online-shop/customers/" + currentId
        );
        setInitialData(response.data);
        console.log(initialData);
      } catch (error: any) {
        message.error(error.response.data.message, 2);
        setRefresh(!refresh);
        setPatchPopup(false);
      }
    };
    currentId && GetCustomer();
  }, [currentId]);
  const submitPatchCustomer = async (data: addschemaInput) => {
    try {
      messageApi.open({
        key: "addcustomer",
        type: "loading",
        content: "Loading",
      });
      const response = await axiosClient.patch(
        "/online-shop/customers/" + currentId,
        data,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        }
      );
      messageApi.open({
        key: "addcustomer",
        type: "success",
        content: "Customer modified successfully",
      });
      setError(null);
      setRefresh(!refresh);
      setPatchPopup(false);
    } catch (error: any) {
      setError(error.response.data.message);
      messageApi.destroy("addcustomer");
    }
  };
  return (
    <Modal
      title="Modify Customer"
      open={patchPopup}
      onCancel={() => {
        setPatchPopup(false);
        setCurrentId(null);
      }}
      onOk={() => patchcustomer.submit()}
      okText="Change this Customer"
    >
      {initialData && (
        <CustomerForm
          form={patchcustomer}
          onFinish={submitPatchCustomer}
          initialValues={initialData}
        />
      )}
      {error && <Alert message={error} type="error" showIcon closable />}
    </Modal>
  );
};

const DeleteCustomer = (
  id: number,
  refresh: boolean,
  setRefresh: (data: any) => void,
  messageApi: any
) => {
  const ConfirmDeleteCustomer = async () => {
    try {
      messageApi.open({
        key: "deletecustomer",
        type: "loading",
        content: "Loading",
      });
      const response = await axiosClient.delete(
        "/online-shop/customers/" + id,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        }
      );
      messageApi.open({
        key: "deletecustomer",
        type: "success",
        content: "Customer deleted",
      });
      setRefresh(!refresh);
    } catch (error: any) {
      messageApi.open({
        key: "deletecustomer",
        type: "error",
        content: error.response.data.message,
      });
    }
  };
  ConfirmDeleteCustomer();
};

interface CustomerType extends addschemaInput {
  key: React.Key;
  id: number;
}

const GetAllCustomers = ({
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
  const customerColumn: ColumnsType<CustomerType> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      align: "right",
      width: 80,
    },
    {
      title: "Customer First Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Customer Last Name",
      dataIndex: "lastName",
      key: "lastName",
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
      title: "Birthday",
      dataIndex: "birthday",
      key: "birthday",
      render: (text: any, record: CustomerType, index: number) => {
        return (
          <>{record.birthday && dayjs(record.birthday).format(dateFormat)}</>
        );
      },
    },
    {
      title: "",
      dataIndex: "actions",
      key: "actions",
      fixed: "right",
      width: 200,
      render: (text: any, record: CustomerType, index: number) => {
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
              title="Delete Customer"
              description="Are you sure to delete this customer?"
              onConfirm={() =>
                DeleteCustomer(record.id, refresh, setRefresh, messageApi)
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
        const response = await axiosClient.get("/online-shop/customers");
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
      <Title level={3}>All Customers</Title>
      {data.length == 0 ? (
        "Loading"
      ) : (
        <Table
          rowKey="id"
          columns={customerColumn}
          dataSource={data}
          scroll={{ x: 400, y: 800 }}
        />
      )}
      {isLoggedIn && (
        <>
          {currentId && (
            <PatchCustomer
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
  customerid: number;
}

const GetCustomer = ({
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
  const [data, setData] = useState<CustomerType[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [getcustomer] = Form.useForm();
  const [currentId, setCurrentId] = useState<number | null>(null);
  const [patchPopup, setPatchPopup] = useState(false);
  const customerColumn: ColumnsType<CustomerType> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      align: "right",
      width: 80,
    },
    {
      title: "Customer First Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Customer Last Name",
      dataIndex: "lastName",
      key: "lastName",
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
      title: "Birthday",
      dataIndex: "birthday",
      key: "birthday",
      render: (text: any, record: CustomerType, index: number) => {
        return (
          <>{record.birthday && dayjs(record.birthday).format(dateFormat)}</>
        );
      },
    },
    {
      title: "",
      dataIndex: "actions",
      key: "actions",
      fixed: "right",
      width: 220,
      render: (text: any, record: CustomerType, index: number) => {
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
              title="Delete Customer"
              description="Are you sure to delete this customer?"
              onConfirm={() =>
                DeleteCustomer(record.id, refresh, setRefresh, messageApi)
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
  const submitGetCustomer = async (data: getschemaInput) => {
    try {
      setLoading(true);
      const response = await axiosClient.get(
        "/online-shop/customers/" + data.customerid
      );
      setData([response.data]);
      setLoading(false);
      getcustomer.resetFields();
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
      <Title level={3}>Get Customer by ID</Title>
      <Form
        form={getcustomer}
        onFinish={submitGetCustomer}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
      >
        <Form.Item
          name="customerid"
          rules={[
            { required: true, message: "ID must be required" },
            { type: "number", message: "ID must be a number" },
            { type: "integer", message: "ID must be interger" },
          ]}
        >
          <InputNumber
            type="number"
            name="customerid"
            min={1}
            step={1}
          ></InputNumber>
        </Form.Item>
        <Button loading={loading} onClick={() => getcustomer.submit()}>
          Get this Customer ID
        </Button>
      </Form>
      {data && (
        <>
          <Table
            columns={customerColumn}
            dataSource={data}
            pagination={false}
            rowKey="id"
            scroll={{ x: 400 }}
          />

          {isLoggedIn && (
            <>
              {currentId && (
                <PatchCustomer
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

const Customerant = ({
  isLoggedIn,
  messageApi,
}: {
  isLoggedIn: boolean;
  messageApi: any;
}) => {
  const [refresh, setRefresh] = useState(false);

  return (
    <Flex vertical gap={15}>
      <GetCustomer
        refresh={refresh}
        setRefresh={setRefresh}
        isLoggedIn={isLoggedIn}
        messageApi={messageApi}
      />
      {isLoggedIn && (
        <AddCustomer
          messageApi={messageApi}
          refresh={refresh}
          setRefresh={setRefresh}
        />
      )}
      <GetAllCustomers
        refresh={refresh}
        setRefresh={setRefresh}
        isLoggedIn={isLoggedIn}
        messageApi={messageApi}
      />
    </Flex>
  );
};
export default Customerant;
