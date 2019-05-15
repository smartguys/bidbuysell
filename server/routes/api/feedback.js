const Feedback = require('../../models/Feedback');
const User = require('../../models/User');

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
		});
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
				//delete and save
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
}