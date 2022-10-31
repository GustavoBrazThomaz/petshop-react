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

import React, { useEffect, useState } from "react";
import API from "../../hooks/API";
import "./dialog.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { editCustomerDialog } from "../../store/reducers/Dialog.store";
import {
  openSnackbar,
  snackbarMsg,
  snackbarStatus,
} from "../../store/reducers/Snackbar.store";
import { refreshPage } from "../../store/reducers/Refresh.store";
import { PatternFormat } from "react-number-format";
import SnackbarTemplate from "../Snackbar/SnackbarTemplate";
import UseCpfFormat from "../../hooks/UseCpfFormat";
import UsePhoneFormat from "../../hooks/UsePhoneFormat";

function EditCustomer() {
  const dispatch = useDispatch();
  const store = useSelector((state: RootState) => state.rootReducer);
  const dialog = store.dialog;

  const id = dialog.customerId;
  
  let phone: string | number = ''
  let cpf: string | number = ''

  const [customerId, setCustomerId] = useState({
    name: "",
    lastName: "",
    phone: '',
    cpf: '',
    payment: false,
  });

  useEffect(() => {
    getCustomer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getCustomer = async () => {
    await API.get(`/customer/${id}`).then((resp) => {
      setCustomerId(resp.data);
    });
  };

  const changeSelect = (e: any) => {
    let value = false;
    if (e.target.value === "true") {
      value = true;
    }
    setCustomerId({ ...customerId, payment: value });
  };

  const putCustomer = () => {
    if(phone === '')phone = customerId.phone
    if(typeof phone === 'string')phone = UsePhoneFormat(phone)
    
    if(cpf === '')cpf = customerId.cpf
    if(typeof cpf === 'string')cpf = UseCpfFormat(cpf)

    const data = {
      name: customerId.name,
      lastName: customerId.lastName,
      phone: phone,
      cpf: cpf,
      payment: customerId.payment,
    };
    
    API.put(`/customer/${id}`, data)
      .then((resp) => {
        dispatch(editCustomerDialog(""));
        dispatch(openSnackbar());
        dispatch(snackbarStatus(resp.status));
        dispatch(snackbarMsg("Cliente editado com sucesso!"));
        dispatch(refreshPage());
      })
      .catch((err) => {
        dispatch(snackbarStatus(err.response.status));
        console.log(err.response.data.msg)
        //dispatch(snackbarMsg(err.response.data.msg));
        dispatch(openSnackbar());
      });
  };

  return (
    <>
      <div className="container-dialog">
        <DialogTitle style={{ textAlign: "center" }}>
          Editar Cliente: {`${customerId.name} ${customerId.lastName}`}
        </DialogTitle>
        <DialogContent style={{ display: "flex", flexDirection: "column" }}>
          <TextField
            value={customerId.name}
            onChange={(e) =>
              setCustomerId({ ...customerId, name: e.target.value })
            }
            label="Nome"
            variant="outlined"
            style={{ margin: "1rem 0" }}
          />
          <TextField
            value={customerId.lastName}
            onChange={(e) =>
              setCustomerId({ ...customerId, lastName: e.target.value })
            }
            label="Sobrenome"
            variant="outlined"
            style={{ margin: "1rem 0" }}
          />

          <PatternFormat
            label="Telefone"
            format="##-#####-####"
            mask="_"
            onChange={(e: any) => phone = e.target.value}
            required={true}
            customInput={TextField}
            style={{ marginBottom: "1rem", marginTop: "0.5rem" }}
            value={customerId.phone}
          />

          <PatternFormat
            label="Cpf"
            format="###.###.###-##"
            mask="_"
            onChange={(e: any) => setCustomerId({ ...customerId, cpf: e.target.value})}
            required={true}
            customInput={TextField}
            style={{ marginBottom: "1rem", marginTop: "0.5rem" }}
            value={customerId.cpf}
          />

          <InputLabel
            id="demo-simple-select-label"
            style={{ marginTop: "1rem" }}
          >
            Pagamento
          </InputLabel>

          <Select
            onChange={changeSelect}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={customerId.payment}
          >
            <MenuItem value={"true"}>Efetuado</MenuItem>
            <MenuItem value={"false"}>Não efetuado</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "1rem",
          }}
        >
          <Button variant="outlined" color="primary" onClick={putCustomer}>
            Editar
          </Button>
          <Button
            variant="outlined"
            color="warning"
            onClick={() => dispatch(editCustomerDialog(""))}
          >
            Cancelar
          </Button>
        </DialogActions>
      </div>

      <SnackbarTemplate />
    </>
  );
}

export default EditCustomer;
