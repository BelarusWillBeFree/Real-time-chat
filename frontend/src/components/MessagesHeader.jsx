import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import React from 'react';

import { selectors as selectorMessages } from '../slices/messagesSlice';
import { selectors as selectorChannels } from '../slices/channelsSlice';

function MessagesHeader() {
  const curChannelId = useSelector((store) => store.channels.currentChannelId);
  const currChannel = useSelector((state) => selectorChannels.selectById(state, curChannelId));
  const messages = useSelector(selectorMessages.selectEntities);
  const count = Object.values(messages).filter(
    (message) => message.channelId === curChannelId,
  ).length;
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
}

export default MessagesHeader;
