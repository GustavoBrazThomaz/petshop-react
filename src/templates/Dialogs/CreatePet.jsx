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
import API from "../../hooks/API";
import "./dialog.css";

function CreatePet({
  setDialogOpen,
  setRefresh,
  setSnackbarOpen,
  setSnackbarMsg,
  setSnackbarStatus,
  id,
}) {
  const { register, handleSubmit } = useForm();
  const [genger, setGenger] = useState("female");
  const [service, setService] = useState("bath");
  const [species, setSpecies] = useState("dog");

  const changeSelectGenger = (e) => {
    const value = e.target.value;
    setGenger(value);
  };

  const changeSelectService = (e) => {
    const value = e.target.value;
    setService(value);
  };

  const changeSelectSpecies = (e) => {
    const value = e.target.value;
    setSpecies(value);
  };

  const onSubmit = (event) => {
    const pet = {
      name: event.name,
      age: parseInt(event.age),
      genger: event.genger,
      weight: parseInt(event.weight),
      height: parseInt(event.height),
      service: event.service,
      species: event.species,
    };

    API.post(`/pet/${id}`, pet)
      .then((resp) => {
        setDialogOpen(false);
        setSnackbarOpen(true);
        setSnackbarStatus(resp.status);
        setSnackbarMsg("Cliente criado com sucesso!");
        setRefresh(true);
      })
      .catch((err) => {
        setSnackbarStatus(err.response.status);
        setSnackbarMsg(err.response.data.msg);
        setSnackbarOpen(true);
      });
  };

  return (
    <>
      <div className="container-dialog">
        <DialogTitle style={{ textAlign: "center" }}>
          Adicionar Cliente
        </DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent style={{ display: "flex", flexDirection: "column" }}>
            <TextField
              {...register("name", { required: true })}
              label="Nome"
              variant="outlined"
              style={{ margin: "1rem 0" }}
            />
            <TextField
              {...register("age", { required: true })}
              label="Idade"
              variant="outlined"
              style={{ margin: "1rem 0" }}
            />

            <InputLabel id="select-label-genger" style={{ marginTop: "1rem" }}>
              Pagamento
            </InputLabel>
            <Select
              {...register("genger", { required: true })}
              labelId="select-label-genger"
              id="demo-simple-select"
              value={genger}
              onChange={(e) => changeSelectGenger(e)}
            >
              <MenuItem value={"female"}>Fêmea</MenuItem>
              <MenuItem value={"male"}>Macho</MenuItem>
            </Select>

            <TextField
              {...register("weight", { required: true })}
              label="Peso"
              variant="outlined"
              style={{ margin: "1rem 0" }}
            />
            <TextField
              {...register("height", { required: true })}
              label="Altura"
              variant="outlined"
              style={{ margin: "1rem 0" }}
            />

            <InputLabel id="select-label-service" style={{ marginTop: "1rem" }}>
              Tratamento
            </InputLabel>
            <Select
              {...register("service", { required: true })}
              labelId="select-label-service"
              id="demo-simple-select"
              value={service}
              onChange={(e) => changeSelectService(e)}
            >
              <MenuItem value={"bath"}>Banho</MenuItem>
              <MenuItem value={"shear"}>Tosa</MenuItem>
              <MenuItem value={"bath and shear"}>Banho e Tosa</MenuItem>
            </Select>

            <InputLabel id="select-label-species" style={{ marginTop: "1rem" }}>
              Espécie
            </InputLabel>
            <Select
              {...register("species", { required: true })}
              labelId="select-label-species"
              id="demo-simple-select"
              value={species}
              onChange={(e) => changeSelectSpecies(e)}
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
              onClick={() => setDialogOpen(false)}
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
