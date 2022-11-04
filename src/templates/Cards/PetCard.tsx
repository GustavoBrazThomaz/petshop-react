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
import { RootState } from "../../store/store";
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
        <div className="pet-navbar-card">
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
          <CardMedia className='pet-img'
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/620/620851.png"
              alt=""
              style={{ width: "200px" }}
            />
          </CardMedia>
        )}
        {props.pet.species === "cat" && (
          <CardMedia className='pet-img'
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
             className='pet-img'
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/220/220105.png"
              alt=""
              style={{ width: "200px" }}
            />
          </CardMedia>
        )}

        <CardContent>
          <Typography className="text-title">Nome: <span className='text-content'>{props.pet.name}</span></Typography>
          <Typography className="text-title">Idade: <span className='text-content'>{props.pet.age} anos</span></Typography>
          {props.pet.genger === "female" && <Typography className="text-title">Gênero: <span className='text-content'>Fêmea</span></Typography>}
          {props.pet.genger === "male" && <Typography className="text-title">Gênero: <span className='text-content'>Macho</span></Typography>}
          <Typography className="text-title">Peso: <span className='text-content'>{props.pet.weight.toFixed(2)} Kg</span></Typography>
          {props.pet.service === "bath" && (
            <Typography className="text-title">Tratamento: <span className='text-content'>Banho</span></Typography>
          )}
          {props.pet.service === "shear" && (
            <Typography className="text-title">Tratamento: <span className='text-content'>Tosa</span></Typography>
          )}
          {props.pet.service === "bath and shear" && (
            <Typography className="text-title">Tratamento: <span className='text-content'>Banho e Tosa</span></Typography>
          )}
          {props.pet.service === "other" && (
            <Typography className="text-title">Tratamento: <span className='text-content'>Outro</span></Typography>
          )}

          {props.pet.species === "dog" && <Typography className="text-title">Espécie: <span className='text-content'>Cachorro</span></Typography>}
          {props.pet.species === "cat" && <Typography className="text-title">Espécie: <span className='text-content'>Gato</span></Typography>}
          {props.pet.species === "exotic" && (
            <Typography className="text-title">Espécie: <span className='text-content'>Exótica</span></Typography>
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
