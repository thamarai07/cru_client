import { useDispatch, useSelector } from "react-redux"
import { modelHandler } from "../redux/Modelslice"
import { getInputValues, setInputError, formSubmit } from "../redux/Formslice"
import { Inserting } from "../functions/InsertingData";
import Input from "./input";
import { FetchAll } from "../functions/FetchAllData";
import { useEffect, useState } from "react";
import UpdatingById from "../functions/UpdatingById";
import { DeleteById } from "../functions/DeteleById";
import { useLocation } from 'react-router-dom';

const Error = ({ name }) => {
    return (
        <span className="text-[10px] text-red-600">{name} is required</span>
    )
}

const UserModel = () => {

    const [deactive, setdeactive] = useState("");
    const model = useSelector((state) => state.model.model);
    const name = useSelector((state) => state.form.name.value);
    const email = useSelector((state) => state.form.email.value);
    const mobile = useSelector((state) => state.form.mobile.value);
    const id = useSelector((state) => state.form.id.value);
    const nameerror = useSelector((state) => state.form.name.error);
    const emailerror = useSelector((state) => state.form.email.error);
    const mobileerror = useSelector((state) => state.form.mobile.error);
    const actionname = useSelector((state) => state.form.actionname);


    const dispatch = useDispatch();

    const handleCloseModel = () => {
        dispatch(modelHandler(!model))
        dispatch(getInputValues({ type: "name", value: "" }))
        dispatch(getInputValues({ type: "email", value: "" }))
        dispatch(getInputValues({ type: "mobile", value: "" }))
    }

    const location = useLocation();
    const currentPath = location.pathname;
    const handleSubmit = () => {
        let hasError = false;
        if (name === "" || email === "" || mobile === "") {
            dispatch(setInputError({ type: "name", value: true }))
            dispatch(setInputError({ type: "email", value: true }))
            dispatch(setInputError({ type: "mobile", value: true }))
            hasError = true;
        }
        if (!hasError) {
            dispatch(formSubmit({ id: Date.now(), name, email, mobile }));
            const data = { id: Date.now(), name, email, mobile };
            Inserting(data, currentPath)
            FetchAll(currentPath);
            handleCloseModel();
        }
    }


    useEffect(() => {
        actionname.map((value) => {
            if (value.name === "View" && value.active == true) {
                setdeactive(true)
            }
        })

    }, [actionname])


    const isUpdate = actionname.find(
        (values) =>
            values.active === true &&
            ["Update", "Delete", "View", "Submit"].includes(values.name)
    );


    const handleUpdate = () => {
        const data = { name, email, mobile, id }
        UpdatingById(data, currentPath)
        dispatch(modelHandler(false))
    }
    const handleDelete = () => {
        dispatch(modelHandler(false))
        DeleteById(id, currentPath)
    };




    return (
        <div>
            <div className="relative z-10" aria-labelledby="dialog-title" role="dialog" aria-modal="true">

                <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">

                        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <p className="text-center my-4 text-[22px] font-semibold">
                                    {
                                        actionname.map((values) => (values.active === true && values.name))
                                    }
                                </p>
                                <form className="flex flex-col gap-6">
                                    <div>
                                        <label className="font-semibold">Name*</label>
                                        <Input placeholder={"Search For User"} cls={"w-[100%]"} type={"text"} value={name} change={(e) => dispatch(getInputValues({ type: "name", value: e.target.value }))} disabled={deactive} />
                                        {nameerror && <Error name={"name"} />}
                                    </div>
                                    <div>
                                        <label className="font-semibold">Email*</label>
                                        <Input placeholder={"Search For User"} cls={"w-[100%]"} type={"email"} value={email} change={(e) => dispatch(getInputValues({ type: "email", value: e.target.value }))} disabled={deactive} />
                                        {emailerror && <Error name={"email"} />}

                                    </div>
                                    <div>
                                        <label className="font-semibold">Mobile*</label>
                                        <Input placeholder={"Search For User"} cls={"w-[100%]"} type={"number"} value={mobile} change={(e) => dispatch(getInputValues({ type: "mobile", value: e.target.value }))} disabled={deactive} />
                                        {mobileerror && <Error name={"mobile"} />}

                                    </div>
                                    <div>
                                        <label className="font-semibold">Id*</label>
                                        <Input placeholder={"Id"} cls={"w-[100%]"} type={"text"} value={id} />
                                    </div>
                                </form>

                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 gap-2 flex-wrap">
                                <button
                                    type="button"
                                    className={`inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-xs sm:ml-3 sm:w-auto ${isUpdate.name === "Update"
                                        ? "bg-blue-600 hover:bg-blue-500"
                                        : isUpdate.name === "Delete"
                                            ? "bg-red-600 hover:bg-red-500"
                                            : isUpdate.name === "View"
                                                ? "bg-gray-600 hover:bg-gray-500"
                                                : "bg-green-600 hover:bg-green-500"
                                        }`}
                                    onClick={
                                        isUpdate.name === "Update"
                                            ? handleUpdate
                                            : isUpdate.name === "Delete"
                                                ? handleDelete
                                                : handleSubmit
                                    }
                                    disabled={deactive}
                                >
                                    {isUpdate.name === "Update"
                                        ? "Update"
                                        : isUpdate.name === "Delete"
                                            ? "Delete"
                                            : isUpdate.name === "View"
                                                ? "View"
                                                : "Submit"}
                                </button>


                                <button
                                    type="button"
                                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                    onClick={handleCloseModel}
                                >
                                    Cancel
                                </button>

                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}


export default UserModel