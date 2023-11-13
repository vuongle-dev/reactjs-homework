import React, { useEffect, useState } from "react";
import styles from "./Order.module.css";
import axiosClient from "../config/axiosClient";
import {
  Alert,
  Button,
  Col,
  DatePicker,
  Flex,
  Form,
  Input,
  InputNumber,
  Modal,
  Popconfirm,
  Radio,
  Row,
  Select,
  Space,
  Spin,
  Statistic,
  Table,
  message,
} from "antd";
import Title from "antd/es/typography/Title";
import type { ColumnType, ColumnsType } from "antd/es/table";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import TextArea from "antd/es/input/TextArea";
import { EnumType } from "typescript";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import customParseFormat from "dayjs/plugin/customParseFormat";
type Props = {};

dayjs.extend(customParseFormat);
dayjs.extend(utc);
const timeFormat = "HH:mm";
const dateFormat = "DD/MM/YYYY " + timeFormat;

interface getoption {
  id: number;
  name: string;
}
interface getpeople {
  id: number;
  firstName: string;
  lastName: string;
}
interface product {
  id: number;
  name: string;
  price: number;
  discount: number;
}
interface order {
  productId: number;
  product: getoption;
  quantity: number;
  price: number;
  discount: number;
}
interface addschemaInput {
  createdDate: string;
  shippedDate: string;
  status: string;
  description: string;
  shippingAddress: string;
  shippingCity: string;
  paymentType: string;
  customer: getpeople;
  employee: getpeople;
  orderDetails: order[];
}

const ProductForm = ({
  form,
  products,
  orderDetails,
  setOrderDetails,
}: {
  form: any;
  products: product[];
  orderDetails: order[];
  setOrderDetails: (data: any) => void;
}) => {
  const [productForm] = Form.useForm();
  const addProduct = (data: order) => {
    setOrderDetails([
      ...orderDetails,
      {
        productId: data.productId,
        product: {
          id: data.productId,
          name: products.find((product) => {
            return product.id === data.productId;
          })?.name,
        },
        quantity: data.quantity,
        price: data.price,
        discount: data.discount,
      },
    ]);
  };
  const selectProduct = (productid: number) => {
    let selectedProduct = products.find((item) => {
      return item.id === productid;
    });
    console.log(selectedProduct);
    productForm.setFieldsValue({
      price: selectedProduct?.price,
      discount: selectedProduct?.discount,
    });
  };

  return (
    <Form
      form={productForm}
      onFinish={addProduct}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 8 }}
    >
      <Form.Item
        name="productId"
        label="Product"
        rules={[
          { type: "number" },
          { required: true, message: "Employee is required" },
        ]}
      >
        <Select
          options={products.map((item) => {
            return { value: item.id, label: item.name };
          })}
          onSelect={(value) => selectProduct(value)}
        ></Select>
      </Form.Item>
      <Form.Item
        name="quantity"
        label="Quantity"
        rules={[
          { type: "number", message: "Quantity is not valid" },
          { type: "integer", message: "Quantity is not valid" },
          { required: true, message: "Quantity is required" },
        ]}
      >
        <InputNumber
          name="quantity"
          addonBefore="$"
          min={1}
          step={1}
        ></InputNumber>
      </Form.Item>
      <Form.Item
        name="price"
        label="Price"
        rules={[
          { type: "number", message: "Price is not valid" },
          { required: true, message: "Price is required" },
        ]}
      >
        <InputNumber name="price" addonBefore="$" min={0.05}></InputNumber>
      </Form.Item>
      <Form.Item
        name="discount"
        label="Discount"
        rules={[
          { type: "number", message: "Discount is not valid" },
          { required: true, message: "Discount is required" },
        ]}
      >
        <InputNumber
          name="discount"
          addonAfter={"%"}
          min={0}
          max={90}
        ></InputNumber>
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 6 }}>
        <Button onClick={() => productForm.submit()}>
          Add Product to Order
        </Button>
      </Form.Item>
    </Form>
  );
};

