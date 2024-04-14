import { config } from "../config/header.config";
import DB from "../helpers/storage";
import { create } from "zustand";
import { API } from "../config/url.config";
import axios from "../utils/axios";

const useStore = create((set) => ({
  passToken: null,
  loading: false,
  error: null,
  save: (token) => {
    set({ passToken: token });
  },
}));

const useAccountStore = create((set) => ({
  name: null,
  email: null,
  phoneNo: null,
  profileImage: null,

  setName: (name) => {
    set({ name: name });
  },
  setEmail: (email) => {
    set({ email: email });
  },
  setPhoneNo: (phoneNo) => {
    set({ phoneNo: phoneNo });
  },
  setprofileImage: (profileImage) => {
    set({ profileImage: profileImage });
  },
}));

const useAuthStore = create((set) => ({
  user: {},
  isAuthenticated: false,
  loading: false,
  token: DB.getToken(),
  error: null,
  login: async (username, password) => {
    set({ loading: true });
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/${API.login}`,
        {
          username,
          password,
        }
      );
      set({ isAuthenticated: true });
      set({ token: res?.data?.user });
      set({ user: res?.data?.user });
      set({ error: null });
      DB.setToken(res?.data?.token);
      return res?.data?.usertype?.toLowerCase();
    } catch (error) {
      console.log("Error in Login", error);
      set({ error: error });
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  signup: async (fullName, username, email, password, phoneNo) => {
    set({ loading: true });
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/${API.signup}`,
        {
          fullName,
          phoneNo,
          username,
          password,
          email,
        }
      );
      // set({ isAuthenticated: true });
      // set({ token: res?.data?.user });
      // set({ user: res?.data?.user });
      // set({ error: null });
      // DB.setToken(res?.data?.token);
      return res?.data?.userType?.toLowerCase();
    } catch (error) {
      console.log("Error in Login", error);
      set({ error: error });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  logout: () => {
    DB.removeToken();
    set({ isAuthenticated: false, user: null });
    set({ token: null });
  },
  isAuthenticated: async () => {
    try {
      let { data } = await axios.get(
        API.isAuthenticated,
        config(DB.getToken())
      );
      set({ isAuthenticated: true });
    } catch (err) {
      set({ isAuthenticated: false });
    }
  },
}));
const userAPIMsgAndError = create((set) => ({
  res: null,
  setMsgWidthErr: (res) => {
    set({ res });
  },
  clear: () => {
    set({ res: null });
  },
}));
export { useStore, useAccountStore, userAPIMsgAndError, useAuthStore };
