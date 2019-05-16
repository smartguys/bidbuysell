import React, { Component } from 'react';
import axios from 'axios'

class BuyingManagement extends Component {
    constructor(props) {
        super(props)
        this.state={
        }
    }

    componentDidMount() {
        '/api/bid/buyer/:id'
        axios.get('/api/bid/buyer/'+ this.props.userId).then(res => {
            switch (res.data.success) {
                case true:
                    const bids = res.data.data.bids
                    console.log('bids')
                    console.log(bids)
                    this.setState({
                        bids: bids
                    })
                    break;
                case false:
                    // console.log(res.data.message);
                    break;
            }
        })
    }

    render() {
        console.log('buygin')
        console.log(this.props)
        console.log(this.state)
        return (
            this.state.bids
                ?   this.state.bids.map(bid => {
                        return (
                            <div key={bid._id}>
                                <div>{bid.listing}</div>
                                <div>{bid.buyer}</div>
                                <div>{bid.timestamp}</div>
                                <div>{bid.price}</div>
                            </div>
                            
                        )
                    })
                :   null
        );
    }
}

export default BuyingManagement;
