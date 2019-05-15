const TabooWordExports = require('../../models/TabooWords');
const TabooWord = TabooWordExports.TabooWord;
const TabooWordList = TabooWordExports.TabooWordList;

const request = require('request');

module.exports = (app) => {
	//create taboo word
	app.post('/api/taboo/create', (req,res,next) => {
		const {body} = req;
		const newWord = new TabooWord();
		neededParams = [
			'word'
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
                newWord[param] = body[param];
            } 
		});
		otherParams.forEach(param => {
			if(body[param] != null) {
                newWord[param] = body[param];
            } 
		});
		//check that the word is nonempty
		if (!newWord['word']) {return res.send({success: false, message: 'Error: empty word'});}
		//append word to singleton word list
		TabooWordList.getSingleton((err, list) => {
			if (err) {return res.send({success: false, message: 'Error: taboo word list not found'});}
			if (!list.words) {return res.send({success: false, message: 'Error: missing word list in taboo words'});}
			list.words.push(newWord);
			//word is added, save
	    	list.save( (err, list) => {
	        	if (err) {
	        		return res.send({success: false, message: 'Error: server error'});
	        	}
	        	return res.send({
	                success: true,
	                message: "Word added to taboo words.",
	                data: list
	            });
	    	});
		});
	});

	//delete taboo word by id
	app.post('/api/taboo/deleteid/:id', (req,res,next) => {
		const wordid = req.params.id;
		TabooWordList.getSingleton((err, list) => {
			if (err) {return res.send({success: false, message: 'Error: taboo word list not found'});}
			if (!list.words) {return res.send({success: false, message: 'Error: missing word list in taboo words'});}
			//check that word exists
        	var wds = list.words.filter(wd => wd._id == wordid);
        	if (wds.length == 0) {return res.send({success: false, message: 'Error: word not found in list'});}
        	//delete
        	list.words.forEach(wd => {
        		if (wd._id == wordid) {wd.isDelete = true;}
        	});
			//word is deleted, save
	    	list.save( (err, list) => {
	        	if (err) {
	        		return res.send({success: false, message: 'Error: server error'});
	        	}
	        	return res.send({
	                success: true,
	                message: "Word deleted from taboo words.",
	                data: list
	            });
	    	});
		});
	});

	//delete taboo word by word
	app.post('/api/taboo/deleteword/:word', (req,res,next) => {
		const word = req.params.word;
		TabooWordList.getSingleton((err, list) => {
			if (err) {return res.send({success: false, message: 'Error: taboo word list not found'});}
			if (!list.words) {return res.send({success: false, message: 'Error: missing word list in taboo words'});}
			//check that word exists
        	var wds = list.words.filter(wd => wd.word == word);
        	if (wds.length == 0) {return res.send({success: false, message: 'Error: word not found in list'});}
        	//delete
        	list.words.forEach(wd => {
        		if (wd.word == word) {wd.isDelete = true;}
        	});
			//word is deleted, save
	    	list.save( (err, list) => {
	        	if (err) {
	        		return res.send({success: false, message: 'Error: server error'});
	        	}
	        	return res.send({
	                success: true,
	                message: "Word deleted from taboo words.",
	                data: list
	            });
	    	});
		});
	});

	//get all taboo words
	app.get('/api/taboo/get', (req,res,next) => {
		TabooWordList.getSingleton((err, list) => {
			if (err) {return res.send({success: false, message: 'Error: taboo word list not found'});}
			if (!list.words) {return res.send({success: false, message: 'Error: missing word list in taboo words'});}
        	return res.send({
                success: true,
                message: "success",
                data: list.words
            });
		});
	});

	//check if a word is taboo
	app.get('/api/taboo/check/:word', (req,res,next) => {
		const word = req.params.word;		
		TabooWordList.getSingleton((err, list) => {
			if (err) {return res.send({success: false, message: 'Error: taboo word list not found'});}
			if (!list.words) {return res.send({success: false, message: 'Error: missing word list in taboo words'});}
        	var hasWord = list.words.reduce(function(res, el) {
            		return res || ((el.word == word) && !el.isDelete);
            }, false);
        	return res.send({
                success: true,
                message: "success",
                data: hasWord
            });
		});
	});



	app.get('/test', (req,res,next) => {
		console.log('?');

		request.get(
		    'http://localhost:8080/api/taboo/get',
		    { json: { 
		    		} 
		    },
		    function (error, response, body) {
		        console.log("1");
		        console.log(body);
		        console.log("1");
		    }
		);

		setTimeout( function() {
			request.post(
			    'http://localhost:8080/api/taboo/create',
			    { json: { word: "coke"
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
			    'http://localhost:8080/api/taboo/create',
			    { json: { word: "osu"
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
			request.get(
			    'http://localhost:8080/api/taboo/get',
			    { json: { 
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
			request.get(
			    'http://localhost:8080/api/taboo/check/osu',
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
			    'http://localhost:8080/api/taboo/deleteword/osu',
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

		setTimeout( function() {
			request.get(
			    'http://localhost:8080/api/taboo/check/osu',
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
			    'http://localhost:8080/api/taboo/get',
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
	});


}