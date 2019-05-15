const Feedback = require('../../models/Feedback');
const User = require('../../models/User');

const request = require('request');

module.exports = (app) => {
	//create feedback
	app.post('/api/feedback/create', (req,res,next) => {
		const {body} = req;
		const newFeedback = new Feedback();
		neededParams = [
			'reviewer',
			'userReviewed',
			'content',
			'rating'
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
                newFeedback[param] = body[param];
            } 
		});
		otherParams.forEach(param => {
			if(body[param] != null) {
                newFeedback[param] = body[param];
            } 
		});
		//check that the content is nonempty
		if (!newFeedback['content']) {return res.send({success: false, message: 'Error: no feedback content'});}
		//make sure the reviewer exists
		User.find({
			_id: newFeedback['reviewer']._id
		}, (err, users) => {
				if (err) {return res.send({success: false, message: 'Error: no reviewing user'});}
		});
		//make sure the user reviewed exists
		User.find({
			_id: newFeedback['userReviewed']._id
		}, (err, users) => {
				if (err) {return res.send({success: false, message: 'Error: no reviewed user'});}
		});
		//create feedback post
		newFeedback.save( (err, feedback) => {
			if (err) {
        		return res.send({success: false, message: 'Error: server error'});
        	}
        	return res.send({
                success: true,
                message: "Feedback created.",
                data: feedback
            });
		})
	});

	//update feedback
	app.post('/api/feedback/update/:feedbackid', (req,res,next) => {
		const feedbackid = req.params.feedbackid;
		const {body} = req;
		//check that content is nonempty
		if (!body['content']) {return res.send({success: false, message: 'Error: no feedback content'});}
		if (!body['rating']) {return res.send({success: false, message: 'Error: no feedback rating'});}
		Feedback.findOne({
				_id: feedbackid
			},
			(err, feedback) => {
				if (err) {return res.send({success: false, message: 'Error: no feedback'});}
				//replace content, rating and save
				feedback.content = body['content'];
				feedback.rating = body['rating'];
				feedback.save( (err, feedback) => {
					if (err) {
						return res.send({success: false, message: 'Error: server error'});
					}
					return res.send({
						success: true,
						message: "Feedback updated.",
						data: feedback
					});
				});
			}
		);
	});

	//delete feedback
	app.post('/api/feedback/delete/:feedbackid', (req,res,next) => {
		const feedbackid = req.params.feedbackid;
		Feedback.findOne({
				_id: feedbackid
			},
			(err, feedback) => {
				if (err) {return res.send({success: false, message: 'Error: no feedback'});}
				//replace content and save
				feedback.isDelete = true;
				feedback.save( (err, feedback) => {
					if (err) {
						return res.send({success: false, message: 'Error: server error'});
					}
					return res.send({
						success: true,
						message: "Feedback deleted.",
						data: feedback
					});
				});
			}
		);
	});

	//get all feedback for a user profile
	app.get('/api/feedback/:userid', (req,res,next) => {
		const userid = req.params.userid;
		Feedback.find().exec( (err, feedbacks) => {
			if (err) {return res.send({success: false, message: 'Error: no feedback'});}
			feedbacks = feedbacks.filter(feedback => feedback.userReviewed._id == userid);
			return res.send({
				success: true,
				message: "success",
				data: feedbacks
			});
		});
	});



	app.get('/test', (req,res,next) => {
		console.log('?');
		var u1 = new User();
		var u2 = new User();
		var u3 = new User();
		var f;

		request.post(
		    'http://localhost:8080/api/feedback/create',
		    { json: { reviewer : u1,
		    		  userReviewed : u3,
		    		  content : "U1 reviewing U3 first time",
		    		  rating : 2
		    		} 
		    },
		    function (error, response, body) {
		        console.log("1");
		        console.log(body);
		        console.log("1");
		        f = body.data._id;
		    }
		);

		setTimeout( function() {
			request.post(
			    'http://localhost:8080/api/feedback/create',
			    { json: { reviewer : u1,
			    		  userReviewed : u2,
			    		  content : "U1 REVIEWING U2",
			    		  rating : 1
			    		} 
			    },
			    function (error, response, body) {
			        console.log("2");
			        console.log(body);
			        console.log("2");
			    }
			);
		}, 3000);

		setTimeout( function() {
			request.post(
			    'http://localhost:8080/api/feedback/create',
			    { json: { reviewer : u2,
			    		  userReviewed : u3,
			    		  content : "U2 REVIEWING U3",
			    		  rating : 4
			    		} 
			    },
			    function (error, response, body) {
			        console.log("3");
			        console.log(body);
			        console.log("3");
			    }
			);
		}, 6000);

		setTimeout( function() {
			request.post(
			    'http://localhost:8080/api/feedback/update/'+f,
			    { json: { content : "U1 REVIEWING U3 AGAIN",
			    		  rating : 5
			    		} 
			    },
			    function (error, response, body) {
			        console.log("4");
			        console.log(body);
			        console.log("4");
			    }
			);
		}, 9000);

		setTimeout( function() {
			request.post(
			    'http://localhost:8080/api/feedback/delete/'+f,
			    { json: { 
			    		} 
			    },
			    function (error, response, body) {
			        console.log("5");
			        console.log(body);
			        console.log("5");
			    }
			);
		}, 12000);

		setTimeout( function() {
			request.get(
			    'http://localhost:8080/api/feedback/'+u3._id,
			    { json: { 
			    		} 
			    },
			    function (error, response, body) {
			        console.log("6");
			        console.log(body);
			        console.log("6");
			    }
			);
		}, 15000);
	});



}