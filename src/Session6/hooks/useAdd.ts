import { message } from "antd";
import axiosClient from "../config/axiosClient";
import React from "react";
import { Error, useRefresh } from "./useGet";
import useAuth from "./useAuth";
import { onlineManager, useMutation, useQueryClient } from "react-query";
import { error } from "console";

const useAdd = (subject: string) => {
  // const [success, setSuccess] = React.useState(false);
  // const setRefresh = useRefresh((state) => state.setRefresh);
  const access_token = useAuth((state) => state.access_token);
  const add = async (data: any) => {
    const response = await axiosClient.post("/online-shop/" + subject, data, {
      headers: {
        Authorization: "Bearer " + access_token,
      },
    });
    return response.data;
  };
  const queryClient = useQueryClient();
  const result = useMutation<any, Error>(add, {
    onSuccess: (data) => {
      queryClient.setQueryData([subject], (olddata: any) => [...olddata, data]);
    },
    onError: (error) => {
      message.error({
        key: "addsubject",
        content: error.response.data.message,
      });
    },
    retry: (failureCount, error) => {
      return Boolean(!error.response);
    },
  });
  React.useEffect(() => {
    result.isLoading &&
      (onlineManager.isOnline()
        ? message.loading({
            key: "addsubject",
            content: "Submitting",
            duration: 0,
          })
        : message.loading({
            key: "addsubject",
            content: "Lost Connection",
            duration: 0,
          }));
    result.isSuccess &&
      message.success({
        key: "addsubject",
        content: "Added " + result.data.name + " with ID: " + result.data.id,
      });
  }, [result]);
  // React.useEffect(() => {
  //   const addData = async (data: any) => {
  //     try {
  //       message.loading({
  //         key: "addsubject",
  //         content: "Loading",
  //       });
  //       const response = await axiosClient.post(
  //         "/online-shop/" + subject,
  //         data,
  //         {
  //           headers: {
  //             Authorization: "Bearer " + access_token,
  //           },
  //         }
  //       );
  //       setSuccess(true);
  //       message.success({
  //         key: "addsubject",
  //         content:
  //           "Added " + response.data.name + " with ID: " + response.data.id,
  //         duration: 2,
  //       });
  //       setRefresh();
  //     } catch (error: any) {
  //       message.error({
  //         key: "addsubject",
  //         content: error.response.data.message,
  //         duration: 2,
  //       });
  //     }
  //   };
  //   data && addData(data);
  // }, [data]);
  return result;
};

export default useAdd;