const OrderForm = ({
  form,
  onFinish,
  initialValues,
}: {
  form: any;
  onFinish: (data: any) => void;
  initialValues?: addschemaInput;
}) => {
  const [customers, setCustomers] = useState<getpeople[]>([]);
  const [employees, setEmployees] = useState<getpeople[]>([]);
  const [products, setProducts] = useState<product[]>([]);
  const [orderDetails, setOrderDetails] = useState<order[]>([]);
  useEffect(() => {
    let getCustomers = async () => {
      try {
        let response = await axiosClient.get("/online-shop/customers");
        setCustomers(response.data);
        setCustomers((data) => [...data].reverse());
      } catch (error) {
        console.log(error);
      }
    };
    let getEmployees = async () => {
      try {
        let response = await axiosClient.get("/online-shop/employees");
        setEmployees(response.data);
        setEmployees((data) => [...data].reverse());
      } catch (error) {
        console.log(error);
      }
    };
    let getProduct = async () => {
      try {
        let response = await axiosClient.get("/online-shop/products/");
        setProducts(response.data);
        setProducts((data) => [...data].reverse());
      } catch (error) {
        console.log(error);
      }
    };
    getCustomers();
    getEmployees();
    getProduct();
    initialValues
      ? setOrderDetails(initialValues.orderDetails)
      : setOrderDetails([]);
    setOrderDetails((orderDetails) =>
      orderDetails.map((item) => ({ ...item, productId: item.product.id }))
    );
  }, []);
  useEffect(() => {
    form.setFieldValue("orderDetails", orderDetails);
    console.log(form.getFieldsValue());
  }, [orderDetails]);
  const deleteProduct = (index: number) => {
    let newOrderDetails = orderDetails.slice();
    newOrderDetails.splice(index, 1);
    setOrderDetails(newOrderDetails);
  };
  const productColumn: ColumnsType<order> = [
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      align: "right",
      width: 50,
    },
    {
      title: "Product Name",
      dataIndex: "product.name",
      key: "product.name",
      render: (text: any, record: order, index: number) => {
        return <>{record.product.name}</>;
      },
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      align: "right",
      render: (text: any, record: order, index: number) => {
        return <>${record.price}</>;
      },
    },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
      align: "right",
      render: (text: any, record: order, index: number) => {
        return <>{record.discount}%</>;
      },
    },
    {
      title: "",
      dataIndex: "actions",
      key: "actions",
      fixed: "right",
      width: 80,
      render: (text: any, record: order, index: number) => {
        return (
          <Space>
            <Popconfirm
              placement="topRight"
              title="Delete Product"
              description="Are you sure to delete this product?"
              onConfirm={() => {
                deleteProduct(index);
              }}
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
  return (
    <Form
      form={form}
      onFinish={onFinish}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 8 }}
      initialValues={
        initialValues && {
          ...initialValues,
          shippedDate:
            initialValues.shippedDate && dayjs(initialValues.shippedDate).utc(),
          createdDate:
            initialValues.createdDate && dayjs(initialValues.createdDate).utc(),
        }
      }
    >
      <Form.Item
        name="createdDate"
        label="Created Date"
        rules={[
          { type: "date", message: "Created Date is not valid" },
          // { required: true, message: "Created Date is required" },
        ]}
      >
        <DatePicker
          showTime={{ format: timeFormat }}
          format={dateFormat}
          name="createdDate"
        />
      </Form.Item>
      <Form.Item
        name="shippedDate"
        label="Created Date"
        rules={[
          { type: "date", message: "Shipped Date is not valid" },
          // { required: true, message: "Shipped Date is required" },
        ]}
      >
        <DatePicker
          showTime={{ format: timeFormat }}
          format={dateFormat}
          name="shippedDate"
        />
      </Form.Item>
      <Form.Item
        name="shippingAddress"
        label="Shipping Address"
        rules={[
          { type: "string" },
          // { required: true, message: "Shipping Address is required" },
        ]}
      >
        <TextArea name="shippingAddress" autoSize></TextArea>
      </Form.Item>
      <Form.Item
        name="shippingCity"
        label="Shipping City"
        rules={[
          { type: "string" },
          // { required: true, message: "Shipping City is required" },
        ]}
      >
        <Input name="shippingCity" type="text"></Input>
      </Form.Item>
      <Form.Item
        name="paymentType"
        label="Payment Type"
        rules={[
          {
            type: "enum",
            enum: ["CASH", "CREDIT CARD"],
            message: "Payment type is not valid",
          },
          // { required: true, message: "Payment Type is required" },
        ]}
      >
        <Radio.Group
          optionType="button"
          options={[
            { value: "CASH", label: "Cash" },
            { value: "CREDIT CARD", label: "Credit Card" },
          ]}
        />
      </Form.Item>
      <Form.Item
        name="status"
        label="Status"
        rules={[
          {
            type: "enum",
            enum: ["WAITING", "COMPLETED", "CANCELED"],
            message: "Status is not valid",
          },

          // { required: true, message: "Status is required" },
        ]}
      >
        <Radio.Group
          optionType="button"
          options={[
            { value: "WAITING", label: "Waiting" },
            { value: "COMPLETED", label: "Completed" },
            { value: "CANCELED", label: "Canceled", style: { color: "red" } },
          ]}
        />
      </Form.Item>
      <Form.Item
        name="customerId"
        label="Customer"
        rules={[
          { type: "number" },
          { required: true, message: "Customer is required" },
        ]}
      >
        <Select
          options={customers.map((item) => {
            return {
              value: item.id,
              label: item.firstName + " " + item.lastName,
            };
          })}
        ></Select>
      </Form.Item>
      <Form.Item
        name="employeeId"
        label="Employee"
        rules={[
          { type: "number" },
          { required: true, message: "Employee is required" },
        ]}
      >
        <Select
          options={employees.map((item) => {
            return {
              value: item.id,
              label: item.firstName + " " + item.lastName,
            };
          })}
        ></Select>
      </Form.Item>
      <Title level={4}>Order Detail</Title>
      <Form.Item style={{ display: "none" }} name="orderDetails"></Form.Item>
      <Flex vertical gap={10}>
        {orderDetails.length > 0 && (
          // orderDetails.map((item: order, index: number) => {
          //   return (
          //     <ul key={index}>
          //       <li>
          //         {item.quantity +
          //           " x " +
          //           products.find((product) => {
          //             return product.id === item.productId;
          //           })?.name}
          //       </li>
          //     </ul>
          //   );
          // })
          <Table
            columns={productColumn}
            dataSource={orderDetails}
            pagination={false}
          />
        )}
        <ProductForm
          form={form}
          products={products}
          orderDetails={orderDetails}
          setOrderDetails={setOrderDetails}
        />
      </Flex>

      <Form.Item
        name="description"
        label="Description"
        rules={[
          { type: "string" },
          // { required: true, message: "Description is required" },
          { max: 300, message: "Description should not be too long" },
        ]}
      >
        <TextArea name="description" autoSize></TextArea>
      </Form.Item>
    </Form>
  );
};

