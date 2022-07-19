import { Form, Button, InputGroup } from "react-bootstrap";
import { ArrowRightSquare } from 'react-bootstrap-icons';
import { useFormik } from 'formik';
import { useDispatch, useSelector, useEffect } from "react-redux";

const MessagesFooter = () => {
  const initialValues = {message: ''};
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      //dispatch();
    }
  });
  const {values, handleSubmit, handleChange} = formik;
  return (
    <div className='mt-auto px-5 py-3'>
      <Form onSubmit={handleSubmit} className='py-0 rounded-2 border'>
        <InputGroup className="mb-0">
          <Form.Control
            placeholder="Введите сообщение..."
            name='message'
            className='border-0'
            value={values.message}
            onChange={handleChange}
          />
          <Button type='submit' variant="link" disabled={ !values.message.length > 0 }>
          <ArrowRightSquare size={20} />
          </Button>
          
        </InputGroup>
      </Form>
    </div>    
  );
}

export default MessagesFooter;