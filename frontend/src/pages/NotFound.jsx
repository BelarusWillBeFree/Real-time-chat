import React from 'react';
import { Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import notfoundImg from '../assets/img/notfound.svg';

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <Container fluid className="h-100">
      <div className="text-center">
        <img className="img-fluid h-25" src={notfoundImg} alt="notfound" style={{ width: 300 }} />
        <h1 className="h4 text-muted">{ t('notFound.header') }</h1>
        <p className="text-muted">
          { t('notFound.message') }
          {' '}
          <a href="/">
            { t('notFound.linkText') }
          </a>
        </p>
      </div>
    </Container>
  );
};

export default NotFound;
