const { Schema, model } = require('mongoose');
const { hashPassword, validPassword } = require('../utils/password');
const { signToken } = require('../utils/token');

const UserSchema = new Schema(
	{
		username: {
			type: String,
			required: true,
			minlength: 3,
			maxlength: 20,
			unique: true,
		},
		password: {
			type: String,
			required: true,
			minlength: 6,
		},
	},
	{ versionKey: false },
);

UserSchema.pre('save', async function (next) {
	if (!this.isModified('password')) {
		next();
	}
	this.password = await hashPassword(this.password);
	next();
});

UserSchema.methods.matchPassword = async function (password) {
	return await validPassword(password, this.password);
};

UserSchema.methods.getSignedToken = async function () {
	return await signToken(this._id);
};

module.exports = model('user', UserSchema);
