import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { useAppContext } from '../AppContext';
import { Mail, Lock } from 'lucide-react';

const LoginModal = ({ show, handleClose, toggleToRegister }) => {
  const { login } = useAppContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); 
    setError('');
    try {
      await login(email, password);
      handleClose();
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    }
    setLoading(false);
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton className="border-b-0">
        <Modal.Title className="text-2xl font-bold text-primary">Login</Modal.Title>
      </Modal.Header>
      <Modal.Body className="px-4 py-5">
        {/* Error message display */}
        {error && <Alert variant="danger" className="mb-4">{error}</Alert>}
        
        {/* Login form */}
        <Form onSubmit={handleLogin}>
          
          {/* Email field */}
          <Form.Group className="mb-4 relative" controlId="formBasicEmail">
            <Form.Label className="text-gray-700">Email address</Form.Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="pl-10 py-2 border-gray-300 focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
              />
            </div>
          </Form.Group>

          {/* Password field */}
          <Form.Group className="mb-4 relative" controlId="formBasicPassword">
            <Form.Label className="text-gray-700">Password</Form.Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="pl-10 py-2 border-gray-300 focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
              />
            </div>
          </Form.Group>

          {/* Submit button */}
          <Button
            variant="primary"
            type="submit"
            className="w-full py-2 text-white bg-primary hover:bg-primary-dark transition-colors duration-300"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </Button>

          {/* Register link */}
          <div className="text-center mt-4">
            <span className="text-gray-600">Don't have an account? </span>
            <Button variant="link" className="p-0 text-primary hover:text-primary-dark" onClick={toggleToRegister}>
              Register here
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;