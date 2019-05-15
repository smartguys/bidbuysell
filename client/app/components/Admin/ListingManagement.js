import React, { Component } from 'react';
import { Container, Col, Row, Button, InputGroup, FormControl, Form, Table } from 'react-bootstrap'
import axios from 'axios'

class ListingManagement extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: '',
            status: '',
            reason: '', 
        }
    }

    componentDidMount() {
        this.props.getListings(); 
    }

    change = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    updateListing = () => {
        axios.put(`/api/listing/update/${this.state.id}?status=${this.state.status}`)
        .then( res => {
            switch(res.data.success) {
                case true:
                    this.setState({
                        id: '',
                        status: '',
                    }, this.props.getListings());
                case false:
                   console.log(res.data.message);
                   break; 
            }
        })
    }

    click = e => {
        console.log(e.target.name,e.target.value)
        e.preventDefault();
        this.setState({
            id: e.target.name,
            status: e.target.value
        }, () => this.updateListing())
    }
    

    render() {
        let {
            listings
        } = this.props

        return ( 
            <Container>
                <Row> <h3>Manage Listings</h3></Row>
                <Row>
                    <Col>
                        {
                        listings.slice(0).reverse().map(listing => {
                            return (
                                <Container key={listing._id}>
                                    <Row className="mt-3">
                                        <h5>Seller: {listing.seller} </h5>

                                        <Button type="button" name={listing._id} value="active" onClick={this.click} className="ml-3" variant="success" size="sm">Approve</Button>        
                                        <Form.Control style={{"width":"25%"}} className="ml-3" onChange={this.change} name="reason" placeholder="Rejection Reason" />
                                        <Button type="button" name={listing._id} value="rejected" onClick={this.click} className="ml-3" variant="danger" size="sm">Reject</Button>

                                    </Row>
                                    <Row>
                                        <Table className="mt-3" responsive>
                                            <tbody>
                                                <tr>
                                                    <th>Status</th>
                                                    <td>{listing.status}</td>
                                                </tr>
                                                <tr>
                                                    <th>Name</th>
                                                    <td>{listing.name}</td>
                                                </tr>
                                                <tr>
                                                    <th>Description</th>
                                                    <td>{listing.description}</td>
                                                </tr>
                                                <tr>
                                                    <th>Image</th>
                                                    <td><img width="50%" src={listing.image}/></td>
                                                </tr>
                                                <tr>
                                                    <th>Price</th>
                                                    <td>{listing.price}</td>
                                                </tr>
                                                <tr>
                                                    <th>Type</th>
                                                    <td>{(listing.auction)? "Auction" : "Fixed Price"}</td>
                                                </tr>
                                                <tr>
                                                    <th>End Time</th>
                                                    <td>{listing.endtime}</td>
                                                </tr>
                                                <tr>
                                                    <th>Friend Discount</th>
                                                    <td>{listing.friendDiscount}</td>
                                                </tr>

                                            </tbody>

                                        </Table>
                                    </Row>
                                </Container>
                            )

                            })
                        }
                    </Col>
                </Row>
            </Container>
        )
    }
}
export default ListingManagement;
