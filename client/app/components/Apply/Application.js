import React, { Component } from 'react';
import { Container, Row, Col, Form, FormControl, Button, Dropdown, DropdownButton } from 'react-bootstrap'
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';

class Application extends Component {
    constructor(props) {
        super(props);
        this.state = {
            number: '',
            name: '',
            expiry: '',
            cvc: '',
            issuer: '',
            focused: '',
            formData: null,
        };
    }

    handleCallback = ({ issuer }, isValid) => {
        console.log("here")
        if (isValid) {
            this.setState({ issuer });
        }
    };

    change = e => {
        console.log(this.state.number)
        console.log(this.state.issuer)
        if (e.target.name === 'number') {
            e.target.value = e.target.value;
        }
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    render() {
        const { name, number, expiry, cvc, focused, issuer } = this.state;

        return (
            <Container>
                <Row className="mt-5 justify-content-center">
                    <h2>BidBuySell</h2>
                </Row>
                <Row className="justify-content-center">
                    <h5>Register a new account</h5>
                </Row>
                <Row className="mt-5">
                    <Col>
                        <h5>Account Info</h5>
                        <Form>
                            <Form.Group controlId="formGroupName">
                                <Form.Label>Name</Form.Label>
                                <Row>
                                    <Col>
                                        <Form.Control placeholder="First name" />
                                    </Col>
                                    <Col>
                                        <Form.Control placeholder="Last name" />
                                    </Col>
                                </Row>

                            </Form.Group>
                            <Form.Group controlId="formGroupEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" />
                            </Form.Group>
                            <Form.Group controlId="formGroupUsername">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" placeholder="Username" />
                            </Form.Group>
                            <Form.Group controlId="formGroupUsername">
                                <Form.Label>Address</Form.Label>
                                <Form.Control type="text" placeholder="Address" />
                            </Form.Group>
                            <Row>
                                <Col>
                                    <Form.Group controlId="formGroupName">
                                        <Form.Label>City</Form.Label>
                                        <Form.Control placeholder="City" />
                                    </Form.Group>

                                </Col>
                                <Col>
                                    <Form.Group controlId="exampleForm.ControlSelect1">
                                        <Form.Label>State</Form.Label>
                                        <Form.Control as="select">
                                            <option>1</option>
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
                                        <Form.Control placeholder="Zip Code" />
                                    </Form.Group>

                                </Col>
                                <Col>

                                </Col>
                            </Row>

                        </Form>
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
                                <Form.Control name="number" type="text" placeholder="Card Number" onChange={this.change} />
                            </Form.Group>

                            <Form.Group controlId="formGroupNumber">
                                <Form.Label>Full Name</Form.Label>
                                <Form.Control name="number" type="text" placeholder="Full Name" onChange={this.change} />
                            </Form.Group>

                            <Row>
                                <Col>                           
                                <Form.Group controlId="formGroupName">
                                    <Form.Label>Expiration</Form.Label>
                                    <Form.Control placeholder="00/00" />
                                </Form.Group>

                                </Col>
                                <Col>
                                <Form.Group controlId="formGroupName">
                                    <Form.Label>CVC</Form.Label>
                                    <Form.Control placeholder="CVC" />
                                </Form.Group>
                                </Col>
                            </Row>

                            <input type="hidden" name="issuer" value={issuer} />

                    


                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Button style={{ marginLeft: '5px' }} variant="primary">Submit Application</Button>
                </Row>
                



            </Container>

        );
    }
}

export default Application; 