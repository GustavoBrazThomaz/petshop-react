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
import UsePhoneFormat from "../../hooks/UsePhoneFormat";
import UseCpfFormat from "../../hooks/UseCpfFormat";
import { PatternFormat } from "react-number-format";
import { createCustomerDialog } from "../../store/reducers/Dialog.store";
import { useDispatch } from "react-redux";
import { refreshPage } from "../../store/reducers/Refresh.store";
import { openSnackbar, snackbarMsg, snackbarStatus } from "../../store/reducers/Snackbar.store";
import SnackbarTemplate from "../Snackbar/SnackbarTemplate";

function CreateCustomer() {
  const { register, handleSubmit } = useForm();
  const [payment, setPayment] = useState(false);
  const [cpf, setCpf] = useState('')
  const [phone, setPhone] = useState('')

  const dispatch = useDispatch();

  const changeSelect = (e: any) => {
    const value = e.target.value;
    if(value === 'true')setPayment(true)
    if(value === 'false')setPayment(false)
    return
  };
  
  const onSubmit = async (e: any) => {

    const userCreate = {
        name: e.name,
        lastName: e.lastName,
        phone: UsePhoneFormat(phone),
        cpf: UseCpfFormat(cpf),
        payment: e.payment
    }
    API.post("/customer", userCreate)
    .then((resp) => {
      dispatch(createCustomerDialog())
      dispatch(openSnackbar())
      dispatch(snackbarStatus(resp.status))
      dispatch(snackbarMsg("Cliente criado com sucesso!"))
      dispatch(refreshPage())
      console.log(resp.data)
    })
    .catch((err) => {
      dispatch(snackbarStatus(err.response.status))
      dispatch(snackbarMsg(err.response.data.msg))
      dispatch(openSnackbar())
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
          <PatternFormat
            label="Telefone"
            format="##-#####-####"
            mask="_"
            onChange={(e: any) => setPhone(e.target.value)}
            required={true}
            customInput={TextField}
            style={{ marginBottom: "1rem", marginTop: "0.5rem" }}
          />

          <PatternFormat
            label="Cpf"
            format="###.###.###-##"
            mask="_"
            onChange={(e: any) => setCpf(e.target.value)}
            required={true}
            customInput={TextField}
            style={{ marginBottom: "1rem", marginTop: "0.5rem" }}
          />

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
              <MenuItem value={'true'}>Efetuado</MenuItem>
              <MenuItem value={'false'}>Não Efetuado</MenuItem>
            </Select>
          </DialogContent>
          <DialogActions
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "1rem",
            }}
          >
            <Button type="submit" variant="contained" color="primary">
              Adicionar
            </Button>
            <Button
              variant="contained"
              color="warning"
              onClick={() => dispatch(createCustomerDialog())}
            >
              Cancelar
            </Button>
          </DialogActions>
        </form>
      </div>
          <SnackbarTemplate/>
    </>
  );
}

export default CreateCustomer;
