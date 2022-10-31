import { combineReducers, configureStore } from '@reduxjs/toolkit'
import snackbarReducer from './reducers/Snackbar.store'
import refreshReducer from './reducers/Refresh.store'
import dialogReducer from './reducers/Dialog.store'

const rootReducer = combineReducers({
    snackbar: snackbarReducer,
    refresh: refreshReducer,
    dialog: dialogReducer
})

const store = configureStore({
    reducer: {
        rootReducer: rootReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export default store