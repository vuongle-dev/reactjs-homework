import { message } from "antd";
import axiosClient from "../config/axiosClient";
import React from "react";
import { Error } from "./useGet";
import useAuth from "./useAuth";
import { onlineManager, useMutation, useQueryClient } from "react-query";

const useAdd = (subject: string, silent?: boolean) => {
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
      // queryClient.setQueryData([subject], (olddata: any) => [...olddata, data]);
      //api lại sai :/ trả thiếu category,supplier, mất công fetch lại :/)
      const newitemcat = queryClient
        .getQueryData<any[]>(["categories"])
        ?.find((value) => {
          return value.id === data.categoryId;
        });
      const newitemsup = queryClient
        .getQueryData<any[]>(["suppliers"])
        ?.find((value) => {
          return value.id === data.supplierId;
        });
      newitemcat
        ? queryClient.setQueryData([subject], (olddata: any) => [
            ...olddata,
            { ...data, category: newitemcat, supplier: newitemsup },
          ])
        : queryClient.invalidateQueries([subject]);
      console.log(queryClient.getQueryData([subject]));
      subject === "orders"
        ? !silent &&
          message.success({
            key: "addsubject",
            content: "Added order with ID: " + data.id,
          })
        : !silent &&
          message.success({
            key: "addsubject",
            content: "Added " + data.name + " with ID: " + data.id,
          });
      result.reset();
    },
    onError: (error) => {
      !silent &&
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
        ? !silent &&
          message.loading({
            key: "addsubject",
            content: "Submitting",
            duration: 0,
          })
        : !silent &&
          message.loading({
            key: "addsubject",
            content: "Lost Connection",
            duration: 0,
          })); // eslint-disable-next-line
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
