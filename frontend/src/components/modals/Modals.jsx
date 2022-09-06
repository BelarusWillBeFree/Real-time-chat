import { useSelector } from 'react-redux';

import Add from './Add.jsx';
import Remove from './Remove.jsx';
import Rename from './Rename.jsx';

import { getModalInfo } from '../../selectors.js';

const modals = {
  adding: Add,
  removing: Remove,
  renaming: Rename,
};

const typeModals = (modalName) => modals[modalName];

const Modals = () => {
  const modalInfo = useSelector(getModalInfo);
  const { isShowed, type } = modalInfo;
  if (!isShowed) {
    return null;
  }
  const Component = typeModals(type);
  return (
    <Component />
  );
};

export default Modals;
