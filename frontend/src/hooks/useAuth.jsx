import { useContext } from 'react';

import authContext from '../contexts/AuthContext.jsx';

const useAuth = () => useContext(authContext);

export default useAuth;