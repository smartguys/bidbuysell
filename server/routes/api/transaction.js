const Listing = require('../../models/Listing')
const config = require('../../../config/config')
let jwt = require('jsonwebtoken');
let jwtProcess = require('../../jwt');
const User = require('../../models/User')
const Bid = require('../../models/Bid')
const Transaction = require('../../models/Transaction')


module.exports = (app) => {
    // close a given listing with the given bid as a parameter
    app.post('/api/transaction/submit/:id', (req,res,next) => {
        const id = req.params.id;
        Bid.find({
            _id: id
        }, (err, bids) => {
            if (err) { return res.send({success: false, message: 'Error: server error'});};
            const bid = bids[0];
            if(!bid) {return res.send({success: false, message: 'Error: no bid'});};
            Listing.find({
                _id: bid.listing
            }, (err, listings) => {
                if (err) { return res.send({success: false, message: 'Error: server error'});};
                const listing = listings[0];
                if(!listing) {return res.send({success: false, message: 'Error: no listing'});};
                if(listing.status != 'active') {return res.send({success: false, message: 'Error: listing not active'});};
                newTransaction = new Transaction()
                newTransaction.listing = bid.listing;
                newTransaction.seller = listing.seller;
                newTransaction.buyer = bid.buyer;
                newTransaction.price = bid.price;
                newTransaction.timestamp = Date.now();
                newTransaction.bid = bid;
                newTransaction.save((err, transaction) => {
                    if (err) { return res.send({success: false, message: 'Error: server error'});};
                    Listing.findOneAndUpdate(
                        {_id: bid.listing,}, 
                        {$set: {status: 'closed'}},
                        {returnOriginal: false},
                        (err, listing) => {
                            // the returnOriginal option doesnt see to work, 
                            // where I want to return the modified object, so just respond 'success', for now.
                            return res.send({
                                success: true,
                                message: 'success',
                                data: {transaction}
                            });
                        }
                    );
                });
            });
        });
    });
    // show all transactions
    app.get('/api/transaction/all', (req,res,next) => {
        const term = req.params.term
        Transaction.find({}, (err, transactions) => {
            if (err) { return res.send({success: false, message: 'Error: server error'});};
            return res.send({
                success: true,
                message: 'all transactions',
                data: {transactions}
            })
        });
    })
    // show specific transaction by id
    app.get('/api/transaction/id/:id', (req,res,next) => {
        const id = req.params.id;
        Transaction.find({
            _id: id
        }, (err, transactions) => {
            if (err) { return res.send({success: false, message: 'Error: server error'});};
            const transaction = transactions[0]
            if(!transaction) {return res.send({success: false, message: 'Error: no transaction'});};
            return res.send({
                success: true,
                message: 'success',
                data: {transaction}
            })
        });
    })
    // get all transactions by user, whether buyer or seller
    app.get('/api/transaction/user/:id', (req,res,next) => {
        const id = req.params.id;
        Transaction.find({
            $or: [
                {buyer: id},
                {seller: id}
            ]
        }, (err, transactions) => {
            if (err) { return res.send({success: false, message: 'Error: server error'});};
            return res.send({
                success: true,
                message: 'success',
                data: {transactions}
            })
        });
    })
}