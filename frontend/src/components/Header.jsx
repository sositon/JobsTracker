import React, { useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Home, LogOutIcon } from 'lucide-react';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';
import { useAppContext } from '../AppContext';

const Header = () => {
  const { isLoggedIn, logout } = useAppContext();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const onLoginClick = () => {
    if (isLoggedIn) {
      logout();
    } else {
      setShowLoginModal(true);
    }
  };

  const loginModalClose = () => {
    setShowLoginModal(false);
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