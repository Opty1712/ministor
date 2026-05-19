import ReactDOM from "react-dom/client";
import App from "./App";
import "./global.css";
import "./stores/configureMobx";
import { StoreProvider } from "./stores/StoreProvider";

const root = document.getElementById("root");

if (root) {
  ReactDOM.createRoot(root).render(
    <StoreProvider>
      <App />
    </StoreProvider>,
  );
}
