const User = require('../../models/User')
const UserSession = require('../../models/UserSession')
let jwt = require('jsonwebtoken');
let jwtProcess = require('../../jwt');
const config = require('../../../config/config')

module.exports = (app) => {
    /*
    * Create User: note does not allow duplicate emails and usernames 
    */
    app.post('/api/account/signup', (req, res, next) => {
        const { body } = req;
        let newUser = new User();
        params = [
            'firstName',
            'lastName',
            'email',
            'userName',
            'address',
            'phone',
            'creditCard',
        ];
        missingFields=false;
        missing=''; 
        params.forEach(param => {
           
        if (body[param] == null) {
            missingFields = true
            missing += `${param}, `
        } else {
            newUser[param] = body[param]
        }
        })

    if (missingFields) {
        return res.send({
            success: false,
            message: missing
        })
    }
    const {
        email
    } = body;

    // email and username to lowercase 
    newUser.email = newUser.email.toLowerCase();
    newUser.userName = newUser.userName.toLowerCase();

    console.log(newUser)
    console.log(email);
    User.find({
        $or: [
            { email: newUser.email },
            { userName: newUser.userName }
        ]
    }, (err, previousUsers) => {
        if (err) {
            res.send({
                success: false,
                message: "Server error."
            });
        }
        else if (previousUsers.length > 0) {
            res.send({
                success: false,
                message: "Account already exists."
            });
        }
        else {
            newUser.password = newUser.generateHash(newUser.userName);
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
* Get all users
*/
app.get('/api/account', (req, res, next) => {
    User.find()
        .exec()
        .then((user) => res.json(user))
        .catch((err) => next(err));
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
        let token = jwt.sign({ userName: userName },
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