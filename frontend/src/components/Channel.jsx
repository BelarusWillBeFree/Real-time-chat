import React from 'react';
import { useDispatch } from 'react-redux';
import {
  Nav, Dropdown, Button, ButtonGroup,
} from 'react-bootstrap';

import { useTranslation } from 'react-i18next';
import { setCurrentChannelId } from '../slices/channelsSlice';

const ButtonChannelRemovable = ({
  onclick, variant, name, id, showModal,
}) => {
  const { t } = useTranslation();
  return (
    <Dropdown as={ButtonGroup} className="w-100">
      <Button
        variant={variant}
        className="text-start w-100 text-truncate"
        onClick={onclick(id)}
      >
        <span className="me-1">#</span>
        {name}
      </Button>

      <Dropdown.Toggle split variant={variant} className="flex-grow-0 text-end">
        <span className="visually-hidden">{t('channels.control')}</span>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={() => showModal('removing', id)}>
          {t('buttons.delete')}
        </Dropdown.Item>
        <Dropdown.Item onClick={() => showModal('renaming', id)}>
          {t('buttons.rename')}
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

const ButtonChannel = ({
  onclick, variant, name, id,
}) => {
  return (
    <Button
      variant={variant}
      className="text-start w-100 text-truncate"
      onClick={onclick(id)}
    >
      {`# ${name}`}
    </Button>
  );
}

const Channel = (props) => {
  const { channelData, currentChannelId, showModal } = props;
  const dispatch = useDispatch();
  const { name, removable } = channelData;
  const variant = channelData.id === currentChannelId ? 'secondary' : 'light';

  const onClick = (id) => () => {
    dispatch(setCurrentChannelId(id));
  };

  return (
    <Nav.Item className="w-100" as="li">
      {removable ? (
        <ButtonChannelRemovable
          onclick={onClick}
          key={channelData.id}
          id={channelData.id}
          variant={variant}
          name={name}
          showModal={showModal}
        />
      ) : (
        <ButtonChannel
          onclick={onClick}
          key={channelData.id}
          id={channelData.id}
          variant={variant}
          name={name}
        />
      )}
    </Nav.Item>
  );
}

export default Channel;
