import React, { useEffect } from 'react'
import {  Outlet, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore.js'

const ProtectedRoutes = () => {
  const { isUserAuth, checkUser } = useAuthStore();
    const navigate = useNavigate();

    useEffect(() => {
        checkUser();
        if (!isUserAuth) {
            navigate("/login");
       }
    },[isUserAuth])

  return <Outlet />
}

export default ProtectedRoutes
