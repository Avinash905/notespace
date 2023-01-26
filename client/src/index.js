import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import NoteProvider from "./context/noteContext";
import UserProvider from "./context/userContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <UserProvider>
    <NoteProvider>
      <App />
    </NoteProvider>
  </UserProvider>
);
