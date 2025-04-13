import { create } from 'zustand';
import axiosInstance from "../config/axiosInstance.js";

export const useAuthStore = create((set) => ({
  user: null,
  isUserAuth: false,
  isLoading: false,
  hasCheckedAuth: false,

  // Check if user is authenticated (e.g., on app load)
  checkUser: async () => {
    try {
      set({ isLoading: true });
      const res = await axiosInstance.get("user/check-user");
      if (res.data) {
        set({ user: res.data.data, isUserAuth: true, isLoading:false });
      } else {
        set({ user: null, isUserAuth: false, isLoading:false });
      }
    } catch (err) {
      console.error(err.response?.data?.message || "Failed to fetch user");
      set({ user: null, isUserAuth: false });
    } finally {
      set({ isLoading: false, hasCheckedAuth: true });
    }
  },

  checkOwner: async () => {
    try {
      set({ isLoading: true });
      const res = await axiosInstance.get("/admin/check-owner");
      if (res.data && res.data.data?.role === "theaterOwner") {
        set({ user: res.data.data, isUserAuth: true });
      } else {
        set({ user: null, isUserAuth: false });
      }
    } catch (err) {
      console.error(err.response?.data?.message || "Failed to fetch owner status");
      set({ user: null, isUserAuth: false });
    } finally {
      set({ isLoading: false, hasCheckedAuth: true });
    }
  },

  checkAdmin: async () => {
    try {
      set({ isLoading: true });
      const res = await axiosInstance.get("/admin/check-admin");
      if (res.data && res.data.data?.role === "admin") {
        set({ user: res.data.data, isUserAuth: true });
      } else {
        set({ user: null, isUserAuth: false });
      }
    } catch (err) {
      console.error(err.response?.data?.message || "Failed to fetch admin status");
      set({ user: null, isUserAuth: false });
    } finally {
      set({ isLoading: false, hasCheckedAuth: true });
    }
  },

  login: async (userData, role) => {
    set({ user: userData, isUserAuth: true, hasCheckedAuth: true });
    const endPoint =
      role === "theaterOwner"
        ? "/admin/check-owner"
        : role === "admin"
          ? "/admin/check-admin"
          : "/user/check-user";
    try {
      const res = await axiosInstance.get(endPoint);
      if (res.data) {
        set({ user: res.data.data, isUserAuth: true });
      }
    } catch (err) {
      console.error("Error fetching updated user:", err);
      set({ user: null, isUserAuth: false, hasCheckedAuth: true });
    }
  },
}));