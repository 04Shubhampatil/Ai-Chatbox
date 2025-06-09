import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import ContextPeorter from "./util/Contex.jsx";

createRoot(document.getElementById("root")).render(
  <ContextPeorter>
    <App />
  </ContextPeorter>
);
