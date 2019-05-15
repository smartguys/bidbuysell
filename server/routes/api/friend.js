const Friendship = require('../../models/Friendship');
const User = require('../../models/User');

module.exports = (app) => {
	//create friendship
	app.post('/api/friend/create', (req,res,next) => {
		const {body} = req;
		const newFriendship = new Friendship();
		neededParams = [
			'user1',
			'user2'
		];
		otherParams = [
			'isDelete'
		];
		neededParams.forEach(param => {
			if(body[param] == null) {
                return res.send({
                    success: false,
                    message: "missing: " + param,
                }); 
            } else {
                newFriendship[param] = body[param];
            } 
		});
		otherParams.forEach(param => {
			if(body[param] != null) {
                newFriendship[param] = body[param];
            } 
		});
		//make sure both users exist
		User.findOne({
			_id: newFriendship['user1']._id
		}, (err, user1) => {
			if (err) {return res.send({success: false, message: 'Error: no user'});}
			User.findOne({
				_id: newFriendship['user2']._id
			}, (err, user2) => {
				if (err) {return res.send({success: false, message: 'Error: no user'});}
				//possibly switch the order to avoid duplicates
				if (user1._id > user2._id) {
					var tmp = user2;
					user2 = user1;
					user1 = tmp;
				}
				//save friendship
				newFriendship.save( (err, friendship) => {
					if (err) {
		        		return res.send({success: false, message: 'Error: server error'});
		        	}
		        	return res.send({
		                success: true,
		                message: "Friendship created.",
		                data: friendship
		            });
				});
			});
		});
	});

	//delete friendship
	app.post('/api/friend/delete/:friendid', (req,res,next) => {
		const friendid = req.params.friendid;
		Friendship.findOne({
				_id: friendid
			},
			(err, friendship) => {
				if (err) {return res.send({success: false, message: 'Error: no friendship'});}
				//delete and save
				friendship.isDelete = true;
				complaint.save( (err, friendship) => {
					if (err) {
						return res.send({success: false, message: 'Error: server error'});
					}
					return res.send({
						success: true,
						message: "Friendship deleted.",
						data: friendship
					});
				});				
			}
		);
	});


	//check if two users are friends
	app.get('/api/friend/check/:userid1/:userid2', (req,res,next) => {
		const userid1 = req.params.userid1;
		const userid2 = req.params.userid2;
		//make sure both users exist
		User.findOne({
			_id: userid1
		}, (err, user1) => {
			if (err) {return res.send({success: false, message: 'Error: no user'});}
			User.findOne({
				_id: userid2
			}, (err, user2) => {
				if (err) {return res.send({success: false, message: 'Error: no user'});}
				//possibly switch the order to avoid duplicates
				if (user1._id > user2._id) {
					var tmp = user2;
					user2 = user1;
					user1 = tmp;
				}
				//check that friendship exists
				Friendship.find({
						user1 : user1,
						user2 : user2,
						isDelete : false
					}, 
					(err, friendships) => {
                    	if (err) { return res.send({ success: false, message: 'Error: server error' }); };
                    	if (!friendships[0]) {
							return res.send({
								success: true,
								message: "success",
								data: false
							});
                    	};
						return res.send({
							success: true,
							message: "success",
							data: true
						});
					}
				);
			});
		});
	});

	//get all friends of a user
	app.get('/api/friend/getfriends/:userid', (req,res,next) => {
		const userid = req.params.userid;
		//make sure the user exists
		User.findOne({
			_id: userid
		}, (err, user) => {
			if (err) {return res.send({success: false, message: 'Error: no user'});}
			var friends = [];
			//user is the first friend
			Friendship.find({
				user1: user
			},
			(err, friendship) => {
				friends.append(friendship.user2);
			});
			//user is the second friend
			Friendship.find({
				user2: user
			},
			(err, friendship) => {
				friends.append(friendship.user1);
			});
			return res.send({
				success: true,
				message: "success",
				data: friends
			});
		});
	});
}