import { message } from "antd";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import axiosClient from "../config/axiosClient";
import React from "react";
import useAuth from "./useAuth";
import { useMutation, useQueryClient } from "react-query";
import { Error } from "./useGet";

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

const usePatchSubject = (subject: string, id: number | null) => {
  const access_token = useAuth((state) => state.access_token);
  const setPatchPopup = usePatchPopup((state) => state.setPatchPopup);
  const setCurrentId = useCurrentId((state) => state.setCurrentId);
  const url = "/online-shop/" + subject + "/" + id;
  const patch = async (data: any) => {
    const response = await axiosClient.patch(url, data, {
      headers: {
        Authorization: "Bearer " + access_token,
      },
    });
    return response.data;
  };
  const queryClient = useQueryClient();
  const result = useMutation<any, Error>(patch, {
    onSuccess: (data) => {
      message.success({
        key: "patchsubject",
        type: "success",
        content: "Modified successfully",
      });
      queryClient.setQueryData([subject], (olddata: any) =>
        olddata.map((item: any) => {
          return item.id == data.id ? data : item;
        })
      );
      queryClient.setQueryData([subject, id], data);
      setPatchPopup(false);
      setCurrentId(null);
    },
  });
  return result;
};

// const usePatchSubject = (subject: string, data: any, id: number | null) => {
//   const [error, setError] = React.useState<null | string>(null);
//   const setRefresh = useRefresh((state) => state.setRefresh);
//   const access_token = useAuth((state) => state.access_token);
//   React.useEffect(() => {
//     const addData = async () => {
//       try {
//         message.loading({
//           key: "patchsubject",
//           content: "Loading",
//         });
//         const url = "/online-shop/" + subject + "/" + id;
//         const response = await axiosClient.patch(url, data, {
//           headers: {
//             Authorization: "Bearer " + access_token,
//           },
//         });
//         message.success({
//           key: "patchsubject",
//           type: "success",
//           content: "Modified successfully",
//         });
//         setError(null);
//         setRefresh();
//       } catch (error: any) {
//         setError(error.response.data.message);
//         message.destroy("patchsubject");
//       }
//     };
//     data && id && addData();
//   }, [data]);
//   return [error];
// };

export default usePatchSubject;
