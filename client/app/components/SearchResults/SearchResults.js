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
import axios from 'axios'

class SearchResults extends Component {
    constructor(props) {
        super(props)

        this.state = {
            query: (this.props.location.query)? this.props.location.query : '',
            listings: []
        }
    }

    change = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    componentDidMount() {
        this.search();
    }

    submit = e => {
        e.preventDefault();
        this.search();

    }

    search = () => {
        axios.get(`/api/listing/search/${this.state.query}`).then(res => {
          switch (res.data.success) {
            case false:
              break;
            case true:
              this.setState({
                listings: res.data.data.listings
              })
              break;
          }
        })
    }


    render() {
        let {
            listings
        } = this.state

        return (
            <Container fluid={true}>
                <Row className="mt-3">
                    <Col xs lg="8">
                        <SearchBar query={this.state.query} change={this.change} submit={this.submit}/>
                    </Col>
                    <Col></Col>
                </Row>
                <Row className="mt-3">
                    <Col xs lg="2">
                        <Filter />
                    </Col>
                    <Col>
                        {listings.map( (listing) => {
                            return (
                                <Row key={listing._id} className="mt-5">
                        <IndividualListing listing={listing}></IndividualListing>
                        </Row>
                            )
                        
                        })}
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default SearchResults; 