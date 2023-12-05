import React, { useEffect, useState } from "react";
import styles from "./Category.module.css";
import axiosClient from "../config/axiosClient";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "../Login";
import { Space } from "antd";
type Props = {};

interface addschemaInput {
  name: string;
  description?: string;
}

const addschema = yup
  .object({
    name: yup
      .string()
      .max(100, "Category Name should not be too long")
      .required(),
    description: yup.string(),
  })
  .required();

const AddCategory = ({
  refresh,
  setRefresh,
}: {
  refresh: boolean;
  setRefresh: (data: any) => void;
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(addschema) });
  const submitAddCategory: SubmitHandler<addschemaInput> = async (data) => {
    try {
      const response = await axiosClient.post(
        "/online-shop/categories/",
        data,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        }
      );
      alert(
        "Add " + response.data.name + " category with ID: " + response.data.id
      );
      setRefresh(!refresh);
      reset();
    } catch (error: any) {
      alert(error.response.data.message);
    }
  };
  return (
    <Space direction="vertical" size={15}>
      <form onSubmit={handleSubmit(submitAddCategory)}>
        <label htmlFor="addname">Category Name</label>
        <input type="text" {...register("name")} id="addname" />
        <span>{errors.name?.message}</span>
        <label htmlFor="adddescription">Description</label>
        <input type="text" {...register("description")} id="adddescription" />
        <span>{errors.description?.message}</span>
        <Button type="submit">Add this Category</Button>
      </form>
    </Space>
  );
};

const PatchCategory = ({
  id,
  refresh,
  setRefresh,
  patchPopup,
  setPatchPopup,
}: {
  id: number;
  refresh: boolean;
  setRefresh: (data: any) => void;
  patchPopup: boolean;
  setPatchPopup: (data: any) => void;
}) => {
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(addschema) });
  const submitPatchCategory: SubmitHandler<addschemaInput> = async (data) => {
    try {
      const response = await axiosClient.patch(
        "/online-shop/categories/" + id,
        data,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        }
      );

      setError(null);
      reset();
      setRefresh(!refresh);
      setPatchPopup(false);
    } catch (error: any) {
      setError(error.response.data.message);
    }
  };
  return (
    <Space
      direction="vertical"
      size={15}
      style={!patchPopup ? { display: "none" } : {}}
      className={styles.popup}
    >
      <form onSubmit={handleSubmit(submitPatchCategory)}>
        <label htmlFor="patchname">Category Name</label>
        <input type="text" {...register("name")} id="patchname" />
        <span>{errors.name?.message}</span>
        <label htmlFor="patchdescription">Description</label>
        <input type="text" {...register("description")} id="patchdescription" />
        <span>{errors.description?.message}</span>
        <Button type="submit">Change this Category</Button>
        <Button onClick={() => setPatchPopup(false)}>Close</Button>
        <span>{error}</span>
      </form>
    </Space>
  );
};

const DeleteCategory = ({
  id,
  refresh,
  setRefresh,
  deletePopup,
  setDeletePopup,
}: {
  id: number;
  refresh: boolean;
  setRefresh: (data: any) => void;
  deletePopup: boolean;
  setDeletePopup: (data: any) => void;
}) => {
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(addschema) });
  const ConfirmDeleteCategory = async () => {
    try {
      const response = await axiosClient.delete(
        "/online-shop/categories/" + id,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        }
      );

      setError(null);
      reset();
      setRefresh(!refresh);
      setDeletePopup(false);
    } catch (error: any) {
      setError(error.response.data.message);
    }
  };
  return (
    <Space
      direction="vertical"
      size={15}
      style={!deletePopup ? { display: "none" } : {}}
      className={styles.popup}
    >
      <h3>Are you sure to delete this category</h3>
      <div style={{ display: "flex", gap: 5 }}>
        <Button
          onClick={ConfirmDeleteCategory}
          style={{ backgroundColor: "red" }}
        >
          Yes
        </Button>
        <Button onClick={() => setDeletePopup(false)}>Cancel</Button>
      </div>

      <span>{error}</span>
    </Space>
  );
};

