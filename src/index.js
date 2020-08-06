import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import UserProvider from "./components/Auth/UserProvider";
import App from "./App";
import { ThemeProvider } from '@material-ui/styles';
import theme from './theme';
import "./styles/reset.css";
import "./styles/global.css";

ReactDOM.render(
  <ThemeProvider theme={theme}>
  <BrowserRouter>
    <UserProvider>
      <App />
    </UserProvider>
  </BrowserRouter>
  </ThemeProvider>,
  document.getElementById("root")
);
