import { Modal, Container } from "react-bootstrap";

const Remove = (props) => {
  const { onHide, action, modalInfo } = props;
  const handleSubmit = (event) => {
    event.preventDefault();
    action[modalInfo.type](modalInfo.id, onHide);
  }
  const handleClose = ({ modalInfo, action, onHide }) => {
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
            <input type="button" onClick={handleClose} className="btn btn-secondary me-2" value="Отменить" />
            <input type="submit" className="btn btn-danger" value="Удалить" />
          </Container>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default Remove;
