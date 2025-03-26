import React from "react";
import { Loader } from "lucide-react";

const SubmitBtn = ({ title, width, loading }) => {
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

export default SubmitBtn;
