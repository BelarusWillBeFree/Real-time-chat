import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import React from 'react';

import { getCurrentChannel, getMessagesForCurrentChannel } from '../selectors.js';

const MessagesHeader = () => {
  const currChannel = useSelector(getCurrentChannel);
  const count = useSelector(getMessagesForCurrentChannel).length;
  const { t } = useTranslation();

  const channelName = currChannel ? currChannel.name : '';
  return (
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <p className="m-0 fw-bold">
        <b>{`# ${channelName}`}</b>
      </p>
      <span className="text-muted">{t('messages.message', { count })}</span>
    </div>
  );
};

export default MessagesHeader;
