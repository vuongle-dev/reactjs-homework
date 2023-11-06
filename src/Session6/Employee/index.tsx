import React, { useEffect, useState } from "react";
import styles from "./Employee.module.css";
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

const EmployeeForm = ({
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

const AddEmployee = ({
  refresh,
  setRefresh,
  messageApi,
}: {
  refresh: boolean;
  setRefresh: (data: any) => void;
  messageApi: any;
}) => {
  const [addemployee] = Form.useForm();

  const submitAddEmployee = async (data: addschemaInput) => {
    try {
      messageApi.open({
        key: "addemployee",
        type: "loading",
        content: "Loading",
      });
      const response = await axiosClient.post("/online-shop/employees/", data, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      });
      addemployee.resetFields();
      messageApi.open({
        key: "addemployee",
        type: "success",
        content:
          "Add " +
          response.data.name +
          " employee with ID: " +
          response.data.id,
        duration: 2,
      });
      setRefresh(!refresh);
    } catch (error: any) {
      messageApi.open({
        key: "addemployee",
        type: "error",
        content:
          error.response.data.message + ", try another email / phone number",
        duration: 2,
      });
    }
  };
  return (
    <Flex vertical>
      <Title level={3}>Add Employee</Title>
      <EmployeeForm form={addemployee} onFinish={submitAddEmployee} />

      <Form.Item wrapperCol={{ offset: 6 }}>
        <Space>
          <Button type="primary" onClick={() => addemployee.submit()}>
            Add this Employee
          </Button>
          <Button onClick={() => addemployee.resetFields()}>Reset</Button>
        </Space>
      </Form.Item>
    </Flex>
  );
};

const PatchEmployee = ({
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
  const [patchemployee] = Form.useForm();
  const [initialData, setInitialData] = useState<addschemaInput | null>();
  useEffect(() => {
    const GetEmployee = async () => {
      try {
        const response = await axiosClient.get(
          "/online-shop/employees/" + currentId
        );
        setInitialData(response.data);
        console.log(initialData);
      } catch (error: any) {
        message.error(error.response.data.message, 2);
        setRefresh(!refresh);
        setPatchPopup(false);
      }
    };
    currentId && GetEmployee();
  }, [currentId]);
  const submitPatchEmployee = async (data: addschemaInput) => {
    try {
      messageApi.open({
        key: "addemployee",
        type: "loading",
        content: "Loading",
      });
      const response = await axiosClient.patch(
        "/online-shop/employees/" + currentId,
        data,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        }
      );
      messageApi.open({
        key: "addemployee",
        type: "success",
        content: "Employee modified successfully",
      });
      setError(null);
      setRefresh(!refresh);
      setPatchPopup(false);
    } catch (error: any) {
      setError(error.response.data.message);
      messageApi.destroy("addemployee");
    }
  };
  return (
    <Modal
      title="Modify Employee"
      open={patchPopup}
      onCancel={() => {
        setPatchPopup(false);
        setCurrentId(null);
      }}
      onOk={() => patchemployee.submit()}
      okText="Change this Employee"
    >
      {initialData && (
        <EmployeeForm
          form={patchemployee}
          onFinish={submitPatchEmployee}
          initialValues={initialData}
        />
      )}
      {error && <Alert message={error} type="error" showIcon closable />}
    </Modal>
  );
};

const DeleteEmployee = (
  id: number,
  refresh: boolean,
  setRefresh: (data: any) => void,
  messageApi: any
) => {
  const ConfirmDeleteEmployee = async () => {
    try {
      messageApi.open({
        key: "deleteemployee",
        type: "loading",
        content: "Loading",
      });
      const response = await axiosClient.delete(
        "/online-shop/employees/" + id,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        }
      );
      messageApi.open({
        key: "deleteemployee",
        type: "success",
        content: "Employee deleted",
      });
      setRefresh(!refresh);
    } catch (error: any) {
      messageApi.open({
        key: "deleteemployee",
        type: "error",
        content: error.response.data.message,
      });
    }
  };
  ConfirmDeleteEmployee();
};

