const Complaint = require('../../models/Complaint');
const User = require('../../models/User');

module.exports = (app) => {
	//create complaint
	app.post('/api/complaint/create', (req,res,next) => {
		const {body} = req;
		const newComplaint = new Complaint();
		neededParams = [
			'plaintiff',
			'defendant',
			'content'
		];
		otherParams = [
			'date',
			'isDelete',
			'isResolved'
		];
		neededParams.forEach(param => {
			if(body[param] == null) {
                return res.send({
                    success: false,
                    message: "missing: " + param,
                }); 
            } else {
                newComplaint[param] = body[param];
            } 
		});
		otherParams.forEach(param => {
			if(body[param] != null) {
                newComplaint[param] = body[param];
            } 
		});
		//check that the content is nonempty
		if (!newComplaint['content']) {return res.send({success: false, message: 'Error: no complaint content'});}
		//make sure the plaintiff exists
		User.find({
			_id: newComplaint['plaintiff']._id
		}, (err, users) => {
				if (err) {return res.send({success: false, message: 'Error: no plaintiff user'});}
		});
		//make sure the defendant exists
		User.find({
			_id: newComplaint['defendant']._id
		}, (err, users) => {
				if (err) {return res.send({success: false, message: 'Error: no defendant user'});}
		});
		//create feedback post
		newComplaint.save( (err, complaint) => {
			if (err) {
        		return res.send({success: false, message: 'Error: server error'});
        	}
        	return res.send({
                success: true,
                message: "Complaint created.",
                data: complaint
            });
		});
	});

	//update complaint
	app.post('/api/complaint/update/:complaintid', (req,res,next) => {
		const complaintid = req.params.complaintid;
		const {body} = req;
		//check that content is nonempty
		if (!body['content']) {return res.send({success: false, message: 'Error: no complaint content'});}
		Complaint.findOne({
				_id: complaintid
			},
			(err, complaint) => {
				if (err) {return res.send({success: false, message: 'Error: no complaint'});}
				//replace content and save
				complaint.content = body['content'];
				complaint.save( (err, complaint) => {
					if (err) {
						return res.send({success: false, message: 'Error: server error'});
					}
					return res.send({
						success: true,
						message: "Complaint updated.",
						data: complaint
					});
				});
			}
		);
	});

	//close complaint (not resolved)
	app.post('/api/complaint/delete/:complaintid', (req,res,next) => {
		const complaintid = req.params.complaintid;
		Complaint.findOne({
				_id: complaintid
			},
			(err, complaint) => {
				if (err) {return res.send({success: false, message: 'Error: no complaint'});}
				//delete and save
				complaint.isDelete = true;
				complaint.save( (err, complaint) => {
					if (err) {
						return res.send({success: false, message: 'Error: server error'});
					}
					return res.send({
						success: true,
						message: "Complaint deleted.",
						data: complaint
					});
				});
			}
		);
	});

	//resolve complaint (takes t/f as isjustified param)
	app.post('/api/complaint/resolve/:complaintid', (req,res,next) => {
		const complaintid = req.params.complaintid;
		const {body} = req;
		//check that content is nonempty
		if (body['isJustified'] == null) {return res.send({success: false, message: 'Error: no verdict content'});}
		Complaint.findOne({
				_id: complaintid
			},
			(err, complaint) => {
				if (err) {return res.send({success: false, message: 'Error: no complaint'});}
				//delete, RESOLVE, and save
				complaint.isDelete = true;
				complaint.isResolved = true;
				complaint.isJustified = body['isJustified'];
				complaint.save( (err, complaint) => {
					if (err) {
						return res.send({success: false, message: 'Error: server error'});
					}
					return res.send({
						success: true,
						message: "Complaint resolved.",
						data: complaint
					});
				});
			}
		);
	});

	//get complaint by id
	app.get('/api/complaint/:complaintid', (req,res,next) => {
		const complaintid = req.params.complaintid;
		Complaint.findOne({
				_id: complaintid
			},
			(err, complaint) => {
				if (err) {return res.send({success: false, message: 'Error: no complaint'});}
				return res.send({
					success: true,
					message: "success",
					data: complaint
				});
			}
		);
	});

	//get all complaints FOR a user
	app.get('/api/complaint/defendant/:userid', (req,res,next) => {
		const userid = req.params.userid;
		Complaint.find().exec( (err, complaints) => {
			if (err) {return res.send({success: false, message: 'Error: no complaint'});}
			complaints = complaints.filter(complaint => complaint.defendant._id == userid);
			return res.send({
				success: true,
				message: "success",
				data: complaints
			});
		});
	});

	//get all complaints BY a user
	app.get('/api/complaint/plaintiff/:userid', (req,res,next) => {
		const userid = req.params.userid;
		Complaint.find().exec( (err, complaints) => {
			if (err) {return res.send({success: false, message: 'Error: no complaint'});}
			complaints = complaints.filter(complaint => complaint.plaintiff._id == userid);
			return res.send({
				success: true,
				message: "success",
				data: complaints
			});
		});
	});
}