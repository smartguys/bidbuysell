const Application = require('../../models/Application')
// let jwt = require('jsonwebtoken');
// let jwtProcess = require('../../jwt');
// const config = require('../../../config/config')

module.exports = (app) => {
    /*
    * Create new application
    */
    app.post('/api/account/apply', (req, res, next) => {
        const { body } = req; 
        let newApplication = new Application();
        parameters = [
            'firstName',
            'lastName',
            'address',
            'phone',
            'creditCard',
            'userName',
            'email'
        ]
        missingFields=false;
        missing='Missing fields: '; 
        parameters.forEach(param => {
           
        if (body[param] == null) {
            missingFields = true
            missing += `${param} `
        } else {
            newApplication[param] = body[param]
        }
        })

        if (missingFields) {
            return res.send({
                success: false,
                message: missing
            })
        }

        newApplication.email = newApplication.email.toLowerCase();
        newApplication.userName = newApplication.userName.toLowerCase(); 
        newApplication.password = newApplication.generateHash(newApplication.userName); 

        Application.find({
            email: newApplication.email
        }, (err, previousUsers) => {
            if (err) {
                res.send({
                    success: false,
                    message: "Server error loading."
                });
            }
            else if (previousUsers.length > 0) {
                res.send({
                    success: false,
                    message: "Application already exists."
                });
            }
            else {
                newApplication.save((err,application) => {
                    if (err) {
                        return res.send({
                            success: false,
                            message: "Server error saving."
                        });
                    }
                    return res.send({
                        success: true,
                        message: "Application submitted.",
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
    * Change application status
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