interface EmployeeType extends addschemaInput {
  key: React.Key;
  id: number;
}

const GetAllEmployees = ({
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
  const employeeColumn: ColumnsType<EmployeeType> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      align: "right",
      width: 80,
    },
    {
      title: "Employee First Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Employee Last Name",
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
      render: (text: any, record: EmployeeType, index: number) => {
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
      render: (text: any, record: EmployeeType, index: number) => {
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
              title="Delete Employee"
              description="Are you sure to delete this employee?"
              onConfirm={() =>
                DeleteEmployee(record.id, refresh, setRefresh, messageApi)
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
        const response = await axiosClient.get("/online-shop/employees");
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
      <Title level={3}>All Employees</Title>
      {data.length == 0 ? (
        "Loading"
      ) : (
        <Table
          rowKey="id"
          columns={employeeColumn}
          dataSource={data}
          scroll={{ x: 400, y: 800 }}
        />
      )}
      {isLoggedIn && (
        <>
          {currentId && (
            <PatchEmployee
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
  employeeid: number;
}

const GetEmployee = ({
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
  const [data, setData] = useState<EmployeeType[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [getemployee] = Form.useForm();
  const [currentId, setCurrentId] = useState<number | null>(null);
  const [patchPopup, setPatchPopup] = useState(false);
  const employeeColumn: ColumnsType<EmployeeType> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      align: "right",
      width: 80,
    },
    {
      title: "Employee First Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Employee Last Name",
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
      render: (text: any, record: EmployeeType, index: number) => {
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
      render: (text: any, record: EmployeeType, index: number) => {
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
              title="Delete Employee"
              description="Are you sure to delete this employee?"
              onConfirm={() =>
                DeleteEmployee(record.id, refresh, setRefresh, messageApi)
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
  const submitGetEmployee = async (data: getschemaInput) => {
    try {
      setLoading(true);
      const response = await axiosClient.get(
        "/online-shop/employees/" + data.employeeid
      );
      setData([response.data]);
      setLoading(false);
      getemployee.resetFields();
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
      <Title level={3}>Get Employee by ID</Title>
      <Form
        form={getemployee}
        onFinish={submitGetEmployee}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
      >
        <Form.Item
          name="employeeid"
          rules={[
            { required: true, message: "ID must be required" },
            { type: "number", message: "ID must be a number" },
            { type: "integer", message: "ID must be interger" },
          ]}
        >
          <InputNumber
            type="number"
            name="employeeid"
            min={1}
            step={1}
          ></InputNumber>
        </Form.Item>
        <Button loading={loading} onClick={() => getemployee.submit()}>
          Get this Employee ID
        </Button>
      </Form>
      {data && (
        <>
          <Table
            columns={employeeColumn}
            dataSource={data}
            pagination={false}
            rowKey="id"
            scroll={{ x: 400 }}
          />

          {isLoggedIn && (
            <>
              {currentId && (
                <PatchEmployee
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

const Employeeant = ({
  isLoggedIn,
  messageApi,
}: {
  isLoggedIn: boolean;
  messageApi: any;
}) => {
  const [refresh, setRefresh] = useState(false);

  return (
    <Flex vertical gap={15}>
      <GetEmployee
        refresh={refresh}
        setRefresh={setRefresh}
        isLoggedIn={isLoggedIn}
        messageApi={messageApi}
      />
      {isLoggedIn && (
        <AddEmployee
          messageApi={messageApi}
          refresh={refresh}
          setRefresh={setRefresh}
        />
      )}
      <GetAllEmployees
        refresh={refresh}
        setRefresh={setRefresh}
        isLoggedIn={isLoggedIn}
        messageApi={messageApi}
      />
    </Flex>
  );
};
export default Employeeant;
