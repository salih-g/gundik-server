const { Content } = require('../../models/content.model');

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
		const { title, videoUrl } = req.body;
		const content = new Content({ title, videoUrl });

		try {
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
