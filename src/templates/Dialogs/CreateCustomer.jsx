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
import InputMask from "react-input-mask";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import API from "../../hooks/API";
import "./dialog.css";

function CreateCustomer({
  setDialogOpen,
  setRefresh,
  setSnackbarOpen,
  setSnackbarMsg,
  setSnackbarStatus,
}) {
  const { register, handleSubmit } = useForm();
  const [payment, setPayment] = useState(false);
  

  const changeSelect = (e) => {
    const value = e.target.value;
    setPayment(value);
  };

  const onSubmit = async (e) => {

    const splitDot = e.cpf.split('.')
    const joinString = splitDot.join('')
    const splitHifen = joinString.split('-')
    const joinToString = splitHifen.join('')
    const cpfNumber = parseInt(joinToString)

    const split = e.phone.split('-')
    const join = split.join('')
    const phoneNumber = parseInt(join)

    const userRegister = {
        name: e.name,
        lastName: e.lastName,
        phone: phoneNumber,
        cpf: cpfNumber,
        payment: e.payment
    }

    API.post("/customer", userRegister)
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
}

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
              style={{ margin: "0" }}
            />
            <TextField
              {...register("lastName", { required: true })}
              label="Sobrenome"
              variant="outlined"
              style={{ margin: "1rem 0" }}
            />
            <InputMask
              mask="99-99999-9999"
              {...register("phone", { required: true })}
            >
              {(inputProps) => (
                <TextField
                  {...inputProps}
                  label="Telefone"
                  type="tel"
                  disableUnderline
                />
              )}
            </InputMask>

            <InputMask
              mask="999.999.999-99"
              {...register("cpf", { required: true })}
            >
              {(inputProps) => (
                <TextField
                  {...inputProps}
                  style={{ margin: "1rem 0" }}
                  variant="outlined"
                  label="CPF"
                ></TextField>
              )}
            </InputMask>

            <InputLabel id="demo-simple-select-label">
              Pagamento
            </InputLabel>
            <Select
              {...register("payment", { required: true })}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={payment}
              onChange={(e) => changeSelect(e)}
            >
              <MenuItem value={true}>Sim</MenuItem>
              <MenuItem value={false}>Não</MenuItem>
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

export default CreateCustomer;
