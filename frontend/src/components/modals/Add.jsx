import { useFormik } from 'formik';
import React, { useRef, useEffect, useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Modal, FormControl, Form, Container,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useRollbar } from '@rollbar/react';
import { setCurrentChannelId } from '../../slices/channelsSlice';
import { setShowed } from '../../slices/modalsSlice';
import { getChannelsNames } from '../../selectors.js';
import { ApiContext } from '../../contexts/Context.jsx';

const Add = () => {
  const { addNewChannel } = useContext(ApiContext);

  const { t } = useTranslation();
  const rollbar = useRollbar();
  const [disabledButton, setDisabledButton] = useState(false);
  const [errorsDesc, setErrorsDesc] = useState('');
  const [show, setShow] = useState(true);
  const namesChannels = useSelector(getChannelsNames);
  const dispatch = useDispatch();

  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .required('validation.requiredName')
      .min(2, 'validation.sizeFrom3To20')
      .max(20, 'validation.sizeFrom3To20')
      .notOneOf(namesChannels, 'validation.unique'),
  });
  const notify = () => toast.success(t('channels.toast.add'));
  const notifyError = () => toast.error(t('errors.unknown'));

  const resultAddChannel = (propsAddChannel) => {
    const { status } = propsAddChannel;
    if (status === 'ok') {
      const {
        data: { id },
      } = propsAddChannel;
      dispatch(setCurrentChannelId(id));
      notify();
      dispatch(setShowed(false));
    } else {
      rollbar.error('error creat new channel');
      notifyError();
      setDisabledButton(false);
    }
  };
  const generateOnSubmit = (values) => {
    setDisabledButton(true);
    validationSchema
      .validate(values)
      .then(() => {
        addNewChannel(values, resultAddChannel);
      })
      .catch((err) => {
        setErrorsDesc(t(err.message));
        setDisabledButton(false);
      });
  };

  const formik = useFormik({
    onSubmit: generateOnSubmit,
    initialValues: { name: '' },
  });
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleClose = () => {
    dispatch(setShowed(false));
    setShow(false);
  };

  const {
    handleSubmit, handleChange, handleBlur, values,
  } = formik;
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton onHide={ handleClose }>
        <Modal.Title>{t('modals.add.text')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <FormControl
            required
            ref={inputRef}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.name}
            data-testid="input-body"
            placeholder={t('modals.label')}
            id="name"
            name="name"
            className="mb-2"
            isInvalid={errorsDesc}
          />
          <Form.Label className="visually-hidden" htmlFor="name">
            {t('modals.label')}
          </Form.Label>
          {errorsDesc ? (
            <Form.Text className="text-danger">{errorsDesc}</Form.Text>
          ) : null}
          <Container className="d-flex justify-content-end">
            <input
              type="button"
              onClick={handleClose}
              className="btn btn-secondary me-2"
              value={t('buttons.cancel')}
            />
            <input
              type="submit"
              disabled={disabledButton}
              className="btn btn-primary "
              value={t('buttons.submit')}
            />
          </Container>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default Add;
