const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		role: {
			type: String,
			default: "mentee",
		},
		accountBlocked: {
			type: Boolean,
			default: false,
		},
		emailVerified: {
			type: Boolean,
			default: false,
		},
		loginType: {
			type: String,
			enum: ["local", "google"],
			default: "local",
		}
	},
	{ timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;