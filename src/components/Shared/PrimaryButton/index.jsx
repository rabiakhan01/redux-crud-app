import React from "react";


const PrimaryButton = ({
    btn_name,
    onClick,
    smWidth,
    mdWidth,
}) => {
    return (
        <button className={`bg-dangerColor text-sm text-nowrap sm:text-base font-medium flex justify-center items-center px-2 sm:px-6 py-2 rounded-md w-${smWidth} ${mdWidth ? mdWidth : 'sm:w-20'}`} onClick={onClick}>{btn_name}</button>
    )
}

export default PrimaryButton;