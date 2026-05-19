import { getApps } from "@ministor/api";
import ReactDOM from "react-dom/client";

const root = document.getElementById("root");

if (root) {
  ReactDOM.createRoot(root).render(<div>hello!! I'm admin</div>);
}

getApps();
