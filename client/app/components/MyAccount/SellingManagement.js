import React, { Component } from 'react';
import axios from 'axios'

class SellingManagement extends Component {
    constructor(props) {
        super(props)
        this.state={
        }
    }

    componentDidMount() {
        '/api/listing/seller/:id'
        axios.get('/api/listing/seller/'+ this.props.userId).then(res => {
            switch (res.data.success) {
                case true:
                    const listings = res.data.data.listings
                    console.log('listings')
                    console.log(listings)
                    this.setState({
                        listings: listings
                    })
                    break;
                case false:
                    // console.log(res.data.message);
                    break;
            }
        })
    }

    render() {
        console.log('selling')
        console.log(this.props)
        console.log(this.state)
        return (
            this.state.listings
                ?   this.state.listings.map(listing => {
                        return (
                            <div key={listing._id}>
                                <div>{listing.auction}</div>
                                <div>{listing.description}</div>
                                <div>{listing.endtime}</div>
                                <div>{listing.friendDiscount}</div>
                                <div><img src={listing.image} /></div>
                                <div>{listing.name}</div>
                                <div>{listing.price}</div>
                                <div>{listing.seller}</div>
                                <div>{listing.status}</div>
                            </div>
                            
                        )
                    })
                :   null
        );
    }
}

export default SellingManagement;
