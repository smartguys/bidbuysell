import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap'

class Confirmation extends Component {
    constructor(props) {
        super(props)
        console.log(this.props)
    }
    render() {
        const {
            firstName
          } = this.props

        return (
            <Container>
                <Row className='mt-5 justify-content-center'>
                    <h4>Thanks, submission successful!</h4>
                </Row>
                <Row className='mt-5 justify-content-center'>
                    <h5>We will review and get back to you shortly</h5>
                </Row>
                

            </Container>
        )
    }
}

export default Confirmation; 