import React, { useState } from 'react';
import { SpinerContext } from './Context.jsx';

const SpinerProvider = ({ children }) => {
  const [showSpiner, setShowSpiner] = useState(true);

  return (
    <SpinerContext.Provider value={{ showSpiner, setShowSpiner }}>
      {children}
    </SpinerContext.Provider>
  );
};

export default SpinerProvider;
