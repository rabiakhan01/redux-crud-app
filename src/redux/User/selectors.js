import React from "react";
import { useSelector } from "react-redux";

export const GETUSER = () => {
    const result = useSelector((state) => state.userReducer);
}