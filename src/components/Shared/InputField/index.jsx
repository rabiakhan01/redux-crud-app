import React, { useState } from 'react';

const InputField = ({
    name,
    type,
    placeholder,
    value,
    onChange,
    min,
    max,
    error
}) => {
    const [isShowPlaceHolder, setIsShowPlaceHolder] = useState(false);
    const handelFocus = () => {
        setIsShowPlaceHolder(true)
    }
    return (
        <React.Fragment>
            <div className='relative'>
                <input
                    name={name}
                    type={type}
                    placeholder={isShowPlaceHolder ? '' : placeholder}
                    value={value}
                    min={min}
                    max={max}
                    onChange={onChange}
                    className={`text-sm sm:text-base outline outline-1 outline-outlineColor rounded-md h-10 sm:h-12 w-56 sm:w-72 pl-5 mt-5 ${error ? 'outline-red-600' : ''} `}
                    onFocus={handelFocus}
                />
                {
                    isShowPlaceHolder && <p className='absolute px-2 bg-white top-1 left-2.5 text-gray-500'>{placeholder}</p>
                }
            </div>
            {error && <span className='text-sm md:text-base text-errorColor w-full pt-1'>{error}</span>}
        </React.Fragment>
    );
}

export default InputField;