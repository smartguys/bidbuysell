const axios = require('axios')

function login(username, password, callback) {
    axios.post(
        'localhost:8080/api/account/signin',
        {
            userName: username,
            password: password
        }
    ).then(res => {
        console.log(res)
    }).catch(res => {
        console.log(res.data)
    })
}

login('ok', 'ok')