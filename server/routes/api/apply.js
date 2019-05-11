const Application = require('../../models/Application')
// let jwt = require('jsonwebtoken');
// let jwtProcess = require('../../jwt');
// const config = require('../../../config/config')

module.exports = (app) => {
    /*
    * Submit application
    */
    app.post('/api/account/apply', (req, res, next) => {
        const { body } = req; 
        const {
            firstName,
            lastName,
            address, 
            password,
            phone,
            creditCard
        } = body;
        let {
            email,
            userName
        } = body

        email = email.toLowerCase();
        userName = userName.toLowerCase(); 

        Application.find({
            email: email,
            userName: userName
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
                    message: "Application already exists."
                });
            }
            else {
                const newApplication = new Application();
                newApplication.firstName = firstName;
                newApplication.lastName = lastName;
                newApplication.address = address;
                newApplication.phone = phone;
                newApplication.userName = userName;
                newApplication.creditCard = creditCard;
                newApplication.email = email; 
                newApplication.password = newApplication.generateHash(password); 
                newApplication.save((err,application) => {
                    if (err) {
                        return res.send({
                            success: false,
                            message: "Server error."
                        });
                    }
                    return res.send({
                        success: true,
                        message: "Submitted.",
                        status: application.status
                    });
                })
            }
        })
    });

    /*
    * Get single application
    */
   app.get('/api/account/apply/:id', (req, res, next) => {
    let id = req.params.id;
        Application.findOne({
            _id: id
        }).then(doc => {
            res.json(doc)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }); 

   /*
    * Approve/Reject
    */
  app.put('/api/account/apply/:id/:decision', (req, res, next) => {
    Application.findById(req.params.id)
      .exec()
      .then((application) => {
        application.status = req.params.decision

        application.save()
          .then(() => res.json(application))
          .catch((err) => next(err));
      })
      .catch((err) => next(err));
  });
}

    //     Application.find({
    //         email: email
    //     }, (err, previousUsers) => {
    //         if (err) {
    //             res.end({
    //                 success: false,
    //                 message: "Server error."
    //             });
    //         }
    //         else if (previousUsers.length > 0) {
    //             res.end({
    //                 success: false,
    //                 message: "Account exists."
    //             });
    //         }
    //         // save new user
    //         else {
    //             const newUser = new User();
    //             newUser.email = email;
    //             newUser.userName = userName;
    //             newUser.firstName = firstName;
    //             newUser.lastName = lastName;
    //             newUser.password = newUser.generateHash(password);
    //             newUser.save((err, user) => {
    //                 if (err) {
    //                     return res.send({
    //                         success: false,
    //                         message: "Server error."
    //                     });
    //                 }
    //                 return res.send({
    //                     success: true,
    //                     message: "Signed up."
    //                 });
    //             })

    //         }
    //     });

    // }




//     app.post('/api/account/signup', (req, res, next) => {
//         const { body } = req; 
//         const {
//             firstName,
//             lastName,
//             userName,
//             password
//         } = body; 
//         let {
//             email
//         } = body; 

        
//         if (!firstName) {
//             return res.send({
//                 success: false,
//                 message: "Error. First name can't be blank."
//             });
//         }
//         if (!lastName) {
//             return res.send({
//                 success: false,
//                 message: "Error. Last name can't be blank."
//             });
//         }
//         if (!email) {
//             return res.send({
//                 success: false,
//                 message: "Error. Email can't be blank."
//             });
//         }
//         if (!userName) {
//             return res.send({
//                 success: false,
//                 message: "Error. Username can't be blank."
//             });
//         }
//         if (!password) {
//             return res.send({
//                 success: false,
//                 message: "Error. Password can't be blank."
//             });
//         }

//         email = email.toLowerCase();
//         // steps 
//         // 1. verify email doesn't exist 
//         // 2. save

//         User.find({
//             email: email
//         }, (err, previousUsers) => {
//             if (err) {
//                 res.end({
//                     success: false,
//                     message: "Server error."
//                 });
//             }
//             else if (previousUsers.length > 0) {
//                 res.end({
//                     success: false,
//                     message: "Account exists."
//                 });
//             }
//             // save new user
//             else {
//                 const newUser = new User();
//                 newUser.email = email;
//                 newUser.userName = userName;
//                 newUser.firstName = firstName;
//                 newUser.lastName = lastName;
//                 newUser.password = newUser.generateHash(password);
//                 newUser.save((err, user) => {
//                     if (err) {
//                         return res.send({
//                             success: false,
//                             message: "Server error."
//                         });
//                     }
//                     return res.send({
//                         success: true,
//                         message: "Signed up."
//                     });
//                 })

//             }
//         });


//     });

//     /*
//     * Sign in
//     {
//   "firstName": "Nabil",
//   "lastName": "Khatri",
//   "userName": "copy",
//   "password": "remorse123",
//   "email": "jogn@john.com"
// }
//     */
//    app.post('/api/account/signin', (req, res, next) => {
//        const { body } = req; 
//        const {
//            password
//        } = body; 
//        let {
//            userName
//        } = body; 
//        if (!userName) {
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
//          // otherwise create user session
//          const userSession = new UserSession();
//          let token = jwt.sign({userName: userName},
//             config.secret,
//             {expiresIn: '1w'}
//           );
//          userSession.userId = user._id;
//          userSession.token = token; 
//          userSession.save((err, doc) => {
//              if (err) {
//                  return res.send({
//                      success: false,
//                      message: 'Error: invalid3'
//                  });
//              }

//              return res.send({
//                  success: true,
//                  message: 'Valid Signin',
//                  token: doc.token
//              });
//          })

//      })

//     });