const AddOrder = ({
  refresh,
  setRefresh,
  messageApi,
}: {
  refresh: boolean;
  setRefresh: (data: any) => void;
  messageApi: any;
}) => {
  const [addorder] = Form.useForm();
  useEffect(() => {}, []);

  const submitAddOrder = async (data: addschemaInput) => {
    try {
      messageApi.open({
        key: "addorder",
        type: "loading",
        content: "Loading",
      });
      const response = await axiosClient.post("/online-shop/orders/", data, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      });
      addorder.resetFields();
      messageApi.open({
        key: "addorder",
        type: "success",
        content:
          "Add " + response.data.name + " order with ID: " + response.data.id,
        duration: 2,
      });
      setRefresh(!refresh);
    } catch (error: any) {
      messageApi.open({
        key: "addorder",
        type: "error",
        content:
          error.response.data.message + ", try another email / phone number",
        duration: 2,
      });
    }
  };
  return (
    <Flex vertical>
      <Title level={3}>Add Order</Title>
      <OrderForm form={addorder} onFinish={submitAddOrder} />
      <Form.Item wrapperCol={{ offset: 6 }}>
        <Space>
          <Button type="primary" onClick={() => addorder.submit()}>
            Add this Order
          </Button>
          <Button onClick={() => addorder.resetFields()}>Reset</Button>
        </Space>
      </Form.Item>
    </Flex>
  );
};

