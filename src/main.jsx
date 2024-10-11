import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store/store.js";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { RouterProvider } from "react-router-dom";
import routes from "./routes/combineRoutes.jsx";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppContextProvider from "./context/AppContext.jsx";

const root = createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <AppContextProvider>
      <PersistGate loading={null} persistor={persistor}>
        <GoogleOAuthProvider clientId="333028122679-8qui3jtdf79sm38ft0rqnrgnbvuhmrs5.apps.googleusercontent.com">
          <RouterProvider router={routes} />
          <ToastContainer />
        </GoogleOAuthProvider>
      </PersistGate>
    </AppContextProvider>
  </Provider>
);
