import React, { useEffect, useState } from "react";
import styles from "./Category.module.css";
import axiosClient from "../config/axiosClient";

type Props = {};

export const GetAll = ({ url, name }: { url: string; name: string }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axiosClient.get(url);
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);
  return (
    <div>
      {data.length == 0 ? (
        "Loading"
      ) : (
        <table className={styles.getAllTable}>
          <thead>
            <tr>
              <th>ID</th>
              <th>{name}</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item: any, index) => {
              return (
                <tr key={index}>
                  <td>{item.id + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.description?.slice(0, 100)}...</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default function Category({}: Props) {
  return <div>Category</div>;
}
