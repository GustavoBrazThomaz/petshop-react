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
  import React, { useEffect, useState } from "react";
  import API from "../../hooks/API";
  import './dialog.css'
  
  function EditCustomer({ setDialogOpen, setRefresh, setSnackbarOpen, setSnackbarMsg, setSnackbarStatus, id }) {
    
    const [customerId, setCustomerId] = useState({
      name: "",
      lastName: "",
      phone: "",
      payment: false
    })

    const customer = customerId

    useEffect(() => {
      getCustomer()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getCustomer = async () => {
      await API.get(`/customer/${id}`).then(resp => {
        setCustomerId(resp.data)
      })
    }

    const changeSelect = (e) => {
      const value = e.target.value;
      setCustomerId({...customerId, payment: value})
    };
    

    const putCustomer = () => {
        const data = {
          name: customer.name,
          lastName: customer.lastName,
          phone: customer.phone,
          payment: customer.payment
        }

        API.put(`/customer/${id}`, data).then((resp) => {
          setDialogOpen(false);
          setSnackbarOpen(true);
          setSnackbarStatus(resp.status);
          setSnackbarMsg("Cliente editado com sucesso!");
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
        <DialogTitle style={{textAlign: 'center'}}>Adicionar Cliente</DialogTitle>
          <DialogContent  style={{display: 'flex', flexDirection: 'column'}} >
              <TextField
                value={customer.name} onChange={(e) => setCustomerId({...customerId, name: e.target.value})} label="Nome" variant="outlined" style={{margin: '1rem 0'}}
            />
            <TextField
              value={customer.lastName}
              onChange={(e) => setCustomerId({...customerId, lastName: e.target.value})}
              label="Sobrenome"
              variant="outlined"
              style={{margin: '1rem 0'}}
            />
              <InputMask mask="99-99999-9999" value={customer.phone} onChange={(e) => setCustomerId({...customerId, phone: e.target.value})}
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
  
            <InputLabel id="demo-simple-select-label" style={{marginTop: '1rem'}}>Pagamento</InputLabel>
            <Select
              onChange={changeSelect}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={customer.payment}
            >
              <MenuItem value={true}>Sim</MenuItem>
              <MenuItem value={false}>Não</MenuItem>
            </Select>
          </DialogContent>
          <DialogActions style={{display: 'flex', justifyContent: 'space-between', padding: '1rem'}}>
            <Button variant='outlined' color='primary' onClick={putCustomer}>Adicionar</Button>
            <Button variant='outlined' color='warning' onClick={() => setDialogOpen(false)}>Cancelar</Button>
          </DialogActions>
        </div>
      </>
    );
  }
  
  export default EditCustomer;
  