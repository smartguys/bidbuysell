import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

class CurrentPrice extends React.Component {
    render() {
        let {
            price,
            auction
        } = this.props.listing
        let {
            bids
        } = this.props

        if (bids.length != 0) {
            price = bids[bids.length-1].price
        }

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