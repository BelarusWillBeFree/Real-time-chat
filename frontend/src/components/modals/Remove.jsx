import { Modal, Container, Button } from 'react-bootstrap';
import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

const Remove = ({ modalInfo, action, onHide }) => {
  const [disabled, setDisabled] = useState(false);
  const { t } = useTranslation();
  const buttonRef = useRef();
  const notify = () => toast.success(t('channels.toast.remove'));
  const notifyError = () => toast.error(t('errors.unknown'));
  const resultDeleteChannel = ({ status }) => {
    if (status === 'ok') {
      notify();
      onHide();
    } else {
      notifyError();
      setDisabled(false);
    }
  };
  useEffect(() => {
    buttonRef.current.focus();
  }, []);
  const handleDelete = (event) => {
    event.preventDefault();
    setDisabled(true);
    action[modalInfo.type](modalInfo.id, resultDeleteChannel);
  };

  const handleClose = () => {
    onHide();
  };

  return (
    <Modal show centered>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>{t('modals.delete.text')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form>
          <Container className="d-flex justify-content-end">
            <input
              type="button"
              disabled={disabled}
              onClick={handleClose}
              className="btn btn-secondary me-2"
              value={t('buttons.cancel')}
            />
            <Button
              type="submit"
              variant="danger"
              onClick={handleDelete}
              disabled={disabled}
              ref={buttonRef}>
              {t('buttons.delete')}
            </Button>
          </Container>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default Remove;
