import { message } from "antd";
import axiosClient from "../config/axiosClient";
import React from "react";
import { useRefresh } from "./useGet";
import useAuth from "./useAuth";

const useAdd = (subject: string, data: any) => {
  const [success, setSuccess] = React.useState(false);
  const setRefresh = useRefresh((state) => state.setRefresh);
  const access_token = useAuth((state) => state.access_token);
  React.useEffect(() => {
    const addData = async (data: any) => {
      try {
        message.loading({
          key: "addsubject",
          content: "Loading",
        });
        const response = await axiosClient.post(
          "/online-shop/" + subject,
          data,
          {
            headers: {
              Authorization: "Bearer " + access_token,
            },
          }
        );
        setSuccess(true);
        message.success({
          key: "addsubject",
          content:
            "Added " + response.data.name + " with ID: " + response.data.id,
          duration: 2,
        });
        setRefresh();
      } catch (error: any) {
        message.error({
          key: "addsubject",
          content: error.response.data.message,
          duration: 2,
        });
      }
    };
    data && addData(data);
  }, [data]);
  return [success];
};

export default useAdd;
