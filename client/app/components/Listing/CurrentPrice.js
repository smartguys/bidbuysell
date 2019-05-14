import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

class CurrentPrice extends React.Component {
    render() {
        let {
            price,
            auction
        } = this.props.listing

        return(
            <Container>
            <Row>
                <h5>Current Price: ${price}</h5>
            </Row>
            <Row>
            <Button type="submit" variant="secondary">{(auction)? 'Bid Now' : 'Buy Now'}</Button>
            </Row>

             </Container>
        )
    }
}



export default CurrentPrice;