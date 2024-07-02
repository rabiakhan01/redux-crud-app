import React, { useState } from "react";
import { InputField, Button, OutlinedButton } from "../../components/Shared";
import { useNavigate } from "react-router-dom";
import images from "../../assets/images/images";
import { useDispatch } from "react-redux";
import { addUser } from "../../redux/User/actions";
import { GetUser } from "../../redux/User/selectors";
const SignUp = () => {
    const dispatch = useDispatch();
    const result = GetUser();
    const [passwordIcon, setPasswordIcon] = useState(false);
    const [signUpUser, setSignUpUser] = useState({
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

        setSignUpUser(
            {
                ...signUpUser,
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

        if (signUpUser.username === '') {
            setError((prevError) => ({ ...prevError, username: "username required" }))
        }
        if (signUpUser.email === '') {
            setError((prevError) => ({ ...prevError, email: "email required" }))
        }
        if (signUpUser.password === '') {
            setError((prevError) => ({ ...prevError, password: "password required" }))
        }

        // check if the fields are not empty then submit it and update the user array

        if (signUpUser.username !== '' && signUpUser.email !== '' && signUpUser.password !== '') {

            //dispatch(addUser(signUpUser));

            const isUserExists = result.find(user => user.email === signUpUser.email);
            if (isUserExists) {
                setExistUser(true);
                setErrorMessage("user exists choose another email");
            }
            else {
                dispatch(addUser(signUpUser));
                navigate("/");
            }
        }

    }

    const handelAccount = () => {
        navigate("/");
    }

    const showPassword = () => {
        setPasswordIcon(true)
    }
    const hidePassword = () => {
        setPasswordIcon(false)
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
                            placeholder="username"
                            value={signUpUser.username}
                            onChange={handelChange}
                            error={error.username}

                        />
                        <InputField
                            name="email"
                            type="email"
                            placeholder="email"
                            value={signUpUser.email}
                            onChange={handelChange}
                            error={error.email}
                        />
                        <div className="relative flex flex-col">
                            <InputField
                                name="password"
                                type={passwordIcon ? `text` : `password`}
                                placeholder="password"
                                value={signUpUser.password}
                                onChange={handelChange}
                                error={error.password}
                            />
                            {
                                passwordIcon
                                    ?
                                    <div className="absolute left-48 top-8 sm:left-64 sm:top-9">
                                        <button type="button" className="" onClick={hidePassword}><img src={images.eye} alt="" className="h-4 sm:h-5 w-4 sm:w-5" /></button>
                                    </div>
                                    :
                                    <div className="absolute left-48 top-8 sm:left-64 sm:top-9">
                                        <button type="button" className="" onClick={showPassword}><img src={images.eyeSlash} alt="" className="w-4 sm:w-5 h-5 sm:h-5" /></button>
                                    </div>
                            }
                        </div>
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