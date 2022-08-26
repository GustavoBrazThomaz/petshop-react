import {
  Alert,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Dialog,
  Grid,
  Snackbar,
  Typography,
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

function CustomerDetails() {
  const { id } = useParams();
  const [customer, setCustomer] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const [snackbarStatus, setSnackbarStatus] = useState(0);
  const [snackbarColor, setSnackbarColor] = useState("info");
  const [refresh, setRefresh] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogOpenEdit, setDialogOpenEdit] = useState(false);
  const [status, setStatus] = useState(1);
  useEffect(() => {
    setRefresh(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getCustomerById();
    setRefresh(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  useEffect(() => {
    if (snackbarStatus === 200) {
      setSnackbarColor("success");
      return;
    }
    if (snackbarStatus === 201) {
      setSnackbarColor("success");
      return;
    } else {
      setSnackbarColor("error");
    }
  }, [snackbarStatus]);

  const getCustomerById = async () => {
    await API.get(`/${id}`)
      .then((resp) => {
        setCustomer(resp.data);
        setStatus(resp.status);
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
                  <Typography gutterBottom variant="h6" component="div">
                    Nome: {customer.name} {customer.lastName}
                  </Typography>
                  <Typography variant="body2">
                    Telefone: {customer.phone}
                  </Typography>
                  {customer.payment === true && (
                    <Typography variant="body2">Pagamento: Efetuado</Typography>
                  )}
                  {customer.payment === false && (
                    <Typography variant="body2">
                      Pagamento: Não efetuado
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
                  <Button
                    style={{ marginBottom: "5px" }}
                    variant="outlined"
                    onClick={() => setDialogOpen(true)}
                    endIcon={<PetsIcon />}
                  >
                    Adicionar Pet
                  </Button>

                  <Button
                    color="warning"
                    variant="outlined"
                    onClick={() => setDialogOpenEdit(true)}
                    endIcon={<EditIcon />}
                  >
                    Editar Cliente
                  </Button>
                </div>
              </CardContent>
            </Card>
            {customer.pets !== undefined && (
              <Grid
                style={{ marginTop: "0.3rem" }}
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
              >
                {customer.pets.map((resp, index) => (
                  <>
                    <Grid item xs={2} sm={4} md={4}>
                      <PetCard
                        pet={resp}
                        index={index}
                        id={customer._id}
                        setRefresh={setRefresh}
                        setSnackbarOpen={setSnackbarOpen}
                        setSnackbarMsg={setSnackbarMsg}
                        setSnackbarStatus={setSnackbarStatus}
                      />
                    </Grid>
                  </>
                ))}
              </Grid>
            )}

            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
              <CreatePet
                setDialogOpen={setDialogOpen}
                setRefresh={setRefresh}
                setSnackbarOpen={setSnackbarOpen}
                setSnackbarMsg={setSnackbarMsg}
                setSnackbarStatus={setSnackbarStatus}
                id={customer._id}
              />
            </Dialog>

            <Dialog
              open={dialogOpenEdit}
              onClose={() => setDialogOpenEdit(false)}
            >
              <EditCustomer
                setDialogOpen={setDialogOpenEdit}
                setRefresh={setRefresh}
                setSnackbarOpen={setSnackbarOpen}
                setSnackbarMsg={setSnackbarMsg}
                setSnackbarStatus={setSnackbarStatus}
                id={customer._id}
              />
            </Dialog>
          </>
        )}
      </Container>
      <Snackbar
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
        autoHideDuration={3000}
      >
        <Alert severity={snackbarColor}>{snackbarMsg}</Alert>
      </Snackbar>
    </>
  );
}

export default CustomerDetails;
