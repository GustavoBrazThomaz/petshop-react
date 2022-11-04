import React, { useEffect, useState } from "react";
import { Container } from "@mui/system";
import { Button, Card, CircularProgress, Dialog, Grid, Typography } from "@mui/material";
import CustomerCard from "../../templates/Cards/CustomerCard";
import API from "../../hooks/API";
import CreateCustomer from "../../templates/Dialogs/CreateCustomer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { createCustomerDialog } from "../../store/reducers/Dialog.store";
import SnackbarTemplate from "../../templates/Snackbar/SnackbarTemplate";

function Home() {
  const [customers, setCustomers] = useState([]);
  const [status, setStatus] = useState(0)

  const dispatch = useDispatch();
  const store = useSelector((state: RootState) => state.rootReducer);
  const dialog = store.dialog;
  const refresh = store.refresh;

  document.title = 'PetShop'
  useEffect(() => {
    getCustomers();
  }, []);

  useEffect(() => {
    getCustomers();
  }, [refresh.refresh]);

  const getCustomers = async () => {
    await API.get("/customer").then((resp) => {
      setStatus(resp.status);
      setCustomers(resp.data);
    });
  };
  
  return (
    <>
      <Container style={{ marginTop: "5rem" }}>
        { status === 200 &&
        <>
        {customers.length === 0 && (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                height: "80vh",
                color: "white",
              }}
            >
              <Typography variant="h4">
                Você ainda não nenhum cliente cadastrado
              </Typography>
              <Button
                style={{ marginTop: "3rem", color: "white" }}
                className="button-primary"
                variant="contained"
                onClick={() => dispatch(createCustomerDialog())}
              >
                Adicionar Cliente
              </Button>
            </div>
          </>
        )}
        {customers.length > 0 && (
          <>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                className="button-primary"
                variant="contained"
                onClick={() => dispatch(createCustomerDialog())}
              >
                Adicionar Cliente
              </Button>
            </div>
            <Grid
              style={{ marginTop: "0.3rem" }}
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              {customers.map((data) => (
                <>
                  <Grid item xs={12} sm={4} md={4}>
                    <Card>
                      <CustomerCard
                        props={data}/>
                    </Card>
                  </Grid>
                </>
              ))}
            </Grid>

          </>
        )}
        <Dialog open={dialog.openCreateCustomer} onClose={() => dispatch(createCustomerDialog())}>
          <CreateCustomer/>
        </Dialog>
        </>
        }{ status !== 200 &&
          <div style={{height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <CircularProgress color='primary' />
          </div>
        }
      </Container>
      <SnackbarTemplate/>
    </>
  );
}

export default Home;
