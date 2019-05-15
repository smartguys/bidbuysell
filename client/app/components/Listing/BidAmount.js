import React, { Component } from 'react';
import { Container, Row, Col, Button, InputGroup, FormControl, Form } from 'react-bootstrap';


class BidAmount extends React.Component {
    constructor(props) {
        super(props)

        // this.state = {
        //     bid: ''
        // }
    }

    // change = e => {
    //     bid = e.target.value;
    //     this.props.updateBid(bid)
    // }

    // passToListing = (bid) => {
    //     this.props.updateBid(bid)
    // }

    render() {
        let {
            price,
            auction
        } = this.props.listing

        return (
            <Container>
                <Row>
                    <h5>{(auction) ? 'Current Bid' : 'Fixed Price'}: ${price}</h5>
                </Row>
                <Row>
                    <Form onSubmit={this.props.submit} style={{ display: (auction) ? 'block' : 'none' }}>
                        <InputGroup className="mb-3">
                            <FormControl onChange={this.props.change} name="bid"
                                placeholder="Bid Amount"
                                aria-label="Bid Amount"
                                aria-describedby="basic-addon2"
                            />
                            <InputGroup.Append>
                                <Button type="submit" variant="secondary">Bid Now</Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Form>
                </Row>
                <Row>
                    <Button style={{ display: (!auction) ? 'block' : 'none' }} type="submit" variant="secondary">Buy Now</Button>
                </Row>
            </Container>
        )
    }
}
export default BidAmount;