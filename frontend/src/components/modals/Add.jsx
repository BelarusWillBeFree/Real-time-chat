import { useFormik } from "formik";
import { useRef, useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { Modal, FormGroup, FormControl, Form, Container } from "react-bootstrap";
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useDispatch } from "react-redux";
import { useRollbar } from '@rollbar/react';
import { selectors } from '../../slices/channelsSlice';
import { setCurrentChannelId } from '../../slices/channelsSlice';

const AddRename = (props) => {
  const { t } = useTranslation();
  const rollbar = useRollbar();
  const channels = useSelector((state) => selectors.selectEntities(state));
  const namesChannels = Object.values(channels).map((channel) => channel.name);
  const dispatch = useDispatch();

  const validationSchema = yup.object().shape({
    name: yup
          .string()
          .required(t('validation.required', {name: 'Имя'}))
          .min(2, t('validation.sizeFromTo', {from: 3, to: 20}))
          .max(20, t('validation.sizeFromTo', {from: 3, to: 20}))
          .notOneOf(namesChannels, t('validation.unique')),
  });
  const notify = () => toast.success(t('channels.toast.add'));
  const notifyError = () => toast.error(t('errors.unknown'));

  const resultAddChannel = (props) => {
    const { status } = props;
    if (status === 'ok') {
      const { data: { id } } = props;
      dispatch(setCurrentChannelId(id));
      notify();
      onHide();
    } else {
      rollbar.error('error creat new channel');
      notifyError();
      setDisabledButton(false); 
    }
  }
  const generateOnSubmit = ({ modalInfo, action, onHide }) => (values) => {
      setDisabledButton(true);
      validationSchema.validate(values)
      .then(()=> action[modalInfo.type](values, resultAddChannel))
      .catch((err) => {
        toast.error(t('errors.unknown'));
        setErrorsDesc(err.message);
        setDisabledButton(false);
      });
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
    <Modal show centered>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>{t('modals.add.text')}</Modal.Title>
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
            <Form.Label className='visually-hidden'>{t('modals.label')}</Form.Label>
            {errorsDesc?<Form.Text className='text-danger'>{errorsDesc}</Form.Text> : null}
          </FormGroup>
          <Container className='d-flex justify-content-end'>
            <input type="button" onClick={handleClose} className="btn btn-secondary me-2" value={t('buttons.cancel')} />
            <input type="submit" disabled={disabledButton} className="btn btn-primary " value={t('buttons.submit')} />
          </Container>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default AddRename;
