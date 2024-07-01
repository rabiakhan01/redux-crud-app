import React from "react";
import { useNavigate } from "react-router-dom";
import { GetUser } from "../../../redux/User/selectors";
import { useDispatch } from "react-redux";
import { logOutUser } from "../../../redux/User/actions";

const ProfileModal = () => {
    const getUser = GetUser();
    // console.log(GetUser())
    const navigate = useNavigate();
    const dispatch = useDispatch();
    //handel logout functionality on button clicked 
    const handelLogOut = () => {
        const findUser = getUser.find((user) => user.isLogin);
        dispatch(logOutUser(findUser.email))
        navigate('/');
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