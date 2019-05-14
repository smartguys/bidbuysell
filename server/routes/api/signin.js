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
    * Sign in
    {
  "firstName": "Nabil",
  "lastName": "Khatri",
  "userName": "copy",
  "password": "remorse123",
  "email": "jogn@john.com"
}
    */
    app.get('/api/account/ok', (req, res, next) => {
        return res.send({
            // success: true,
            message: 'ok!!!'
        });
    });


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
            // otherwise create user session
            const userSession = new UserSession();
            let token = jwt.sign({ userName: userName, isAdmin: user.isAdmin },
                config.secret,
                { expiresIn: '1w' }
            );
            userSession.userId = user._id;
            userSession.token = token;
            userSession.save((err, doc) => {
                if (err) {
                    return res.send({
                        success: false,
                        message: 'Error: invalid3'
                    });
                }

                return res.send({
                    success: true,
                    message: 'Valid Signin',
                    token: doc.token
                });
            })

        })

    });

}