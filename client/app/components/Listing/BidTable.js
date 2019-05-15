import React, { Component } from 'react';
import { Container, Row, Col, Button, Table } from 'react-bootstrap';
import axios from 'axios'

class BidTable extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        let {
            bids
        } = this.props

        return (
            <Container>
                <Row>
                    <Col>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Timestamp</th>
                                    <th>Buyer</th>
                                    <th>Price</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bids.slice(0).reverse().map(bid => {
                                    return (
                                        <tr key={bid._id}>
                                            <td>{bid.timestamp}</td>
                                            <td>{bid.buyer}</td>
                                            <td>${bid.price}</td>
                                            <th>
                                                <Button name={bid._id} className="mb-3" variant="primary" type="submit" onClick={ () => {this.props.setWinner(bid)}}>Choose</Button>
                                            </th>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                    </Col>
                    <Col>
                    </Col>
                </Row>



            </Container>
        )
    }
}

export default BidTable;