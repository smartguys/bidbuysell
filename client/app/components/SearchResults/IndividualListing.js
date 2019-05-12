import React, { Component } from 'react';
import { Container, Row, Col, InputGroup, FormControl, Form} from 'react-bootstrap';
import Product from '../Listing/Product'
//import ProductImage from './ProductImage';
import CurrentPrice from '../Listing/CurrentPrice';
import BidAmount from '../Listing/BidAmount';
import SellerInfo from '../Listing/SellerInfo';

class IndivudalListing extends Component {
    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        <Product></Product>
                    </Col>
                    <Col>
                        <CurrentPrice></CurrentPrice>
                        <SellerInfo></SellerInfo>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default IndivudalListing;