import { createSlice } from "@reduxjs/toolkit";

const FormSlice = createSlice({
    name: "form",
    initialState: {
        name: { value: "", error: false },
        email: { value: "", error: false },
        mobile: { value: "", error: false },
        id: { value: "", error: false },
        submitted: [],
        actionname: [
            {
                name: "View",
                active: false
            },
            {
                name: "Update",
                active: false
            },
            {
                name: "Delete",
                active: false
            },
            {
                name: "Submit",
                active: false
            }
        ]
    },
    reducers: {
        getInputValues: (state, action) => {
            if (action.payload.type === "name") {
                state.name.value = action.payload.value
                state.name.error = false
            } else if (action.payload.type === "email") {
                state.email.value = action.payload.value
                state.email.error = false
            } else if (action.payload.type === "mobile") {
                state.mobile.value = action.payload.value
                state.mobile.error = false
            }
        },
        setInputError: (state, action) => {
            if (action.payload.type === "name") {
                state.name.error = action.payload.value
            } else if (action.payload.type === "email") {
                state.email.error = action.payload.value
            } else if (action.payload.type === "mobile") {
                state.mobile.error = action.payload.value
            }
        },
        formSubmit: (state, action) => {
            state.submitted.push(action.payload);
        },
        ViewFormData: (state, action) => {
            state.name.value = action.payload.name;
            state.email.value = action.payload.email;
            state.mobile.value = action.payload.mobile;
            state.id.value = action.payload._id;
            state.name.error = false;
            state.email.error = false;
            state.mobile.error = false;
        },
        ActionName: (state, action) => {
            state.actionname.forEach((item) => {
                if (item.name === action.payload) {
                    item.active = true;
                } else {
                    item.active = false;
                }
            });
        }


    }
})

export const { getInputValues, setInputError, formSubmit, ViewFormData, ActionName } = FormSlice.actions;
export default FormSlice.reducer