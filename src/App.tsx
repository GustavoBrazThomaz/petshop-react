import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import { Provider } from "react-redux";

import Home from "./components/Home/Home";
import CustomerDetails from "./components/CustomerDetails/CustomerDetails";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import Page404 from "./templates/Page404";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import ProtectedRoutes from "./components/Auth/Auth";
import LogoutIcon from "@mui/icons-material/Logout";
import store from "./store/index"

function App() {

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const handleLogout = () => {
    window.localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <>
    <Provider store={store}>
       <ThemeProvider theme={darkTheme}>
          <Router>
            <AppBar>
              <Toolbar
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                  <Typography variant="h5">Petshop</Typography>
                </Link>

                {window.localStorage.getItem("token") && (
                  <Button
                    variant="outlined"
                    endIcon={<LogoutIcon />}
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                )}
              </Toolbar>
            </AppBar>

            <Routes>
              <Route path="/Login" element={<Login />} />
              <Route path="/Register" element={<Register />} />

              <Route element={<ProtectedRoutes />}>
                <Route path="/" element={<Home />} />
                <Route path="/customer/:id" element={<CustomerDetails />} />
                <Route path="*" element={<Page404 />} />
              </Route>
            </Routes>
          </Router>
        </ThemeProvider>
        </Provider>
    </>
  );
}

export default App;
