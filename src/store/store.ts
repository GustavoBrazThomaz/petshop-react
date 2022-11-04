import { combineReducers, configureStore } from '@reduxjs/toolkit';
import snackbarReducer from './reducers/Snackbar.store';
import refreshReducer from './reducers/Refresh.store';
import dialogReducer from './reducers/Dialog.store';
import themeReducer from './reducers/Theme.store';

const rootReducer = combineReducers({
    snackbar: snackbarReducer,
    refresh: refreshReducer,
    dialog: dialogReducer,
    theme: themeReducer
})

const store = configureStore({
    reducer: {
        rootReducer: rootReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export default store