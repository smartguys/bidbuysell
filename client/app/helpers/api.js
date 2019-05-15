const axios = require('axios')

const base_url = 'http://localhost:8080/api/'

module.exports.signin = (username, password, callback) => {
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

module.exports.getImage = (id, callback) => {
    axios.get(
        base_url + 'image/id/' + id,
        {}
    ).then(res => {
        callback(res.data)
    }).catch(err => {
        callback({ success: false, message: 'Error: could not reach backend'})
    })
}

module.exports.getUserThreads = (id, callback) => {
    axios.get(
        base_url + 'message/getthreads/' + id,
        {},
    ).then(res => {
        callback(res.data)
    }).catch(err => {
        callback({ success: false, message: 'Error: could not reach backend'})
    })
}

module.exports.createMessageThread = (users, callback) => {
    axios.post(
        base_url + 'message/create',
        {
            users: users,
            messages: []
        },
    ).then(res => {
        callback(res.data)
    }).catch(err => {
        callback({ success: false, message: 'Error: could not reach backend'})
    })
}

module.exports.sendMessage = (thread, sender, content, callback) => {
    axios.post(
        base_url + 'message/addmsg/' + thread,
        {
            sender: sender,
            content: content
        },
    ).then(res => {
        callback(res.data)
    }).catch(err => {
        callback({ success: false, message: 'Error: could not reach backend'})
    })
}

// TEST:

// module.exports.sendMessage('5cdbc2e26dfd0878b7197847', '5cda14ea6b14503b45cbd66d', 're', (res) => {
//     console.log(res)
// })

// const users = ['5cda14ea6b14503b45cbd66d', '5cdb348ff161cc07a2e923fb']
// module.exports.createMessageThread(users, (res) => {
//     console.log(res)
// })

// module.exports.getUserThreads('5cda14ea6b14503b45cbd66d', (res) => {
//     console.log(res)
// })

// module.exports.signin('a', 'b', (res) => {
//     console.log(res)
// })

// module.exports.uploadImage('ok', 'go', (res) => {
//     console.log(res)
// })

// module.exports.getImage('5cdb6e74d245663c6922e229', (res => {
//     console.log(res)
// }))