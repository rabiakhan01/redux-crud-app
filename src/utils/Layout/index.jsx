import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Shared/Navbar";


const Layout = ({ children }) => {

    const navigate = useNavigate();


    return (
        <div>
            <Navbar />
            <div className=' mx-5 justify-center items-center sm:mx-10 lg:mx-16 xl:mx-20 2xl:max-w-[1200px] 2xl:my-0 2xl:mx-auto'>
                {children}
            </div>
        </div>
    );
}

export default Layout;