import { useFormik } from 'formik';
import React, { useRef, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Modal, FormControl, Form, Container, FormLabel,
} from 'react-bootstrap';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { selectors } from '../../slices/channelsSlice';

function AddRename(props) {
  const { onHide, modalInfo } = props;
  const channels = useSelector((state) => selectors.selectEntities(state));
  const namesChannels = Object.values(channels).map((channel) => channel.name);
  const { t } = useTranslation();
  const [errorsDesc, setErrorsDesc] = useState('');
  const [disabledButton, setDisabledButton] = useState(false);
  const notify = () => toast.success(t('channels.toast.rename'));
  const notifyError = () => toast.error(t('errors.unknown'));

  const currentChannel = useSelector((state) => selectors.selectById(state, modalInfo.id));
  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .required(t('validation.required', { name: 'Имя' }))
      .min(2, t('validation.sizeFromTo', { from: 3, to: 20 }))
      .max(20, t('validation.sizeFromTo', { from: 3, to: 20 }))
      .notOneOf(namesChannels, t('validation.unique')),
  });
  const successSubmit = ({ status }) => {
    if (status === 'ok') {
      notify();
      onHide();
    } else {
      notifyError();
      setDisabledButton(false);
    }
  };
  const generateOnSubmit = ({ action }) => (values) => {
    setDisabledButton(true);
    validationSchema
      .validate(values)
      .then(() => action[modalInfo.type]({ name: values.name, id: modalInfo.id }, successSubmit))
      .catch((err) => {
        setErrorsDesc(err.message);
        setDisabledButton(false);
      });
  };

  const formik = useFormik({
    onSubmit: generateOnSubmit(props),
    initialValues: { name: currentChannel.name },
  });
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleClose = () => {
    onHide();
  };

  const {
    handleSubmit, handleChange, handleBlur, values,
  } = formik;
  return (
    <Modal show centered>
      <Modal.Header closeButton onHide={onHide}>
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
}

export default AddRename;
