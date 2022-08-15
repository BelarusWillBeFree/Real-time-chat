import { Modal, Container } from "react-bootstrap";
import { useState } from "react";
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

const Remove = ({ modalInfo, action, onHide }) => {
  const [disabled, setDisabled] = useState(false);
  const { t } = useTranslation();
  const notify = () => toast.success(t('channels.toast.remove'));
  const notifyError = () => toast.error(t('errors.unknown'));
  const resultDeleteChannel = ({status}) => {
    if (status === 'ok') {
      notify();
      onHide();
    } else {
      notifyError();
      setDisabled(false); 
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setDisabled(true);
    action[modalInfo.type](modalInfo.id, resultDeleteChannel);
  }

  const handleClose = () => {
    onHide();
  }

  return (
    <Modal show centered>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>{t('modals.delete.text')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <Container className='d-flex justify-content-end'>
            <input 
              type="button"
              disabled={disabled}
              onClick={handleClose}
              className="btn btn-secondary me-2"
              value={t('buttons.cancel')}
            />
            <input
              type="submit"
              disabled={disabled}
              className="btn btn-danger"
              value={t('buttons.delete')}
            />
          </Container>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default Remove;
