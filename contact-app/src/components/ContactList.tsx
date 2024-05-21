import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { fetchContacts, deleteContact } from '../store/contactSlice';
import { Button, Form, Card, Spinner, Row, Col, Pagination, Modal } from 'react-bootstrap';
import { ThunkDispatch } from 'redux-thunk';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaEdit, FaTrash, FaAngleDown, FaAngleUp } from 'react-icons/fa';
import './styles.css';
import { Contact } from '../interfaces/Contact';

const ContactList: React.FC = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const { contacts, loading, error, pageNumber, pageSize, totalCount } = useSelector((state: RootState) => state.contacts);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContactId, setSelectedContactId] = useState<number | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [contactToDelete, setContactToDelete] = useState<number | null>(null);

  const history = useNavigate();

  useEffect(() => {
    dispatch(fetchContacts({ pageNumber: pageNumber, pageSize: pageSize, searchQuery }));
  }, [dispatch]);

  const handleDelete = (id: number) => {
    setContactToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (contactToDelete !== null) {
      dispatch(deleteContact(contactToDelete));
      setShowDeleteModal(false);
    }
  };

  const handleToggleDetail = (id: number) => {
    setSelectedContactId(id === selectedContactId ? null : id);
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
        <Button variant="primary" className="floating-btn" onClick={handleAdd}><FaPlus /></Button>
      </div>

      <Row xs={1} md={2} lg={3} xl={4} className="g-4">
        {contacts.map((contact: Contact) => (
          <Col key={contact.id}>
            <Card style={{ marginBottom: '20px', position: 'relative' }}>
              <div style={{ position: 'absolute', top: '5px', right: '5px', cursor: 'pointer' }} onClick={() => handleToggleDetail(contact.id)}>
                {selectedContactId === contact.id ? <FaAngleUp /> : <FaAngleDown />}
              </div>
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
                  <Button variant="primary" onClick={() => handleEdit(contact.id)}><FaEdit /></Button>
                  <Button variant="danger" onClick={() => handleDelete(contact.id)}><FaTrash /></Button>
                </div>
                {selectedContactId === contact.id && (
                  <div>
                    <div className="contact-info">
                      <div className="info-label">Address:</div>
                      <div>{contact.contactDetail.address}</div>
                    </div>
                    <div className="contact-info">
                      <div className="info-label">Pincode:</div>
                      <div>{contact.contactDetail.pincode}</div>
                    </div>
                    <div className="contact-info">
                      <div className="info-label">Country:</div>
                      <div>{contact.contactDetail.country}</div>
                    </div>
                  </div>
                )}
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

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this contact?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
          <Button variant="danger" onClick={confirmDelete}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ContactList;
