import { createContext, useState } from "react";

export const FromDataContext = createContext(null)

export const FormProvider = ({ children }) => {
    const [FromData, setFromData] = useState({
        name: "",
        email: "",
        mobile: "",

    })
    const [RecipeFromData, setRecipeFromData] = useState({
        recipename: "",
        ingredientname: [],
        origin: "",
    })
    return (
        <FromDataContext.Provider value={{ FromData, setFromData, RecipeFromData, setRecipeFromData }} >
            {children}
        </FromDataContext.Provider>
    )
}