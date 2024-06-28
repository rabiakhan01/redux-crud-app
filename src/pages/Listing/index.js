import React, { useEffect } from "react";
import { useState } from "react";
import Layout from "../../utils/Layout";
import { useNavigate } from "react-router-dom";
import { Modal, OutlinedButton, PrimaryButton, SecondaryButton } from "../../components/Shared";
import { getUser } from "../../utils/utils";
import images from '../../assets/images/images'


const Listing = () => {

    const navigate = useNavigate();
    const loginUsers = JSON.parse(localStorage.getItem("loginUser"));
    const loggedInUser = loginUsers.find(user => user.isLogin)
    //set the array of users
    const [userData, setUserData] = useState(getUser());
    const [rows, setRows] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [deleteIndex, setdeleteIndex] = useState();
    // delete the user on delete button's click
    const deleteUser = () => {
        userData.splice(deleteIndex, 1);
        const updateData = userData;
        const setUser = JSON.stringify(updateData);
        localStorage.setItem("users", setUser);

        setUserData([...updateData]);
        setShowModal(false);

    }
    // navigate to the form where we populate data of the user clicked for editing
    const editUser = (user) => {
        navigate(`/update-student/${user.id}`);
    }



    //handel adding of new user
    const handelAddUser = () => {
        navigate("/add-new-student")
    }

    //handel modal for delete user

    const handelDeleteModal = (index) => {
        setdeleteIndex(index);
        setShowModal(true);
    }

    const removeModal = () => {
        setShowModal(false);
    }

    useEffect(() => {

        setRows(() => {
            if (userData?.length > 0) {
                return userData?.filter((user) => {
                    if (user.parentId == loggedInUser.id) {
                        return user
                    }
                })
            } else {
                return []
            }

        })
    }, [userData])


    return (
        <Layout>
            <div className={`w-full ${showModal ? 'blur-[1px]' : 'blur-none'}`}>
                <h1 className="md:hidden text-center text-lg sm:text-xl md:text-2xl mb-10 text-primaryColor font-bold">Student Listing</h1>
                <div className='flex flex-col relative overflow-x-auto'>
                    <table className="table-fixed border border-primaryColor" id="table">
                        <thead className='bg-primaryColor'>
                            <tr className='text-textColor text-medium text-sm sm:text-base'>
                                <th className='px-6 py-2'>Sr#</th>
                                <th className='px-6'>Username</th>
                                <th className='px-6'>Email</th>
                                <th className='px-6'>Age</th>
                                <th className='px-6'>Address</th>
                                <th className='px-6'>Gender</th>
                                <th className='px-6'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                rows.length > 0 ? rows.map((user, index) => {
                                    return (
                                        <tr key={index} className='py-2 text-center'>
                                            <td className='border border-primaryColor px-6 text-nowrap'>{index + 1}</td>
                                            <td className='border border-primaryColor px-6 text-nowrap'>{user.username}</td>
                                            <td className='border border-primaryColor px-6 text-nowrap'>{user.email}</td>
                                            <td className='border border-primaryColor px-6 text-nowrap'>{user.age}</td>
                                            <td className='border border-primaryColor px-6 text-nowrap'>{user.address}</td>
                                            <td className='border border-primaryColor px-6 text-nowrap'>{user.gender}</td>
                                            <td className='flex justify-center items-center gap-2  px-6 py-3 text-textColor border border-primaryColor'>
                                                <OutlinedButton
                                                    name="Edit"
                                                    onClick={() => { editUser(user) }}
                                                    mdWidth="sm:w-20"
                                                    smWidth="16"
                                                />
                                                <PrimaryButton
                                                    btn_name="Delete"
                                                    onClick={() => { handelDeleteModal(index) }}
                                                    mdWidth="sm:w-20"
                                                    smWidth="16"
                                                />
                                            </td>
                                        </tr>
                                    )
                                })
                                    :
                                    <tr>
                                        <td colSpan={7} className="text-center py-8">
                                            <span className="text-md sm:text-xl md:text-2xl text-primaryColor font-bold">No Record</span>
                                        </td>
                                    </tr>
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            {
                showModal &&
                <div className="w-full flex justify-center items-center">
                    <Modal>
                        <div className="flex justify-between pr-5 pt-5">
                            <p className="text-lg pl-3 text-errorColor font-medium">Delete The Record</p>
                            <button onClick={removeModal}><img src={images.cross} className="h-4 w-4" /></button>
                        </div>
                        <div className="text-lg font-medium text-primaryColor text-center">
                            <h1>Are you sure you want to delete this record?</h1>
                        </div>
                        <div className="flex gap-3 text-sm font-medium text-textColor justify-end pr-5 pt-6">
                            <OutlinedButton
                                name="CANCEL"
                                onClick={() => removeModal()}
                                smWidth="24"

                            />
                            <PrimaryButton
                                btn_name="DELETE"
                                onClick={() => { deleteUser() }}
                                smWidth="24"
                            />
                        </div>
                    </Modal>
                </div>
            }
        </Layout>
    );
}

export default Listing;