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
  
  //get user from userid
  app.get('/api/account/get/username/:userid', (req, res, next) => {
    const userid = req.params.userid;
    User.findOne({
      _id: userid
    }, (err, user) => {
      if (err) {return res.send({success: false, message: 'Error: no user'});}
      return res.send({
        success: true,
        message: "success",
        data: user
      });
    });
  });

  //get username from userid
  app.get('/api/account/get/username/:userid', (req, res, next) => {
    const userid = req.params.userid;
    User.findOne({
      _id: userid
    }, (err, user) => {
      if (err) {return res.send({success: false, message: 'Error: no user'});}
      return res.send({
        success: true,
        message: "success",
        data: user.userName
      });
    });
  });

  //increment complaint count against user
  app.post('/api/account/set/complaintcount/:userid', (req, res, next) => {
    const userid = req.params.userid;
    User.findOne({
      _id: userid
    }, (err, user) => {
      if (err) {return res.send({success: false, message: 'Error: no user'});}
      user.complaintCount++;
      //two complaints = 1 warning, vips must have 0 warnings
      if (user.isVip && user.complaintCount >= 2) {
        user.isVip = false;
      }
      user.save((err, user) => {
        if (err) {
          return res.send({success: false, message: 'Error: server error'});
        }
        return res.send({
          success: true,
          message: "Added a justified complaint to the user.",
          data: user.complaintCount
        });
      });
    });
  });

  //get complaintcount from userid
  app.get('/api/account/get/complaintcount/:userid', (req, res, next) => {
    const userid = req.params.userid;
    User.findOne({
      _id: userid
    }, (err, user) => {
      if (err) {return res.send({success: false, message: 'Error: no user'});}
      return res.send({
        success: true,
        message: "success",
        data: user
      });
    });
  });

  //modify user rating
  app.post('/api/account/set/rating/:userid', (req, res, next) => {
    const userid = req.params.userid;
    const {body} = req;
    //check that rating is sent
    if (!body['rating']) {return res.send({success: false, message: 'Error: no rating'});}
    User.findOne({
      _id: userid
    }, (err, user) => {
      if (err) {return res.send({success: false, message: 'Error: no user'});}
      user.rating = body['rating'];
      //possible change of vip status
      if (user.isVip && user.rating < 4) {
        user.isVip = false;
      }
      if (!user.isVip && user.rating >= 4 && user.totalMoneySpent >= 500 && user.complaintcount <= 1) {
        user.isVip = true;
      }
      user.save((err, user) => {
        if (err) {
          return res.send({success: false, message: 'Error: server error'});
        }
        return res.send({
          success: true,
          message: "Changed the user's rating.",
          data: user
        });
      });
    });
  });

  //get rating from userid
  app.get('/api/account/get/rating/:userid', (req, res, next) => {
    const userid = req.params.userid;
    User.findOne({
      _id: userid
    }, (err, user) => {
      if (err) {return res.send({success: false, message: 'Error: no user'});}
      return res.send({
        success: true,
        message: "success",
        data: user.rating
      });
    });
  });

  //get status from userid
  app.get('/api/account/get/status/:userid', (req, res, next) => {
    const userid = req.params.userid;
    User.findOne({
      _id: userid
    }, (err, user) => {
      if (err) {return res.send({success: false, message: 'Error: no user'});}
      return res.send({
        success: true,
        message: "success",
        data: user.status
      });
    });
  });

  //modify user rating
  app.post('/api/account/set/status/:userid', (req, res, next) => {
    const userid = req.params.userid;
    const {body} = req;
    //check that status is sent
    if (!body['status']) {return res.send({success: false, message: 'Error: no status'});}
    const status = body['status'];
    //check that status is valid
    const statusArray = ["firstTime", "active", "suspended", "appealing", "disabled"];
    var isValid = false;
    for (var i=0; i<statusArray.length; i++) {
      if (statusArray[i] == status) {
        isValid = true;
        break;
      }
    }
    User.findOne({
      _id: userid
    }, (err, user) => {
      if (err) {return res.send({success: false, message: 'Error: no user'});}
      //set and save
      user.status = status;
      user.save((err, user) => {
        if (err) {
          return res.send({success: false, message: 'Error: server error'});
        }
        return res.send({
          success: true,
          message: "Changed the user's rating.",
          data: user
        });
      });
    });
  });
}