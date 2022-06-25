import React from 'react'
import { Route, Navigate, useLocation } from 'react-router-dom'
import Place from './Place';

export default function PrivateRoute() {
    const user_data = JSON.parse(localStorage.getItem("user_data"));
    const location = useLocation();
  return (
    user_data?.access ? <Place /> : <Navigate to={`/auth/login/?next=${location.pathname}`}/>
  )
}
