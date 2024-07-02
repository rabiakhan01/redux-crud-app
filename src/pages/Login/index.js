import React, { useState } from "react";
import { Button, InputField, OutlinedButton } from "../../components/Shared";
import images from '../../assets/images/images';
import { useNavigate } from "react-router-dom";
import { GetUser } from "../../redux/User/selectors";
import { useDispatch } from "react-redux";
import { loggedInUser, updateUser } from "../../redux/User/actions";

const Login = () => {

    //hook used for navigation from one page to another
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const getUser = GetUser();
    console.log(GetUser())
    //handel state of input fields of login screen
    const [loginUser, setLoginUser] = useState({
        email: '',
        password: ''
    });

    //handel state of validation errors
    const [validationError, setValidationError] = useState(false);

    // handel the validation error message
    const [validationMessage, setValidationMessage] = useState('');

    //handel the empty input fields errors
    const [error, setError] = useState({
        email: "",
        password: ""
    })

    const [passwordIcon, setPasswordIcon] = useState(false);

    // handel values of input fields of login form
    const handelChange = (event) => {
        const { name, value } = event.target;
        setLoginUser({
            ...loginUser,
            [name]: value
        })
        setError({
            ...error,
            [name]: false
        })
        setValidationMessage(false)

    }

    //handel login user
    const handelLogin = () => {

        if (loginUser.email === '') {
            setError((prevError) => ({ ...prevError, email: "email required" }))
        }
        if (loginUser.password === '') {
            setError((prevError) => ({ ...prevError, password: "password required" }))
        }

        if (loginUser.email !== '' && loginUser.password !== '') {

            const findUser = getUser.find((user) => user.email === loginUser.email && user.password === loginUser.password);
            if (findUser) {
                dispatch(loggedInUser(findUser.email))
                navigate("/student-listing");
            }
            else {
                setValidationMessage("Please enter a valid email and password");
                setValidationError(true);
            }
        }
    }


    // if user is not have account than navigate through this button to the signup page
    const createAccount = () => {
        navigate("signup");
    }
    const showPassword = () => {
        setPasswordIcon(true)
    }
    const hidePassword = () => {
        setPasswordIcon(false)
    }
    return (
        <div className="flex justify-center items-center h-lvh">
            <div className="flex flex-col w-4/5 sm:w-auto justify-center items-center outline outline-1 outline-outlineColor m-5 p-10 sm:px-20 sm:py-14">
                <div>
                    <h1 className="text-primaryColor text-xl sm:text-2xl md:text-3xl font-bold pb-8">Login</h1>
                </div>
                {validationError && <span className="text-errorColor text-center font-medium">{validationMessage}</span>}
                <div>
                    <form className="relative flex flex-col">
                        <InputField
                            name="email"
                            type="text"
                            placeholder="email"
                            value={loginUser.email}
                            onChange={handelChange}
                            error={error.email}
                        />

                        <div className="relative flex flex-col">
                            <InputField
                                name="password"
                                type={passwordIcon ? `text` : `password`}
                                placeholder="password"
                                value={loginUser.password}
                                onChange={handelChange}
                                error={error.password}
                            />
                            {
                                passwordIcon
                                    ?
                                    <div className="absolute left-48 top-8 sm:left-64 sm:top-9">
                                        <button type="button" className="" onClick={hidePassword}><img src={images.eye} alt="dummy" className="h-4 sm:h-5 w-4 sm:w-5" /></button>
                                    </div>
                                    :
                                    <div className="absolute left-48 top-8 sm:left-64 sm:top-9">
                                        <button type="button" className="" onClick={showPassword}><img src={images.eyeSlash} alt="dummy" className="w-4 sm:w-5 h-5 sm:h-5" /></button>
                                    </div>
                            }

                        </div>
                    </form>
                </div>
                <div className="mt-10 mb-3">
                    <Button
                        name="Sign In"
                        onClick={handelLogin}
                        smWidth="56"
                        mdWidth="sm:w-72"
                    />
                </div>
                <OutlinedButton
                    name="Create New Account"
                    onClick={createAccount}
                    smWidth="56"
                    mdWidth="sm:w-72"
                />

            </div>
        </div>
    );
}

export default Login;