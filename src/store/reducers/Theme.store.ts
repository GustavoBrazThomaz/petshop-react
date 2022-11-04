import { createSlice } from "@reduxjs/toolkit";

const theme = createSlice({
    name: "theme",
    initialState: {
        themeSwitch: false,
    },reducers:{
        ThemeSwitch(state){
            state.themeSwitch = !state.themeSwitch
        }
    }
})

export const { ThemeSwitch } = theme.actions
export default theme.reducer