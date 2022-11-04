import { Button, Card, CardContent, CircularProgress, Dialog, Grid, Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../hooks/API";
import CreatePet from "../../templates/Dialogs/CreatePet";
import PetCard from "../../templates/Cards/PetCard";
import PetsIcon from "@mui/icons-material/Pets";
import EditIcon from "@mui/icons-material/Edit";
import EditCustomer from "../../templates/Dialogs/EditCustomer";
import SnackbarTemplate from "../../templates/Snackbar/SnackbarTemplate";
import { useDispatch, useSelector } from "react-redux";
import { refreshPage } from "../../store/reducers/Refresh.store";
import { createPetDialog, editCustomerDialog, setCustomerId } from "../../store/reducers/Dialog.store";
import { RootState } from "../../store/store";
import { Customer } from "../../interfaces/customer";

function CustomerDetails() {
  const { id } = useParams();
  const [customer, setCustomer] = useState<Customer>({
    name: '',
    lastName: '',
    cpf: 0,
    phone: 0,
    payment: false
  });
  const [status, setStatus] = useState<number>(1)

  const dispatch = useDispatch();
  const store = useSelector((state: RootState) => state.rootReducer);
  const dialog = store.dialog;
  const refresh = store.refresh;

  useEffect(() => {
    dispatch(refreshPage());
    if(id)dispatch(setCustomerId(id))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getCustomerById();
    //dispatch(refreshPage());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh.refresh]);

  const getCustomerById = async () => {
    await API.get(`/customer/${id}`)
      .then((resp) => {
        setStatus(resp.status);
        setCustomer(resp.data);
        document.title = `${resp.data.name} ${resp.data.lastName}`
      })
      .catch((err) => {
        setStatus(err.response.status);
      });
  };

  return (
    <>
      <Container style={{ marginTop: "5rem" }}>
        {status === 1 && (
          <>
            <div style={{width: '100%', height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
           <CircularProgress color="primary" />
           </div>
          </>
        )}
        {status === 0 && (
          <>
           <div style={{width: '100%', height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <h1 style={{color: 'white'}}>Erro! Cliente não encontrado</h1>
           </div>
          </>
        )}
        {status === 200 && (
          <>
            <Card>
              <CardContent
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <div>
                  <Typography className='text-title' gutterBottom variant="h6" component="div">
                    Cliente: <span className="text-content">{customer.name} {customer.lastName}</span>
                  </Typography>
                  <Typography className='text-title' variant="body2">
                    Telefone: <span className="text-content">{customer.phone}</span>
                  </Typography>
                  <Typography className='text-title' variant="body2">CPF: <span className="text-content">{customer.cpf}</span></Typography>
                  {customer.payment === true && (
                    <Typography className='text-title' variant="body2">Pagamento: <span className="text-content">Efetuado</span></Typography>
                  )}
                  {customer.payment === false && (
                    <Typography className='text-title' variant="body2">
                      Pagamento: <span className="text-content">Não efetuado</span>
                    </Typography>
                  )}
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  {
                  <Button
                    style={{ marginBottom: "5px" }}
                    variant="contained"
                    onClick={() => dispatch(createPetDialog())}
                    endIcon={<PetsIcon />}
                    className="button-primary"
                  >
                    Adicionar Pet
                  </Button>
                  }


                  <Button
                    color="warning"
                    variant="contained"
                    onClick={() => dispatch(editCustomerDialog(id))}
                    endIcon={<EditIcon />}
                    
                  >
                    Editar Cliente
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {customer.pets !== undefined && (
                <>
                {customer.pets.length === 0 && (
                  <>
                    <div style={{height: '80vh', textAlign: 'center'}}>
                    <h1 style={{marginTop: '5rem', color: '#fff'}}>Nenhum pet cadastrado</h1>
                    </div>
                  </>
                )}

                  {customer.pets.length > 0 && (
                  <Grid
                    style={{ marginTop: "0.3rem" }}
                    container
                    spacing={{ xs: 2, md: 3 }}
                    columns={{ xs: 4, sm: 8, md: 12 }}
                  >
                      {customer.pets.map((resp, index) => (
                        <>
                          <Grid item xs={12} sm={4} md={4}>
                            <PetCard index={index} id={id} pet={resp}/>
                          </Grid>
                        </>
                      ))}
                    </Grid>)}
                    </>
            )}

            <Dialog open={dialog.openCreatePet} onClose={() => dispatch(createPetDialog())}>
              <CreatePet/>
            </Dialog>

            <Dialog
              open={dialog.openEditCustomer}
              onClose={() => dispatch(editCustomerDialog(''))}
            >
              <EditCustomer/>
            </Dialog>
          </>
        )}
      </Container>
      <SnackbarTemplate/>
      </>
  );
}

export default CustomerDetails;
