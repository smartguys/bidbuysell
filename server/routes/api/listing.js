const Listing = require('../../models/Listing')
const config = require('../../../config/config')
let jwt = require('jsonwebtoken');
let jwtProcess = require('../../jwt');
const User = require('../../models/User')
const Bid = require('../../models/Bid')

module.exports = (app) => {
    // create listing
    app.post('/api/listing/create', (req,res,next) => {
        const { body } = req; 
        const newListing = new Listing();
        params = [
            'seller' ,
            'name', 
            'description', 
            'price',
            'auction',
            'endtime', 
            'status', 
            'image', 
            'friendDiscount'];
        params.forEach(param => {
            if(body[param] == null) {
                return res.send({
                    success: false,
                    message: "missing: " + param,
                }); 
            } else {
                newListing[param] = body[param]
            } 
        })
        User.find({
            _id: body['seller']
        }, (err, users) => {
            if (err) { return res.send({success: false, message: 'Error: no user'});};
            newListing.save((err, listing) => {
                if (err) { return res.send({success: false, message: 'Error: server error'});};
                console.log(listing)
                return res.send({
                    success: true,
                    message: "Listing created."
                });
            });
        });
    });
    // show specific listing by id
    app.get('/api/listing/id/:id', (req,res,next) => {
        const id = req.params.id;
        Listing.find({
            _id: id
        }, (err, listings) => {
            console.log(listings)
            if (err) { return res.send({success: false, message: 'Error: server error'});};
            if(!listings[0]) {return res.send({success: false, message: 'Error: no listing'});};
            return res.send({
                success: true,
                message: 'success',
                data: listings
            })
        });
    })
    // show active listings
    app.get('/api/listing/search', (req,res,next) => {
        const term = req.params.term
        Listing.find({
            status: 'active'
        }, (err, listings) => {
            console.log(listings)
            if (err) { return res.send({success: false, message: 'Error: server error'});};
            return res.send({
                success: true,
                message: 'succesful search',
                data: listings
            })
        });
    })
    // search active listings
    app.get('/api/listing/search/:term', (req,res,next) => {
        const term = req.params.term
        Listing.find({
            $and: [
                {status: 'active'},
                {$text: {$search: term}}
            ]
        }, (err, listings) => {
            console.log(listings)
            if (err) { return res.send({success: false, message: 'Error: server error'});};
            return res.send({
                success: true,
                message: 'succesful search',
                data: listings
            })
        });
    })
    // submit a bid to the given listing id
    app.post('/api/listing/bid/:id', (req,res,next) => {
        const id = req.params.id;
        const { body } = req; 
        const newBid = new Bid();
        newBid.listing = id;
        newBid.buyer = body.buyer;
        newBid.timestamp = Date.now();
        Listing.find({ // check if listing exists
            $and: [
                {_id: id},
                {status: 'active'}
            ]
        }, (err, listings) => {
            console.log(listings)
            if (err) { return res.send({success: false, message: 'Error: server error'});};
            const listing = listings[0]
            if(!listing) {return res.send({success: false, message: 'Error: no listing'});};
            if(listing.auction) // check if auction
                if(!body.price) // check for price parameter
                    return res.send({success: false, message: 'Error: missing price on auction listing'});
                else
                    newBid.price = body.price;
            else
                newBid.price = listing.price;
            User.find({ // check if buyer exists
                _id: body['buyer']
            }, (err, users) => {
                if (err) { return res.send({success: false, message: 'Error: server error'});};
                if(!users[0]) {return res.send({success: false, message: 'Error: no user'});};
                newBid.save((err, bid) => {
                    if (err) { return res.send({success: false, message: 'Error: server error'});};
                    console.log(bid)
                    return res.send({
                        success: true,
                        message: "Bid created."
                    });
                })
            })
        });
    })
}