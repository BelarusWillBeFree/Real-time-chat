import { Modal, Container } from "react-bootstrap";
import { useState } from "react";

const Remove = ({ modalInfo, action, onHide }) => {
  const [disabled, setDisabled] = useState(false);
  const resultDeleteChannel = (status) => {
    if (status === 'ok') {
      onHide();
    }
    setDisabled(false);
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
    <Modal show>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <Container className='d-flex justify-content-end'>
            <input type="button" disabled={disabled} onClick={handleClose} className="btn btn-secondary me-2" value="Отменить" />
            <input type="submit" disabled={disabled} className="btn btn-danger" value="Удалить" />
          </Container>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default Remove;
