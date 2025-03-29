import React from "react";
import { Link, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-100">
      <h1 className="text-3xl font-bold text-primary">Oops! Page not found</h1>
      <p className="text-gray-600 mt-2">The page you are looking for does not exist.</p>
      <Link to="/" className="mt-4 px-4 py-2 bg-primary text-base">
        Go Home
      </Link>
    </div>
  );
};

export default ErrorPage;
