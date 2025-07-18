import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInputValues } from "../redux/Recipeslice";
import { modelHandler } from "../redux/Modelslice";
import { setInputError } from "../redux/Recipeslice";
import { formSubmit } from "../redux/Recipeslice";
import { Inserting } from "../functions/InsertingData";
import { FetchAll } from "../functions/FetchAllData";
import UpdatingById from "../functions/UpdatingById";
import { DeleteById } from "../functions/DeteleById";
import Input from "./input";
import { useLocation } from "react-router-dom";

const Error = ({ name }) => {
    return (
        <span className="text-[10px] text-red-600">{name} is required</span>
    )
}

const RecipeModel = () => {
    const [deactive, setdeactive] = useState(false);
    const [IngradientsList, setIngradientsList] = useState([]);
    const dispatch = useDispatch();
    const model = useSelector((state) => state.model.model);
    const recipename = useSelector((state) => state.recipeform.recipename.value);
    const ingredientlist = useSelector((state) => state.recipeform.ingredientlist);
    const origin = useSelector((state) => state.recipeform.origin.value);
    const id = useSelector((state) => state.recipeform.id.value);
    const recipenameerror = useSelector((state) => state.recipeform.recipename.error);
    const ingredientlisterror = useSelector((state) => state.recipeform.ingredientlist.error);
    const originerror = useSelector((state) => state.recipeform.origin.error);
    const actionname = useSelector((state) => state.recipeform.actionname);

    const handleCloseModel = () => {
        dispatch(modelHandler(!model));
        dispatch(getInputValues({ type: "recipename", value: "" }));
        dispatch(getInputValues({ type: "ingredientlist", value: "" }));
        dispatch(getInputValues({ type: "origin", value: "" }));
        dispatch(setInputError({ type: "recipename", value: false }));
        dispatch(setInputError({ type: "ingredientlist", value: false }));
        dispatch(setInputError({ type: "origin", value: false }));
    };

    const validateInputs = () => {
        const isValid = !(
            recipename === "" ||
            ingredientlist.length === 0 ||
            origin === ""
        );
        dispatch(setInputError({ type: "recipename", value: recipename === "" }));
        dispatch(setInputError({ type: "ingredientlist", value: ingredientlist.length === 0 }));
        dispatch(setInputError({ type: "origin", value: origin === "" }));
        return isValid;
    };
    const location = useLocation();
    const currentPath = location.pathname;

    const handleSubmit = () => {
        if (validateInputs()) {
            const data = { id: Date.now(), recipename, "ingredientslist": IngradientsList, origin };
            dispatch(formSubmit(data));
            Inserting(data, currentPath);
            FetchAll(currentPath);
            handleCloseModel();
        }
    };

    useEffect(() => {
        const viewAction = actionname.find(
            (value) => value.name === "View" && value.active
        );
        setdeactive(!!viewAction);
    }, [actionname]);

    const isUpdate = actionname.find(
        (values) =>
            values.active &&
            ["Update", "Delete", "View", "Submit"].includes(values.name)
    ) || { name: "Submit" };

    const handleUpdate = () => {
        const data = { recipename, ingredientlist, origin, id };
        UpdatingById(data, currentPath);
        handleCloseModel();
    };


    const handleDelete = () => {
        DeleteById(id, currentPath);
        handleCloseModel();
    };

    const handleFocus = (event) => {
        if (event.key === "Enter") {
            const inputValue = event.target.value.trim();
            if (inputValue !== "") {
                const Arr = [...IngradientsList, inputValue];
                setIngradientsList(Arr);
                dispatch(getInputValues({ type: "ingredientlist", value: Arr }));
                event.target.value = "";
            } else {
                alert("Please enter the ingredient");
            }
        }
    }

    useEffect(() => {
        if (Array.isArray(ingredientlist.value)) {
            setIngradientsList(ingredientlist.value);
        }
    }, [ingredientlist])


    return (
        <div>
            <div className="relative z-10" aria-labelledby="dialog-title" role="dialog" aria-modal="true">
                <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <p className="text-center my-4 text-[22px] font-semibold">
                                    {isUpdate.name}
                                </p>
                                <form className="flex flex-col gap-6">
                                    <div>
                                        <label className="font-semibold">Recipe Name*</label>
                                        <Input
                                            placeholder="Add Recipe Name : Eg(Biriyani)"
                                            cls="w-[100%]"
                                            type="text"
                                            value={recipename}
                                            change={(e) =>
                                                dispatch(getInputValues({ type: "recipename", value: e.target.value }))
                                            }
                                            disabled={deactive}
                                        />
                                        {recipenameerror && <Error name="recipename" />}
                                    </div>
                                    <div>
                                        <label className="font-semibold">Ingredients List*</label>

                                        <input
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[100%]"
                                            onKeyDown={handleFocus}
                                            value={ingredientlist.value.map((item) => item)}
                                            placeholder="Please EnterIngredient name and press the enter key"
                                        />
                                        {IngradientsList.length > 0 &&
                                            IngradientsList.map((item, index) => (
                                                <span
                                                    key={index}
                                                    className="bg-black p-1 mt-1 inline-block text-white ml-2 rounded-md font-semibold"
                                                >
                                                    {item}
                                                    <button
                                                        type="button"
                                                        className="ml-2 text-red-500 hover:text-red-300"
                                                        onClick={() => {
                                                            const updatedList = IngradientsList.filter((_, i) => i !== index);
                                                            setIngradientsList(updatedList);
                                                            dispatch(getInputValues({ type: "ingredientlist", value: updatedList }));
                                                        }}
                                                    >
                                                        ×
                                                    </button>
                                                </span>
                                            ))}
                                        {ingredientlisterror && <Error name="ingredientlist" />}
                                    </div>
                                    <div>
                                        <label className="font-semibold">Origin*</label>
                                        <Input
                                            placeholder="Add Origin Of The Food : Eg(India)"
                                            cls="w-[100%]"
                                            type="text"
                                            value={origin}
                                            change={(e) =>
                                                dispatch(getInputValues({ type: "origin", value: e.target.value }))
                                            }
                                            disabled={deactive}
                                        />
                                        {originerror && <Error name="origin" />}
                                    </div>
                                    <div>
                                        <label className="font-semibold">Id*</label>
                                        <Input
                                            placeholder="Id"
                                            cls="w-[100%]"
                                            type="text"
                                            value={id}
                                            disabled
                                        />
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
                                    {isUpdate.name}
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
    );
};

export default RecipeModel;