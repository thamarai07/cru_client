import React, { useEffect, useState } from 'react'
import { Eye, FilePenLine, Trash } from 'lucide-react';
import Input from "../component/input"
import Button from "../component/button"
import Model from '../component/RecipeModel';
import { useSelector, useDispatch } from 'react-redux';
import { modelHandler } from '../redux/Modelslice';
import { FetchAll } from '../functions/FetchAllData';
import { FetchDataById } from "../functions/FetchById";
import { ViewFormData } from '../redux/Recipeslice';
import { ActionName } from "../redux/Recipeslice";
import { useLocation } from 'react-router-dom';

export default function RecipeTable() {

    const [Search, setSearch] = useState("");
    const [Recipe, setRecipe] = useState([]);

    const dispatch = useDispatch();
    const model = useSelector((state) => state.model.model);


    const location = useLocation();
    const currentPath = location.pathname;

    useEffect(() => {
        try {
            FetchAll(currentPath).then(setRecipe);
        } catch (error) {
            console.log(error)
        }
    }, [model])


    const 
    HandleViewData = async (id) => {
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
                <Button text={"Add New Recipe"} cls={"w-[160px] bg-black text-white"} type='black' onclick={
                    HandleModel
                } />
                <Input placeholder={"Search For User"} change={(e) => Search(e.target.value)} value={Search} cls={"w-[40%]"} type={"text"} />
                {model && <Model />}
            </div>
            <div className="relative overflow-x-auto mt-10">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Name of the Recipe
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Ingredients List
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Origin
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Recipe.map((user) => (
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {user.recipename}
                                    </th>
                                    <td className="px-6 py-4">
                                        {user.ingredientslist.map((item)=>(
                                            <span className='bg-black text-white ml-1 px-1 py-1 rounded-lg'>{item}</span>
                                        ))}
                                    </td>
                                    <td className="px-6 py-4">
                                        {user.origin}
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
