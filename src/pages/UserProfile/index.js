import React, { useState } from "react";
import Layout from '../../utils/Layout'
import images from "../../assets/images/images";
import { ProfileSection, Button } from "../../components/Shared";
import { useNavigate } from "react-router-dom";
const UserProfile = () => {

    const getUser = JSON.parse(localStorage.getItem("loginUser"));
    const user = getUser.find(user => user.isLogin);

    const [disable, setDisable] = useState(false);
    const [editUser, seteditUser] = useState({
        id: user.id,
        username: user.username,
        email: user.email,
        password: user.password,
        isLogin: user.isLogin,
    });

    const [userData, setUserData] = useState(getUser);

    const handelChange = (event) => {

        const { name, value } = event.target;

        const updatedData = { ...editUser, [name]: value };

        seteditUser(updatedData)
    }
    const handelEditUser = () => {
        setDisable(true)

    }
    const handelSubmit = () => {

        let newData;
        setUserData(prevState => {
            newData = prevState.map(user => {
                if (user.id == editUser.id) {
                    return { ...editUser };
                }
                return user;
            });

            const updateUser = JSON.stringify(newData);
            localStorage.setItem("loginUser", updateUser);
            seteditUser(editUser);
            return newData;

        })
        setDisable(false);
    }

    return (
        <Layout>
            <div className="w-full flex flex-col justify-center items-center">
                <h1 className="text-primaryColor text-xl sm:text-2xl font-bold mb-10">User Profile</h1>
                <div className="flex flex-col w-11/12 sm:w-4/5 md:w-1/2 h-auto justify-center items-center outline outline-1 outline-outlineColor p-5">
                    <img src={images.profileImage} alt="profile_img" className="rounded-full w-16 h-16 sm:w-24 sm:h-24 lg:w-36 lg:h-36 mb-5" />
                    <h1 className="text-md sm:text-xl md:text-2xl text-primaryColor font-bold">Welcome {user.username}</h1>
                    <div className="mt-10">
                        <ProfileSection
                            heading="Username"
                            src={images.user}
                            alt="user"
                        >
                            <input
                                name="username"
                                value={editUser.username}
                                disabled={true}
                                className="text-base md:text-xl font-medium"
                            />
                        </ProfileSection>
                        <ProfileSection
                            heading="Email"
                            src={images.email}
                            alt="email"
                        >
                            <input
                                name="email"
                                value={editUser.email}
                                disabled={true}
                                className="text-base md:text-xl font-medium"
                            />
                        </ProfileSection>
                        <ProfileSection
                            heading="Password"
                            src={images.password}
                            alt="password"
                        >
                            <input
                                type="text"
                                name="password"
                                value={editUser.password}
                                disabled={disable ? false : true}
                                className={`${disable ? 'outline outline-1 outline-outlineColor' : ''} text-base md:text-xl font-medium `}
                                onChange={handelChange}
                            />
                        </ProfileSection>
                    </div>
                    <div className="mt-5">
                        {
                            !disable ?
                                <Button
                                    type="button"
                                    name="Edit User"
                                    onClick={handelEditUser}
                                    mdWidth="sm:w-24"
                                />
                                :
                                <Button
                                    type="submit"
                                    name="Update User"
                                    onClick={handelSubmit}
                                    mdWidth="sm:w-28"
                                />

                        }
                    </div>
                </div>
            </div>
        </Layout>
    );

}

export default UserProfile;