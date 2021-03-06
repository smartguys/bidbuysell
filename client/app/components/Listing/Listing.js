import React, { Component } from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import Product from './Product'
import CurrentPrice from './CurrentPrice';
import BidAmount from './BidAmount';
import SellerInfo from './SellerInfo';
import SearchBar from '../Search/Search'
import axios from 'axios'
import Countdown from 'react-countdown-now';
import BidTable from './BidTable'

class Listing extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props.match.params.id)

        this.state = ({
            listing: {},
            bids: [],
            bid: '',
            winner: '',
            status: '',
            temp: '',
            listing_id: this.props.match.params.id,
            loginAlert: false,
            loginAlertMessage: '',
            loginAlertVariant: ''

        })
    }

    componentDidMount() {
        this.getListing()
    }

    timeadjust = () => {
        let temp = new Date()
        this.setState({
            temp:temp
        })
    }

    setWinner = (winner) => {
        this.setState({
            winner: winner
        }, () => {
            console.log("winner:",this.state.winner)

            this.createTransaction();
        })
    }

    createTransaction = () => {
            axios.post(`/api/transaction/submit/${this.state.winner._id}`).then(res => {
              switch (res.data.success) {
                case false:
                  console.log(res.data.message)
                  break;
                case true:
                  console.log(res.data.message)
                  break;
              }
            })
    }


    getListing = () => {
        let id = this.props.match.params.id
        axios.get(`/api/listing/id/${id}`).then(res => {
            switch (res.data.success) {
                case false:
                    break;
                case true:
                    console.log(res.data)
                    this.setState({
                        listing: res.data.data.listing,
                        bids: res.data.data.bids,
                        status: res.data.data.listing.status
                    }, () => this.timeadjust())
                    break;
            }
        })
    }

    change = e => {
        this.setState({bid: e.target.value}, () => {
            console.log(this.state.bid);
        });
    }

    submit = e => {
        e.preventDefault();
        if (!this.state.listing.auction) {
            this.state.bid = this.state.listing.price
            console.log("fixed price")
        }
        axios.post(`/api/listing/bid/${this.state.listing._id}`, {
            buyer: this.props.userID,
            price: this.state.bid
        }).then( res => {
            switch(res.data.success) {
                case true:
                    console.log(res.data);
                    this.getListing()
                    break;
                case false:
                this.setState({
                    loginAlert: true,
                    loginAlertMessage: "must be logged into bid",
                    loginAlertVariant: 'danger'
                    }); 
                    break;
            }
        })
    }

    updateListing = () => {
        console.log("listing closed")
        axios.put(`/api/listing/update/${this.state.listing_id}?status=closed`)
        .then( res => {
            switch(res.data.success) {
                case true:
                    this.setState({
                        status: 'closed',
                    });
                case false:
                   console.log(res.data.message);
                   break; 
            }
        })
    }

    render() {
        let {
            listing,
            bids
        } = this.state;
        let {
            winner,
            status,
            loginAlert,
            loginAlertMessage,
            loginAlertVariant
        } = this.state

        let endtime = new Date(listing.endtime)

        // const endtime = this.state.temp


        const renderer = ({ days, hours, minutes, seconds, completed }) => {
            if (completed) {
              // Render a completed state
              return "Done"
            } else {
              // Render a countdown
              return <span>{days} days, {hours} hours, {minutes} minutes, {seconds}, seconds</span>;
            }
          };

          const handleHide = () => this.setState({ loginAlert: false })

        return (
            <Container fluid={true}>
                <Row className="mt-3">
                    <Col xs lg="8"><SearchBar></SearchBar></Col>
                    <Col></Col>
                </Row>
                <Row className="mt-3">
                    <Col>
                        <Product listing={listing}></Product>
                    </Col>

                    <Col>
                    <Alert onClose={handleHide} show={loginAlert} dismissible variant={loginAlertVariant}>
                        {loginAlertMessage}
                    </Alert>
                    <Container style={{ display: (status === 'active') ? 'block' : 'none' }}>
                        <Row>
                            <SellerInfo seller={listing.seller}></SellerInfo>
                        </Row>
                        <Row>
                        <Container>
                        <Row className="mt-3" style={{ display: (winner === '') ? 'block' : 'none' }}>
                            <h5>Time Remaining</h5>
                        </Row>
                            <Row style={{ display: (winner === '') ? 'block' : 'none' }}>
                        <Countdown onComplete={() => this.updateListing()} renderer={renderer} date={endtime}>
                            </Countdown></Row>
                            </Container>
                        </Row>
                        
                        <Row className="mt-3" style={{ display: (winner === '') ? 'block' : 'none' }}>
                            <BidAmount change={this.change} submit={this.submit} listing={listing} bids={bids}></BidAmount>
                        </Row>
                        </Container>

                        <Row style={{ display: (status === 'closed' && winner === '' && listing.seller === this.props.userID) ? 'block' : 'none' }}>
                            <BidTable setWinner={this.setWinner} bids={bids}/>
                        </Row>

                        <Row style={{ display: (status === 'closed' && listing.seller != this.props.userID || status === 'closed' && winner != '' && listing.seller === this.props.userID) ? 'block' : 'none' }}>
                            <h4>This listing is no longer active.</h4>
                        </Row>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Listing;