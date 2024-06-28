import React from "react";
import { RouterProvider, createBrowserRouter, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import AddUser from "../pages/AddUser";
import Listing from "../pages/Listing";
import SignUp from "../pages/Signup";
import { isLoginUser } from "../utils/utils.js";
import PageNotFound from "../pages/PageNotFound/index.js";
import UserProfile from "../pages/UserProfile/index.js";

const Route = () => {

    //handel Public Routes

    const ProtectedRoute = ({ children }) => {

        return isLoginUser() ? children : <Navigate to="/" />

    }

    //handel Protected Routes
    const PublicRoute = ({ children }) => {

        return !isLoginUser() ? children : <Navigate to="/student-listing" />

    }

    const router = createBrowserRouter([
        {
            path: '/',
            element: <PublicRoute><Login /></PublicRoute>,
        },
        {
            path: '/signup',
            element: <PublicRoute><SignUp /></PublicRoute>
        },
        {
            path: '/student-listing',
            element: <ProtectedRoute><Listing /></ProtectedRoute>,
        },
        {
            path: '/add-new-student',
            element: <ProtectedRoute><AddUser /></ProtectedRoute>,
        },
        {
            path: '/update-student/:id',
            element: <ProtectedRoute><AddUser /></ProtectedRoute>
        },
        {
            path: '/*',
            element: <PageNotFound />
        },
        {
            path: '/user-profile',
            element: <ProtectedRoute><UserProfile /></ProtectedRoute>
        }
    ])

    return (
        <RouterProvider router={router} />
    )
}

export default Route;