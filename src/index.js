/* Importa React */
import React, { StrictMode } from "react";
/* Importa la libreria de React para comunicarse con el navegador */
import { createRoot } from "react-dom/client";
/* Importa la hoja de estilos "styles.css" */
import "./styles.css";
/* Relaciona el archivo "App.js con index.js" */
import App from "./App";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);