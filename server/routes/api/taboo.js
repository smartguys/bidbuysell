const TabooWordExports = require('../../models/TabooWords');
const TabooWord = TabooWordExports.TabooWord;
const TabooWordList = TabooWordExports.TabooWordList;

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
	app.post('/api/taboo/delete/:id', (req,res,next) => {
		const wordid = req.params.id;
		TabooWordList.getSingleton((err, list) => {
			if (err) {return res.send({success: false, message: 'Error: taboo word list not found'});}
			if (!list.words) {return res.send({success: false, message: 'Error: missing word list in taboo words'});}
			//check that word exists
        	var wds = thread.messages.filter(wd => wd._id == id);
        	if (wds.length == 0) {return res.send({success: false, message: 'Error: word not found in list'});}
        	//delete
        	thread.messages.forEach(wd => {
        		if (wd._id == id) {wd.isDelete = true;}
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
	app.post('/api/taboo/delete/:word', (req,res,next) => {
		const word = req.params.word;
		TabooWordList.getSingleton((err, list) => {
			if (err) {return res.send({success: false, message: 'Error: taboo word list not found'});}
			if (!list.words) {return res.send({success: false, message: 'Error: missing word list in taboo words'});}
			//check that word exists
        	var wds = thread.messages.filter(wd => wd.word == word);
        	if (wds.length == 0) {return res.send({success: false, message: 'Error: word not found in list'});}
        	//delete
        	thread.messages.forEach(wd => {
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
            		return res || (el.word == word);
            }, false);
        	return res.send({
                success: true,
                message: "success",
                data: hasWord
            });
		});
	});
}


