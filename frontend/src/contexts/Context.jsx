import { createContext } from 'react';

const AuthContext = createContext({});
const I18nContext = createContext({});
const SocketContext = createContext({});
const ApiContext = createContext({});

export {
  AuthContext, I18nContext, SocketContext, ApiContext,
};
