import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FaInfoCircle } from 'react-icons/fa'; // Import the info icon
import './Signature.css';

interface SignatureProps {
  author: string;
  message: string;
  portfolioUrl?: string;
}

const Signature: React.FC<SignatureProps> = ({ author, message, portfolioUrl }) => {
  const [show, setShow] = useState(false);
  const [highlight, setHighlight] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHighlight(false);
    }, 3000); // Highlight for 3 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <>
      <Button
        className={`signature-button ${highlight ? 'highlight' : ''}`}
        onClick={handleShow}
      >
        <FaInfoCircle /> {/* Use the info icon instead of text */}
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>About the Developer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{message} - <strong>{author}</strong></p>
          {portfolioUrl && (
            <p>
              Check out my other projects at{' '}
              <a href={portfolioUrl} target="_blank" rel="noopener noreferrer">
                my portfolio
              </a>
            </p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Signature;
