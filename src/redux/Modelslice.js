import { createSlice } from "@reduxjs/toolkit"


const ModelSlice = createSlice({
    name: "model",
    initialState: {
        model: false
    },
    reducers: {
        modelHandler: (state, action) => {
            state.model = action.payload
        },
    }
})

export const { modelHandler, decrement, reset } = ModelSlice.actions
export default ModelSlice.reducer;