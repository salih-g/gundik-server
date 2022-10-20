const User = require('../../models/user.model');

const { sendToken } = require('../../utils/token');

const UserController = {
	login: async (req, res) => {
		const { username, password } = req.body;

		if (!username || !password) {
			return res.status(400).json({
				success: false,
				error: 'Please provide username and password.',
			});
		}

		try {
			const user = await User.findOne({ username });

			if (!user) {
				return res
					.status(404)
					.json({ success: false, error: 'Invalid credentials' });
			}

			const isMatch = await user.matchPassword(password);

			if (!isMatch) {
				return res
					.status(404)
					.json({ success: false, error: 'Invalid credentials' });
			}

			sendToken(user, 200, res);
		} catch (err) {
			return res
				.status(500)
				.json({ success: false, error: err.message || err });
		}
	},

	register: async (req, res) => {
		const { username, password } = req.body;

		try {
			const newUser = await new User({
				username,
				password,
			});
			console.log('girdim gardaş');
			const user = await newUser.save();

			sendToken(user, 201, res);
		} catch (err) {
			return res
				.status(500)
				.json({ success: false, error: err.message || err });
		}
	},
};

module.exports = UserController;
