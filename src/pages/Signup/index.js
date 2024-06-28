import React, { useState } from "react";
import { InputField, Button, OutlinedButton } from "../../components/Shared";
import Layout from "../../utils/Layout";
import { useNavigate } from "react-router-dom";

const SignUp = () => {

    // get the user from local host
    const getUser = () => {
        const user = localStorage.getItem("loginUser");
        if (user) {
            return JSON.parse(user);
        }
        else {
            return [];
        }
    }
    // state to set the users detail
    const [signUpUser, setSignUpUser] = useState(getUser());
    const [signUpData, setSignUpData] = useState({
        id: null,
        username: '',
        email: '',
        password: '',
        isLogin: false
    });
    const [existUser, setExistUser] = useState(false);

    //validation errors
    const [error, setError] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [errorMessage, setErrorMessage] = useState();
    const navigate = useNavigate();

    // handel input data from the input fields.

    const handelChange = (event) => {
        const { name, value } = event.target;

        setSignUpData(
            {
                ...signUpData,
                id: Math.floor(Math.random() * 100),
                [name]: value
            });
        setError({
            ...error,
            [name]: false
        })
        setErrorMessage(false);
    }

    //handel the submitted data from the form 

    const handelSubmit = (event) => {

        event.preventDefault();

        if (signUpData.username === '') {
            setError((prevError) => ({ ...prevError, username: "username required" }))
        }
        if (signUpData.email === '') {
            setError((prevError) => ({ ...prevError, email: "email required" }))
        }
        if (signUpData.password === '') {
            setError((prevError) => ({ ...prevError, password: "password required" }))
        }

        // check if the fields are not empty then submit it and update the user array

        if (signUpData.username !== '' && signUpData.email !== '' && signUpData.password !== '') {

            const newArray = signUpUser.find(user => user.email === signUpData.email);
            if (signUpUser.length > 0) {
                if (newArray) {
                    setExistUser(true);
                    setErrorMessage("user exists choose another email");
                }
                else {
                    const updateData = [...signUpUser, signUpData];
                    setSignUpUser(updateData);
                    const setUser = JSON.stringify(updateData);
                    localStorage.setItem("loginUser", setUser);
                    navigate("/");
                }
            }
            else {
                const updateData = [...signUpUser, signUpData];
                setSignUpUser(updateData);
                const setUser = JSON.stringify(updateData);
                localStorage.setItem("loginUser", setUser);
                navigate("/");
            }
        }

    }

    const handelAccount = () => {
        navigate("/");
    }
    return (

        <div className="flex justify-center items-center h-lvh">
            <div className="flex flex-col w-11/12 sm:w-auto justify-center items-center outline outline-1 outline-outlineColor m-5 p-10  sm:px-28 sm:py-16">
                {existUser && <span className="text-base text-center font-medium text-errorColor">{errorMessage}</span>}
                <div>
                    <h1 className="text-primaryColor text-xl sm:text-2xl md:text-3xl font-bold pb-8 text-nowrap">Signup</h1>
                </div>
                <div>
                    <form className="flex flex-col">
                        <InputField
                            name="username"
                            type="text"
                            placeholder="Username"
                            value={signUpData.username}
                            onChange={handelChange}
                            error={error.username}

                        />
                        <InputField
                            name="email"
                            type="email"
                            placeholder="email"
                            value={signUpData.email}
                            onChange={handelChange}
                            error={error.email}
                        />
                        <InputField
                            name="password"
                            type="password"
                            placeholder="password"
                            value={signUpData.password}
                            onChange={handelChange}
                            error={error.password}
                        />
                    </form>
                </div>
                <div className="mt-10 mb-3">
                    <Button
                        name="Register"
                        onClick={handelSubmit}
                        smWidth="56"
                        mdWidth="sm:w-72"
                    />
                </div>
                <OutlinedButton
                    name="Already Have Account"
                    onClick={handelAccount}
                    smWidth="56"
                    mdWidth="sm:w-72"
                />
            </div>
        </div>
    );
}

export default SignUp;