const PatchOrder = ({
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
  const [patchorder] = Form.useForm();
  const [initialData, setInitialData] = useState<addschemaInput | null>();
  useEffect(() => {
    const GetOrder = async () => {
      try {
        const response = await axiosClient.get(
          "/online-shop/orders/" + currentId
        );
        setInitialData(response.data);
      } catch (error: any) {
        message.error(error.response.data.message, 2);
        setRefresh(!refresh);
        setPatchPopup(false);
      }
    };
    currentId && GetOrder();
  }, [currentId]);
  const submitPatchOrder = async (data: addschemaInput) => {
    try {
      messageApi.open({
        key: "addorder",
        type: "loading",
        content: "Loading",
      });
      const response = await axiosClient.patch(
        "/online-shop/orders/" + currentId,
        data,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        }
      );
      messageApi.open({
        key: "addorder",
        type: "success",
        content: "Order modified successfully",
      });
      setError(null);
      setRefresh(!refresh);
      setPatchPopup(false);
    } catch (error: any) {
      setError(error.response.data.message);
      messageApi.destroy("addorder");
    }
  };
  return (
    <Modal
      title="Modify Order"
      open={patchPopup}
      width="70vw"
      footer=<Row>
        <Col span={6} />
        <Col>
          <Space>
            <Button type="primary" onClick={() => patchorder.submit()}>
              Change this Category
            </Button>
            <Button
              onClick={() => {
                setPatchPopup(false);
                setCurrentId(null);
              }}
            >
              Cancel
            </Button>
          </Space>
        </Col>
      </Row>
    >
      {initialData && (
        <OrderForm
          form={patchorder}
          onFinish={submitPatchOrder}
          initialValues={initialData}
        />
      )}
      {error && <Alert message={error} type="error" showIcon closable />}
    </Modal>
  );
};

const DeleteOrder = (
  id: number,
  refresh: boolean,
  setRefresh: (data: any) => void,
  messageApi: any
) => {
  const ConfirmDeleteOrder = async () => {
    try {
      messageApi.open({
        key: "deleteorder",
        type: "loading",
        content: "Loading",
      });
      const response = await axiosClient.delete("/online-shop/orders/" + id, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      });
      messageApi.open({
        key: "deleteorder",
        type: "success",
        content: "Order deleted",
      });
      setRefresh(!refresh);
    } catch (error: any) {
      messageApi.open({
        key: "deleteorder",
        type: "error",
        content: error.response.data.message,
      });
    }
  };
  ConfirmDeleteOrder();
};

interface OrderType extends addschemaInput {
  key: React.Key;
  id: number;
}

