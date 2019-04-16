const request = require('request');

const base_url = 'http://localhost:3000/';

function sendRequest(options, callback){
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

function hash(text){
    // our password hashing function
    return text
}

function login(displayname, password, callback) {
    const options = {
        method: 'GET',
        url: base_url + 'users',
        qs: {
            displayname: displayname,
            passwordhash: hash(password)
        }
    }
    sendRequest(options, objList => {
        callback(objList[0]);
    })
}

function isVIP(userID, callback) {
    const options = {
        method: 'GET',
        url: base_url + 'vips',
        qs: {
            id: userID,
        }
    }
    sendRequest(options, objList => {
        callback(objList.length !== 0);
    })
}

login('user1', 'pw1', user => {
    console.log(user)
});

isVIP(12, result => {
    console.log(result);
})

isVIP(8, result => {
    console.log(result);
})

