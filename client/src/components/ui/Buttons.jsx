import React from "react";
import { Loader } from "lucide-react";

export const Button = ({ title, className, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`btn btn-primary text-white font-semibold py-2 px-4 rounded-md transition cursor-pointer ${
        className ? className : ""
      } hover:bg-[var(--color-primaryHover)] hover:scale-102`}
    >
      {title}
    </button>
  );
};

export const SubmitBtn = ({ title, width, loading }) => {
  return (
    <button
      type="submit"
      className="btn btn-primary text-white font-semibold py-2 rounded-md transition cursor-pointer flex items-center justify-center disabled:opacity-50 hover:bg-[var(--color-primaryHover)] hover:scale-102"
      style={{ width: width || "100%" }}
      disabled={loading}
    >
      {loading ? <Loader className="animate-spin w-5 h-5 text-primary" /> : title}
    </button>
  );
};
