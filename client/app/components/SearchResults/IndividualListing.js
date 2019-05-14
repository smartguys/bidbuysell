import React, { Component } from 'react';
import { Container, Row, Col, InputGroup, FormControl, Form} from 'react-bootstrap';
import Product from '../Listing/Product'
//import ProductImage from './ProductImage';
import CurrentPrice from '../Listing/CurrentPrice';
import BidAmount from '../Listing/BidAmount';
import SellerInfo from '../Listing/SellerInfo';

class IndividualListing extends Component {
    render() {
        let {
            listing
        } = this.props

        return (
            <Container>
                <Row>
                    <Col>
                        <Product listing={listing}></Product>
                    </Col>
                    <Col>
                        <CurrentPrice listing={listing}></CurrentPrice>
                        <SellerInfo seller={listing.seller}></SellerInfo>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default IndividualListing;