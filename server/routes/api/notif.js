const Notification = require('../../models/Notification');
const User = require('../../models/User');

module.exports = (app) => {
	//create notif
	app.post('/api/notif/create', (req,res,next) => {
		const {body} = req;
		const newNotification = new Notification();
		neededParams = [
			'notifiedUser',
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
                newNotification[param] = body[param];
            } 
		});
		otherParams.forEach(param => {
			if(body[param] != null) {
                newNotification[param] = body[param];
            } 
		});
		//check that the content is nonempty
		if (!newNotification['content']) {return res.send({success: false, message: 'Error: no notification content'});}
		//make sure the user is valid
		User.find({
			_id: newNotification['notifiedUser']._id
		}, (err, users) => {
				if (err) {return res.send({success: false, message: 'Error: no user'});}
		});
		//create notification
		newNotification.save( (err, notif) => {
        	if (err) {
        		return res.send({success: false, message: 'Error: server error'});
        	}
        	return res.send({
                success: true,
                message: "Notification created.",
                data: notif
            });
    	});
	});

	//update notif with new content
	app.post('/api/notif/update/:notifid', (req,res,next) => {
        const notifid = req.params.notifid;
		const {body} = req;
		//check that content is nonempty
		if (!body['content']) {return res.send({success: false, message: 'Error: no notification content'});}
		Notification.findOne({
				_id: notifid
			},
			(err, notif) => {
				if (err) {return res.send({success: false, message: 'Error: no notification'});}
				//replace content and save
				notif.content = body['content'];
				notif.save( (err, notif) => {
					if (err) {
						return res.send({success: false, message: 'Error: server error'});
					}
					return res.send({
						success: true,
						message: "Notification updated.",
						data: notif
					});
				});
			}
		);
	});

	//get all notifs for a user
	app.get('/api/notif/finduser/:userid', (req,res,next) => {
		const userid = req.params.userid;
		Notification.find().exec( (err, notifs) => {
			if (err) {return res.send({success: false, message: 'Error: no notifications'});}
			notifs = notifs.filter(notif => notif.notifiedUser._id == userid);
			return res.send({
				success: true,
				message: "success",
				data: notifs
			});
		});
	});

	//get a notif by id
	app.get('/api/notif/findnotif/:notifid', (req,res,next) => {
		const notifid = req.params.notifid;
		Notification.findOne({
				_id: notifid
			},
			(err, notif) => {
				if (err) {return res.send({success: false, message: 'Error: no notification'});}
				return res.send({
					success: true,
					message: "success",
					data: notif
				});
			}
		);
	});

	//delete a notif by id
	app.post('/api/notif/delete/:notifid', (req,res,next) => {
		const notifid = req.params.notifid;
		Notification.findOne({
				_id: notifid
			},
			(err, notif) => {
				if (err) {return res.send({success: false, message: 'Error: no notification'});}
				//delete and save
				notif.isDelete = true;
				notif.save( (err, notif) => {
					if (err) {
						return res.send({success: false, message: 'Error: server error'});
					}
					return res.send({
						success: true,
						message: "Notification deleted.",
						data: notif
					});
				});
			}
		);
	});
}