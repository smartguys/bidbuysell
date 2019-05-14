const TabooWordExports = require('../../models/TabooWords');
const TabooWord = TabooWordExports.TabooWord;
const TabooWordList = TabooWordExports.TabooWordList;

module.exports = (app) => {
	//create taboo word
	app.post('/api/taboo/create', (req,res,next) => {

	});

	//delete taboo word
	app.post('/api/taboo/delete', (req,res,next) => {

	});

	//get all taboo words
	app.get('/api/taboo/get', (req,res,next) => {

	});

	//check if a word is taboo
	app.get('/api/taboo/check', (req,res,next) => {

	});
}

TabooWordList.getSingleton((err, list) => {
	if (err) {}
	//do stuff
	list.save();
});
