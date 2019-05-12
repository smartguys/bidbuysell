import React, { Component } from 'react'
// import axios from 'axios'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Row, Col } from 'react-bootstrap'
import '../../styles/login.css'
import { Link } from 'react-router-dom';


class Login extends Component {
    render() {
        return (
            <div className="login-box">
            <Form className="login-form">
            <h2>Log in</h2>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Enter username" name ="user" />
            </Form.Group>
          
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" name="password" />
            </Form.Group>
            <Button className="mb-3" variant="primary" type="submit">
              Submit
            </Button>
            
            <h5>Don't have an account? Submit an application!</h5>
                <Link to="/apply"><Button variant="primary" type="submit">
              Apply
            </Button></Link>
        
          </Form>
          </div>
        )
    }
}

export default Login; 