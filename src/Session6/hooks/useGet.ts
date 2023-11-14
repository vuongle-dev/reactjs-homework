import { message } from "antd";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import axiosClient from "../config/axiosClient";
import React from "react";

interface refreshInterface {
  refresh: boolean;
  setRefresh: () => void;
}

export const useRefresh = create<refreshInterface>()(
  devtools(
    persist(
      (set) => ({
        refresh: false,
        setRefresh: () => set((state) => ({ refresh: !state.refresh })),
      }),
      { name: "refresh" }
    )
  )
);
export const useGetSubject = (
  subject: string,
  id: number | null,
  setLoading?: (data: boolean) => void
) => {
  const [data, setData] = React.useState<any>(null);
  const refresh = useRefresh((state) => state.refresh);
  React.useEffect(() => {
    const getData = async () => {
      try {
        setLoading && setLoading(true);
        const response = await axiosClient.get(
          "/online-shop/" + subject + "/" + id
        );
        setData(response.data);
        setLoading && setLoading(false);
      } catch (error: any) {
        setData(null);
        setLoading && setLoading(false);
        message.error(error.response.data.message, 2);
      }
    };
    id && getData();
  }, [id, refresh]);
  return [data];
};

const useGetSubjects = (subject: string) => {
  const [data, setData] = React.useState<any[]>([]);
  const refresh = useRefresh((state) => state.refresh);
  React.useEffect(() => {
    const getData = async () => {
      try {
        const response = await axiosClient.get("/online-shop/" + subject);
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [refresh]);
  return [data];
};

export default useGetSubjects;
