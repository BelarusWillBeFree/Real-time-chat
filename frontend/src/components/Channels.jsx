import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import { PlusSquare } from 'react-bootstrap-icons';
import { useTranslation } from 'react-i18next';

import ChannelsList from './ChannelsList.jsx';
import { showModal } from '../slices/modalsSlice';

const Channels = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(showModal({type: 'adding'}));
  };

  return (
    <div className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
      <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
        <span>{t('channels.text')}</span>
        <Button
          variant="link"
          onClick={handleClick}
          className="p-0 text-primary btn-group-vertical"
        >
          <PlusSquare />
          <span className="visually-hidden">+</span>
        </Button>
      </div>
      <ChannelsList />
    </div>
  );
};

export default Channels;
