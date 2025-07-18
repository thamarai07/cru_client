import React, { useEffect, useState } from 'react'
import { Eye, FilePenLine, Trash } from 'lucide-react';
import Button from "../component/button"
import { useSelector, useDispatch } from 'react-redux';
import { modelHandler } from '../redux/Modelslice';
import { FetchAll } from '../functions/FetchAllData';
import { FetchDataById } from "../functions/FetchById";
import { ViewFormData } from '../redux/Formslice';
import { ActionName } from "../redux/Formslice";
import { useLocation } from 'react-router-dom';

export default function UserTable() {

    const [Users, setUsers] = useState([]);

    const dispatch = useDispatch();
    const model = useSelector((state) => state.model.model);

    const location = useLocation();
    const currentPath = location.pathname;

    useEffect(() => {
        try {
            FetchAll(currentPath).then(setUsers);
        } catch (error) {
            console.log(error)
        }
    }, [model])

    const HandleViewData = async (id) => {
        const Data = await FetchDataById(id, currentPath)
        dispatch(modelHandler(true))
        dispatch(ViewFormData(Data));
        dispatch(ActionName("View"));
    }

    const HandleEditData = async (id) => {
        const Data = await FetchDataById(id, currentPath)
        dispatch(modelHandler(true))
        dispatch(ViewFormData(Data));
        dispatch(ActionName("Update"));
    }

    const HandleDelete = async (id) => {
        const Data = await FetchDataById(id, currentPath)
        dispatch(modelHandler(true))
        dispatch(ViewFormData(Data));
        dispatch(ActionName("Delete"));
    }

    const HandleModel = () => {
        dispatch(modelHandler(!model))
        dispatch(ActionName("Submit"));
    }
    

    return (
        <div className='mt-4 bg-white p-4'>
            <div className='flex justify-between w-[100%]'>
                <Button text={"Add User"} cls={"w-[140px] bg-black text-white"} type='black' onclick={
                    HandleModel
                } />
                
            </div>
            <div className="relative overflow-x-auto mt-10">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Mobile
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Users.map((user) => (
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {user.name}
                                    </th>
                                    <td className="px-6 py-4">
                                        {user.email}

                                    </td>
                                    <td className="px-6 py-4">
                                        {user.mobile}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className='flex gap-4'>
                                            <Eye className='transition-all hover:text-blue-400' onClick={() => HandleViewData(user._id)} />
                                            <FilePenLine className='transition-all hover:text-green-400' onClick={() => HandleEditData(user._id)} />
                                            <Trash className='transition-all hover:text-red-400' onClick={() => HandleDelete(user._id)} />
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }


                    </tbody>
                </table>
            </div>

        </div>
    )
}
