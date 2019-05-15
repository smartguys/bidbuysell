const mongoose = require('mongoose');

const TabooWordSchema = new mongoose.Schema({
	word : {
		type: String,
		required: true
	},
	date : {
		type: Date,
		default: Date.now()
	},
	isDelete : {
		type: Boolean,
		default: false
	}
});

var TabooWord = mongoose.model('TabooWord', TabooWordSchema);

const TabooWordListSchema = new mongoose.Schema({
	words : [TabooWord.schema]
});
	
TabooWordListSchema.statics = {
	getSingleton: function (cb) {
		this.findOne()
			.sort({updated: -1})
			.limit(1)
			.exec(function (err, model) {
				if (err) {
					cb(err, null);
				} else if (!model) {
					cb(err, new TabooWordList());
				} else {
					cb(err, model);
				}
			});
   },
};

var TabooWordList = mongoose.model('TabooWordList', TabooWordListSchema);

module.exports = {
	TabooWord,
	TabooWordList
};