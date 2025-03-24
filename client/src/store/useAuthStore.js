import { create } from 'zustand'
import toast from "react-hot-toast";
import axiosInstance from "../config/axiosInstance.js";

export const useAuthStore = create((set) => ({
    user: null,
    isUserAuth: false,

    checkUser: async () => {
        try {
            const res = await axiosInstance.get("user/check-user");
            console.log(res.data)
            if (res.data.user) {
                set({ user: res.data?.user, isUserAuth: true });
            }
        } catch (err) {
            toast.error("Failed to fetch user" );
            console.log(err.response?.data)
            set({ user: null, isUserAuth: false });
        }
    },

}));