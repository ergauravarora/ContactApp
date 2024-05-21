import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact, updateContact, fetchContactById, fetchContacts } from '../store/contactSlice';
import { RootState } from '../store';
import { useNavigate, useParams } from 'react-router-dom';
import { Contact } from '../interfaces/Contact';
import { Form, Button, Spinner } from 'react-bootstrap';
import { ThunkDispatch } from 'redux-thunk';
import { FaPlus, FaEdit, FaTrash, FaAngleDown, FaAngleUp, FaArrowLeft, FaArrowRight } from 'react-icons/fa'; // Import Font Awesome icons

interface ContactFormProps {}

const ContactForm: React.FC<ContactFormProps> = () => {
  const { contactId } = useParams<{ contactId: string }>(); // Use useParams to get contactId

  const history = useNavigate();
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const contact = useSelector((state: RootState) =>
    state.contacts.contacts.find((c) => c.id === Number(contactId))
  );

  const loading = useSelector((state: RootState) => state.contacts.loading);
  const [formState, setFormState] = useState<Contact>({
    id: Number(contactId) || 0,
    name: '',
    email: '',
    phone: '',
    image: '',
    contactDetail: {
      contactId: 0,
      address: '',
      pincode: '',
      country: '',
    },
  });

  

  const [step, setStep] = useState(1);

  useEffect(() => {
    if (contactId) {
      dispatch(fetchContactById(Number(contactId)));
    }
  }, [dispatch, contactId]);

  useEffect(() => {
    if (contact) {
      setFormState(contact);
    }
  }, [contact]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      if (files[0]) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormState({
            ...formState,
            image: reader.result as string,
          });
        };
        reader.readAsDataURL(files[0]);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };
  const handleChangeNested = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    debugger
    setFormState((prevState) => ({
      ...prevState,
      contactDetail: {
        ...prevState.contactDetail,
        [name]: value,
      },
    }));
  };
  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (contactId) {
      dispatch(updateContact(formState));
    } else {
      dispatch(addContact(formState));
    }
    history(`/`);
  };

  const handleCancel = () => {
    history(`/`);
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  if (loading) {
    return <Spinner animation="border" />;
  }

  return (
    <Form onSubmit={handleSubmit}>
      {step === 1 && (
        <>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" name="name" value={formState.name} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" name="email" value={formState.email} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="phone">
            <Form.Label>Phone</Form.Label>
            <Form.Control type="text" name="phone" value={formState.phone} onChange={handleChange} />
          </Form.Group>
          <Button variant="primary" onClick={nextStep}>
            Next <FaArrowRight />
          </Button>
          <Button variant="secondary" onClick={handleCancel}>
            <FaArrowLeft /> Cancel
          </Button>
        </>
      )}

      {step === 2 && (
        <>
          <Form.Group controlId="imageBase64">
            <Form.Label>Image</Form.Label>
            <Form.Control type="file" name="imageBase64" onChange={handleImageChange} />
          </Form.Group>
          {formState.image && (
            <img
              src={formState.image}
              alt="Contact"
              style={{ width: '100px', height: '100px', marginTop: '10px' }}
            />
          )}
          <Form.Group controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control type="text" name="address" value={formState.contactDetail.address} onChange={handleChangeNested} />
          </Form.Group>
          <Form.Group controlId="pincode">
            <Form.Label>Pincode</Form.Label>
            <Form.Control type="text" name="pincode" value={formState.contactDetail.pincode} onChange={handleChangeNested} />
          </Form.Group>
          <Form.Group controlId="country">
            <Form.Label>Country</Form.Label>
            <Form.Control type="text" name="country" value={formState.contactDetail.country} onChange={handleChangeNested} />
          </Form.Group>
          <Button variant="primary" onClick={prevStep}>
            <FaArrowLeft /> Previous
          </Button>{' '}
          <Button variant="primary" type="submit">
            {contactId ? 'Update' : 'Add'} Contact
          </Button>
          <Button variant="secondary" onClick={handleCancel}>
            <FaArrowLeft /> Cancel
          </Button>
        </>
      )}
    </Form>
  );
};

export default ContactForm;
