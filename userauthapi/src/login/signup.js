// SignupForm.js

import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from "react-bootstrap/Button";
const SignupForm = () => {
  // State to manage form data
  const navigate = useNavigate()
  const [message, setMessage] = useState('')
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { fullName, email, password, confirmPassword } = formData
      const response = await axios.post('http://localhost:5000/create_user', { fullName, email, password, confirmPassword })
      // console.log(response.data)
      if (response.data.success === true) {
        setMessage(response.data.message)
        // navigate('/products')
      }
    }
    catch (error) {
      console.log(error)

    }
    console.log('Form submitted:', formData);
  };

  return (
    <body className='bg-secondary'>
    <div className='bg-secondary w-100' h-100>
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
          <Form.Label column sm="2">
            Username
          </Form.Label>
          <Col sm="10">
            <Form.Control type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}/>
          </Col>
        </Form.Group>
        <br />
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
          <Form.Label column sm="2">
            Email
          </Form.Label>
          <Col sm="10">
            <Form.Control placeholder="Example@gmail.com" type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange} />
          </Col>
        </Form.Group>
        <br />
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
          <Form.Label column sm="2">
            Password
          </Form.Label>
          <Col sm="10">
            <Form.Control type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange} placeholder="Password" />
          </Col>
        </Form.Group>
        <br />
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
        <Form.Label column sm="2">
          Password
        </Form.Label>
        <Col sm="10">
          <Form.Control type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange} placeholder="Confirm Password" />
        </Col>
      </Form.Group>
        <Button variant='secondary' type="submit">Sign Up</Button>
      </Form>
      <span>{message}</span>
      {
        message.length > 0 ? <button onClick={() => { navigate('/') }}>Sign In</button> : ""
      }
    </div>
    </body>
  );
};

export default SignupForm;
