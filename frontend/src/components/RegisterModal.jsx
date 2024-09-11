import React, { useState } from 'react';
import { Modal, Button, Form, Alert, Spinner } from 'react-bootstrap';
import { Mail, Lock, User } from 'lucide-react';
import axios from 'axios';

const RegisterModal = ({ show, handleClose, toggleToLogin }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Basic input validation
    if (!email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, {
        user_name: username,
        email,
        password,
      });
      console.log(response.data);
      setLoading(false);
      handleClose(response);  // You can also redirect after registration
    } catch (err) {
      setLoading(false);
      setError(err?.response?.data?.msg || 'Registration failed. Please try again.');
      console.error(err);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className="text-2xl font-bold text-primary">Register</Modal.Title>
      </Modal.Header>
      <Modal.Body className="px-4 py-5">
        {error && <Alert variant="danger" className="mb-4">{error}</Alert>}

        <Form onSubmit={handleRegister}>

          {/* Username field */}
          <Form.Group className="mb-4 relative" controlId="formBasicUsername">
            <Form.Label className="text-gray-700">Username</Form.Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="pl-10 py-2 border-gray-300 focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
              />
            </div>
          </Form.Group>

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

          {/* Confirm Password field */}
          <Form.Group className="mb-4 relative" controlId="formBasicConfirmPassword">
            <Form.Label className="text-gray-700">Confirm Password</Form.Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Form.Control
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="pl-10 py-2 border-gray-300 focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
              />
            </div>
          </Form.Group>

          {/* Submit button */}
          <Button variant="primary" type="submit" className="w-full py-2 text-white bg-primary hover:bg-primary-dark transition-colors duration-300" disabled={loading}>
            {loading ? <Spinner animation="border" size="sm" /> : 'Register'}
          </Button>

          {/* Toggle to Login link */}
          <div className="text-center mt-4">
            <span className="text-gray-600">Already have an account? </span>
            <Button variant="link" className="p-0 text-primary hover:text-primary-dark" onClick={toggleToLogin}>
              Log in
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>

  );
};

export default RegisterModal;