import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import Home from "./components/Home/Home";
import CustomerDetails from "./components/CustomerDetails/CustomerDetails";
import { AppBar, Button, Switch, Toolbar, Typography } from "@mui/material";
import Page404 from "./templates/Page404";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import ProtectedRoutes from "./components/Auth/Auth";
import LogoutIcon from "@mui/icons-material/Logout";
import DarkTheme from "./styles/darkTheme";
import LightTheme from "./styles/lightTheme";
import { RootState } from "./store/store";
import { ThemeSwitch } from "./store/reducers/Theme.store";
import Style from "./styles/Style";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

function App() {

  const dispatch = useDispatch();
  const store = useSelector((state: RootState) => state.rootReducer);
  const theme = store.theme

  let themeChosen: 'light' | 'dark' = 'light'

  if(theme.themeSwitch === true)themeChosen = 'dark'
  localStorage.setItem("theme", themeChosen)
  
  const AppTheme = createTheme({
    palette: {
      mode: themeChosen,
    },
  });

  const handleLogout = () => {
    window.localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <>
       <ThemeProvider theme={AppTheme}>
            <Style/>
          {themeChosen === 'light' && <LightTheme/>}
          {themeChosen === 'dark' && <DarkTheme/>}
          <Router>
            <AppBar>
              <Toolbar
                className='app-navbar'
              >
                <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                  <Typography variant="h5">Petshop</Typography>
                </Link>
                    <div className="button-navbar-container" >
                      <div className="button-switch-theme">
                      <LightModeIcon/>
                  <Switch
                  onChange={(e: any) => dispatch(ThemeSwitch())}
                  />  
                  <DarkModeIcon/>
                  </div>
                {window.localStorage.getItem("token") && (
                  <Button
                    variant="contained"
                    endIcon={<LogoutIcon />}
                    onClick={handleLogout}
                    color="primary"
                  >
                    Logout
                  </Button>
                )}
                </div>
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
    </>
  );
}

export default App;
