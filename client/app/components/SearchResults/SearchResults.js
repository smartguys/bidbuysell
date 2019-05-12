import React, { Component } from 'react';
import { Container, Row, Col, InputGroup, FormControl, Form } from 'react-bootstrap';
import Product from '../Listing/Product'
//import ProductImage from './ProductImage';
import CurrentPrice from '../Listing/CurrentPrice';
import BidAmount from '../Listing/BidAmount';
import SellerInfo from '../Listing/SellerInfo';
//import Description from './Description';
import SearchBar from '../Search/Search'
import Rating from 'react-rating'
import Filter from './Filters'
import IndividualListing from './IndividualListing'

class SearchResults extends Component {
    render() {
        return (
            <Container fluid={true}>
                <Row className="mt-3">
                    <Col xs lg="8">
                        <SearchBar />
                    </Col>
                    <Col></Col>
                </Row>
                <Row className="mt-3">
                    <Col xs lg="2">
                        <Filter />
                    </Col>
                    <Col>
                        <Row>
                            <Col>
                                <IndividualListing></IndividualListing>
                            </Col>
                            <Col>
                                <IndividualListing></IndividualListing>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <IndividualListing></IndividualListing>
                            </Col>
                            <Col>
                                <IndividualListing></IndividualListing>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default SearchResults; 