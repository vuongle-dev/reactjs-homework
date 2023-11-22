import { message } from "antd";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import axiosClient from "../config/axiosClient";

interface loggedInUserRoles {
  id: number;
  name: string;
}
interface loggedInUser {
  id: number;
  email: string;
  roles: loggedInUserRoles[];
}
interface loginForm {
  username: string;
  password: string;
}
interface authInterface {
  loggedInUser: loggedInUser | null;
  access_token: string | null;
  refresh_token: string | null;
  login: (data: loginForm) => void;
  logout: () => void;
}

const useAuth = create<authInterface>()(
  devtools(
    persist(
      (set) => ({
        loggedInUser: null,
        access_token: null,
        refresh_token: null,
        login: async (data: loginForm) => {
          try {
            message.loading({ key: "login", content: "Loading" });
            const response = await axiosClient.post("/auth/login", data);
            if (response.data.loggedInUser) {
              set((state) => ({ access_token: response.data.access_token }));
              set((state) => ({ loggedInUser: response.data.loggedInUser }));
              set((state) => ({ refresh_token: response.data.refresh_token }));
              message.success({
                key: "login",
                content: "Login success",
              });
            } else
              message.error({
                key: "login",
                content: response.data.message,
              });
          } catch (error: any) {
            message.error({
              key: "login",
              content: error.response.data.message,
            });
          }
        },
        logout: () => {
          set((state) => ({
            loggedInUser: null,
            access_token: null,
            refresh_token: null,
          }));
          message.success({ content: "Successfully Logged Out" });
        },
      }),
      { name: "auth" }
    )
  )
);
export default useAuth;
