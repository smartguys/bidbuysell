const Complaint = require('../../models/Complaint');
const User = require('../../models/User');

const request = require('request');

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

	app.get('/test', (req,res,next) => {
		console.log('?');
		var u1 = new User();
		var u2 = new User();
		var u3 = new User();
		var f1, f2, f3;

		request.post(
		    'http://localhost:8080/api/complaint/create',
		    { json: { plaintiff : u1,
		    		  defendant : u3,
		    		  content : "U1 reviewing U3 first time",
		    		} 
		    },
		    function (error, response, body) {
		        console.log("1");
		        console.log(body);
		        console.log("1");
		        f1 = body.data._id;
		    }
		);

		setTimeout( function() {
			request.post(
			    'http://localhost:8080/api/complaint/create',
			    { json: { plaintiff : u1,
			    		  defendant : u2,
			    		  content : "U1 HATES U2",
			    		} 
			    },
			    function (error, response, body) {
			        console.log("2");
			        console.log(body);
			        console.log("2");
			        f2 = body.data._id;
			    }
			);
		}, 3000);

		setTimeout( function() {
			request.post(
			    'http://localhost:8080/api/complaint/create',
			    { json: { plaintiff : u2,
			    		  defendant : u3,
			    		  content : "U2 GOT SCAMMED BY U3",
			    		} 
			    },
			    function (error, response, body) {
			        console.log("3");
			        console.log(body);
			        console.log("3");
			        f3 = body.data._id;
			    }
			);
		}, 6000);

		setTimeout( function() {
			request.post(
			    'http://localhost:8080/api/complaint/update/'+f1,
			    { json: { content : "U1 EDITING U3 COMPLAINT",
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
			    'http://localhost:8080/api/complaint/delete/'+f3,
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
			request.post(
			    'http://localhost:8080/api/complaint/resolve/'+f2,
			    { json: { 'isJustified' : true
			    		} 
			    },
			    function (error, response, body) {
			        console.log("6");
			        console.log(body);
			        console.log("6");
			    }
			);
		}, 15000);

		setTimeout( function() {
			request.get(
			    'http://localhost:8080/api/complaint/plaintiff/'+u1._id,
			    { json: {
			    		} 
			    },
			    function (error, response, body) {
			        console.log("7");
			        console.log(body);
			        console.log("7");
			    }
			);
		}, 18000);

		setTimeout( function() {
			request.get(
			    'http://localhost:8080/api/complaint/defendant/'+u3._id,
			    { json: {
			    		} 
			    },
			    function (error, response, body) {
			        console.log("8");
			        console.log(body);
			        console.log("8");
			    }
			);
		}, 21000);

		setTimeout( function() {
			request.get(
			    'http://localhost:8080/api/complaint/'+f3,
			    { json: {
			    		} 
			    },
			    function (error, response, body) {
			        console.log("9");
			        console.log(body);
			        console.log("9");
			    }
			);
		}, 24000);
	});
}