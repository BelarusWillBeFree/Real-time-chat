import React, { useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import { PlusSquare } from 'react-bootstrap-icons';
import { useTranslation } from 'react-i18next';

import ChannelsList from './ChannelsList.jsx';
//import { ApiContext } from '../contexts/Context.jsx';
//import ModalManage from './modals/ModalManage.jsx';
import { setShowed } from '../slices/modalsSlice';
import { getModalInfo } from '../selectors.js';
import getModal from './modals/index.js';

const ModalWindowAdd = (props) => {
  const { isShowed, type } = props.modalInfo;
  if (!isShowed) {
    return null;
  }
  const Component = getModal(type);
  return (
    <Component />
    );
}

const Channels = () => {

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const modalInfo = useSelector(getModalInfo);
//{modalInfo.isShowed?getModal(modalInfo.type):null}
  return (
    <div className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
      <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
        <span>{t('channels.text')}</span>
        <Button
          variant="link"
          onClick={() => dispatch(setShowed(true)) } //showModal('adding')
          className="p-0 text-primary btn-group-vertical"
        >
          <PlusSquare />
          <span className="visually-hidden">+</span>
        </Button>
      </div>
      <ChannelsList /> 

      <ModalWindowAdd modalInfo={modalInfo} />
    </div>
  );
}
//      {renderModal({ modalInfo, hideModal, action })}
export default Channels;
