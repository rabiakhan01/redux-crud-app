import React from 'react';

const Button = ({ name, onClick, smWidth, mdWidth }) => {

    return (
        <button type='button' className={`bg-primaryColor text-sm sm:text-base text-white flex justify-center items-center w-${smWidth} ${mdWidth ? mdWidth : 'sm:w-20'} px-2 sm:px-6 py-2 rounded-md text-nowrap`} onClick={onClick}>{name}</button>
    );
}

export default Button;