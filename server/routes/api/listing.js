const Listing = require('../../models/Listing')
const config = require('../../../config/config')
let jwt = require('jsonwebtoken');
let jwtProcess = require('../../jwt');
const User = require('../../models/User')
const Bid = require('../../models/Bid')
const Transaction = require('../../models/Transaction')

module.exports = (app) => {
    // create listing
    app.post('/api/listing/create', (req, res, next) => {
        const { body } = req;
        const newListing = new Listing();
        params = [
            'seller',
            'name',
            'description',
            'price',
            'auction',
            'endtime',
            // 'status', 
            'image',
            'friendDiscount'];
        missingFields=false;
        missing=''; 
        params.forEach(param => {
            if (body[param] == null) {
                missingFields = true
                missing += `${param}, `
            } else {
                newListing[param] = body[param]
            };
        });
        if (missingFields) {
            return res.send({
                success: false,
                message: missing
            });
        }       
        User.find({
            _id: body['seller']
        }, (err, users) => {
            if (err) { return res.send({ success: false, message: 'Error: no user' }); };
            newListing.save((err, listing) => {
                if (err) { return res.send({ success: false, message: 'Error: server error' }); };
                return res.send({
                    success: true,
                    message: "Listing created.",
                    data: { listing }
                });
            });
        });
    });
    //update the status of a listing
    app.put('/api/listing/update/:id', (req, res, next) => {
        const id = req.params.id;
        const status = req.query.status
        const choices = ['pending', 'rejected', 'active', 'expired', 'escrow', 'closed'];
        if (!choices.includes(status)) {
            return res.send({
                success: false,
                status: status,
                message: 'Error: query param must contain any of: ' + choices
            });
            ;
        };
        Listing.find({
            _id: id
        }, (err, listings) => {
            // console.log(listings)
            if (err) { return res.send({ success: false, message: 'Error: server error' }); };
            const listing = listings[0]
            if (!listing) { return res.send({ success: false, message: 'Error: no listing' }); };
            Listing.findOneAndUpdate(
                { _id: listing._id, },
                { $set: { status: status } },
                { returnOriginal: false },
                (err, listing) => {
                    // the returnOriginal option doesnt see to work, 
                    // where I want to return the modified object, so just respond 'success', for now.
                    return res.send({
                        success: true,
                        message: 'success',
                    })
                }
            )
        });
    })
    // show all listings, regardless of status
    app.get('/api/listing/all', (req,res,next) => {
        Listing.find({}, (err, listings) => {
            if (err) { return res.send({ success: false, message: 'Error: server error' }); };
            return res.send({
                success: true,
                message: 'all listings',
                data: { listings }
            })
        });
    })
    // show specific listing by id
    app.get('/api/listing/id/:id', (req, res, next) => {
        const id = req.params.id;
        Listing.find({
            _id: id
        }, (err, listings) => {
            if (err) { return res.send({ success: false, message: 'Error: server error' }); };
            const listing = listings[0]
            if (!listing) { return res.send({ success: false, message: 'Error: no listing' }); };
            Bid.find({  // include all bids
                listing: listing._id
            }, (err, bids) => {
                if (err) { return res.send({ success: false, message: 'Error: server error' }); };
                return res.send({
                    success: true,
                    message: 'success',
                    data: { listing, bids }
                })
            })
        });
    })
    // show all listings submitted by seller
    app.get('/api/listing/seller/:id', (req,res,next) => {
        const id = req.params.id
        Listing.find({
            seller: id
        }, (err, listings) => {
            if (err) { return res.send({success: false, message: 'Error: server error'});};
            return res.send({
                success: true,
                message: 'all listings by seller',
                data: {listings}
            })
        });
    })
    // show active listings
    app.get('/api/listing/search', (req, res, next) => {
        Listing.find({
            status: 'active'
        }, (err, listings) => {
            if (err) { return res.send({ success: false, message: 'Error: server error' }); };
            return res.send({
                success: true,
                message: 'succesful search',
                data: { listings }
            })
        });
    })
    // search active listings
    app.get('/api/listing/search/:term', (req, res, next) => {
        const term = req.params.term
        Listing.find({
            $and: [
                { status: 'active' },
                { $text: { $search: term } }
            ]
        }, (err, listings) => {
            if (err) { return res.send({ success: false, message: 'Error: server error' }); };
            return res.send({
                success: true,
                message: 'succesful search',
                data: { listings }
            })
        });
    })
    // submit a bid to the given listing id
    app.post('/api/listing/bid/:id', (req, res, next) => {
        const id = req.params.id;
        const { body } = req;
        const newBid = new Bid();
        newBid.listing = id;
        newBid.buyer = body.buyer;
        newBid.timestamp = Date.now();
        Listing.find({ // check if listing exists
            $and: [
                { _id: id },
                { status: 'active' }
            ]
        }, (err, listings) => {
            if (err) { return res.send({ success: false, message: 'Error: server error' }); };
            const listing = listings[0]
            if(!listing) {return res.send({success: false, message: 'Error: no active listing'});};
            User.find({ // check if buyer exists
                _id: body['buyer']
            }, (err, users) => {
                if (err) { return res.send({ success: false, message: 'Error: server error' }); };
                if (!users[0]) { return res.send({ success: false, message: 'Error: no user' }); };
                if(listing.auction) { // check if auction
                    if(!body.price) { // check for price parameter
                        return res.send({success: false, message: 'Error: missing price on auction listing'});
                    } else {
                        newBid.price = body.price;
                        listing.price = Math.max(listing.price, body.price);
                        newBid.save((err, bid) => { // save newBid
                            if (err) { return res.send({ success: false, message: 'Error: server error' }); };
                            listing.save((err, listing) => { //update listing
                                if (err) { return res.send({ success: false, message: 'Error: server error' }); };
                                return res.send({
                                    success: true,
                                    message: "auction listing updated with new bid",
                                    data: {listing, bid}
                                });
                            })
                        })
                    }
                } else {
                    if(body.price) { return res.send({ success: false, message: 'Error: cannot submit price for fixed-price listing' }); };
                    newBid.price = listing.price; // save new bid with current listing price
                    newBid.save((err, bid) => {
                        if (err) { return res.send({ success: false, message: 'Error: server error' }); };
                        return res.send({
                            success: true,
                            message: "bid created for fixed-price listing",
                            data: {listing, bid}
                        });
                    });
                };
            });
        });
    });
}