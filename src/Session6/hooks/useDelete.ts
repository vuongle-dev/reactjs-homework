import { message } from "antd";
import axiosClient from "../config/axiosClient";
import React from "react";
import { useRefresh } from "./useGet";
import useAuth from "./useAuth";
import { useCurrentId } from "./usePatch";

const useDelete = (subject: string, id: number | null) => {
  const [error, setError] = React.useState(null);
  const setRefresh = useRefresh((state) => state.setRefresh);
  const setCurrentId = useCurrentId((state) => state.setCurrentId);
  const access_token = useAuth((state) => state.access_token);
  React.useEffect(() => {
    const deleteId = async () => {
      try {
        message.loading({
          key: "deletesubject",
          content: "Loading",
        });
        const response = await axiosClient.delete(
          "/online-shop/" + subject + "/" + id,
          {
            headers: {
              Authorization: "Bearer " + access_token,
            },
          }
        );
        message.success({
          key: "deletesubject",
          content: "Successfully deleted",
        });
        setRefresh();
        setCurrentId(null);
      } catch (error: any) {
        setError(error.response.data.message);
        message.error({
          key: "deletesubject",
          content: error.response.data.message,
        });
      }
    };
    id && deleteId();
  }, [id]);
  return [error];
};

export default useDelete;
