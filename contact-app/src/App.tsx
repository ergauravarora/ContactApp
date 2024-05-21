import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import ContactList from './components/ContactList';
import ContactForm from './components/ContactForm';
import Signature from './components/signature/Signature';
import Preloader from './components/loader/Preloader';
import 'bootstrap/dist/css/bootstrap.min.css';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Simulate loading for 2 seconds

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Preloader />;
  }

  return (
    <Router>
      <div className="container">
        <Routes >
          <Route path="/edit/:contactId" element={<ContactForm  />} />
          <Route path="/create" element={<ContactForm />} />
          <Route path="/" element={<ContactList/>} />
        </Routes >
      </div>
      <Signature
        author="Gaurav"
        message="Contact app created for 'Deltek'"
        portfolioUrl="https://www.ergauravarora.com"
      />
    </Router>
  );
};

export default App;