const GetAllCategories = ({
  refresh,
  setRefresh,
  isLoggedIn,
}: {
  refresh: boolean;
  setRefresh: (data: any) => void;
  isLoggedIn: boolean;
}) => {
  const [data, setData] = useState([]);
  const [currentId, setCurrentId] = useState<number>(-1);
  const [patchPopup, setPatchPopup] = useState(false);
  const [deletePopup, setDeletePopup] = useState(false);

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
    <div>
      {data.length == 0 ? (
        "Loading"
      ) : (
        <table className={styles.getAllTable}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Category</th>
              <th>Description</th>
              {isLoggedIn && <th></th>}
            </tr>
          </thead>
          <tbody>
            {data.map((item: any, index) => {
              return (
                <tr key={index}>
                  <td className={styles.numberData}>{item.id}</td>
                  <td>{item.name?.slice(0, 100)}</td>
                  <td>
                    {item.description?.length > 200
                      ? item.description?.slice(0, 200) + "..."
                      : item.description}
                  </td>
                  {isLoggedIn && (
                    <td style={{ display: "flex", gap: 5 }}>
                      <Button
                        onClick={() => {
                          setCurrentId(item.id);
                          setPatchPopup(true);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => {
                          setCurrentId(item.id);
                          setDeletePopup(true);
                        }}
                        style={{ backgroundColor: "red" }}
                      >
                        Delete
                      </Button>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      {isLoggedIn && (
        <>
          <PatchCategory
            id={currentId}
            refresh={refresh}
            setRefresh={setRefresh}
            patchPopup={patchPopup}
            setPatchPopup={setPatchPopup}
          />
          <DeleteCategory
            id={currentId}
            refresh={refresh}
            setRefresh={setRefresh}
            deletePopup={deletePopup}
            setDeletePopup={setDeletePopup}
          />
        </>
      )}
    </div>
  );
};

interface getschemaInput {
  categoryid: number;
}

const getschema = yup
  .object({
    categoryid: yup
      .number()
      .typeError("ID is required to get")
      .integer("ID must be a interger")
      .positive("ID must be > 0")
      .required("ID is required to get"),
  })
  .required();
const GetCategory = ({
  refresh,
  setRefresh,
  isLoggedIn,
}: {
  refresh: boolean;
  setRefresh: (data: any) => void;
  isLoggedIn: boolean;
}) => {
  const [data, setData] = useState<{
    id: number;
    name: string;
    description: string;
  } | null>();
  const [error, setError] = useState<string | null>(null);
  const [currentId, setCurrentId] = useState<number>(-1);
  const [patchPopup, setPatchPopup] = useState(false);
  const [deletePopup, setDeletePopup] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(getschema) });
  const submitGetCategory: SubmitHandler<getschemaInput> = async (data) => {
    try {
      setError("Loading");
      const response = await axiosClient.get(
        "/online-shop/categories/" + data.categoryid
      );
      setData(response.data);
      setError(null);
    } catch (error: any) {
      setData(null);
      setError(error.response.data.message);
    }
    reset();
  };
  return (
    <div>
      <form onSubmit={handleSubmit(submitGetCategory)}>
        <label htmlFor="categoryid">Category ID</label>
        <input type="number" {...register("categoryid")} id="categoryid" />
        <span>{errors.categoryid?.message}</span>
        <Button type="submit">Get this Category ID</Button>
      </form>
      <span>{error}</span>
      {data && (
        <>
          <table className={styles.getAllTable}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Category</th>
                <th>Description</th>
                {isLoggedIn && <th></th>}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={styles.numberData}>{data.id}</td>
                <td>{data.name?.slice(0, 100)}</td>
                <td>
                  {data.description?.length > 200
                    ? data.description?.slice(0, 200) + "..."
                    : data.description}
                </td>
                {isLoggedIn && (
                  <td
                    style={{ display: "flex", gap: 5, justifyContent: "end" }}
                  >
                    <Button
                      onClick={() => {
                        setCurrentId(data.id);
                        setPatchPopup(true);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => {
                        setCurrentId(data.id);
                        setDeletePopup(true);
                      }}
                      style={{ backgroundColor: "red" }}
                    >
                      Delete
                    </Button>
                  </td>
                )}
              </tr>
            </tbody>
          </table>
          {isLoggedIn && (
            <>
              <PatchCategory
                id={currentId}
                refresh={refresh}
                setRefresh={setRefresh}
                patchPopup={patchPopup}
                setPatchPopup={setPatchPopup}
              />
              <DeleteCategory
                id={currentId}
                refresh={refresh}
                setRefresh={setRefresh}
                deletePopup={deletePopup}
                setDeletePopup={setDeletePopup}
              />
            </>
          )}
        </>
      )}
    </div>
  );
};

const Category = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  const [refresh, setRefresh] = useState(false);

  return (
    <Space direction="vertical" size={15}>
      <GetCategory
        refresh={refresh}
        setRefresh={setRefresh}
        isLoggedIn={isLoggedIn}
      />
      {isLoggedIn && <AddCategory refresh={refresh} setRefresh={setRefresh} />}
      <GetAllCategories
        refresh={refresh}
        setRefresh={setRefresh}
        isLoggedIn={isLoggedIn}
      />
    </Space>
  );
};
export default Category;
