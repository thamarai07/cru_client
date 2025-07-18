import { createSlice } from "@reduxjs/toolkit";

const RecipeFormSlice = createSlice({
    name: "recipeform",
    initialState: {
        recipename: { value: "", error: false },
        ingredientlist: { value: [], error: false },
        origin: { value: "", error: false },
        id: { value: "", error: false },
        submitted: [],
        actionname: [
            { name: "View", active: false },
            { name: "Update", active: false },
            { name: "Delete", active: false },
            { name: "Submit", active: false }, 
        ],
    },
    reducers: {
        getInputValues: (state, action) => {
            if (action.payload.type === "recipename") {
                state.recipename.value = action.payload.value;
                state.recipename.error = false;
            } else if (action.payload.type === "ingredientlist") {
                const val = action.payload.value;
                state.ingredientlist.value = typeof val === "string"
                    ? val.split(",").map(item => item.trim()).filter(item => item)
                    : Array.isArray(val)
                        ? val
                        : [];
                state.ingredientlist.error = false;
            } else if (action.payload.type === "origin") {
                state.origin.value = action.payload.value;
                state.origin.error = false;
            }
        },
        setInputError: (state, action) => {
            if (action.payload.type === "recipename") {
                state.recipename.error = action.payload.value;
            } else if (action.payload.type === "ingredientlist") {
                state.ingredientlist.error = action.payload.value;
            } else if (action.payload.type === "origin") {
                state.origin.error = action.payload.value;
            }
        },
        formSubmit: (state, action) => {
            state.submitted.push(action.payload);
        },
        ViewFormData: (state, action) => {
            state.recipename.value = action.payload.recipename;
            state.ingredientlist.value = action.payload.ingredientslist
            state.origin.value = action.payload.origin;
            state.id.value = action.payload._id;
            state.recipename.error = false;
            state.ingredientlist.error = false;
            state.origin.error = false;
        },
        ActionName: (state, action) => {
            state.actionname.forEach((item) => {
                item.active = item.name === action.payload;
            });
        },
    },
});

export const { getInputValues, setInputError, formSubmit, ViewFormData, ActionName } = RecipeFormSlice.actions;
export default RecipeFormSlice.reducer