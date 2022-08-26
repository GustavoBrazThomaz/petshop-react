import React, { useEffect, useState } from "react";
import { Container } from "@mui/system";
import {
  Alert,
  Button,
  Card,
  Dialog,
  Grid,
  Snackbar,
} from "@mui/material";
import CustomerCard from "../../templates/Cards/CustomerCard";
import API from "../../hooks/API";
import CreateCustomer from "../../templates/Dialogs/CreateCustomer";

function Home() {
  const [customers, setCustomers] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const [snackbarStatus, setSnackbarStatus] = useState(0);
  const [snackbarColor, setSnackbarColor] = useState("info");
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    setRefresh(true);
  }, []);

  useEffect(() => {
    getCustomers();
    setRefresh(false);
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

  const getCustomers = async () => {
    await API.get("").then((resp) => {
      setCustomers(resp.data);
    });
  };

  return (
    <>
      <Container style={{ marginTop: "5rem" }}>
      <div style={{display: 'flex', justifyContent: 'flex-end'}}>
      <Button variant='outlined' color='primary' onClick={() => setDialogOpen(true)}>Adicionar Cliente</Button>
      </div>
        <Grid
          style={{marginTop: '0.3rem'}}
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {customers.map((data) => (
            <>
              <Grid item xs={2} sm={4} md={4}>
                <Card>
                  <CustomerCard
                    customer={data}
                    setRefresh={setRefresh}
                    setSnackbarOpen={setSnackbarOpen}
                    setSnackbarMsg={setSnackbarMsg}
                    setSnackbarStatus={setSnackbarStatus}
                  />
                </Card>
              </Grid>
            </>
          ))}
        </Grid>
      </Container>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <CreateCustomer 
        setDialogOpen={setDialogOpen}
        setRefresh={setRefresh}
        setSnackbarOpen={setSnackbarOpen}
        setSnackbarMsg={setSnackbarMsg}
        setSnackbarStatus={setSnackbarStatus}
        />
      </Dialog>

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


export default Home;
