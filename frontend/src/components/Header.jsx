import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Home, LogOutIcon } from 'lucide-react';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';
import axios from 'axios';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/auth/me`)
      .then((response) => {
        if (response.status === 200) {
          setIsLoggedIn(true);
        }
      })
      .catch((err) => {
        if (err.response?.status === 401) {
          console.log('User is not logged in');
        }
      });
  }, []);

  const onLoginClick = () => {
    if (isLoggedIn) {
      handleLogout();
    } else {
      setShowLoginModal(true);
    }
  };

  const loginModalClose = (response) => { 
    if (response?.status === 200) {
      setIsLoggedIn(true);
    }
    setShowLoginModal(false);
  };

  const handleLogout = () => {
    axios.post(`${process.env.REACT_APP_API_URL}/auth/logout`)
      .then((response) => {
        if (response.status === 200) {
          setIsLoggedIn(false);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <Navbar bg="light" expand="lg" className="shadow-sm">
        <Container>
          <Navbar.Brand href="/" className="d-flex align-items-center">
            <Home className="me-2" size={24} />
            <span className="fw-bold">Jobs Tracker</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Nav>
            <Nav.Link onClick={onLoginClick} className="btn btn-outline-primary me-2">
              {isLoggedIn ? <LogOutIcon className='me-2' size={24}/> : "Login"}
            </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <LoginModal show={showLoginModal} handleClose={loginModalClose} toggleToRegister={() => {
        setShowLoginModal(false); 
        setShowRegisterModal(true);
      }}/>

      <RegisterModal show={showRegisterModal} handleClose={() => setShowRegisterModal(false)} toggleToLogin={() => {
        setShowRegisterModal(false); 
        setShowLoginModal(true);
      }}/>
    </>
  );
};

export default Header;