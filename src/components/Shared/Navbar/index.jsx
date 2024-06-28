import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import images from "../../../assets/images/images";
import ProfileModal from "../ProfileModal";

const Navbar = () => {

    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [mobileMenu, setMobilMeu] = useState(false);

    const handelProfile = () => {
        setShowModal(!showModal)
    }

    const handelMenu = () => {
        setMobilMeu(!mobileMenu);

    }
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

    return (

        <React.Fragment>
            <nav className="flex flex-row-reverse justify-between md:flex-row w-full mb-10 bg-primaryColor py-[18px]">
                <div className="hidden md:flex relative text-xl text-outlineColor justify-center items-center">
                    <div className="flex justify-center items-center">
                        <h1 className="absolute left-10">StudentSphere</h1>
                    </div>
                </div>
                <div className="hidden md:flex gap-5 relative w-full justify-start md:justify-end md:items-center md:mr-[3.53rem]">
                    <div className="flex justify-center items-center text-md sm:text-lg  font-medium gap-5">
                        <NavLink to="/add-new-student" className={`text-textColor hover:underline`}>Add Student</NavLink>
                        <Link to="/student-listing" className={`text-textColor hover:underline`}>All Students</Link>
                    </div>

                    <div className="flex justify-center items-center">
                        <button onClick={handelProfile}>
                            <img src={images.profileImage} className="w-8 h-8 sm:w-10 sm:h-10 rounded-full" />
                        </button>

                        {
                            showModal ? <ProfileModal /> : ''
                        }
                    </div>
                </div>
                <div className="flex flex-col relative md:hidden mr-5">
                    <div>
                        <button onClick={handelMenu}>

                            {
                                !mobileMenu ?
                                    <img src={images.hamburger} className="w-4 h-4 ml-5 sm:ml-10" alt="" />
                                    :
                                    <img src={images.close} className="w-3 h-3 ml-5 sm:ml-10" alt="" />
                            }

                        </button>
                    </div>
                    {
                        mobileMenu &&
                        <div className="flex flex-col gap-3 absolute text-base font-medium w-screen bg-white text-primaryColor border border-y-1 border-b-1 border-t-0 top-[2.8rem] -right-5 pl-5 sm:pl-10 pb-5 z-20">
                            <Link to="/add-new-student" className={`hover:underline pt-5`} onClick={handelMenu}>Add Student</Link>
                            <Link to="/student-listing" className="hover:underline" onClick={handelMenu}>Student Listing</Link>
                            <Link to="/user-profile" className="hover:underline" onClick={handelMenu}>Your Profile</Link>
                            <Link to="/" className="hover:underline" onClick={handelLogOut}>Sign Out</Link>
                        </div>
                    }
                </div>
                <div className="flex md:hidden pl-6 text-md text-outlineColor justify-center items-center">
                    <h1>StudentSphere</h1>
                </div>

            </nav>
        </React.Fragment>
    );
}

export default Navbar;