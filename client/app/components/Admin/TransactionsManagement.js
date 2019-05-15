import React, { Component } from 'react';
import {Container, Col, Row, Button, InputGroup, Form, FormControl } from 'react-bootstrap'

class TransactionsManagement extends Component {
    render() {
        return (
            <Container>
                <Row>
                    <h3>Transaction History</h3>
                </Row>

                <Row>
                    <Form>
                        <Form.Group as={Row}>
                            <Form.Label column sm="2">
                                User:
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control />
                            </Col>
                        </Form.Group>
                    </Form>
                </Row>

                <Row></Row>
            </Container>
        )
    }
}
export default TransactionsManagement;
