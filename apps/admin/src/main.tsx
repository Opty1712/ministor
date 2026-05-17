import { getApps } from "@ministor/api";
import React from "react";
import ReactDOM from "react-dom/client";

const root = document.getElementById("root");

if (root) {
  ReactDOM.createRoot(root).render(<React.StrictMode>hello!</React.StrictMode>);
}

getApps();

/*
console.log(123);
console.error(123);


if (!!root) {
  render();
}

const title: String = "MiniStor";
const price: Number = 100;
const enabled: Boolean = true;
*/
