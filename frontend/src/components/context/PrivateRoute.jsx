import React, {
  useContext,
} from "react";

import {
  Navigate,
  useLocation,
} from "react-router-dom";

import {
  AuthContext,
} from "./AuthProvider";

export const PrivateRoute = ({
  children,
}) => {
  const {
    isAuthenticated,
    isLoading,
  } = useContext(AuthContext);

  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: location,
        }}
      />
    );
  }

  return children;
};