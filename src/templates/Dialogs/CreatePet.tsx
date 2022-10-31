import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import API from "../../hooks/API";
import { RootState } from "../../store";
import { createPetDialog } from "../../store/reducers/Dialog.store";
import { refreshPage } from "../../store/reducers/Refresh.store";
import { openSnackbar, snackbarMsg, snackbarStatus } from "../../store/reducers/Snackbar.store";
import { NumericFormat } from 'react-number-format';
import "./dialog.css";
import UseWeightFormat from "../../hooks/UseWeightFormat";

function CreatePet() {
  const { register, handleSubmit } = useForm();
  const [ selectMenuValue, setSelectMenuvalue ] = useState({
    weight: '',
    genger: 'female',
    species: 'dog',
    service: 'bath'
  })
  const dispatch = useDispatch();
  const store = useSelector((state: RootState) => state.rootReducer);
  const dialog = store.dialog;
  const id = dialog.customerId;

  const onSubmit = (event: any) => {

    
    const pet = {
      name: event.name,
      age: parseInt(event.age),
      genger: selectMenuValue.genger,
      weight: UseWeightFormat(selectMenuValue.weight),
      service: selectMenuValue.service,
      species: selectMenuValue.species,
    };

    API.post(`/customer/pet/${id}`, pet)
      .then((resp) => {
        dispatch(createPetDialog());
        dispatch(openSnackbar());
        dispatch(snackbarStatus(resp.status));
        dispatch(snackbarMsg("Pet cadastrado com sucesso!"))
        dispatch(refreshPage());
      })
      .catch((err) => {
        dispatch(snackbarStatus(err.response.status))
        dispatch(snackbarMsg(err.response.data.msg))
        dispatch(openSnackbar())
      });
  };

  return (
    <>
      <div className="container-dialog">
        <DialogTitle style={{ textAlign: "center" }}>
          Adicionar Pet
        </DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent style={{ display: "flex", flexDirection: "column" }}>
            <TextField
              {...register("name", { required: true })}
              label="Nome"
              variant="outlined"/>
            <TextField
              {...register("age", { required: true })}
              label="Idade"
              variant="outlined"
              style={{ margin: "1rem 0" }}
            />

            <InputLabel id="select-label-genger">
              Gênero
            </InputLabel>
            <Select
              {...register("genger", { required: true })}
              labelId="select-label-genger"
              id="demo-simple-select"
              value={selectMenuValue.genger}
              onChange={(e: any) => setSelectMenuvalue({...selectMenuValue, genger: e.target.value})}
            >
              <MenuItem value={"female"}>Fêmea</MenuItem>
              <MenuItem value={"male"}>Macho</MenuItem>
            </Select>

            <NumericFormat label="Peso" suffix={' Kg'} onChange={(e: any) => setSelectMenuvalue({...selectMenuValue, weight: e.target.value})} required={true} customInput={TextField} style={{marginBottom: '1rem', marginTop: '0.5rem'}}/>

            <InputLabel id="select-label-service">
              Tratamento
            </InputLabel>
            <Select
              {...register("service", { required: true })}
              labelId="select-label-service"
              id="demo-simple-select"
              value={selectMenuValue.service}
              onChange={(e: any) => setSelectMenuvalue({...selectMenuValue, service: e.target.value})}
            >
              <MenuItem value={"bath"}>Banho</MenuItem>
              <MenuItem value={"shear"}>Tosa</MenuItem>
              <MenuItem value={"bath and shear"}>Banho e Tosa</MenuItem>
              <MenuItem value={"other"}>Outros</MenuItem>
            </Select>

            <InputLabel id="select-label-species" style={{ marginTop: "1rem" }}>
              Espécie
            </InputLabel>
            <Select
              {...register("species", { required: true })}
              labelId="select-label-species"
              id="demo-simple-select"
              value={selectMenuValue.species}
              onChange={(e) => setSelectMenuvalue({...selectMenuValue, species: e.target.value})}
            >
              <MenuItem value={"dog"}>Cachorro</MenuItem>
              <MenuItem value={"cat"}>Gato</MenuItem>
              <MenuItem value={"exotic"}>Exótico</MenuItem>
            </Select>
          </DialogContent>
          <DialogActions
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "1rem",
            }}
          >
            <Button type="submit" variant="outlined" color="primary">
              Adicionar
            </Button>
            <Button
              variant="outlined"
              color="warning"
              onClick={() => dispatch(createPetDialog())}
            >
              Cancelar
            </Button>
          </DialogActions>
        </form>
      </div>
    </>
  );
}

export default CreatePet;
