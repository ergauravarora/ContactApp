import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact, updateContact,fetchContactById,fetchContacts } from '../store/contactSlice';
import { RootState } from '../store';
import { useNavigate, useParams } from 'react-router-dom';
import { Contact } from '../interfaces/Contact';
import { Form, Button, Spinner } from 'react-bootstrap';
import { ThunkDispatch } from 'redux-thunk';

interface ContactFormProps {
}

const ContactForm: React.FC<ContactFormProps> = () => {
  const { contactId } = useParams<{ contactId: string }>(); // Use useParams to get contactId

  const history = useNavigate();
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const contact = useSelector((state: RootState) =>
    state.contacts.contacts.find(c => c.id === Number(contactId))
  );

  const loading = useSelector((state: RootState) => state.contacts.loading);
  const [formState, setFormState] = useState({
    id: Number(contactId) || 0,
    name: '',
    email: '',
    phone: '',
    image: ''
  });

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

  // const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setFormState({
  //         ...formState,
  //         image: reader.result as string,
  //       });
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  // Helper function to convert File to Base64
const convertFileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
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
  
  if (loading) {
    return <Spinner animation="border" />;
  }
  
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="name">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={formState.name}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={formState.email}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="phone">
        <Form.Label>Phone</Form.Label>
        <Form.Control
          type="text"
          name="phone"
          value={formState.phone}
          onChange={handleChange}
        />
      </Form.Group>
      {formState.image && <img src={formState.image} alt="Contact" style={{ width: '100px', height: '100px', marginTop: '10px' }} />}
      
      <Form.Group controlId="imageBase64">
      <Form.Label>Image</Form.Label>
      <Form.Control type="file" name="imageBase64" onChange={handleImageChange} />
    </Form.Group>
      

      <Button variant="primary" type="submit">
        {contactId ? 'Update' : 'Add'} Contact
      </Button>
    </Form>
  );

  // return (
  //   <form onSubmit={handleSubmit}>
  //     <div className="form-group">
  //       <label>Name</label>
  //       <input
  //         type="text"
  //         className="form-control"
  //         value={name}
  //         onChange={(e) => setName(e.target.value)}
  //       />
  //     </div>
  //     <div className="form-group">
  //       <label>Email</label>
  //       <input
  //         type="email"
  //         className="form-control"
  //         value={email}
  //         onChange={(e) => setEmail(e.target.value)}
  //       />
  //     </div>
  //     <div className="form-group">
  //       <label>Phone</label>
  //       <input
  //         type="text"
  //         className="form-control"
  //         value={phone}
  //         onChange={(e) => setPhone(e.target.value)}
  //       />
  //     </div>
  //     <div className="form-group">
  //       <label>Image</label>
  //       <input
  //         type="file"
  //         className="form-control"
  //         onChange={handleImageChange}
  //       />
  //       {image && <img src={image} alt="Contact" style={{ width: '100px', height: '100px', marginTop: '10px' }} />}
  //     </div>
  //     <button type="submit" className="btn btn-primary">Save</button>
  //   </form>
  // );
};

export default ContactForm;
