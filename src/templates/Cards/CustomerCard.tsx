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
import { RootState } from "../../store/store";
import { deleteCustomerDialog } from "../../store/reducers/Dialog.store";
import { PropsCustomerCard } from "../../interfaces/customer";
import CustomerCardStyle from "./CustomerCardStyle";

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
    <CustomerCardStyle/>
      <div
        className="card-navbar"
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
        
            <Typography className='text-title' gutterBottom variant="h6" component="div">
            Cliente: <span className="text-content">{customer.name} {customer.lastName}</span>
          </Typography>
          <Typography className='text-title' variant="body2">Telefone: <span className="text-content">{customer.phone}</span></Typography>
          <Typography className='text-title' variant="body2">CPF: <span className="text-content">{customer.cpf}</span></Typography>
          {customer.payment === true && (
            <Typography className='text-title' variant="body2">Pagamento: <span className="text-content">Efetuado</span></Typography>
          )}
          {customer.payment === false && (
            <Typography className='text-title' variant="body2">Pagamento: <span className="text-content">Não efetuado</span></Typography>
          )}
          {customer.pets &&
            <>
            <Typography className='text-title' variant="body2">Pets: <span className="text-content">{customer.pets.length}</span></Typography>
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
