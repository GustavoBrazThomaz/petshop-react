import {
  Button,
  Card,
  CardContent,
  CardMedia,
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

function PetCard({ pet, index, id, setRefresh, setSnackbarOpen, setSnackbarMsg, setSnackbarStatus }) {

 const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeletePet = () => {
    API.delete(`pet/${id}/${index}`)
      .then((resp) => {
        setOpen(false);
        setSnackbarMsg('Pet deletado com sucesso');
        setSnackbarStatus(resp.status);
        setSnackbarOpen(true);
        setRefresh(true)
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Card>
        <div
          style={{
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
        {pet.species === "dog" && (
          <CardMedia
            style={{
              background: "#737373",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/620/620851.png"
              alt=""
              style={{ width: "200px" }}
            />
          </CardMedia>
        )}
        {pet.species === "cat" && (
          <CardMedia
            style={{
              background: "#737373",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/2138/2138241.png"
              alt=""
              style={{ width: "200px" }}
            />
          </CardMedia>
        )}
        {pet.species === "exotic" && (
          <CardMedia
            style={{
              background: "#737373",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/220/220105.png"
              alt=""
              style={{ width: "200px" }}
            />
          </CardMedia>
        )}

        <CardContent>
          <Typography>Nome: {pet.name}</Typography>
          <Typography>Idade: {pet.age} ano</Typography>
          {pet.genger === "female" && <Typography>Gênero: Fêmea</Typography>}
          {pet.genger === "male" && <Typography>Gênero: Macho</Typography>}
          <Typography>Peso: {pet.weight.toFixed(2)} Kg</Typography>
          <Typography>Altura: {pet.height.toFixed(2)} Cm</Typography>
          {pet.service === "bath" && (
            <Typography>Tratamento: Banho</Typography>
          )}
          {pet.service === "shear" && (
            <Typography>Tratamento: Tosa</Typography>
          )}
          {pet.service === "bath and shear" && (
            <Typography>Tratamento: Banho e Tosa</Typography>
          )}

          {pet.species === "dog" && <Typography>Espécie: Cachorro</Typography>}
          {pet.species === "cat" && <Typography>Espécie: Gato</Typography>}
          {pet.species === "exotic" && (
            <Typography>Espécie: Exótica</Typography>
          )}
        </CardContent>
      </Card>

      <Dialog onClose={handleClose} open={open}>
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
            variant="outlined"
            color="error"
            onClick={handleDeletePet}
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

export default PetCard
