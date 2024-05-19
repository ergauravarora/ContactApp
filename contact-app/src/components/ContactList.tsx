import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { fetchContacts, deleteContact } from '../store/contactSlice';
import { Button, ListGroup, Spinner } from 'react-bootstrap';
import { ThunkDispatch } from 'redux-thunk';
import { useNavigate  } from 'react-router-dom';

const ContactList: React.FC = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const { contacts, loading, error } = useSelector((state: RootState) => state.contacts);
 
  const history = useNavigate();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleDelete = (id: number) => {
    dispatch(deleteContact(id));
  };

  if (loading) {
    return <Spinner animation="border" />;
  }

  const handleEdit = (id: number) => {
    history(`/edit/${id}`);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <ListGroup>
      {contacts.map(contact => (
        <ListGroup.Item key={contact.id}>
          <div>
            <strong>{contact.name}</strong>
            <p>{contact.email}</p>
            <p>{contact.phone}</p>
            {contact.image && <img src={contact.image} alt="Contact" style={{ width: '100px', height: '100px', marginTop: '10px' }} />}
     
          </div>
         
          <Button variant="primary" onClick={() => handleEdit(contact.id)}>Edit</Button>
          <Button variant="danger" onClick={() => handleDelete(contact.id)}>
            Delete
          </Button>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default ContactList;
