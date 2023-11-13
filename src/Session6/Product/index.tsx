import React, { useEffect, useState } from "react";
import styles from "./Product.module.css";
import axiosClient from "../config/axiosClient";
import {
  Alert,
  Button,
  Col,
  Flex,
  Form,
  Input,
  InputNumber,
  Modal,
  Popconfirm,
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
type Props = {};

interface getoption {
  id: number;
  name: string;
}

interface addschemaInput {
  name: string;
  description: string;
  price: number;
  discount: number;
  stock: number;
  category: getoption;
  supplier: getoption;
}

const ProductForm = ({
  form,
  onFinish,
  initialValues,
}: {
  form: any;
  onFinish: (data: any) => void;
  initialValues?: addschemaInput;
}) => {
  const [categories, setCategories] = useState<getoption[]>([]);
  const [suppliers, setSuppliers] = useState<getoption[]>([]);
  useEffect(() => {
    let getCategory = async () => {
      try {
        let response = await axiosClient.get("/online-shop/categories");
        setCategories(response.data);
        setCategories((data) => [...data].reverse());
      } catch (error) {
        console.log(error);
      }
    };
    let getSupplier = async () => {
      try {
        let response = await axiosClient.get("/online-shop/suppliers");
        setSuppliers(response.data);
        setSuppliers((data) => [...data].reverse());
      } catch (error) {
        console.log(error);
      }
    };
    getCategory();
    getSupplier();
  }, []);
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
        label="Product Name"
        rules={[
          { type: "string" },
          { required: true, message: "Product Name is required" },
          { max: 100, message: "Product Name should not be too long" },
        ]}
      >
        <Input name="name" type="text"></Input>
      </Form.Item>
      <Form.Item
        name="categoryId"
        label="Category"
        rules={[
          { type: "number" },
          { required: true, message: "Category is required" },
        ]}
      >
        <Select
          options={categories.map((item) => {
            return { value: item.id, label: item.name };
          })}
        ></Select>
      </Form.Item>
      <Form.Item
        name="supplierId"
        label="Supplier"
        rules={[
          { type: "number" },
          { required: true, message: "Supplier is required" },
        ]}
      >
        <Select
          options={suppliers.map((item) => {
            return { value: item.id, label: item.name };
          })}
        ></Select>
      </Form.Item>
      <Form.Item
        name="price"
        label="Price"
        rules={[
          { type: "number", message: "Price is not valid" },
          { required: true, message: "Price is required" },
        ]}
      >
        <InputNumber name="price" addonBefore="$"></InputNumber>
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
      <Form.Item
        name="stock"
        label="Stock Available"
        rules={[
          { type: "number", message: "Stock is not valid" },
          { required: true, message: "Stock is required" },
        ]}
      >
        <InputNumber min={0}></InputNumber>
      </Form.Item>
      <Form.Item
        name="description"
        label="Description"
        rules={[
          { type: "string" },
          { required: true, message: "Description is required" },
          { max: 300, message: "Description should not be too long" },
        ]}
      >
        <TextArea name="description" autoSize></TextArea>
      </Form.Item>
    </Form>
  );
};

const AddProduct = ({
  refresh,
  setRefresh,
  messageApi,
}: {
  refresh: boolean;
  setRefresh: (data: any) => void;
  messageApi: any;
}) => {
  const [addproduct] = Form.useForm();
  useEffect(() => {}, []);

  const submitAddProduct = async (data: addschemaInput) => {
    try {
      messageApi.open({
        key: "addproduct",
        type: "loading",
        content: "Loading",
      });
      const response = await axiosClient.post("/online-shop/products/", data, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      });
      addproduct.resetFields();
      messageApi.open({
        key: "addproduct",
        type: "success",
        content:
          "Add " + response.data.name + " product with ID: " + response.data.id,
        duration: 2,
      });
      setRefresh(!refresh);
    } catch (error: any) {
      messageApi.open({
        key: "addproduct",
        type: "error",
        content:
          error.response.data.message + ", try another email / phone number",
        duration: 2,
      });
    }
  };
  return (
    <Flex vertical>
      <Title level={3}>Add Product</Title>
      <ProductForm form={addproduct} onFinish={submitAddProduct} />
      <Form.Item wrapperCol={{ offset: 6 }}>
        <Space>
          <Button type="primary" onClick={() => addproduct.submit()}>
            Add this Product
          </Button>
          <Button onClick={() => addproduct.resetFields()}>Reset</Button>
        </Space>
      </Form.Item>
    </Flex>
  );
};

const PatchProduct = ({
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
  const [patchproduct] = Form.useForm();
  const [initialData, setInitialData] = useState<addschemaInput | null>();
  useEffect(() => {
    const GetProduct = async () => {
      try {
        const response = await axiosClient.get(
          "/online-shop/products/" + currentId
        );
        setInitialData(response.data);
        console.log(initialData);
      } catch (error: any) {
        message.error(error.response.data.message, 2);
        setRefresh(!refresh);
        setPatchPopup(false);
      }
    };
    currentId && GetProduct();
  }, [currentId]);
  const submitPatchProduct = async (data: addschemaInput) => {
    try {
      messageApi.open({
        key: "addproduct",
        type: "loading",
        content: "Loading",
      });
      const response = await axiosClient.patch(
        "/online-shop/products/" + currentId,
        data,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        }
      );
      messageApi.open({
        key: "addproduct",
        type: "success",
        content: "Product modified successfully",
      });
      setError(null);
      setRefresh(!refresh);
      setPatchPopup(false);
    } catch (error: any) {
      setError(error.response.data.message);
      messageApi.destroy("addproduct");
    }
  };
  return (
    <Modal
      title="Modify Product"
      open={patchPopup}
      width="70vw"
      footer=<Row>
        <Col span={6} />
        <Col>
          <Space>
            <Button type="primary" onClick={() => patchproduct.submit()}>
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
        <ProductForm
          form={patchproduct}
          onFinish={submitPatchProduct}
          initialValues={initialData}
        />
      )}
      {error && <Alert message={error} type="error" showIcon closable />}
    </Modal>
  );
};

