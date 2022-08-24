import { useContext } from 'react';

import { AuthContext } from '../contexts/Context.jsx';

const useAuth = () => useContext(AuthContext);

export default useAuth;
