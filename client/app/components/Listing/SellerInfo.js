import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';



class SellerInfo extends React.Component {
   

    render() {
        let {
            seller
        } = this.props

        return(
            <Container className='mt-3'>
            <Row>
                <h5>Seller Information</h5>
            </Row>
            <Row>
                Sold by: {seller}
            </Row>
            <Row>
                Rating: {seller}
            </Row>
            </Container>
        )
    }
}

export default SellerInfo;