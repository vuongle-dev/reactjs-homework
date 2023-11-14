import { message } from "antd";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import axiosClient from "../config/axiosClient";
import React from "react";
import { useRefresh } from "./useGet";
import useAuth from "./useAuth";

interface currentIdInterface {
  currentId: number | null;
  setCurrentId: (id: number | null) => void;
}

export const useCurrentId = create<currentIdInterface>()(
  devtools((set) => ({
    currentId: null,
    setCurrentId: (id) => set((state) => ({ currentId: id })),
  }))
);

interface patchPopupInterface {
  patchPopup: boolean;
  setPatchPopup: (popup: boolean) => void;
}

export const usePatchPopup = create<patchPopupInterface>()(
  devtools((set) => ({
    patchPopup: false,
    setPatchPopup: (popup) => set((state) => ({ patchPopup: popup })),
  }))
);

const usePatch = (subject: string, data: any, id: number | null) => {
  const [error, setError] = React.useState(null);
  const setRefresh = useRefresh((state) => state.setRefresh);
  const access_token = useAuth((state) => state.access_token);
  React.useEffect(() => {
    const addData = async (data: any) => {
      try {
        message.loading({
          key: "patchsubject",
          content: "Loading",
        });
        const response = await axiosClient.patch(
          "/online-shop/" + subject + "/" + id,
          data,
          {
            headers: {
              Authorization: "Bearer " + access_token,
            },
          }
        );
        message.success({
          key: "patchsubject",
          type: "success",
          content: "Modified successfully",
        });
        setError(null);
        setRefresh();
      } catch (error: any) {
        setError(error.response.data.message);
        message.destroy("patchsubject");
      }
    };
    data && id && addData(data);
  }, [data]);
  return [error];
};

export default usePatch;
