import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type id = string | undefined

const dialog = createSlice({
    name: "dialog",
    initialState: {
        openCreateCustomer: false,
        openEditCustomer: false,
        openDeleteCustomer: false,
        customerId: '',
        openCreatePet: false,
        openDeletePet: false,
        petIndex: 0,
    },reducers: {
        createCustomerDialog(state){
            state.openCreateCustomer = !state.openCreateCustomer
        },
        editCustomerDialog(state, action: PayloadAction<id>){
            state.openEditCustomer = !state.openEditCustomer
            if(action.payload)state.customerId = action.payload

        },
        deleteCustomerDialog(state, action: PayloadAction<string>){
            state.openDeleteCustomer = !state.openDeleteCustomer
            state.customerId = action.payload
        },
        setCustomerId(state, action: PayloadAction<string>){
            state.customerId = action.payload
        }
        ,
        createPetDialog(state){
            state.openCreatePet = !state.openCreatePet
        },
        deletePetDialog(state, index: PayloadAction<number>){
            state.openDeletePet = !state.openDeletePet
            state.petIndex = index.payload
        }
    }
})

export const { createCustomerDialog, editCustomerDialog, deleteCustomerDialog, createPetDialog, deletePetDialog, setCustomerId } = dialog.actions
export default dialog.reducer