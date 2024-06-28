import React from "react";

const OutlinedButton = ({ name, onClick, smWidth, mdWidth }) => {
    return (
        <button className={`bg-white text-primaryColor text-sm text-nowrap sm:text-base font-medium flex justify-center items-center w-${smWidth} ${mdWidth ? mdWidth : 'sm:w-20'} px-2 sm:px-6 py-2 rounded-md outline outline-1 outline-primaryColor`} onClick={onClick}>{name}</button>
    );
}

export default OutlinedButton;