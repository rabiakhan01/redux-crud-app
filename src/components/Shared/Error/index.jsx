import React from "react";


const Error = ({ onClick }) => {
    return (
        <div className="flex flex-col h-lvh justify-center items-center">
            <h1>404 Error</h1>
            <h2>Page Not Found</h2>
            <button onClick={onClick} className="text-blue-800 w-56  outline outline-1 outline-outlineColor">go back to your feed</button>
        </div>
    )
}

export default Error;