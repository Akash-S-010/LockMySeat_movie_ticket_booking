import React from "react";

const Button = ({ title, className, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={className ? className : "primary-btn primary-btn-hover text-white font-semibold py-2 px-4 rounded-md hover:bg-opacity-90 transition cursor-pointer"}
    >
      {title}
    </button>
  );
};

export default Button;