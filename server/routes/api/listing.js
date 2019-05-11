const Listing = require('../../models/Listing')
const config = require('../../../config/config')
let jwt = require('jsonwebtoken');
let jwtProcess = require('../../jwt');
const User = require('../../models/User')

module.exports = (app) => {
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
            console.log(body[prop])
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
}