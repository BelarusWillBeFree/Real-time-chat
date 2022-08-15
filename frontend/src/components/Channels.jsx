import React, { useState, useContext } from 'react';
import { Button } from 'react-bootstrap';
import { PlusSquare } from 'react-bootstrap-icons';
import { useTranslation } from 'react-i18next';

import getModal from './modals';
import { ChannelsList } from './ChannelsList';
import { ApiContext } from '../contexts/Context';

const renderModal = ({ modalInfo, hideModal, action }) => {
  if (!modalInfo.type) {
    return null;
  }

  const Component = getModal(modalInfo.type);
  return <Component modalInfo={modalInfo} action={action} onHide={hideModal} />;

}
export const Channels = () => {

  const {addNewChannel, sendRemoveChannel, sendRenameChannel} = useContext(ApiContext);

  const action = {
    adding: (props, cb) => addNewChannel(props, cb),
    removing: (props, cb) => sendRemoveChannel(props, cb),
    renaming: (props, cb) => sendRenameChannel(props, cb),
  }
  const [modalInfo, setModalInfo] = useState({ type: null, id: null });
  const hideModal = () => setModalInfo({ type: null, id: null });
  const showModal = (type, id = null) => setModalInfo({ type, id });
  const { t } = useTranslation();

  return(
    <div className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
      <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
        <span>{t('channels.text')}</span>
        <Button
          variant="link"
          onClick={() => showModal('adding')} 
          className="p-0 text-primary btn-group-vertical">
            <PlusSquare/>
        </Button>
      </div>  
      <ChannelsList showModal={showModal}/>
      {renderModal({ modalInfo, hideModal, action })}
    </div>
  )
}