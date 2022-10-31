import {
  Card,
  CardContent,
  CardMedia,
  Dialog,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import { Pets } from "../../interfaces/customer";
import DeleteCard from "../Dialogs/DeleteCard";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { deletePetDialog } from "../../store/reducers/Dialog.store";

type PetProps = {
  id: string | undefined
  index: number
  pet: Pets
}

function PetCard(props: PetProps) {

  const dispatch = useDispatch();
  const store = useSelector((state: RootState) => state.rootReducer);
  const dialog = store.dialog;

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
            onClick={() => dispatch(deletePetDialog(props.index))}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        </div>
        {props.pet.species === "dog" && (
          <CardMedia
            style={{
              background: "#ccc",
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
        {props.pet.species === "cat" && (
          <CardMedia
            style={{
              background: "#ccc",
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
        {props.pet.species === "exotic" && (
          <CardMedia
            style={{
              background: "#ccc",
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
          <Typography>Nome: {props.pet.name}</Typography>
          <Typography>Idade: {props.pet.age} anos</Typography>
          {props.pet.genger === "female" && <Typography>Gênero: Fêmea</Typography>}
          {props.pet.genger === "male" && <Typography>Gênero: Macho</Typography>}
          <Typography>Peso: {props.pet.weight.toFixed(2)} Kg</Typography>
          {props.pet.service === "bath" && (
            <Typography>Tratamento: Banho</Typography>
          )}
          {props.pet.service === "shear" && (
            <Typography>Tratamento: Tosa</Typography>
          )}
          {props.pet.service === "bath and shear" && (
            <Typography>Tratamento: Banho e Tosa</Typography>
          )}
          {props.pet.service === "other" && (
            <Typography>Tratamento: Outro</Typography>
          )}

          {props.pet.species === "dog" && <Typography>Espécie: Cachorro</Typography>}
          {props.pet.species === "cat" && <Typography>Espécie: Gato</Typography>}
          {props.pet.species === "exotic" && (
            <Typography>Espécie: Exótica</Typography>
          )}
        </CardContent>
      </Card>

      <Dialog onClose={() => dispatch(deletePetDialog(0))} open={dialog.openDeletePet}>
          <DeleteCard deleteType="pet"/>
      </Dialog>

    </>
  );
}

export default PetCard
