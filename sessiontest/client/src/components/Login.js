import React, { Component } from 'react'
import axios from 'axios'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import './css/login.css'

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
        user: '',
        password: ''
        }
    }

    change = e => {
        this.setState({
            [e.target.name]: e.target.value 
        })
    }

    submit = e => {
        e.preventDefault();
        axios.post('/login', {
            username: this.state.user,
            password: this.state.password
        }).then(res => {
            console.log(res)
            localStorage.setItem('cool-jwt', res.data.token); 
            this.props.history.push('/Protected')
        })
    }
    

    render() {
        const {
            user,
            password
          } = this.state;

        return (
            <div class="login-box">
            <Form onSubmit={this.submit} className="login-form">
            <h2>Log in</h2>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Enter username" name ="user" onChange={this.change} value={user}  />
            </Form.Group>
          
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" name="password" onChange={this.change} value={password} />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
          </div>
        )
    }
}

export default Login; 