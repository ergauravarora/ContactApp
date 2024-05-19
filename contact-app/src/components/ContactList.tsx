import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { fetchContacts, deleteContact } from '../store/contactSlice';
import { Button, ListGroup, Spinner } from 'react-bootstrap';
import { ThunkDispatch } from 'redux-thunk';
import { useNavigate  } from 'react-router-dom';

const ContactList: React.FC = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const { contacts, loading, error,pageNumber,pageSize,totalCount } = useSelector((state: RootState) => state.contacts);
 
  const history = useNavigate();

  useEffect(() => {
    // Dispatching fetchContacts with dynamic pageNumber and pageSize
      dispatch(fetchContacts({ pageNumber: 1, pageSize: 5 }));
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
    <div>
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
    <div>
    <p>Page {pageNumber} of {Math.ceil(totalCount / pageSize)}</p>
   
    <Button
      variant="outline-secondary"
      disabled={pageNumber === 1}
      onClick={() => dispatch(fetchContacts({ pageNumber: pageNumber - 1, pageSize }))}
    >
      Previous
    </Button>{' '}
    <Button
      variant="outline-secondary"
      disabled={pageNumber === Math.ceil(totalCount / pageSize)}
      onClick={() => dispatch(fetchContacts({ pageNumber: pageNumber + 1, pageSize }))}
    >
      Next
    </Button>
  </div>
  </div>
  );
};

export default ContactList;
