import React, { useEffect, useState } from "react";
import styles from "./Order.module.css";
import {
  Button,
  DatePicker,
  Flex,
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Radio,
  Select,
  Space,
  Table,
} from "antd";
import Title from "antd/es/typography/Title";
import type { ColumnsType } from "antd/es/table";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import customParseFormat from "dayjs/plugin/customParseFormat";
import SubjectTemplate from "../Components/SubjectTemplate";
import useGetSubjects from "../hooks/useGet";
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
    !orderDetails.some((value, index, array) => {
      return value.productId == data.productId;
    })
      ? setOrderDetails([
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
        ])
      : setOrderDetails(
          orderDetails.map((item) => {
            return item.productId == data.productId
              ? { ...item, quantity: item.quantity + data.quantity }
              : item;
          })
        );
  };
  const selectProduct = (productid: number) => {
    let selectedProduct = products.find((item) => {
      return item.id === productid;
    });
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
        <InputNumber name="quantity" min={1} step={1}></InputNumber>
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
  form?: any;
  onFinish?: (data: any) => void;
  initialValues?: addschemaInput;
}) => {
  const [customers] = useGetSubjects("customers");
  const [employees] = useGetSubjects("employees");
  const [products] = useGetSubjects("products");
  const [orderDetails, setOrderDetails] = useState<order[]>([]);
  useEffect(() => {
    initialValues
      ? setOrderDetails(initialValues.orderDetails)
      : setOrderDetails([]);
    setOrderDetails((orderDetails) =>
      orderDetails.map((item) => ({ ...item, productId: item.product.id }))
    );
  }, []);
  useEffect(() => {
    form.setFieldValue("orderDetails", orderDetails);
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
    <Flex vertical gap={10}>
      <Form
        form={form}
        onFinish={onFinish}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 8 }}
        initialValues={
          initialValues && {
            ...initialValues,
            shippedDate:
              initialValues.shippedDate &&
              dayjs(initialValues.shippedDate).utc(),
            createdDate:
              initialValues.createdDate &&
              dayjs(initialValues.createdDate).utc(),
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
          label="Shipped Date"
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
        <Form.Item name="orderDetails">
          <Flex justify="center">
            <Title level={4}>Order Detail</Title>
          </Flex>
        </Form.Item>
        {orderDetails.length > 0 && (
          <Table
            rowKey="productId"
            columns={productColumn}
            dataSource={orderDetails}
            pagination={false}
          />
        )}
      </Form>
      <ProductForm
        form={form}
        products={products}
        orderDetails={orderDetails}
        setOrderDetails={setOrderDetails}
      />
    </Flex>
  );
};

interface OrderType extends addschemaInput {
  key: React.Key;
  id: number;
}

const Orderant = () => {
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

  return (
    <SubjectTemplate
      subject="order"
      subjects="orders"
      currentform={<OrderForm />}
      defaultColumns={defaultColumns}
    />
  );
};
export default Orderant;
