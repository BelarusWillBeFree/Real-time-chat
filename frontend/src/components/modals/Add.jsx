import { useFormik } from "formik";
import { useRef, useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { Modal, FormGroup, FormControl, Form, Container } from "react-bootstrap";
import * as yup from 'yup';

import { selectors } from '../../slices/channelsSlice';

const Add = (props) => {
  const channels = useSelector((state) => selectors.selectEntities(state));
  const namesChannels = Object.values(channels).map((channel) => channel.name);
  
  const validationSchema = yup.object().shape({
    name: yup
          .string()
          .required('Имя должно быть заполнено')
          .min(2, 'От 3 до 20 символов')
          .max(20, 'От 3 до 20 символов')
          .notOneOf(namesChannels, 'Должно быть уникальным'),
  });
  
  const generateOnSubmit = ({ modalInfo, action, onHide }) => async(values) => {
    try {
      setDisabledButton(true);
      const names = await validationSchema.validate(values);
      action[modalInfo.type](values, onHide);
      //setDisabledButton(false);
      //onHide();
    } catch (err) {
      setErrorsDesc(err.message);
    }
  };

  const { onHide } = props;
  const formik = useFormik({ onSubmit: generateOnSubmit(props), initialValues: { name: '' } });
  const [errorsDesc, setErrorsDesc] = useState('');
  const [disabledButton, setDisabledButton] = useState(false);
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleClose = () => {
    onHide();
  }

  const {handleSubmit, handleChange, handleBlur, values} = formik;
  return (
    <Modal show>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>Добавить канал</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <FormControl
              required
              ref={inputRef}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
              data-testid="input-body"
              name="name"
              className='mb-2'
              isInvalid ={errorsDesc}
            />
            {errorsDesc?<Form.Text className='text-danger'>{errorsDesc}</Form.Text> : null}
          </FormGroup>
          <Container className='d-flex justify-content-end'>
            <input type="button" onClick={handleClose} className="btn btn-secondary me-2" value="Отменить" />
            <input type="submit" disabled={disabledButton} className="btn btn-primary " value="Отправить" />
          </Container>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default Add;
