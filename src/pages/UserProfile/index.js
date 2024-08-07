import React, { useState } from "react";
import Layout from '../../utils/Layout'
import images from "../../assets/images/images";
import { ProfileSection, Button } from "../../components/Shared";
import { GetUser } from "../../redux/User/selectors";
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/User/actions";
const UserProfile = () => {

    const user = GetUser().find(user => user.isLogin);
    const dispatch = useDispatch();

    const [disable, setDisable] = useState(false);
    const [editUser, seteditUser] = useState({
        id: user.id,
        username: user.username,
        email: user.email,
        password: user.password,
        isLogin: user.isLogin,
    });

    const handelChange = (event) => {

        const { name, value } = event.target;

        const updatedData = { ...editUser, [name]: value };

        seteditUser(updatedData)
    }
    const handelEditUser = () => {
        setDisable(true)

    }
    const handelSubmit = () => {
        dispatch(updateUser(editUser))
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