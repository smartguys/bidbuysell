const Listing = require('../../models/Listing')
const config = require('../../../config/config')
let jwt = require('jsonwebtoken');
let jwtProcess = require('../../jwt');
const User = require('../../models/User')

module.exports = (app) => {
    // create listing
    app.post('/api/listing/create', (req,res,next) => {
        const { body } = req; 
        const newListing = new Listing();
        props = [
            'seller' ,
             'name', 
             'description', 
             'price', 
             'endtime', 
             'status', 
             'image', 
             'friendDiscount'];
        props.forEach(prop => {
            if(body[prop] == null) {
                return res.send({
                    success: false,
                    message: "missing: " + prop,
                }); 
            } else {
                newListing[prop] = body[prop]
            } 
        })
        newListing.save((err, listing) => {
            if (err) {
                return res.send({
                    success: false,
                    message: "Server error.",
                    error: err
                });
            }
            console.log(listing)
            return res.send({
                success: true,
                message: "Listing created."
            });
        })
    });
    // show specific listing by id
    app.get('/api/listing/id/:id', (req,res,next) => {
        const id = req.params.id;
        Listing.find({
            _id: id
        }, (err, listing) => {
            console.log(listing)
            if (err) {
                return res.send({
                    success: false,
                    message: 'Error: server error'
                });
            }
            return res.send({
                success: true,
                message: 'success',
                data: listing
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
            if (err) {
                return res.send({
                    success: false,
                    message: 'Error: server error'
                });
            }
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
            if (err) {
                return res.send({
                    success: false,
                    message: 'Error: server error'
                });
            }
            return res.send({
                success: true,
                message: 'succesful search',
                data: listings
            })
        });
    })
}