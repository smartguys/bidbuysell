const express = require('express');
const bodyParser = require('body-parser');
let jwt = require('jsonwebtoken');
let config = require('./config');
let jwtProcess = require('./jwt');
const request = require('request');

//GRAB STUFF FROM DB
const base_url = 'http://localhost:8080/';


class Handler {
  constructor() {
    console.log("FROM HANDLE",this)
    this.login = this.login.bind(this)
  }

  sendRequest(options, callback) {
    request(options, 
        (error, response, body) => {
            if(!error){
                callback(JSON.parse(body));
            }
        }
    )
    .on('error', err => {
        console.log('request failed');
    })
  }

  //login attempt
  login (req, res) {
    let username = req.body.username;
    let password = req.body.password;
    

    const options = {
      method: 'GET',
      url: base_url + 'users',
      qs: {
          displayname: username,
          passwordhash: password
      }
    }
    this.sendRequest(options, objList => {
      let USER = objList[0].displayname
      let PW = objList[0].passwordhash

    if (username && password) {

      //VERIFY LOGIN HERE
      if (username === USER && password === PW) {
        let token = jwt.sign({username: username},
          config.secret,
          {expiresIn: '1w'}
        );
        res.json({
          success: true,
          message: 'Login successful',
          token: token
        });
      } else {
        res.status(403).send({
          success: false,
          message: 'Incorrect username or password'
        });
      }
    } else {
      res.status(400).send({
        success: false,
        message: '??? your request is broken'
      });
    }
    })      
  }


  index (req, res) {
    res.json({
      success: true,
      message: 'Index page'
    });
  }
}

// Starting point of the server
function main () {
  let app = express(); // Export app for other routes to use
  let handler = new Handler();

  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());

  //routing
  app.post('/login', handler.login);
  app.get('/', jwtProcess.authToken, handler.index);

  const port = process.env.PORT || 5000;
  app.listen(port, () => console.log(`Server is listening on port: ${port}`));
}

main();