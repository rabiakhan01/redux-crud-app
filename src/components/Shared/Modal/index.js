import React from "react";

const Modal = ({ children }) => {

    return (
        <div className="flex flex-col gap-y-5 w-96 md:w-[30rem] h-48 outline outline-1 outline-primaryColor bg-slate-50 rounded-md">
            {children}
        </div>
    )
}

export default Modal;