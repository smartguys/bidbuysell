const Listing = require('../../models/Listing')
const config = require('../../../config/config')
let jwt = require('jsonwebtoken');
let jwtProcess = require('../../jwt');
const User = require('../../models/User')

module.exports = (app) => {
        // Create Listing
    app.post('/api/listing/create', (req,res,next) => {
        const { body } = req; 
        const {
            seller,
            name,
            description,
            price,
            endtime,
            status,
            image,
            friendDiscount
        } = body; 
        // console.log(userID, name, description, price, endtime, status, image, friendDiscount);

        const newListing = new Listing();
        newListing.seller = seller;
        newListing.name = name;
        newListing.description = description;
        newListing.price = price;
        newListing.endtime = endtime;
        newListing.status = status;
        newListing.image = image;
        if(friendDiscount)
            newListing.friendDiscount = friendDiscount;
        // newListing.friendDiscount = friendDiscount;
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

        // return res.send({
        //     success: "idk",
        //     message: "we'll see..."
        // })
    });
}