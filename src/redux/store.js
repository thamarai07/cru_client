import { configureStore } from "@reduxjs/toolkit";
import ModelSlice from "./Modelslice"
import FormSlice from "./Formslice"
import RecipeFormSlice from "./Recipeslice"
export const store = configureStore({
    reducer: {
        model: ModelSlice,
        form: FormSlice,
        recipeform: RecipeFormSlice
    }
})
