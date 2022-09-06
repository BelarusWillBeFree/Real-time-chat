import { Modal, Container, Button } from 'react-bootstrap';
import React, {
  useState, useRef, useEffect, useContext
} from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';

import { setShowed } from '../../slices/modalsSlice';
import { ApiContext } from '../../contexts/Context.jsx';
import { getModalInfo } from '../../selectors.js';

const Remove = () => {
  const { sendRemoveChannel } = useContext(ApiContext);
  const [disabled, setDisabled] = useState(false);
  const modalInfo = useSelector(getModalInfo);
  const [show, setShow] = useState(true);
  const { t } = useTranslation();
  const buttonRef = useRef();
  const dispatch = useDispatch();
  const notify = () => toast.success(t('channels.toast.remove'));
  const notifyError = () => toast.error(t('errors.unknown'));
  const resultDeleteChannel = ({ status }) => {
    if (status === 'ok') {
      notify();
      dispatch(setShowed(false));
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
    dispatch(sendRemoveChannel(modalInfo.idChannel, resultDeleteChannel));
  };

  const handleClose = () => {
    dispatch(setShowed(false));
    setShow(false);
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton onHide={handleClose}>
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
              ref={buttonRef}
            >
              {t('buttons.delete')}
            </Button>
          </Container>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default Remove;
