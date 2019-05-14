const User = require('../../models/User')
const UserSession = require('../../models/UserSession')
let jwt = require('jsonwebtoken');
let jwtProcess = require('../../jwt');
const config = require('../../../config/config')

module.exports = (app) => {
    /*
    * Verify
    */
    app.get('/verify', jwtProcess.authToken, (req, res) => {
        //verify the JWT token generated for the user
        res.json({
            success: true,
            message: req.decoded
        });
    });
    /*
    * Sign up
    */
    app.post('/api/account/signup', (req, res, next) => {
        const { body } = req;
        const {
            firstName,
            lastName,
            userName,
            password
        } = body;
        let {
            email
        } = body;


        if (!firstName) {
            return res.send({
                success: false,
                message: "Error. First name can't be blank."
            });
        }
        if (!lastName) {
            return res.send({
                success: false,
                message: "Error. Last name can't be blank."
            });
        }
        if (!email) {
            return res.send({
                success: false,
                message: "Error. Email can't be blank."
            });
        }
        if (!userName) {
            return res.send({
                success: false,
                message: "Error. Username can't be blank."
            });
        }
        if (!password) {
            return res.send({
                success: false,
                message: "Error. Password can't be blank."
            });
        }

        email = email.toLowerCase();
        // steps 
        // 1. verify email doesn't exist 
        // 2. save

        User.find({
            email: email
        }, (err, previousUsers) => {
            if (err) {
                res.end({
                    success: false,
                    message: "Server error."
                });
            }
            else if (previousUsers.length > 0) {
                res.end({
                    success: false,
                    message: "Account exists."
                });
            }
            // save new user
            else {
                const newUser = new User();
                newUser.email = email;
                newUser.userName = userName;
                newUser.firstName = firstName;
                newUser.lastName = lastName;
                newUser.password = newUser.generateHash(password);
                newUser.save((err, user) => {
                    if (err) {
                        return res.send({
                            success: false,
                            message: "Server error."
                        });
                    }
                    return res.send({
                        success: true,
                        message: "Signed up."
                    });
                })
            }
        });

    });

    /*
    * Signin 
    */
    app.post('/api/account/signin', (req, res, next) => {
        const { body } = req;
        const {
            password
        } = body;
        let {
            userName
        } = body;
        if (!userName) {
            return res.send({
                success: false,
                message: "Error. Email can't be blank."
            });
        }
        if (!password) {
            return res.send({
                success: false,
                message: "Error. password can't be blank."
            });
        }

        userName = userName.toLowerCase();

        User.find({
            userName: userName
        }, (err, users) => {
            if (err) {
                return res.send({
                    success: false,
                    message: 'Error: server error'
                });
            }

            if (users.length != 1) {
                return res.send({
                    success: false,
                    message: 'Error: invalid1'
                });
            }

            const user = users[0];

            if (!user.validPassword(password)) {
                return res.send({
                    success: false,
                    message: 'Error: invalid2'
                });
            }

            let token = jwt.sign({ userName: userName, isAdmin: user.isAdmin, userID: user._id },
                config.secret,
                { expiresIn: '1w' }
            );

            if (token) {
                return res.send({
                    success: true,
                    message: 'Valid Signin',
                    token: token
                });
            }

            else {
                return res.send({
                    success: false,
                    message: 'Error: invalid3'
                });
            }
        })
    })

    // app.post('/api/account/signin', (req, res, next) => {
    //     const { body } = req;
    //     const {
    //         password
    //     } = body;
    //     let {
    //         userName
    //     } = body;
    //     if (!userName) {
    //         return res.send({
    //             success: false,
    //             message: "Error. Email can't be blank."
    //         });
    //     }

    //     if (!password) {
    //         return res.send({
    //             success: false,
    //             message: "Error. password can't be blank."
    //         });
    //     }

    //     userName = userName.toLowerCase();

    //     User.find({
    //         userName: userName
    //     }, (err, users) => {
    //         if (err) {
    //             return res.send({
    //                 success: false,
    //                 message: 'Error: server error'
    //             });
    //         }

    //         if (users.length != 1) {
    //             return res.send({
    //                 success: false,
    //                 message: 'Error: invalid1'
    //             });
    //         }

    //         const user = users[0];

    //         if (!user.validPassword(password)) {
    //             return res.send({
    //                 success: false,
    //                 message: 'Error: invalid2'
    //             });
    //         }
    //         // otherwise create user session
    //         const userSession = new UserSession();
    //         let token = jwt.sign({ userName: userName, isAdmin: user.isAdmin },
    //             config.secret,
    //             { expiresIn: '1w' }
    //         );
    //         userSession.userId = user._id;
    //         userSession.token = token;
    //         userSession.save((err, doc) => {
    //             if (err) {
    //                 return res.send({
    //                     success: false,
    //                     message: 'Error: invalid3'
    //                 });
    //             }

    //             return res.send({
    //                 success: true,
    //                 message: 'Valid Signin',
    //                 token: doc.token
    //             });
    //         })

    //     })

    // });

}