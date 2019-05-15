const Listing = require('../../models/Listing')
const config = require('../../../config/config')
let jwt = require('jsonwebtoken');
let jwtProcess = require('../../jwt');
const User = require('../../models/User')
const Bid = require('../../models/Bid')

module.exports = (app) => {
    // show all bids
    app.get('/api/bid/all', (req,res,next) => {
        Bid.find({}, (err, bids) => {
            console.log(bids)
            if (err) { return res.send({success: false, message: 'Error: server error'});};
            return res.send({
                success: true,
                message: 'all bids',
                data: {bids}
            })
        });
    })
    // show all bids submitted by buyer
    app.get('/api/bid/buyer/:id', (req,res,next) => {
        const id = req.params.id
        Bid.find({
            buyer: id
        }, (err, bids) => {
            console.log(bids)
            if (err) { return res.send({success: false, message: 'Error: server error'});};
            return res.send({
                success: true,
                message: 'all bids by buyer',
                data: {bids}
            })
        });
    })
}