import React, { Component } from 'react';
import { Container, Row, Col, Form, FormControl, Button, Dropdown, DropdownButton, Alert } from 'react-bootstrap'
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import axios from 'axios'
// import Confirmation from './Confirmation'

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName:'',
            email:'',
            userName: '',
            street: '',
            city: '',
            state: '',
            zip: '',
            phone: '',
            name: '',
            number: '',
            expiry: '',
            cvc: '',
            issuer: '',
            focused: '',
            formData: null,
            applyAlert: false,
            applyAlertMessage: '',
            applyAlertVariant: '',
            submitted: false
        };
    }

    componentDidMount() {
        // console.log(this.props)
        axios.get('/api/account/get/username/'+ this.props.userId).then(res => {
            switch (res.data.success) {
                case true:
                    const user = res.data.data
                    console.log('user')
                    console.log(user)
                    this.setState({
                        // user: res.data.data,
                        email: user.email,
                        userName: user.userName,
                        phone: user.phone,
                        street: user.street,
                        city: user.city,
                        state: user.state,
                        zip: user.zip,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        creditCard: user.creditCard
                    })
                    break;
                case false:
                    // console.log(res.data.message);
                    break;
            }
        })
    }

    handleCallback = ({ issuer }, isValid) => {
        console.log("here")
        if (isValid) {
            this.setState({ issuer });
        }
    };

    change = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submit = e => {
        e.preventDefault();
        axios.post('/api/account/apply', {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            userName: this.state.userName,
            address: {
            street: this.state.street,
            city: this.state.city,
            state: this.state.state,
            zip: this.state.zip,
            },
            creditCard: this.state.number,
            phone: this.state.phone
        }).then(res => {
            switch (res.data.success) {
                case false:
                  this.setState({
                    applyAlert: true,
                    applyAlertMessage: res.data.message,
                    applyAlertVariant: 'danger'
                  })
                  break;
                case true:
                  localStorage.setItem('cool-jwt', res.data.token);
                  this.setState({
                    applyAlert: true,
                    applyAlertMessage: res.data.message,
                    applyAlertVariant: 'success',
                    submitted: true
                  })
                  break;
              }
        })
      }


    render() {
        let { firstName, lastName, email, userName, 
            street, city, state, zip, phone, name, number, expiry, cvc, focused, issuer,applyAlert,
            applyAlertMessage,
            applyAlertVariant, submitted } = this.state;
        
        const handleHide = () => this.setState({ applyAlert: false })

        if (submitted) {   
            return (
                // <Confirmation firstName={firstName}></Confirmation>
                <div>updated!</div>
            )
        }

        // console.log(this.state.user)
        // const user = this.state.user


        //                 ? this.state.user
        //                 : {}
        console.log('state')
        console.log(this.state)
        return (
            <Container>
                <Row className="mt-5 justify-content-center">
                    <h2>BidBuySell</h2>
                </Row>
                <Row className="justify-content-center">
                    <h5>Register a new account</h5>
                </Row>
                <Alert onClose={handleHide} show={applyAlert} dismissible variant={applyAlertVariant}>
                {applyAlertMessage}
                </Alert>
                <Form onSubmit={this.submit}>
                <Row className="mt-5">
                    <Col>
                        <h5>Account Info</h5>
                            <Form.Group controlId="formGroupName">
                                <Form.Label>Name</Form.Label>
                                <Row>
                                    <Col>
                                        <Form.Control onChange={this.change} name="firstName" defaultValue={this.state.firstName} />
                                    </Col>
                                    <Col>
                                        <Form.Control  onChange={this.change} name="lastName" defaultValue={this.state.lastName} />
                                    </Col>
                                </Row>

                            </Form.Group>
                            <Form.Group controlId="formGroupEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control  onChange={this.change} name="email" type="email" defaultValue={this.state.email} />
                            </Form.Group>
                            <Form.Group controlId="formGroupUsername">
                                <Form.Label>Username</Form.Label>
                                <Form.Control onChange={this.change} name="userName" type="text" defaultValue={this.state.userName} />
                            </Form.Group>
                            <Form.Group controlId="formGroupPhone">
                                <Form.Label>Phone</Form.Label>
                                <Form.Control onChange={this.change} name="phone" type="number" defaultValue={this.state.phone} />
                            </Form.Group>
                            <Form.Group controlId="formGroupUsername">
                                <Form.Label>Address</Form.Label>
                                <Form.Control onChange={this.change} name="street" type="text" defaultValue={this.state.street} />
                            </Form.Group>
                            <Row>
                                <Col>
                                    <Form.Group controlId="formGroupName">
                                        <Form.Label>City</Form.Label>
                                        <Form.Control onChange={this.change} name="city" defaultValue={this.state.city} />
                                    </Form.Group>

                                </Col>
                                <Col>
                                    <Form.Group controlId="exampleForm.ControlSelect1">
                                        <Form.Label>State</Form.Label>
                                        <Form.Control onChange={this.change} name="state" as="select" defaultValue={this.state.state}>
                                            <option>NY</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group controlId="formGroupZip">
                                        <Form.Label>Zip Code</Form.Label>
                                        <Form.Control onChange={this.change} name="zip" defaultValue={this.state.zip} />
                                    </Form.Group>

                                </Col>
                                <Col>

                                </Col>
                            </Row>

                    </Col>
                    <Col>
                        <h5>Payment Details</h5>
                        <Row>
                            <Cards
                                number={number}
                                name={name}
                                expiry={expiry}
                                cvc={cvc}
                                focused={focused}
                                callback={this.handleCallback}
                            />
                        </Row>
                            <Form.Group controlId="formGroupNumber">
                                <Form.Label>Credit Card Number</Form.Label>
                                <Form.Control name="number" type="text" defaultValue={this.state.creditCard} onChange={this.change} />
                            </Form.Group>

                            <Form.Group controlId="formGroupNumber">
                                <Form.Label>Full Name</Form.Label>
                                <Form.Control name="name" type="text" placeholder="Full Name" onChange={this.change}/>
                            </Form.Group>

                            <Row>
                                <Col>                           
                                <Form.Group controlId="formGroupName">
                                    <Form.Label>Expiration</Form.Label>
                                    <Form.Control onChange={this.change} name="expiry" placeholder="00/00" />
                                </Form.Group>

                                </Col>
                                <Col>
                                <Form.Group controlId="formGroupName">
                                    <Form.Label>CVC</Form.Label>
                                    <Form.Control onChange={this.change} name="cvc" placeholder="CVC" />
                                </Form.Group>
                                </Col>
                            </Row>

                            <input type="hidden" name="issuer" value={issuer} />

                    


                    </Col>
                </Row>
                
                <Row className="justify-content-center">
                    <Button type="submit"  style={{ marginLeft: '5px' }} variant="primary">Submit Updates</Button>
                </Row>
                </Form>
                



            </Container>

        );
    }
}

export default Profile; 