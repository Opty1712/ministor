import { AppRoot } from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import ReactDOM from "react-dom/client";
import { Router } from "./Router";
import "./stores/configureMobx";
import { StoreProvider } from "./stores/StoreProvider";

const root = document.getElementById("root");

if (root) {
  ReactDOM.createRoot(root).render(
    <StoreProvider>
      <AppRoot>
        <Router />
      </AppRoot>
    </StoreProvider>,
  );
}
