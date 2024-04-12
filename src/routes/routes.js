
import React from "react";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import { DashboardPage } from "../pages/dashboard/DashboardPage";
import { ConfigurationPage } from "../pages/configuration/ConfigurationPage";
import { Navbar } from "../components/navbar/navbar";



export const AppRoutes = () => {
    return (
        <Router>
            <Navbar/>
            <Routes>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/configuration" element={<ConfigurationPage />} />
                <Route replace path="*" element={<Navigate to={"dashboard"} />} />
            </Routes>
        </Router>
    )
}