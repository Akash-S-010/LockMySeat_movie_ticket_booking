import React from 'react'
import { Outlet } from "react-router-dom";
import Header from '../components/Header'
import Footer from '../components/user/Footer'

const RootLayout = () => {
  return (
    <div>
        <Header />
        <div className="min-h-96">
                <Outlet />
            </div>
        <Footer />
    </div>
  )
}

export default RootLayout
