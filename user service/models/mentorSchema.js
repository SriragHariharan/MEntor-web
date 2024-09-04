const mongoose = require('mongoose');

const mentorSchema = new mongoose.Schema(
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
        mobile: {
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
			required: true,
			default: "mentor",
		},
		accountVerified: {
			type: Boolean,
			default: false,
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
			// enum: ["local", "google"],
			default: "local",
		}
	},
	{ timestamps: true }
);

const User = mongoose.model("Mentor", mentorSchema);

module.exports = User;