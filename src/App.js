import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

// React Router
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Home from "./components/Home/Home";
import CustomerDetails from "./components/CustomerDetails/CustomerDetails";
import { AppBar, Toolbar, Typography } from "@mui/material";
import Page404 from "./templates/Page404";

function App() {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <>
      <ThemeProvider theme={darkTheme}>
      <Router>
      <AppBar>
        <Toolbar>
          <Link to='/' style={{textDecoration: 'none', color: 'white'}}>
          <Typography variant='h5'>Petshop</Typography>
          </Link>
        </Toolbar>
      </AppBar>

          <Routes>
            <Route path="*" element={<Page404/>} />
            <Route path="/" element={<Home />} />
            <Route path="/:id" element={<CustomerDetails />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
