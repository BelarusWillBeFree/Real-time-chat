import { Form, Button, InputGroup } from 'react-bootstrap';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import React, { useContext, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import filter from 'leo-profanity';
import { toast } from 'react-toastify';

import { ApiContext } from '../contexts/Context.jsx';

const MessagesFooter = () => {
  const { t } = useTranslation();
  const [disabledButton, setDisabledButton] = useState(false);
  const notifyError = () => toast.error(t('errors.unknown'));
  const initialValues = { message: '' };
  const currentChannelId = useSelector((store) => store.channels.currentChannelId);
  const { sendNewMessage } = useContext(ApiContext);
  const username = useSelector((store) => store.login.username);
  const inputRef = useRef();
  if (inputRef.current) {
    inputRef.current.focus();
  }

  const formik = useFormik({
    initialValues,
    onSubmit: ({ message }, { resetForm }) => {
      setDisabledButton(true);
      const bodyMessage = {
        username,
        body: filter.clean(message),
        channelId: currentChannelId,
      };
      sendNewMessage(bodyMessage, (props) => {
        const { status } = props;
        if (status === 'ok') {
          resetForm();
        } else {
          notifyError();
        }
        setDisabledButton(false);
      });
    },
  });
  const { values, handleSubmit, handleChange } = formik;
  return (
    <div className="mt-auto px-5 py-3">
      <Form onSubmit={handleSubmit} className="py-1 rounded-2 border">
        <InputGroup>
          <Form.Control
            placeholder={t('messages.textInput')}
            name="message"
            aria-label="Новое сообщение"
            className="border-0"
            value={values.message}
            onChange={handleChange}
            ref={inputRef}
          />
          <Button
            type="submit"
            variant="link"
            disabled={values.message.length === 0 || disabledButton}
          >
            <ArrowRightSquare size={20} />
          </Button>
        </InputGroup>
      </Form>
    </div>
  );
}

export default MessagesFooter;
