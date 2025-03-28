import React from "react";
import { Loader } from "lucide-react";

export const Button = ({ title, className, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={className ? className : "primary-btn primary-btn-hover text-white font-semibold py-2 px-4 rounded-md hover:bg-opacity-90 transition cursor-pointer"}
    >
      {title}
    </button>
  );
};

export const SubmitBtn = ({ title, width, loading }) => {
  return (
    <button
      type="submit"
      className="bg-primary text-white font-semibold py-2 rounded-md hover:bg-opacity-90 transition cursor-pointer flex items-center justify-center disabled:opacity-50"
      style={{ width: width || "100%" }} 
      disabled={loading} 
    >
      {loading ? <Loader className="animate-spin w-5 h-5" /> : title}
    </button>
  );
};
