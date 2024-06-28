import React, { useEffect, useState } from 'react';
import { Button, InputField, OutlinedButton } from '../../components/Shared';
import Layout from '../../utils/Layout';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Shared/Navbar';

const AddUser = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    // get data from local storage for checking if user exists or not
    const getUser = () => {
        const user = localStorage.getItem("users");
        if (user) {
            return JSON.parse(user);
        }
        else {
            return [];
        }
    }


    //set the array of users 
    const [userData, setUserData] = useState(getUser())

    //set the error when input fields are empty
    const [error, setError] = useState({
        username: '',
        email: '',
        age: '',
        address: ''
    });

    //set user input
    const [formData, setFormData] = useState({
        id: null,
        parentId: '',
        username: '',
        email: '',
        age: '',
        address: '',
        gender: 'male',
        languages: [],
    })

    //button change from add user to update user
    const [buttonChanged, setButtonChanged] = useState(false);

    //handel the edit user functionality
    useEffect(() => {
        const getUser = JSON.parse(localStorage.getItem("users"));
        if (getUser) {
            getUser.map((user) => {
                if (user.id == id) {
                    setFormData({ ...user })
                    setButtonChanged(true);
                }
            })
        }
    }, [])

    //handel the user input
    const handelChange = (event) => {

        const { name, value, checked } = event.target;

        if (name === "languages") {

            if (checked) {
                setFormData(prevState => ({
                    ...prevState,
                    languages: [...prevState.languages, value]
                }));
            }
            else {
                setFormData(prevState => ({
                    ...prevState,
                    languages: prevState.languages.filter(lang => lang !== value)
                }));
            }
        }
        else {
            const getUser = JSON.parse(localStorage.getItem("loginUser"));
            const loggedInUser = getUser.find(user => user.isLogin === true)
            setFormData({
                ...formData,
                parentId: loggedInUser.id,
                id: Math.floor(Math.random() * 100),
                [name]: value,
            });
            setError(
                {
                    ...error,
                    [name]: false,
                }
            )
        }

    }

    //handel the submitted data of the form
    const handelSubmit = (event) => {

        event.preventDefault();

        if (formData.username === '') {
            setError((prevError) => ({ ...prevError, username: "username required" }))
        }
        if (formData.email === '') {
            setError((prevError) => ({ ...prevError, email: "email required" }))
        }
        if (formData.age === '') {
            setError((prevError) => ({ ...prevError, age: "age required" }))
        }
        if (formData.address === '') {
            setError((prevError) => ({ ...prevError, address: "address required" }))
        }
        if (formData.username !== '' && formData.email !== '' && formData.age !== '' && formData.address !== '') {

            const updateData = [...userData, formData];
            setUserData(updateData);
            const setUser = JSON.stringify(updateData);
            localStorage.setItem("users", setUser);
            navigate("/student-listing");

        }
        setFormData({
            username: "",
            email: "",
            age: "",
            address: "",
            gender: "female",
            languages: []
        })
    }

    //handel how to update data when user's information changes
    const updateUser = () => {
        let newData;
        setUserData(prevState => {
            newData = prevState.map(user => {
                if (user.id == id) {
                    return { ...formData };
                }
                return user;
            });

            const updateUser = JSON.stringify(newData);
            localStorage.setItem("users", updateUser);
            navigate("/student-listing")
            return newData;

        })
        setButtonChanged(false);
        setFormData({
            username: "",
            email: "",
            age: "",
            address: "",
            gender: "female",
            languages: []
        });
    }

    //hnadel the logout functionality when user want to logout from button click
    const handelLogOut = () => {
        const getUser = JSON.parse(localStorage.getItem("loginUser"));
        getUser.map((user) => {
            if (user.isLogin) {
                user.isLogin = false;
                const updateUser = JSON.stringify(getUser);
                localStorage.setItem("loginUser", updateUser);
                navigate("/")
            }
        })
    }
    // listing button functionality
    const UserListing = () => {
        navigate("/student-listing")
    }

    return (
        <Layout>
            <div className='flex flex-col justify-center items-center'>
                <div className='w-full lg:w-1/2 '>
                    <div className='flex flex-col gap-3 outline outline-1 outline-outlineColor mt-5 justify-center items-center pb-5'>
                        {
                            buttonChanged ?
                                <div className='w-full  flex justify-center items-center  px-5 py-5'>
                                    <h1 className='text-primaryColor text-xl sm:text-2xl font-bold'>Update Student</h1>
                                </div>
                                :
                                <div className='w-full flex justify-center items-center px-5 py-5'>
                                    <h1 className='text-primaryColor text-xl sm:text-2xl font-bold'>Add New Student</h1>
                                </div>
                        }
                        <div className='flex flex-col items-center'>
                            <InputField
                                name="username"
                                type="text"
                                placeholder="Username"
                                value={formData.username}
                                onChange={handelChange}
                                error={error.username}
                            />
                            <InputField
                                name="email"
                                type="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handelChange}
                                error={error.email}
                            />
                            <InputField
                                name="age"
                                type="number"
                                min={1}
                                max={80}
                                placeholder="Age"
                                value={formData.age}
                                onChange={handelChange}
                                error={error.age}
                            />
                            <InputField
                                name="address"
                                type="text"
                                placeholder="Address"
                                value={formData.address}
                                onChange={handelChange}
                                error={error.address}
                            />
                        </div>
                        <div className='flex text-sm sm:text-base flex-col gap-1 w-56 sm:w-72'>
                            <div>
                                <label>Gender</label>
                            </div>
                            <div className='flex gap-5'>
                                <div className='flex gap-2'>
                                    <input
                                        type='radio'
                                        name='gender'
                                        value="male"
                                        checked={formData.gender === 'male'}
                                        className='cursor-pointer'
                                        onChange={handelChange}
                                    />
                                    <label className=''>
                                        Male
                                    </label>
                                </div>
                                <div className='flex gap-2'>
                                    <input
                                        type='radio'
                                        name='gender'
                                        value="female"
                                        checked={formData.gender === "female"}
                                        className='cursor-pointer'
                                        onChange={handelChange}
                                    />
                                    <label className='flex gap-2'>
                                        Female
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className='flex text-sm sm:text-base flex-col gap-1 w-56 sm:w-72'>
                            <div>
                                <label>
                                    Favourit Languages
                                </label>
                            </div>
                            <div className='flex gap-5 '>
                                <div className='flex gap-2'>
                                    <input
                                        type='checkbox'
                                        name='languages'
                                        value='JavaScript'
                                        checked={formData.languages.includes('JavaScript')}
                                        onChange={handelChange}
                                    />
                                    <label>
                                        JavaScript
                                    </label>
                                </div>
                                <div className='flex gap-2'>
                                    <input
                                        type='checkbox'
                                        name='languages'
                                        value="HTML"
                                        checked={formData.languages.includes("HTML")}
                                        onChange={handelChange}
                                    />
                                    <label>
                                        HTML
                                    </label>
                                </div>
                                <div className='flex gap-2'>
                                    <input
                                        type='checkbox'
                                        name='languages'
                                        value="CSS"
                                        checked={formData.languages.includes("CSS")}
                                        onChange={handelChange}
                                    />
                                    <label>
                                        CSS
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className='flex gap-5 w-full justify-center items-center mt-6'>
                            {
                                buttonChanged ?
                                    <Button
                                        name="Update Student"
                                        onClick={updateUser}
                                        smWidth="28"
                                        mdWidth="sm:w-36"
                                    />
                                    :
                                    <Button
                                        name="Add Student"
                                        onClick={handelSubmit}
                                        mdWidth="28"
                                    />
                            }

                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}


export default AddUser;