const GetAllOrders = ({
  refresh,
  orderColumn,
}: {
  refresh: boolean;
  orderColumn: ColumnsType<OrderType>;
}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    let getData = async () => {
      try {
        const response = await axiosClient.get("/online-shop/orders");
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
      <Title level={3}>All Orders</Title>
      {data.length == 0 ? (
        <Spin />
      ) : (
        <Table
          rowKey="id"
          columns={orderColumn}
          dataSource={data}
          scroll={{ x: 400, y: 700 }}
        />
      )}
    </Flex>
  );
};

interface getschemaInput {
  orderid: number;
}

const GetOrder = ({
  refresh,
  orderColumn,
}: {
  refresh: boolean;
  orderColumn: ColumnsType<OrderType>;
}) => {
  const [data, setData] = useState<OrderType[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [getorder] = Form.useForm();
  const submitGetOrder = async (data: getschemaInput) => {
    try {
      setLoading(true);
      const response = await axiosClient.get(
        "/online-shop/orders/" + data.orderid
      );
      setData([response.data]);
      setLoading(false);
      getorder.resetFields();
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
      <Title level={3}>Get Order by ID</Title>
      <Form
        form={getorder}
        onFinish={submitGetOrder}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
      >
        <Form.Item
          name="orderid"
          rules={[
            { required: true, message: "ID must be required" },
            { type: "number", message: "ID must be a number" },
            { type: "integer", message: "ID must be interger" },
          ]}
        >
          <InputNumber
            type="number"
            name="orderid"
            min={1}
            step={1}
          ></InputNumber>
        </Form.Item>
        <Button loading={loading} onClick={() => getorder.submit()}>
          Get this Order ID
        </Button>
      </Form>
      {data && (
        <>
          <Table
            columns={orderColumn}
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

const Orderant = ({
  isLoggedIn,
  messageApi,
}: {
  isLoggedIn: boolean;
  messageApi: any;
}) => {
  const [refresh, setRefresh] = useState(false);
  const [currentId, setCurrentId] = useState<number | null>(null);
  const [patchPopup, setPatchPopup] = useState(false);
  const defaultColumns: ColumnsType<OrderType> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      align: "right",
      width: 80,
      defaultSortOrder: "descend",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Created Date",
      dataIndex: "createdDate",
      key: "createdDate",
      render: (text: any, record: OrderType, index: number) => {
        return (
          <>
            {record.createdDate && dayjs(record.createdDate).format(dateFormat)}
          </>
        );
      },
    },
    {
      title: "Shipped Date",
      dataIndex: "shippedDate",
      key: "shippedDate",
      render: (text: any, record: OrderType, index: number) => {
        return (
          <>
            {record.shippedDate && dayjs(record.shippedDate).format(dateFormat)}
          </>
        );
      },
    },
    {
      title: "Shipping Address",
      dataIndex: "shippingAddress",
      key: "shippingAddress",
    },
    {
      title: "Shipping City",
      dataIndex: "shippingCity",
      key: "shippingCity",
    },
    {
      title: "Payment Type",
      dataIndex: "paymentType",
      key: "paymentType",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Customer",
      dataIndex: "customer",
      key: "customer",
      render: (text: any, record: OrderType, index: number) => {
        return (
          <>{record.customer.firstName + " " + record.customer.lastName}</>
        );
      },
    },
    {
      title: "Employee",
      dataIndex: "employee",
      key: "employee",
      render: (text: any, record: OrderType, index: number) => {
        return (
          <>{record.employee.firstName + " " + record.employee.lastName}</>
        );
      },
    },
    {
      title: "Order",
      dataIndex: "orderDetails",
      key: "orderDetails",
      render: (text: any, record: OrderType, index: number) => {
        return (
          <>
            {record.orderDetails.map((item, index) => {
              return (
                <ul key={index}>
                  <li>{item.quantity + " x " + item.product.name}</li>
                </ul>
              );
            })}
          </>
        );
      },
    },
  ];
  const actionColumn: ColumnType<OrderType> = {
    title: "",
    dataIndex: "actions",
    key: "actions",
    fixed: "right",
    width: 200,
    render: (text: any, record: OrderType, index: number) => {
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
            title="Delete Order"
            description="Are you sure to delete this order?"
            onConfirm={() =>
              DeleteOrder(record.id, refresh, setRefresh, messageApi)
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
  const [orderColumn, setOrderColumn] =
    useState<ColumnsType<OrderType>>(defaultColumns);
  useEffect(() => {
    isLoggedIn
      ? setOrderColumn([...defaultColumns, actionColumn])
      : setOrderColumn(defaultColumns);
  }, [isLoggedIn]);

  return (
    <Flex vertical gap={15}>
      <GetOrder refresh={refresh} orderColumn={orderColumn} />
      {isLoggedIn && (
        <AddOrder
          messageApi={messageApi}
          refresh={refresh}
          setRefresh={setRefresh}
        />
      )}
      <GetAllOrders refresh={refresh} orderColumn={orderColumn} />
      {isLoggedIn && (
        <>
          {currentId && (
            <PatchOrder
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
export default Orderant;
