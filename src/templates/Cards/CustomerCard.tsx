import {
  CardActionArea,
  CardContent,
  Dialog,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import { useNavigate } from "react-router-dom";
import DeleteCard from "../Dialogs/DeleteCard";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { deleteCustomerDialog } from "../../store/reducers/Dialog.store";
import { PropsCustomerCard } from "../../interfaces/customer";

function CustomerCard(props: PropsCustomerCard) {

  const dispatch = useDispatch();
  const store = useSelector((state: RootState) => state.rootReducer);
  const dialog = store.dialog;
  const customer = props.props

  const navigate = useNavigate()

  const handleClickRedirect = () => {
   navigate(`customer/${customer._id}`)
  }

  const handleOpenDeleteDialog = () => {
    if(customer._id)dispatch(deleteCustomerDialog(customer._id))
    return
  }
  return (
    <>
      <div
        style={{
          background: "#363534",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <IconButton
          aria-label="delete"
          size="small"
          color="error"
          onClick={handleOpenDeleteDialog}
        >
          <CloseIcon fontSize="inherit" />
        </IconButton>
      </div>
      <CardActionArea onClick={handleClickRedirect}>
        <CardContent>
        
            <Typography gutterBottom variant="h6" component="div">
            Nome: {customer.name} {customer.lastName}
          </Typography>
          <Typography variant="body2">Telefone: {customer.phone}</Typography>
          {customer.payment === true && (
            <Typography variant="body2">Pagamento: Efetuado</Typography>
          )}
          {customer.payment === false && (
            <Typography variant="body2">Pagamento: Não efetuado</Typography>
          )}
          <Typography variant="body2">CPF: {customer.cpf}</Typography>
          {customer.pets &&
            <>
            <Typography variant="body2">Pets: {customer.pets.length}</Typography>
            </>}

          
        </CardContent>
      </CardActionArea>

      <Dialog open={dialog.openDeleteCustomer} onClose={() => deleteCustomerDialog('')}>
        <DeleteCard deleteType="customer"/>
      </Dialog>
    </>
  );
}

export default CustomerCard;
