const axios = require('axios')

const base_url = 'http://localhost:8080/api/'

module.exports.signin = (username, password, callback) => {
    console.log('signin')
    axios.post(
        base_url + 'account/signin',
        {
            userName: username,
            password: password
        }
    ).then(res => {
        callback(res.data)
    }).catch(err => {
        callback({ success: false, message: 'Error: could not reach backend'})
    })
}

module.exports.uploadImage = (name, data, callback) => {
    console.log('upload image');
    axios.post(
        base_url + 'image/upload',
        {
            name: name,
            data: data
        }
    ).then(res => {
        callback(res.data)
    }).catch(err => {
        callback({ success: false, message: 'Error: could not reach backend'})
    })
}

// TEST:

// module.exports.signin('a', 'b', (res) => {
//     console.log(res)
// })

// module.exports.uploadImage('ok', 'go', (res) => {
//     console.log(res)
// })