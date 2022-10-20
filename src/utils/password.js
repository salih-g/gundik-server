const bcrypt = require('bcrypt');

exports.hashPassword = async (reqPassword) => {
	try {
		const salt = await bcrypt.genSalt(10);
		return await bcrypt.hash(reqPassword, salt);
	} catch (err) {
		throw new Error(err);
	}
};

exports.validPassword = async (password, userPassword) => {
	try {
		return await bcrypt.compare(password, userPassword);
	} catch (err) {
		throw new Error(err);
	}
};
