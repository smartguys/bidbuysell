import React, { Component } from 'react'
import axios from 'axios'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Row, Col, Alert, Container } from 'react-bootstrap'
import '../../styles/login.css'
import { Link } from 'react-router-dom';


class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: '',
      password: '',
      loginAlert: false,
      loginAlertMessage: '',
      loginAlertVariant: ''
    }
  }

  change = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  submit = e => {
    e.preventDefault();
    axios.post('/api/account/signin', {
      userName: this.state.userName,
      password: this.state.password
    }).then(res => {
      switch (res.data.success) {
        case false:
          this.setState({
            loginAlert: true,
            loginAlertMessage: res.data.message,
            loginAlertVariant: 'danger'
          })
          break;
        case true:
          localStorage.setItem('cool-jwt', res.data.token);
          this.setState({
            loginAlert: true,
            loginAlertMessage: res.data.message,
            loginAlertVariant: 'success'
          })
          this.props.history.push('/myaccount')
          break;
      }
    })
  }

  render() {
    const {
      userName,
      password,
      loginAlert,
      loginAlertMessage,
      loginAlertVariant
    } = this.state;

    const handleHide = () => this.setState({ loginAlert: false })

    return (
      <Container>
        <div className="login-box">
          <Form onSubmit={this.submit} className="login-form">
            <h2>Log in</h2>
            <Alert onClose={handleHide} show={loginAlert} dismissible variant={loginAlertVariant}>
                {loginAlertMessage}
            </Alert>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Enter username" name="userName" onChange={this.change} />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" name="password" onChange={this.change} />
            </Form.Group>
            <Button className="mb-3" variant="primary" type="submit">
              Submit
            </Button>

            <h5>Don't have an account? Submit an sapplication!</h5>
            <Link to="/apply"><Button variant="primary" type="submit">
              Apply
            </Button></Link>

          </Form>
        </div>
      </Container>
    )
  }
}

export default Login; 