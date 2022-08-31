import {
  Button,
  CardActionArea,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useState } from "react";
import API from "../../hooks/API";
import { useNavigate } from "react-router-dom";

function CustomerCard({ customer, setRefresh, setSnackbarOpen, setSnackbarMsg, setSnackbarStatus}) {

  const [open, setOpen] = useState(false);

  const navigate = useNavigate()

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickRedirect = () => {
    navigate(`customer/${customer._id}`)
  }

  const handleDeleteCustomer = () => {
    API.delete(`/customer/${customer._id}`)
      .then((resp) => {
        setOpen(false);
        setRefresh(true)
        setSnackbarMsg(resp.data.msg)
        setSnackbarStatus(resp.status)
        setSnackbarOpen(true)
      })
      .catch((err) => console.log(err));
  };
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
          onClick={handleClickOpen}
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
          <Typography variant="body2">Pets: {customer.pets.length}</Typography>
        </CardContent>
      </CardActionArea>

      <Dialog onClose={handleClose} open={open}>
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
            variant="outlined"
            color="error"
            onClick={handleDeleteCustomer}
            endIcon={<DeleteIcon />}
          >
            Deletar
          </Button>
          <Button variant="outlined" color="primary" onClick={handleClose}>
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default CustomerCard;
