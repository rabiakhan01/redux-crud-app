import React from "react";
import images from "../../../assets/images/images";
import { useNavigate } from "react-router-dom";
const ProfileModal = () => {

    const navigate = useNavigate();

    //handel logout functionality on button clicked 
    const handelLogOut = () => {

        const getUser = JSON.parse(localStorage.getItem("loginUser"));
        getUser.map((user) => {
            if (user.isLogin) {
                user.isLogin = false;
                const updateUser = JSON.stringify(getUser);
                localStorage.setItem("loginUser", updateUser);
                navigate("/")
            }
        })
    }

    const handelProfile = () => {
        navigate("/user-profile")
    }

    return (
        <div className="flex flex-col w-40 items-center border border-x-1 border-b-1 border-t-0 bg-white pb-5 rounded-sm absolute z-10 -right-14 top-[3.6rem]">
            <div className="flex flex-col items-start float-right text-base font-medium text-primaryColor">
                <button onClick={handelProfile} className="pt-5 pb-5">Your profile</button>
                <button onClick={handelLogOut} className="">Sign Out</button>
            </div>
        </div>
    )
}

export default ProfileModal;