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
                <h6>{(auction)? 'Auction' : 'Fixed Price'}</h6>
            </Row>

             </Container>
        )
    }
}



export default CurrentPrice;