import React, { Component } from 'react';
import { Container, Row, Col, Button, InputGroup, FormControl } from 'react-bootstrap';


class BidAmount extends React.Component {
    render() {
        return(
            <div><label htmlFor="bid">Current Bid: $</label> (.state here)
                <InputGroup className="mb-3">
                    <FormControl id='bid'
                     placeholder="Bid Amount"
                     aria-label="Bid Amount"
                     aria-describedby="basic-addon2"
                     />
                    <InputGroup.Append>
                        <Button type="submit" variant="secondary">Place Bid</Button>
                    </InputGroup.Append>
                 </InputGroup>


            </div>
        )
    }
}






export default BidAmount;