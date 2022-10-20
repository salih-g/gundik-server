const { Content } = require('../../models/content.model');
const User = require('../../models/user.model');
const { youtubeParser } = require('../../helpers');
const { verifyToken } = require('../../utils/token');

const ListController = {
	getList: async (_, res) => {
		try {
			const contents = await Content.find().sort({ createdAt: -1 });

			return res.status(200).json(contents);
		} catch (err) {
			return res.status(500).json({ error: err.message || err });
		}
	},

	addList: async (req, res) => {
		const { title, videoUrl, token } = req.body;
		if (!token) return res.status(401).json({ message: 'you must login' });

		const watchId = youtubeParser(videoUrl);
		const content = new Content({ title, videoUrl, watchId });

		try {
			const decoded = await verifyToken(token);
			const findedUser = await User.findById(decoded.id);
			console.log(decoded.id);
			console.log(findedUser);

			if (!findedUser)
				return res.status(401).json({ message: 'you must login' });

			await content.save();
			const contents = await Content.find().sort({ createdAt: -1 });

			return res.status(201).json(contents);
		} catch (err) {
			return res.status(500).json({ error: err.message || err });
		}
	},

	deleteContent: async (req, res) => {
		const { id } = req.params;
		try {
			await Content.findByIdAndRemove(id);
			const contents = await Content.find().sort({ createdAt: -1 });

			return res.status(201).json(contents);
		} catch (err) {
			return res.status(500).json({ error: err.message || err });
		}
	},
};

module.exports = ListController;
