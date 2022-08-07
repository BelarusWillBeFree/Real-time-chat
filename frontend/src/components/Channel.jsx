import React from 'react';
import { useDispatch } from 'react-redux';
import { Nav, Dropdown, Button, ButtonGroup } from 'react-bootstrap';

import { setCurrentChannelId } from '../slices/channelsSlice';

const ButtonChannelRemovable = ({ onclick, variant, name, id, showModal }) => {
  return (
    <Dropdown as={ButtonGroup} className="w-100">
      <Button variant={variant} className="text-start w-100 text-truncate" onClick={onclick(id)}>
        <span>#</span> {name}
      </Button>
      
      <Dropdown.Toggle split variant={variant} className="flex-grow-0 text-end" />
      <Dropdown.Menu>
        <Dropdown.Item onClick={() => showModal('removing', id)}>Удалить</Dropdown.Item>
        <Dropdown.Item onClick={() => showModal('renaming', id)}>Переименовать</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

const ButtonChannel = ({ onclick, variant, name, id }) => {
  return (
    <Button variant={variant} className="text-start w-100 text-truncate" onClick={onclick(id)}>
      <span>#</span> {name}
    </Button>
  );
};

export const Channel = ({channelData, currentChannelId, showModal}) => {
  const dispatch = useDispatch();
  const { id, name, removable } = channelData;
  const variant = id === currentChannelId ? 'secondary' : 'light';
  
  const onClick = (id) => () => {
    dispatch(setCurrentChannelId(id));
  }
  
  return (
    <Nav.Item className="w-100" as="li">
      {
        removable
        ? <ButtonChannelRemovable onclick={onClick} id={id} variant={variant} name={name} showModal={showModal}/>
        : <ButtonChannel onclick={onClick} id={id} variant={variant} name={name}/>
      }
    </Nav.Item>
  )
};