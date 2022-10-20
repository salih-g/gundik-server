const jwt = require('jsonwebtoken');
const { SECRET } = require('../config');

exports.signToken = async (id) => await jwt.sign({ id }, SECRET);

exports.verifyToken = async (token) => await jwt.verify(token, SECRET);

exports.sendToken = async (user, statusCode, res) => {
	const token = await user.getSignedToken();

	res.status(statusCode).json({
		token,
	});
};
