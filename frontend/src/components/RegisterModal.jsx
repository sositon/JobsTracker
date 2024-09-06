import React, { useState } from 'react';
import { Modal, Button, Form, Alert, Spinner } from 'react-bootstrap';
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
        "user_name": username,
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
        <Modal.Title>Register</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleRegister}>

          <Form.Group className='mb-3' controlId='formBasicUsername'>
            <Form.Label>Username</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </Form.Group>
        
          <Button variant="primary" type="submit" className="w-100" disabled={loading}>
            {loading ? <Spinner animation="border" size="sm" /> : 'Register'}
          </Button>
        
        <Form.Text className="text-center mt-3">
          Already have an account?{' '}
          <span
            style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
            onClick={toggleToLogin}
          >
            Log in
          </span>
        </Form.Text>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RegisterModal;
