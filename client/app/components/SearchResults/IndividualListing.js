import React, { Component } from 'react';
import { Container, Row, Col, InputGroup, FormControl, Form} from 'react-bootstrap';
import Product from '../Listing/Product'
//import ProductImage from './ProductImage';
import CurrentPrice from '../Listing/CurrentPrice';
import BidAmount from '../Listing/BidAmount';
import SellerInfo from '../Listing/SellerInfo';
import axios from 'axios'

class IndividualListing extends Component {
    constructor(props) {
        super(props)

        this.state = {
            bids: []
        }
    }
    componentDidMount() {
        this.getListing()
    }

    getListing = () => {
        let id = this.props.listing._id
        axios.get(`/api/listing/id/${id}`).then(res => {
            switch (res.data.success) {
                case false:
                    break;
                case true:
                    console.log(res.data)
                    this.setState({
                        bids: res.data.data.bids
                    })
                    break;
            }
        })
    }

    render() {
        let {
            listing
        } = this.props
        let {
            bids
        } = this.state

        return (
            <Container>
                <Row>
                    <Col>
                        <Product listing={listing}></Product>
                    </Col>
                    <Col>
                        <CurrentPrice listing={listing} bids={bids}></CurrentPrice>
                        <SellerInfo seller={listing.seller}></SellerInfo>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default IndividualListing;