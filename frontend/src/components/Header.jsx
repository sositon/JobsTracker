import React, { useState } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Home, LogOut, LogIn } from 'lucide-react';
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

  return (
    <>
      <Navbar bg="light" expand="lg" className="shadow-sm">
        <Container>
          <Navbar.Brand href="/" className="d-flex align-items-center">
            <Home className="text-primary me-2" size={24} />
            <span className="font-bold text-xl text-primary">Jobs Tracker</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Nav>
              <Button
                variant={isLoggedIn ? "outline-danger" : "outline-primary"}
                onClick={onLoginClick}
                className="d-flex align-items-center transition-all duration-300 ease-in-out hover:scale-105"
              >
                {isLoggedIn ? (
                  <>
                    <LogOut className="me-2" size={18} />
                    Logout
                  </>
                ) : (
                  <>
                    <LogIn className="me-2" size={18} />
                    Login
                  </>
                )}
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <LoginModal
        show={showLoginModal}
        handleClose={() => setShowLoginModal(false)}
        toggleToRegister={() => {
          setShowLoginModal(false);
          setShowRegisterModal(true);
        }}
      />

      <RegisterModal
        show={showRegisterModal}
        handleClose={() => setShowRegisterModal(false)}
        toggleToLogin={() => {
          setShowRegisterModal(false);
          setShowLoginModal(true);
        }}
      />
    </>
  );
};

export default Header;