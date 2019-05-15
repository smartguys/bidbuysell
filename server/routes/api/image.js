const Listing = require('../../models/Listing')
const config = require('../../../config/config')
let jwt = require('jsonwebtoken');
let jwtProcess = require('../../jwt');
const User = require('../../models/User')
const Bid = require('../../models/Bid')
const Image = require('../../models/Image')

module.exports = (app) => {
    // upload image
    app.post('/api/image/upload', (req,res,next) => {
        params = ['name', 'data']
        newImage = new Image();
        const missing = params.reduce((arr, param) => {
            newImage[param] = req.body[param]
            if(!req.body[param])
                return [...arr, param]
            else 
                return arr
        }, [])
        if(missing.length != 0) {
            return res.send({
                success: false,
                message: 'missing: ' + missing,
            })
        }
        newImage.save((err, image) => {
            if (err) { return res.send({success: false, message: 'Error: server error'});};
            return res.send({
                success: true,
                message: 'iamge saved',
                data: image
            });
        });
    });
    // get image by id
    app.get('/api/image/id/:id', (req,res,next) => {
        const id = req.params.id
        Image.find({
            _id: id
        }, (err, images) => {
            if (err) { return res.send({success: false, message: 'Error: server error'});};
            const image = images[0]
            if(!image) {return res.send({success: false, message: 'Error: no image'});};
            return res.send({
                success: true,
                message: 'image retrieved',
                data: {image}
            })
        })
    })
}