import { create } from 'zustand';
import axiosInstance from "../config/axiosInstance.js";

export const useAuthStore = create((set) => ({
    user: null,
    isUserAuth: false,
    isLoading: true,

    // Check if user is authenticated (e.g., on app load)
    checkUser: async () => {
        try {
            set({ isLoading: true });
            const res = await axiosInstance.get("user/check-user");
            if (res.data) {
                set({ user: res.data.data, isUserAuth: true });
            } else {
                set({ user: null, isUserAuth: false });
            }
        } catch (err) {
            console.error(err.response?.data?.message || "Failed to fetch user");
            set({ user: null, isUserAuth: false });
        } finally {
            set({ isLoading: false });
        }
    },

    checkOwner: async () => {
        try {
            set({ isLoading: true });
            const res = await axiosInstance.get("/admin/check-owner");
            if (res.data) {
                set({ user: res.data.data, isUserAuth: true });
            } else {
                set({ user: null, isUserAuth: false });
            }
        } catch (err) {
            console.error(err.response?.data?.message || "Failed to fetch user");
            set({ user: null, isUserAuth: false });
        } finally {
            set({ isLoading: false });
        }
    },


    login: async (userData, role) => {
        set({ user: userData, isUserAuth: true });
        const endPoint = role === "theaterOwner" ? "/admin/check-owner" : "/user/check-user";
        try {
            const res = await axiosInstance.get(endPoint);
            if (res.data) {
                set({ user: res.data.data, isUserAuth: true });
            }
        } catch (err) {
            console.error("Error fetching updated user:", err);
        }
    },


}));