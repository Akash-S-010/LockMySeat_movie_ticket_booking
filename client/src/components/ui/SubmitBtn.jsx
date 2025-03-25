import React from "react";

const SubmitBtn = ({ title, width }) => {
    return (
      <button
        type="submit"
        className="bg-primary text-white font-semibold py-2 rounded-md hover:bg-opacity-90 transition cursor-pointer"
        style={{ width: width || "100%" }} // Default to "100%" 
      >
        {title}
      </button>
    );
  };

export default SubmitBtn;
