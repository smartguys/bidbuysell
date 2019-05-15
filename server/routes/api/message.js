const MessageExports = require('../../models/MessageThread');
const MessageThread = MessageExports.MessageThread;
const Message = MessageExports.Message;
const User = require('../../models/User');

module.exports = (app) => {
	//create message thread
	app.post('/api/message/create', (req,res,next) => {
		const {body} = req;
		const newThread = new MessageThread();
		neededParams = [
			'users',
			'messages'
		];
		neededParams.forEach(param => {
			if(body[param] == null) {
                return res.send({
                    success: false,
                    message: "missing: " + param,
                }); 
            } else {
                newThread[param] = body[param];
            } 
		});
		neededParams.forEach(param => {
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
                data: thread
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
		                data: thread
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
		MessageThread.findOne({
				_id: threadid
			},
			(err, thread) => {
				if (err) {return res.send({success: false, message: 'Error: no message thread'});}
				//remove user from users list
            	if (!thread.users) {return res.send({success: false, message: 'Error: missing users in message thread'});}
                var tmp = thread.users.filter(user => user._id != id);
                thread.users = tmp;
                //update
                thread.save( (err, thread) => {
		        	if (err) {
		        		return res.send({success: false, message: 'Error: server error'});
		        	}
		        	return res.send({
		                success: true,
		                message: "User removed from message thread.",
		                data: thread
		            });
		    	});
			}
		);
	});

	//get users in thread
	app.get('/api/message/getusers/:threadid', (req,res,next) => {
		const threadid = req.params.threadid;
		//check that messagethread exists
		MessageThread.findOne({
				_id: threadid
			},
			(err, thread) => {
				if (err) {return res.send({success: false, message: 'Error: no message thread'});}
            	if (!thread.users) {return res.send({success: false, message: 'Error: missing users in message thread'});}
	        	return res.send({
	                success: true,
	                message: "success",
	                data: thread.users
	            });
			}
		);
	});

	//get all threads with user
	app.get('/api/message/getthreads/:userid', (req,res,next) => {
		const userid = req.params.userid;
		MessageThread.find().exec( (err, threads) => {
			if (err) {return res.send({success: false, message: 'Error: no message threads'});}
			threads = threads.filter(thread => {
				var hasUser = false;
				thread.users.forEach(user => {
					if (user._id == userid) {
						hasUser = true;
					}
				});
				return hasUser;
			});
			return res.send({
				success: true,
				message: "Found threads with user.",
				data: threads
			});
		});
	});


	/*
	MESSAGES
	*/

	//add message to thread
	app.post('/api/message/addmsg/:threadid', (req,res,next) => {
		const threadid = req.params.threadid;
		const {body} = req;
		const newMessage = new Message();
		neededParams = [
			'sender',
			'content'
		];
		otherParams = [
			'date',
			'isDelete'
		];
		neededParams.forEach(param => {
			if(body[param] == null) {
                return res.send({
                    success: false,
                    message: "missing: " + param,
                }); 
            } else {
                newMessage[param] = body[param];
            } 
		});
		otherParams.forEach(param => {
			if(body[param] != null) {
                newMessage[param] = body[param];
            } 
		});
		//check that the content is nonempty:
		if (!newMessage['content']) {return res.send({success: false, message: 'Error: no message content'});}
		//check the relevant thread exists
		MessageThread.findOne({
				_id: threadid
			},
			(err, thread) => {
				if (err) {return res.send({success: false, message: 'Error: no message thread'});}
            	if (!thread.users) {return res.send({success: false, message: 'Error: missing users in message thread'});}
            	//check that the sender is in the thread
            	var hasUser = thread.users.reduce(function(res, el) {
            		return res || (el._id == newMessage['sender']._id);
            	}, false);
            	//message is good to go, send and save
            	thread.messages.push(newMessage);
	        	thread.save( (err, thread) => {
		        	if (err) {
		        		return res.send({success: false, message: 'Error: server error'});
		        	}
		        	return res.send({
		                success: true,
		                message: "Message sent to message thread.",
		                data: thread
		            });
		    	});
			}
		);
	});

	//delete message
	app.post('/api/message/removemsg/:threadid/:msgid', (req,res,next) => {
		const threadid = req.params.threadid;
		const msgid = req.params.msgid;
		//check that messagethread exists
		MessageThread.findOne({
				_id: threadid
			},
			(err, thread) => {
				if (err) {return res.send({success: false, message: 'Error: no message thread'});}
            	if (!thread.messages) {return res.send({success: false, message: 'Error: missing messages in message thread'});}
	        	var msgs = thread.messages.filter(msg => msg._id == msgid);
	        	if (msgs.length == 0) {return res.send({success: false, message: 'Error: message not found in thread'});}
	        	thread.messages.forEach(msg => {
	        		if (msg._id == msgid) {msg.isDelete = true;}
	        	});

	        	//message is deleted, save
	        	thread.save( (err, thread) => {
		        	if (err) {
		        		return res.send({success: false, message: 'Error: server error'});
		        	}
		        	return res.send({
		                success: true,
		                message: "Message deleted from message thread.",
		                data: thread
		            });
		    	});
			}
		);
	});


	/*
	GETTING MESSAGES
	*/

	//get all messages
	app.get('/api/message/getallmsg/:threadid', (req,res,next) => {
		const threadid = req.params.threadid;
		//check that messagethread exists
		MessageThread.findOne({
				_id: threadid
			},
			(err, thread) => {
				if (err) {return res.send({success: false, message: 'Error: no message thread'});}
            	if (!thread.messages) {return res.send({success: false, message: 'Error: missing messages in message thread'});}
	        	return res.send({
	                success: true,
	                message: "success",
	                data: thread.messages
	            });
			}
		);
	});

	//get messages from a user
	app.get('/api/message/getallusermsg/:threadid/:userid', (req,res,next) => {
		const threadid = req.params.threadid;
		const userid = req.params.userid;
		//check that messagethread exists
		MessageThread.findOne({
				_id: threadid
			},
			(err, thread) => {
				if (err) {return res.send({success: false, message: 'Error: no message thread'});}
            	if (!thread.messages) {return res.send({success: false, message: 'Error: missing messages in message thread'});}
	        	var msgs = thread.messages.filter(msg => msg.sender._id == userid);
	        	return res.send({
	                success: true,
	                message: "success",
	                data: msgs
	            });
			}
		);
	});

	//get specific message
	app.get('/api/message/getmsg/:threadid/:msgid', (req,res,next) => {
		const threadid = req.params.threadid;
		const msgid = req.params.msgid;
		//check that messagethread exists
		MessageThread.findOne({
				_id: threadid
			},
			(err, thread) => {
				if (err) {return res.send({success: false, message: 'Error: no message thread'});}
            	if (!thread.messages) {return res.send({success: false, message: 'Error: missing messages in message thread'});}
	        	var msgs = thread.messages.filter(msg => msg._id==msgid);
	        	if (msgs.length == 0) {return res.send({success: false, message: 'Error: message not found in thread'});}
	        	return res.send({
	                success: true,
	                message: "success",
	                data: msgs
	            });
			}
		);
	});
}