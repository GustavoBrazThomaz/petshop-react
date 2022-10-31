import { createSlice } from "@reduxjs/toolkit";

const refresh = createSlice({
    name: "refresh",
    initialState: {
        refresh: false,
    },reducers: {
        refreshPage(state){
            state.refresh = !state.refresh
        }
    }
})

export const { refreshPage } = refresh.actions
export default refresh.reducer