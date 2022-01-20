import React from "react";
import ReactDOM from "react-dom";
import {ThemeProvider} from "styled-components";
import App from "./App";
import { lightTheme,darkTheme  } from "./thems";


ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);