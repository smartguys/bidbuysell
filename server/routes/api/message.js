const MessageThread = require('../../models/MessageThread');
const User = require('../../models/User');

module.exports = (app) => {
	//create message thread
	app.post('/api/message/create', (req,res,next) => {
		const {body} = req;
		const newThread = new MessageThread();
		params = [
			'users',
			'messages'
		];
		params.forEach(param => {
            if(body[param] == null) {
                return res.send({
                    success: false,
                    message: "missing: " + param,
                }); 
            } else {
                newThread[param] = body[param];
            } 
        });
		//make sure all users in the thread are valid
		body['users'].forEach(user => {
			User.find({
				_id: user
			},
			(err, users) => {
				if (err) {return res.send({success: false, message: 'Error: no user'});}
			});
		});
		newThread.save( (err, thread) => {
        	if (err) {
        		return res.send({success: false, message: 'Error: server error'});
        	}
        	return res.send({
                success: true,
                message: "Message thread created.",
                data: {thread}
            });
    	});
	});

	/*
	USERS
	*/

	//add user to thread
	app.post('/api/message/adduser/:threadid/:id', (req,res,next) => {
        const threadid = req.params.threadid;
        const id = req.params.id;
		//check that user exists
		User.find({
				_id: id
			},
			(err, threads) => {
				if (err) {return res.send({success: false, message: 'Error: no user'});}
			}
		);
		//check that messagethread exists
		MessageThread.find({
				_id: threadid
			},
			(err, threads) => {
				if (err) {return res.send({success: false, message: 'Error: no message thread'});}
				//append user to users list
				const thread = threads[0];
            	if (!thread) {return res.send({success: false, message: 'Error: no message thread'});}
            	if (!thread.users) {return res.send({success: false, message: 'Error: missing users in message thread'});}
                else {thread.users.push(id);}
                //update
                thread.save( (err, thread) => {
		        	if (err) {
		        		return res.send({success: false, message: 'Error: server error'});
		        	}
		        	return res.send({
		                success: true,
		                message: "User added to message thread.",
		                data: {thread}
		            });
		    	});
			}
		);
	});

	//remove user from thread
	app.post('/api/message/removeuser/:threadid/:id', (req,res,next) => {
        const threadid = req.params.threadid;
        const id = req.params.id;
		//check that user exists
		User.find({
				_id: id
			},
			(err, threads) => {
				if (err) {return res.send({success: false, message: 'Error: no user'});}
			}
		);
		//check that messagethread exists
		MessageThread.find({
				_id: threadid
			},
			(err, threads) => {
				if (err) {return res.send({success: false, message: 'Error: no message thread'});}
				//remove user from users list
				const thread = threads[0];
            	if (!thread) {return res.send({success: false, message: 'Error: no message thread'});}
            	if (!thread.users) {return res.send({success: false, message: 'Error: missing users in message thread'});}
                else {
                	var tmp = thread.users.filter(user => user != id);
                	thread.users = tmp;}
                //update
                thread.save( (err, thread) => {
		        	if (err) {
		        		return res.send({success: false, message: 'Error: server error'});
		        	}
		        	return res.send({
		                success: true,
		                message: "User removed from message thread.",
		                data: {thread}
		            });
		    	});
			}
		);
	});

	//get users in thread
	app.post('/api/message/getusers/:threadid', (req,res,next) => {
	});

	/*
	MESSAGES
	*/

	//add message to thread
	app.post('/api/message/addmsg/:threadid', (req,res,next) => {
	});

	//delete message
	app.post('/api/message/removemsg/:threadid/:id', (req,res,next) => {
	});


	/*
	GETTING MESSAGES
	*/

	//get all messages
	app.post('/api/message/getallmsg/:threadid', (req,res,next) => {
	});

	//get messages from a user
	app.post('/api/message/getallusermsg/:threadid/:id', (req,res,next) => {
	});

	//get specific message
	app.post('/api/message/getmsg/:threadid/:id', (req,res,next) => {
	});

}