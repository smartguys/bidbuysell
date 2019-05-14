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
                    <h4>Thanks {firstName}! Your application has been submitted.</h4>
                </Row>
            </Container>
        )
    }
}

export default Confirmation; 