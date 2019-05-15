import React, { Component } from 'react';
import { CardGroup, Card, Button } from 'react-bootstrap'
import axios from 'axios'

class Recommendation extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            listings: []
        }
    }

    componentDidMount() {
        this.getListings()
    }

    getListings = () => {
        console.log("getting listings")
        axios.get('/api/listing/search').then(res => {
            switch (res.data.success) {
                case true:
                    this.setState({
                        listings: res.data.data.listings
                    }, () => console.log(this.state.listings.slice(0, 3)))
                    break;
                case false:
                    console.log(res.data.message);
                    break;
            }
        })
    }

    render() {
        return (
            <div style={{ marginTop: '50px', paddingBottom: '50px', width: '100%' }}>
                <h5>Recommmended for You:</h5>
                <CardGroup>
                    {this.state.listings.slice(0,3).map(listing => {
                        return (
                            <Card key={listing._id}>
                                <Card.Img variant="top" src={listing.image} />
                                <Card.Body>
                                    <Card.Title>{listing.name}</Card.Title>
                                    <Card.Text>
                                    {listing.description}
                                     </Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                    <Card.Link href={`/listing/${listing._id}`} >Viewing Listing</Card.Link>
                                </Card.Footer>
                            </Card>
                        )
                    })}
                </CardGroup>
            </div>
        )
    }

}

export default Recommendation;
