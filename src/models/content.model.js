const { Schema, model } = require('mongoose');

const ContentSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		videoUrl: {
			type: String,
			required: true,
		},
	},
	{ versionKey: false, timestamps: true },
);
const content = model('content', ContentSchema);

module.exports = { Content: content };
