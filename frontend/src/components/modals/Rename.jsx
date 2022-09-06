import { useFormik } from 'formik';
import React, {
  useRef, useEffect, useState, useContext
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Modal, FormControl, Form, Container, FormLabel,
} from 'react-bootstrap';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { ApiContext } from '../../contexts/Context.jsx';

import { getChannelById, getChannelsNames, getModalInfo } from '../../selectors.js';
import { setShowed } from '../../slices/modalsSlice';

const AddRename = () => {
  const { sendRenameChannel } = useContext(ApiContext);
  const namesChannels = useSelector(getChannelsNames);
  const modalInfo = useSelector(getModalInfo);
  const [show, setShow] = useState(true);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [errorsDesc, setErrorsDesc] = useState('');
  const [disabledButton, setDisabledButton] = useState(false);
  const notify = () => toast.success(t('channels.toast.rename'));
  const notifyError = () => toast.error(t('errors.unknown'));

  const currentChannel = useSelector(getChannelById(modalInfo.idChannel));
  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .required('validation.requiredName')
      .min(2, 'validation.sizeFrom3To20')
      .max(20, 'validation.sizeFrom3To20')
      .notOneOf(namesChannels, 'validation.unique'),
  });
  const resultRenameSubmit = ({ status }) => {
    if (status === 'ok') {
      notify();
      dispatch(setShowed(false));
    } else {
      notifyError();
      setDisabledButton(false);
    }
  };

  const generateOnSubmit = (values) => {
    setDisabledButton(true);
    validationSchema
      .validate(values)
      .then(() => sendRenameChannel({
        name: values.name, id: modalInfo.idChannel
      }, resultRenameSubmit))
      .catch((err) => {
        setErrorsDesc(t(err.message));
        setDisabledButton(false);
      });
  };

  const formik = useFormik({
    onSubmit: generateOnSubmit,
    initialValues: { name: currentChannel.name },
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
      <Modal.Header closeButton onHide={handleClose}>
        <Modal.Title>{t('modals.rename.text')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <FormLabel className="visually-hidden" htmlFor="name">
            {t('modals.label')}
          </FormLabel>
          <FormControl
            required
            ref={inputRef}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.name}
            data-testid="input-body"
            name="name"
            id="name"
            placeholder={t('modals.label')}
            className="mb-2"
            isInvalid={errorsDesc}
          />
          {errorsDesc ? <Form.Text className="text-danger">{errorsDesc}</Form.Text> : null}
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
};

export default AddRename;
