import React, { Component } from 'react';
import { Container, Row, Col, InputGroup, FormControl, Form} from 'react-bootstrap';
import Product from '../Listing/Product'
//import ProductImage from './ProductImage';
import CurrentPrice from '../Listing/CurrentPrice';
import BidAmount from '../Listing/BidAmount';
import SellerInfo from '../Listing/SellerInfo';
//import Description from './Description';
import SearchBar from '../Search/Search'
import Rating from 'react-rating'

class Filters extends Component {
    render() {
        return (
            <Container>
            <h4>Filters</h4>
                        <label htmlFor="basic-url">Price Range:</label>
                        <Row>

                            <Col className="justify-content-center">
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>$</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl placeholder="Minimum" aria-label="Amount (to the nearest dollar)" />
                                </InputGroup>
                            </Col>
                           
                        </Row>

                        <Row>
                        <Col className="justify-content-center">
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>$</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl placeholder="Maximum" aria-label="Amount (to the nearest dollar)" />
                                </InputGroup>
                            </Col>
                        </Row>

                        <Row>
                            <Col><label htmlFor="basic-url">Seller Rating:</label></Col>
                        </Row>
                        
                        <Row>
                            <Col>
                            <Rating />
                            </Col>
                        </Row>

                        <Row className="mt-2">
                            <Col>
                            Listing Type:
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                            <div key='auction'>
                                        <Form.Check
                                            custom
                                            type='checkbox'
                                            id='12'
                                            label='Auction'
                                        />
                                    </div>     
                                    <div key='auction'>
                                        <Form.Check
                                            custom
                                            type='checkbox'
                                            id='12'
                                            label='Fixed'
                                        />
                                    </div>                         
                            </Col>
                        </Row>
            </Container>
        );
    }
}

export default Filters; 