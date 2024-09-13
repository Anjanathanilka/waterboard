import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./state/Auth";
import applicationReducer from "./state/UserApplication";
import { setupListeners } from "@reduxjs/toolkit/query";
import { api } from "./state/api";
import { GoogleOAuthProvider } from "@react-oauth/google";

const store = configureStore({
  reducer: {
    userContext: authReducer,
    userApplication: applicationReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

setupListeners(store.dispatch);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <GoogleOAuthProvider clientId="90505972630-ogshh8gsa9vdkit3nrpbbcfst4m3atg5.apps.googleusercontent.com">
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  </GoogleOAuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
