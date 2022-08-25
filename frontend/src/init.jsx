import React from "react";
import i18next from "i18next";
import { initReactI18next, I18nextProvider } from "react-i18next";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { Provider as ProviderRollbar, ErrorBoundary } from "@rollbar/react";
import reducer from "./slices/index.js";
import ru from "./locales/ru.js";
import App from "./App";

import { ApiContext } from "./contexts/Context.jsx";
import { addMessage } from "./slices/messagesSlice";
import {
  addChannel,
  removeChannel,
  renameChannel,
} from "./slices/channelsSlice";

const apiFun = (socket) => {
  const withTimeout = (cb) => {
    let called = false;

    const timer = setTimeout(() => {
      if (called) return;
      called = true;
      cb({ status: "timeout" });
    }, 3000);

    return (...args) => {
      if (called) return;
      called = true;
      clearTimeout(timer);
      cb.apply(this, args);
    };
  };
  const sendNewMessage = (bodyMessage, cb) => {
    socket.emit("newMessage", bodyMessage, withTimeout(cb));
  };

  const addNewChannel = (name, cb) => {
    socket.emit("newChannel", name, withTimeout(cb));
  };

  const sendRemoveChannel = (id, cb) => {
    socket.emit("removeChannel", { id }, withTimeout(cb));
  };

  const sendRenameChannel = (newProps, cb) => {
    socket.emit("renameChannel", newProps, withTimeout(cb));
  };
  return {
    addNewChannel,
    sendRemoveChannel,
    sendRenameChannel,
    sendNewMessage,
  };
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async (socket) => {
  const i18n = i18next.createInstance();
  const defaultLng = "ru";
  await i18n.use(initReactI18next).init({
    fallbackLng: defaultLng,
    debug: false,

    resources: {
      ru,
    },
  });

  const store = configureStore({ reducer });
  const rollbarConfig = {
    accessToken: process.env.REACT_APP_ACCESS_TOKEN,
    environment: process.env.NODE_ENV,
    captureUncaught: true,
    captureUnhandledRejections: true,
  };

  socket.on("newMessage", (data) => {
    store.dispatch(addMessage(data));
  });
  socket.on("newChannel", (data) => {
    store.dispatch(addChannel(data));
  });
  socket.on("removeChannel", (data) => {
    store.dispatch(removeChannel(data.id));
  });
  socket.on("renameChannel", (data) => {
    store.dispatch(renameChannel(data));
  });
  const api = apiFun(socket);
  return (
    <React.StrictMode>
      <Provider store={store}>
        <ProviderRollbar config={rollbarConfig}>
          <ErrorBoundary>
            <ApiContext.Provider value={api}>
              <I18nextProvider i18n={i18n}>
                <App />
              </I18nextProvider>
            </ApiContext.Provider>
          </ErrorBoundary>
        </ProviderRollbar>
      </Provider>
    </React.StrictMode>
  );
};
