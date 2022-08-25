import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

// React Router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./components/Home/Home";
import CustomerDetails from "./components/CustomerDetails/CustomerDetails";

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
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:id" element={<CustomerDetails />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
