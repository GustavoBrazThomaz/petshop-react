import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const snackbar = createSlice({
  name: "snackbar",
  initialState: {
    openSnackbar: false,
    snackbarStatus: 0,
    snackbarMsg: "",
  },
  reducers: {
    openSnackbar(state) {
      state.openSnackbar = !state.openSnackbar;
    },
    snackbarStatus(state, action: PayloadAction<number>){
        state.snackbarStatus = action.payload
    },
    snackbarMsg(state, action: PayloadAction<string>){
        state.snackbarMsg = action.payload
    },
  },
});

export const { openSnackbar, snackbarStatus, snackbarMsg } = snackbar.actions;
export default snackbar.reducer;