const DeleteProduct = (
  id: number,
  refresh: boolean,
  setRefresh: (data: any) => void,
  messageApi: any
) => {
  const ConfirmDeleteProduct = async () => {
    try {
      messageApi.open({
        key: "deleteproduct",
        type: "loading",
        content: "Loading",
      });
      const response = await axiosClient.delete("/online-shop/products/" + id, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      });
      messageApi.open({
        key: "deleteproduct",
        type: "success",
        content: "Product deleted",
      });
      setRefresh(!refresh);
    } catch (error: any) {
      messageApi.open({
        key: "deleteproduct",
        type: "error",
        content: error.response.data.message,
      });
    }
  };
  ConfirmDeleteProduct();
};

interface ProductType extends addschemaInput {
  key: React.Key;
  id: number;
}

const GetAllProducts = ({
  refresh,
  productColumn,
}: {
  refresh: boolean;
  productColumn: ColumnsType<ProductType>;
}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    let getData = async () => {
      try {
        const response = await axiosClient.get("/online-shop/products");
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
      <Title level={3}>All Products</Title>
      {data.length == 0 ? (
        <Spin />
      ) : (
        <Table
          rowKey="id"
          columns={productColumn}
          dataSource={data}
          scroll={{ x: 400, y: 700 }}
        />
      )}
    </Flex>
  );
};

interface getschemaInput {
  productid: number;
}

const GetProduct = ({
  refresh,
  productColumn,
}: {
  refresh: boolean;
  productColumn: ColumnsType<ProductType>;
}) => {
  const [data, setData] = useState<ProductType[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [getproduct] = Form.useForm();
  const submitGetProduct = async (data: getschemaInput) => {
    try {
      setLoading(true);
      const response = await axiosClient.get(
        "/online-shop/products/" + data.productid
      );
      setData([response.data]);
      setLoading(false);
      getproduct.resetFields();
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
      <Title level={3}>Get Product by ID</Title>
      <Form
        form={getproduct}
        onFinish={submitGetProduct}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
      >
        <Form.Item
          name="productid"
          rules={[
            { required: true, message: "ID must be required" },
            { type: "number", message: "ID must be a number" },
            { type: "integer", message: "ID must be interger" },
          ]}
        >
          <InputNumber
            type="number"
            name="productid"
            min={1}
            step={1}
          ></InputNumber>
        </Form.Item>
        <Button loading={loading} onClick={() => getproduct.submit()}>
          Get this Product ID
        </Button>
      </Form>
      {data && (
        <>
          <Table
            columns={productColumn}
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

const Productant = ({
  isLoggedIn,
  messageApi,
}: {
  isLoggedIn: boolean;
  messageApi: any;
}) => {
  const [refresh, setRefresh] = useState(false);
  const [currentId, setCurrentId] = useState<number | null>(null);
  const [patchPopup, setPatchPopup] = useState(false);
  const defaultColumns: ColumnsType<ProductType> = [
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
      title: "Product Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      align: "right",
      render: (text: any, record: ProductType, index: number) => {
        return (
          <Statistic
            valueStyle={{ fontSize: "1em" }}
            value={record.price}
            prefix="$"
          />
        );
      },
    },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
      align: "right",
      render: (text: any, record: ProductType, index: number) => {
        return <>{record.discount}%</>;
      },
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
      align: "right",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (text: any, record: ProductType, index: number) => {
        return <>{record.category.name}</>;
      },
    },
    {
      title: "Supplier",
      dataIndex: "supplier",
      key: "supplier",
      render: (text: any, record: ProductType, index: number) => {
        return <>{record.supplier.name}</>;
      },
    },
  ];
  const actionColumn: ColumnType<ProductType> = {
    title: "",
    dataIndex: "actions",
    key: "actions",
    fixed: "right",
    width: 200,
    render: (text: any, record: ProductType, index: number) => {
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
            title="Delete Product"
            description="Are you sure to delete this product?"
            onConfirm={() =>
              DeleteProduct(record.id, refresh, setRefresh, messageApi)
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
  const [productColumn, setProductColumn] =
    useState<ColumnsType<ProductType>>(defaultColumns);
  useEffect(() => {
    isLoggedIn
      ? setProductColumn([...defaultColumns, actionColumn])
      : setProductColumn(defaultColumns);
  }, [isLoggedIn]);

  return (
    <Flex vertical gap={15}>
      <GetProduct refresh={refresh} productColumn={productColumn} />
      {isLoggedIn && (
        <AddProduct
          messageApi={messageApi}
          refresh={refresh}
          setRefresh={setRefresh}
        />
      )}
      <GetAllProducts refresh={refresh} productColumn={productColumn} />
      {isLoggedIn && (
        <>
          {currentId && (
            <PatchProduct
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
export default Productant;
