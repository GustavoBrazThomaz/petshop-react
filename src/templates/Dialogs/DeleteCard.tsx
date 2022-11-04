import { Button, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import React from 'react'
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import API from '../../hooks/API';
import { deleteCustomerDialog, deletePetDialog } from '../../store/reducers/Dialog.store';
import { refreshPage } from '../../store/reducers/Refresh.store';
import SnackbarTemplate from '../Snackbar/SnackbarTemplate';
import { openSnackbar, snackbarMsg, snackbarStatus } from '../../store/reducers/Snackbar.store';

type deleteString = {
  deleteType: string
}
function DeleteCard(props: deleteString) {

  const dispatch = useDispatch();
  const store = useSelector((state: RootState) => state.rootReducer);
  const dialog = store.dialog;

  const handleDeleteCustomer = () => {
    API.delete(`/customer/${dialog.customerId}`)
    .then((resp) => { 
      dispatch(deleteCustomerDialog(dialog.customerId))
      dispatch(refreshPage())
      dispatch(openSnackbar())
      dispatch(snackbarStatus(resp.status))
      dispatch(snackbarMsg('Cliente deletado com sucesso!'))
    })
    .catch((err) => console.log(err))
  }

  const handleDeletePet = () => {
    API.delete(`/customer/pet/${dialog.customerId}/${dialog.petIndex}`)
    .then((resp) => {
      dispatch(deletePetDialog(dialog.petIndex))
      dispatch(openSnackbar())
      dispatch(snackbarStatus(resp.status))
      dispatch(snackbarMsg('Pet deletado com sucesso!'))
      dispatch(refreshPage())
    })
    .catch((err) => console.log(err));
  }
  
  const handleClose = () => {
    if(props.deleteType === 'pet')dispatch(deletePetDialog(0))
    if(props.deleteType === 'customer')dispatch(deleteCustomerDialog(''))
  }

  return (
    <>
      {props.deleteType === "pet" &&
      <>
         <DialogTitle id="alert-dialog-title">Deletar Pet</DialogTitle>
         <DialogContent>
           <DialogContentText id="alert-dialog-description">
             Você realmente deseja deletar esse Pet?
             <br />
             Essa ação é irreversível
           </DialogContentText>
         </DialogContent>
         <DialogActions
           style={{
             display: "flex",
             justifyContent: "space-between",
             padding: "1rem",
           }}
         >
           <Button
             variant="contained"
             color="error"
             onClick={handleDeletePet}
             endIcon={<DeleteIcon />}
           >
             Deletar
           </Button>
           
           <Button variant="contained" color="primary" onClick={handleClose}>
             Cancelar
           </Button>
         </DialogActions>
         </>
      }
      {props.deleteType === "customer" && 
      <>
                 <DialogTitle id="alert-dialog-title">Deletar Cliente</DialogTitle>
         <DialogContent>
           <DialogContentText id="alert-dialog-description">
             Você realmente deseja deletar esse cliente?
             <br />
             Essa ação é irreversível
           </DialogContentText>
         </DialogContent>
         <DialogActions
           style={{
             display: "flex",
             justifyContent: "space-between",
             padding: "1rem",
           }}
         >
           <Button
             variant="contained"
             color="error"
             onClick={handleDeleteCustomer}
             endIcon={<DeleteIcon />}
           >
             Deletar
           </Button>
           <Button variant="contained" color="primary" onClick={handleClose}>
             Cancelar
           </Button>
         </DialogActions>
      </>
      }

        <SnackbarTemplate/>
    </>
  )
}

export default DeleteCard