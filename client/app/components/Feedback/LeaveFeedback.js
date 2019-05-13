import React, { Component } from 'react';
import { Container, Row, Col, Form, FormControl, Button, Dropdown, DropdownButton } from 'react-bootstrap'
import IndividualListing from '../SearchResults/IndividualListing'
import Rating from 'react-rating'

class LeaveFeedback extends Component {
    render() {
        return (
            <Container>
                <Row>
                    <IndividualListing></IndividualListing>
                </Row>
                <Row>
                    <Col lg="2">
                    <Row>
                        <Form.Label>Rate Transaction:</Form.Label>
                    </Row>
                        <Row>
                            <Rating />
                        </Row>
                    </Col>

                    <Col>
                        <Row>
                                <Form.Label>Feedback:</Form.Label>
                                <Form.Control as="textarea" rows="3" />
                        </Row>
                    </Col>
                </Row>
                <Row className="justify-content-center mt-5">
                    <Button variant="primary">Submit Feedback</Button>
                </Row>

            </Container>

        )
    }
}

export default LeaveFeedback;