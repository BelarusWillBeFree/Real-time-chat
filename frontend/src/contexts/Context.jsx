import { createContext } from 'react';

const AuthContext = createContext({});
const I18nContext = createContext({});
const SocketContext = createContext({});
const ApiContext = createContext({});
const SpinerContext = createContext({});

export {
  AuthContext, I18nContext, SocketContext, ApiContext, SpinerContext
};
