import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { fetchContacts, deleteContact } from '../store/contactSlice';
import { Button, Form, Card, Spinner, Row, Col, Pagination } from 'react-bootstrap';
import { ThunkDispatch } from 'redux-thunk';
import { useNavigate } from 'react-router-dom';
import './styles.css'; // Import the CSS file

const ContactList: React.FC = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const { contacts, loading, error, pageNumber, pageSize, totalCount } = useSelector((state: RootState) => state.contacts);

  const [searchQuery, setSearchQuery] = useState('');

  const history = useNavigate();

  useEffect(() => {
    dispatch(fetchContacts({ pageNumber: pageNumber, pageSize: pageSize, searchQuery }));
  }, [dispatch]);

  const handleDelete = (id: number) => {
    dispatch(deleteContact(id));
  };

  if (loading) {
    return <Spinner animation="border" />;
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    dispatch(fetchContacts({ pageNumber: 1, pageSize, searchQuery: query }));
  };

  const handleEdit = (id: number) => {
    history(`/edit/${id}`);
  };

  const handleAdd = () => {
    history(`/create`);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div className="mb-3 d-flex justify-content-between align-items-center search-container">
        <Form.Group controlId="searchBox" className="mb-0">
          <Form.Control
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearch}
          />
        </Form.Group>
        <Button variant="primary" className="floating-btn" onClick={handleAdd}>+</Button>
      </div>

      <Row xs={1} md={2} lg={3} xl={4} className="g-4">
        {contacts.map(contact => (
          <Col key={contact.id}>
            <Card style={{ marginBottom: '20px' }}>
            <Card.Body>
              <div style={{ textAlign: 'center', marginBottom: '10px' }}>
                <img src={contact.image} alt="Profile" style={{ width: '80px', height: '80px', borderRadius: '50%', border: '2px solid #fff' }} />
              </div>
              <Card.Title>Contact Information</Card.Title>
              <div className="contact-info">
                <div className="info-label">Name:</div>
                <div>{contact.name}</div>
              </div>
              <div className="contact-info">
                <div className="info-label">Email:</div>
                <div>{contact.email}</div>
              </div>
              <div className="contact-info">
                <div className="info-label">Phone:</div>
                <div>{contact.phone}</div>
              </div>
              <div className="button-group">
                <Button variant="primary" onClick={() => handleEdit(contact.id)}>
                  <span>Edit</span>
                </Button>
                <Button variant="danger" onClick={() => handleDelete(contact.id)}>
                  <span>Delete</span>
                </Button>
              </div>
            </Card.Body>

            </Card>
          </Col>
        ))}
      </Row>

      <div className="d-flex justify-content-center">
        <Pagination>
          <Pagination.Prev disabled={pageNumber === 1} onClick={() => dispatch(fetchContacts({ pageNumber: pageNumber - 1, pageSize, searchQuery }))} />
          <Pagination.Item disabled>{`Page ${pageNumber} of ${Math.ceil(totalCount / pageSize)}`}</Pagination.Item>
          <Pagination.Next disabled={pageNumber === Math.ceil(totalCount / pageSize)} onClick={() => dispatch(fetchContacts({ pageNumber: pageNumber + 1, pageSize, searchQuery }))} />
        </Pagination>
      </div>
    </div>
  );
};

export default ContactList;
