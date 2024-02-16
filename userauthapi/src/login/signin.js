// SigninForm.js
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from "react-bootstrap/Button";
import './style/style.css';
import image from '../../src/images/signin-image.jpg'
const SigninForm = () => {
    const navigate = useNavigate();
    // State to manage form data
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [signin, setSignin] = useState(false);

    // Handle form field changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate('/products')
        }
    })
    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { email, password } = formData;
            const response = await axios.post("http://localhost:5000/sign_in", {
                email,
                password
            });
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
            }
            setSignin(true);
            console.log(response.data);
            navigate('/products');
        }
        catch (error) {
            console.log(error);
        }
        console.log("Form submitted:", formData);
    };

    return (
        <div className="row bg-secondary singinpage" >
            <div className="col-2 signinImg">
                <img width='130%' height='200%' src={image} />
            </div>
            <div className="signInB col-3">
                <h2 className="fw-bold fs-1 custom-heading ">Sign In</h2>
                {localStorage.getItem('token') ? navigate('/products') : <><Form onSubmit={handleSubmit}>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                        <Form.Label className="elabel" column sm="2">
                            Email
                        </Form.Label>
                        <br />
                        <Col sm="10">
                            <Form.Control placeholder="Email" type="email" className=""
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                        <Form.Label column sm="2">
                            Password
                        </Form.Label>
                        <br />
                        <Col sm="10">
                            <Form.Control type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange} placeholder="Password" />
                        </Col>
                    </Form.Group>
                    <br />
                    <Button variant="secondary mx-auto d-block " type="submit">Sign In</Button>
                </Form>
                    <br />
                    <Button variant="secondary" className="me-5" onClick={() => navigate('/signup')} >signUp</Button>
                    <Button variant="secondary" onClick={() => navigate('/forgetPass')}>Forget Password</Button></>}
            </div>

        </div>
    );
};

export default SigninForm;







